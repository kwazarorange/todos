import { createContext } from "react";
import { TodoContext } from "../types/TodoContext.type";

const initialState: TodoContext = {
  todos: [],
  status: 'initial',
  setTodos: () => {},
  setStatus: () => {},
};

export const TodosContext = createContext<TodoContext>(initialState);
