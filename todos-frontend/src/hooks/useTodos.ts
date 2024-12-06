import { useContext, useEffect } from "react";
import axios from "axios";
import { TodosContext } from "../context/Todo.context";
import { Todo } from "../types/Todo.type";

export const useTodos = () => {
  const { todos, status, setTodos, setStatus } = useContext(TodosContext);

  useEffect(() => {
    const cachedTodosString = localStorage.getItem("todos");

    if (!cachedTodosString) return;
    const cachedTodos = JSON.parse(cachedTodosString);

    if (status === "success") {
      return;
    }
    setTodos(cachedTodos);
    setStatus("localFetched");
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    setStatus("loading");
    axios.get<Todo[]>("/todo").then((response) => {
      setTodos(response.data);
      setStatus("success");
    });
  }, []);
};
