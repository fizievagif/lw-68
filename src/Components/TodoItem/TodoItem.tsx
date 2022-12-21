import React from 'react';
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../app/store";
import {completeTodos, fetchTodos, removeTodos} from "../../Containers/todoSlice";

interface Props {
  id: string;
  text: string;
  complete: boolean;
}

const TodoItem: React.FC<Props> = ({id, text, complete}) => {
  const dispatch: AppDispatch = useDispatch();

  const isCompleteOrNot = async (e: React.ChangeEvent<HTMLInputElement>) => {
    await dispatch(completeTodos({id, text, state: e.target.checked}));
    await dispatch(fetchTodos());
  };

  const onRemove = async () => {
    if (window.confirm('Are you sure?')) {
      await dispatch(removeTodos(id));
      await dispatch(fetchTodos());
    }
  };

  return (
    <div className="card mb-2 w-50 mx-auto mt-5 p-2">
      <p><b>TodoApp:</b> {text}</p>

      <div className="d-flex align-items-center justify-content-between">
        <div className="form-check ">
          <label className="form-check-label">{complete ? 'Complete!' : 'You have to do this task'}</label>
          <input
            id={id}
            className="form-check-input"
            onChange={isCompleteOrNot}
            name="status"
            type="checkbox"
            checked={complete}/>
        </div>

        <button onClick={() => onRemove()} className="btn btn-warning">Remove</button>
      </div>
    </div>
  );
};

export default TodoItem;