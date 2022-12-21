import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import TodoForm from "../../Components/TodoForm/TodoForm";
import {AppDispatch, RootState} from "../../app/store";
import Spinner from "../../Components/Spinner/Spinner";
import TodoItem from "../TodoItem/TodoItem";
import {fetchTodos} from "../todoSlice";

const TodoList = () => {
  const dispatch: AppDispatch = useDispatch();

  const todosItem = useSelector((state: RootState) => state.todoApp.todos);
  const todosLoading = useSelector((state: RootState) => state.todoApp.loading);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  let isTaskHave;

  if (todosItem.length !== 0) {
    isTaskHave = todosItem.map((item) => (
      <TodoItem
        key={item.id}
        id={item.id}
        text={item.text}
        complete={item.state}
      />
    ));
  } else {
    isTaskHave = <h1>No tasks!</h1>
  }

  return (
    <div className="text-center">
      <TodoForm/>
      {todosLoading ? <Spinner/> : isTaskHave}
    </div>
  );
};

export default TodoList;