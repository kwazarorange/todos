import React, { useContext, useMemo } from "react";
import axios from "axios";
import { TodosContext } from "../context/Todo.context";
import { Todo as TodoProps } from "../types/Todo.type";

import * as Styled from "./Todo.styled";
import { debounce } from "../helpers/debounce";

const Todo: React.FC<TodoProps> = ({ id, value, completed, status }) => {
  const { setTodos } = useContext(TodosContext);

  const handleRemoveTodo = () => {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, status: "deleted" } : todo
      )
    );
    axios
      .delete(`/todo/${id}`)
      .then(() => {
        setTodos((todos) => todos.filter((todo) => todo.id !== id));
      })
      .catch(() => {
        setTodos((todos) =>
          todos.map((todo) =>
            todo.id === id ? { ...todo, status: undefined } : todo
          )
        );
      });
  };

  const postToggleTodo = useMemo(
    () =>
      debounce(
        (complete: boolean) =>
          axios.post(`/todo/${id}/toggle`, { completed: complete }),
        500
      ),
    []
  );

  const handleToggleTodo: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );

    postToggleTodo(!completed);
  };

  return (
    <Styled.Todo>
      <input
        type="checkbox"
        checked={completed}
        onChange={handleToggleTodo}
      ></input>
      <p>{value}</p>
      <Styled.DeleteButton disabled={!!status} onClick={handleRemoveTodo}>
        x
      </Styled.DeleteButton>
    </Styled.Todo>
  );
};

export default Todo;
