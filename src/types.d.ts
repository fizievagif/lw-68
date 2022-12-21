export interface Todos {
  id?: string;
  state: boolean;
  text: string;
}

export interface TodosApi {
  [id: string]: Todos;
}

export interface TodosType {
  todos: TodosItem[];
  loading: boolean;
  error: boolean;
}