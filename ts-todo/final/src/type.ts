import Todo from './Todo';

export interface AppState {
  todos: Todo[];
}

export interface ActionNewTodo {
  type: 'newTodo';
  title: string;
  priority: Priority;
}
export interface ActionDeleteTodo {
  type: 'deleteTodo';
  id: number;
}
export type Action = ActionNewTodo | ActionDeleteTodo;

export enum Priority {
  High,
  Medium,
  Low,
}

export const PRIORITY_NAME_MAP: { [key in Priority]: string } = {
  [Priority.High]: '높음',
  [Priority.Medium]: '중간',
  [Priority.Low]: '낮음',
};
