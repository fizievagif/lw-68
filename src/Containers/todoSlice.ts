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
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.todos = Object.keys(action.payload).map((id: string) => {
        const task = action.payload[id];
        return {...task, id}
      });
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
  }
});

export const todoSliceReducer = todosSlice.reducer;