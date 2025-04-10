export interface User {
  username: string;
  password: string;
  todoList?: Todo[];
}

export interface Todo {
  todo: string;
  completed: boolean;
}
