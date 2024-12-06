import { Todo } from "./Todo.type";

export type TodoContext = {
  todos: Todo[];
  status?: "initial" | "localFetched" | "loading" | 'success';
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setStatus: React.Dispatch<React.SetStateAction<TodoContext["status"]>>;
};
