import React, {useState} from 'react';
import {TodosItem} from "../../types";

const TodoForm = () => {
  const [todos, setTodos] = useState<TodosItem>({
    state: false,
    text: '',
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTodos((prev) => ({
      ...prev,
      text: ''
    }));
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    setTodos((prev) => ({
      ...prev,
      [name]: value
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