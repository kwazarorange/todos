export type Todo = {
  id: string;
  value: string;
  completed: boolean;
  status?: "pending" | "deleted";
};
