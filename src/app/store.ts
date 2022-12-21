import {configureStore} from "@reduxjs/toolkit";
import {todoSliceReducer} from "../Containers/todoSlice";

export const store = configureStore({
  reducer: {
    todoApp: todoSliceReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;