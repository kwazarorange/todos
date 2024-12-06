import React, { useContext, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import { TodosContext } from "../context/Todo.context";
import { Todo } from "../types/Todo.type";
import { sanitizeTodoValue } from "../helpers/sanitizeTodoValue";

import * as Styled from "./CreateTodoForm.styled";

const CreateTodoForm: React.FC = () => {
  const { setTodos } = useContext(TodosContext);
  const [value, setValue] = useState<string>("");
  const [status, setStatus] = useState<"pending" | "error" | "success">();
  const [errorMessage, setErrorMessage] = useState<string>();

  const sanitizedValue = sanitizeTodoValue(value);

  const handleInputChange: React.ChangeEventHandler<HTMLTextAreaElement> = (
    e
  ) => {
    setValue(e.target.value);
    setErrorMessage("");
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const optimisticTodoId = uuidv4();

    setErrorMessage("");
    setStatus("pending");
    setTodos((todos) => [
      { id: optimisticTodoId, value: sanitizedValue },
      ...todos,
    ]);

    axios
      .post<Todo>("/todo", {
        value: sanitizedValue,
      })
      .then((response) => {
        setStatus("success");
        setTodos((todos) =>
          todos.map((todo) =>
            todo.id === optimisticTodoId ? response.data : todo
          )
        );
      })
      .catch((error) => {
        setStatus("error");
        setErrorMessage(error.response?.data?.message);
        setTodos((todos) =>
          todos.filter((todo) => todo.id !== optimisticTodoId)
        );
      });
  };

  const isSubmitDisabled = !sanitizedValue || status === "pending";

  return (
    <Styled.Form onSubmit={handleSubmit}>
      <Styled.TextArea
        name="todoInput"
        placeholder="Todo"
        maxLength={150}
        value={value}
        autoFocus
        onChange={handleInputChange}
        rows={5}
      ></Styled.TextArea>
      <Styled.ErrorLabel htmlFor="todoInput">{errorMessage}</Styled.ErrorLabel>
      <button type="submit" disabled={isSubmitDisabled}>
        Создать
      </button>
    </Styled.Form>
  );
};

export default CreateTodoForm;
