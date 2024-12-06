import React, { useContext } from "react";
import { TodosContext } from "../context/Todo.context";
import { useTodos } from "../hooks/useTodos";
import Todo from "./Todo";
import * as Styled from "./TodoList.styled";

const TodoList: React.FC = () => {
  const { todos, status } = useContext(TodosContext);
  useTodos();

  return (
    <Styled.TodoList>
      {todos.length ? (
        todos.map((todo) => <Todo key={todo.id} {...todo} />)
      ) : status === "loading" || status === "initial" ? (
        <p>Loading</p>
      ) : (
        <p>No tasks to display</p>
      )}
    </Styled.TodoList>
  );
};

export default TodoList;
