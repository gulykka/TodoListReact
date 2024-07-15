import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {ChangeCompletedSubtaskFetch, changeSubtaskCompleted} from "../store/todos";

const Subtask = ({subtask, todo_id, subtasks}) => {
    const [completed, setCompleted] = useState(subtask.completed)
    const dispatch = useDispatch()

    function changeCompleted() {
        dispatch(ChangeCompletedSubtaskFetch({subtasks, id: todo_id, subtask_id: subtask.id}))
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