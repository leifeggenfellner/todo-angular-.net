export interface Todo {
  id: number;
  title: string;
  isCompleted: boolean;
  editing?: boolean;
}

export interface newTodo {
  title: string;
  isCompleted: boolean;
}
