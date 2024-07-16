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
            console.log({...todo, subtask})
            setSubtask('')
            setAdd(false)
        }
    }

    return (
        <div className={'main_todo_container'}>
            <div className={'todo_container'}>
                <div className={'todo'}>
                    <div className={'todo_and_date'}>
                        <p
                            className={value ? 'completed' : 'not_completed'}
                            style={{fontWeight: '500'}}>
                            {todo.title}
                        </p>
                        {todo.date && !todo.completed &&
                            <div className={'date_container'}>
                                <p>Done before </p>
                                <input
                                    type="date"
                                    disabled={!change}
                                    onChange={e => setDate(e.target.value)}
                                    value={date}/>
                                {!change && <ButtonSecond func={() => setChange(true)}>Change date</ButtonSecond>}
                                {change && <ButtonSecond func={changeDate}>Change</ButtonSecond>}
                                <p className={'wrong'}>{wrong}</p>
                            </div>}
                    </div>

                    <div className={'todo_input'}>

                        {!add_date && !todo.completed && todo.date === '' &&
                            <ButtonSecond func={() => setAdd_date(true)}>Add date</ButtonSecond>}
                        {add_date && !todo.completed && todo.date === '' &&
                            <div className={'add_date'}>
                                <input
                                    type="date"
                                    onChange={e => setDate(e.target.value)}
                                    value={date}/>
                                <ButtonSecond func={changeDate}>Add</ButtonSecond>
                            </div>}
                        {!todo.completed &&
                            !add && <ButtonSecond func={() => {
                                setAdd(!add)
                            }}>Add subtask</ButtonSecond>}
                        {!todo.completed &&
                            add && <ButtonSecond func={() => {
                                setAdd(!add)
                                setSubtask('')
                            }}>Cancel</ButtonSecond>}
                        {!todo.completed && add &&
                            <div className={'date_container'}>
                                <input
                                    value={subtask}
                                    placeholder="Enter a subtask..."
                                    onChange={e => setSubtask(e.target.value)}/>
                                <ButtonSecond func={addSubtaskTodo} disabled={!subtask}>Add</ButtonSecond>
                            </div>}
                        <input
                            type="checkbox"
                            checked={value}
                            onChange={changeCompleted}
                            className={'completed_check'}/>
                    </div>
                </div>

                {!value && <SubtasksList subtasks={todo.subtasks} todo_id={todo.id}/>}
            </div>
            <button className={'delete'} onClick={() => dispatch(DeleteTodoFetch({id: todo.id}))}>
                Delete
            </button>
        </div>
    );
};

export default Todo;