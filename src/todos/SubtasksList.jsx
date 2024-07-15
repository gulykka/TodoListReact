import React from 'react';
import Subtask from "./Subtask";

const SubtasksList = ({subtasks, todo_id}) => {
    return (
        <div className={'subtasks'}>
            {subtasks &&
                subtasks.map((subtask) => <Subtask key={subtask.id} subtask={subtask} todo_id={todo_id}/>)
            }
        </div>
    );
};

export default SubtasksList;