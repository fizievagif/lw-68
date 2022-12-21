import React, {useState} from 'react';
import {Todos} from "../../types";
import {AppDispatch} from "../../app/store";
import {useDispatch} from "react-redux";
import {addTodos, fetchTodos} from "../../Containers/todoSlice";

const TodoForm = () => {
  const dispatch: AppDispatch = useDispatch();
  const [todos, setTodos] = useState<Todos>({
    id: '',
    state: false,
    text: '',
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(addTodos(todos));
    await dispatch(fetchTodos());
    setTodos((prev) => ({
      ...prev,
      text: ''
    }));
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodos((prev) => ({
      ...prev,
      id: Math.random().toString(),
      state: false,
      text: e.target.value,
    }));
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="form-group d-flex justify-content-center mt-5 align-items-center">
          <input
            className="form-control w-50"
            type="text"
            placeholder="Enter the task!"
            value={todos.text}
            onChange={onChange}
            required
          />
          <button className="btn btn-primary mx-3 fw-bold" type="submit">Add Task</button>
        </div>
      </form>
    </>
  );
};

export default TodoForm;