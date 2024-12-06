import { useState } from "react";
import { TodosContext } from "../context/Todo.context";
import { Todo } from "../types/Todo.type";
import { TodoContext } from "../types/TodoContext.type";

const TodoContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [status, setStatus] = useState<TodoContext['status']>('initial')

  return (
    <TodosContext.Provider value={{ todos, setTodos, status, setStatus }}>
      {children}
    </TodosContext.Provider>
  );
};

export default TodoContextProvider;
