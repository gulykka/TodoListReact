import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {ChangeCompletedSubtaskFetch, changeSubtaskCompleted} from "../store/todos";

const Subtask = ({subtask, todo_id}) => {
    const [completed, setCompleted] = useState(subtask.completed)
    const dispatch = useDispatch()

    function changeCompleted() {
        dispatch(ChangeCompletedSubtaskFetch({id: todo_id, subtask: subtask.id}))
        setCompleted(!completed)
    }
    return (
        <div className={'subtask'}>
            <input
                checked={completed}
                type="checkbox"
                onChange={changeCompleted}

            />
            <p className={completed ? 'completed' : 'not_completed'}>{subtask.title}</p>
        </div>
    );
};

export default Subtask;