export interface TodosItem {
  state: boolean;
  text: string;
}

export interface Todos extends TodosItem {
  id: string;
}

export interface TodosApi {
  [id: string]: TodosItem;
}

export interface TodosType {
  todos: TodosItem[];
  completeTask: boolean;
  loading: boolean;
  error: boolean;
}