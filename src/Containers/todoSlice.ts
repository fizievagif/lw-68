import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Todos, TodosApi, TodosType} from "../types";
import axiosApi from "../axiosApi";

const initialState: TodosType = {
  todos: [],
  loading: false,
  error: false,
};

export const fetchTodos = createAsyncThunk(
  'todoApp/fetch',
  async () => {
    const response = await axiosApi.get<TodosApi | null>('/todos.json');
    const todosRequest = response.data;

    let tasks: Todos[] = [];

    if (todosRequest !== null) {
      tasks = Object.keys(todosRequest).map((id: string) => ({...todosRequest[id], id}));
    }
    return tasks;
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
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.todos = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchTodos.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
    builder.addCase(completeTodos.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(completeTodos.fulfilled, (state) => {
      state.loading = false;
      state.error = false;
    });
    builder.addCase(removeTodos.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(removeTodos.fulfilled, (state) => {
      state.loading = false;
      state.error = false;
    });
    builder.addCase(removeTodos.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  }
});

export const todoSliceReducer = todosSlice.reducer;