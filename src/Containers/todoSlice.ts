import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Todos, TodosApi, TodosType} from "../types";
import axiosApi from "../axiosApi";

const initialState: TodosType = {
  todos: [],
  completeTask: false,
  loading: false,
  error: false,
};

export const fetchTodos = createAsyncThunk<TodosApi>(
  'todoApp/fetch',
  async () => {
    const response = await axiosApi.get<TodosApi>('/todos.json');
    return response.data ?? [{
      id: Math.random().toString(),
      state: false,
      text: 'No tasks!'
    }];
  }
);

export const addTodos = createAsyncThunk(
  'todoApp/add',
  async (todo: Todos) => {
    await axiosApi.post('/todos.json',  todo);
  }
);

export const completeTodos = createAsyncThunk(
  'todoApp/complete',
  async (todos: Todos) => {
    await axiosApi.put('/todos/' + todos.id + '.json', todos);
  }
);

export const removeTodos = createAsyncThunk(
  'todoApp/remove',
  async (id: string) => {
    await axiosApi.delete('/todos/' + id + '.json');
  }
)

export const todosSlice = createSlice({
  name: 'todoApp',
  initialState,
  reducers: {},
  extraReducers: (builder) => {}
});

export const passwordReducer = todosSlice.reducer;
export const {} = todosSlice.actions;