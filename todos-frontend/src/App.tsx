import "./App.css";
import TodoContextProvider from "./providers/TodoContext.provider";
import CreateTodoForm from "./CreateTodoForm";
import TodoList from "./TodoList";

function App() {
  return (
    <TodoContextProvider>
      <CreateTodoForm />
      <TodoList />
    </TodoContextProvider>
  );
}

export default App;
