import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {
    AddSubtasksFetch,
    ChangeCompletedTodoFetch,
    ChangeTodoDateFetch, DeleteTodoFetch,
} from "../store/todos";
import ButtonSecond from "../UI/ButtonSecond";
import SubtasksList from "./SubtasksList";
import dateCheck from "../tools/date";

const Todo = ({todo}) => {
    const dispatch = useDispatch()
    const [value, setValue] = useState(todo.completed)
    const [subtask, setSubtask] = useState('')
    const [wrong, setWrong] = useState('')
    const [date, setDate] = useState(todo.date)
    let [change, setChange] = useState(false)
    let [add, setAdd] = useState(false)
    let [add_date, setAdd_date] = useState(false)

    function changeCompleted() {
        setValue(!value)
        setDate(todo.date)
        setWrong('')
        dispatch(ChangeCompletedTodoFetch(todo))
    }

    function changeDate() {
        if (dateCheck(date)) {
            dispatch(ChangeTodoDateFetch({...todo, new_date: date}))
            setChange(false)
            setWrong('')
        } else {
            setWrong('this date has already passed')
            setTimeout(() => setWrong(''), 2000)
            setDate(todo.date)
        }
    }

    function addSubtaskTodo() {
        setDate(todo.date)
        setWrong('')
        if (subtask !== '') {
            dispatch(AddSubtasksFetch({...todo, subtask}))
            setSubtask('')
            setAdd(false)
        }
    }

    return (
        <div className={'main_todo_container'}>
            <div className={'todo_container'}>
                <div className={'todo container'}>
                    <h2
                        className={value ? 'completed' : 'not_completed'}>
                        {todo.title}
                    </h2>
                    <input
                        type="checkbox"
                        checked={value}
                        onChange={changeCompleted}
                        className={'completed_check'}/>
                </div>

                {todo.subtasks.length !== 0 &&
                    <div className={!value ? 'subtasks' : 'block_none'}>
                        {!value && <SubtasksList subtasks={todo.subtasks} todo_id={todo.id}/>}
                    </div>
                }

                <div className={!value ? 'todo_tools container' : 'block_none'}>
                    <div className={'date'}>
                        {todo.date &&
                            <div className={'date_container'}>
                                <span style={{width: '115px'}}>Done before </span>
                                <input
                                    type="date"
                                    disabled={!change}
                                    onChange={e => setDate(e.target.value)}
                                    value={date}/>
                            </div>}
                        {todo.date === '' &&
                            <div className={'date_container'}>
                                {!add_date &&
                                    <ButtonSecond func={() => setAdd_date(true)}>Add date</ButtonSecond>}
                                {add_date &&
                                    <div className={'add_date'}>
                                        <input
                                            type="date"
                                            onChange={e => setDate(e.target.value)}
                                            value={date}/>
                                        <ButtonSecond func={changeDate}>Add</ButtonSecond>
                                    </div>}
                            </div>
                        }
                        <span className={'wrong'}>{wrong}</span>
                    </div>
                        <div className={'subtask'}>
                            {!todo.completed &&
                                !add && <ButtonSecond func={() => {
                                    setAdd(!add)
                                }}>Add subtask</ButtonSecond>}
                            {add &&
                                <div className={'add_subtask'}>
                                    <input
                                        value={subtask}
                                        placeholder="Enter a subtask..."
                                        style={{width: '200px'}}
                                        onChange={e => setSubtask(e.target.value)}/>
                                    <ButtonSecond func={addSubtaskTodo} disabled={!subtask}>Add</ButtonSecond>
                                </div>}
                        </div>

                </div>
            </div>
            <button className={'delete'} onClick={() => dispatch(DeleteTodoFetch({id: todo.id}))}>
                Delete
            </button>
        </div>
    );
};

export default Todo;