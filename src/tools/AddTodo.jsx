import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {AddTodoFetch} from "../store/todos";
import Button from "../UI/Button";
import dateCheck from "./date";


const AddTodo = () => {
    const [title, setTitle] = useState('')
    const [date, setDate] = useState('')
    let [wrong, setWrong] = useState('')
    const dispatch = useDispatch()

    function addTodo() {
        if (dateCheck(date)) {
            dispatch(AddTodoFetch({title, date}))
            setTitle('')
            setDate('')
            setWrong('')
        } else {
            setWrong('this date has already passed')
            setTimeout(() => setWrong(''), 2000)
        }
    }

    return (
        <div className={'add_todo_form'}>
            <h3 style={{alignSelf:'center'}}>Add new todo!!!</h3>
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a todo..."/>
            <input
                value={date}
                onChange={(e) => setDate(e.target.value)}
                type="date"/>
            <Button clickFunc={addTodo} disabled={title === ''}>Add</Button>
            <p className={'wrong'}>{wrong}</p>
        </div>
    );
};

export default AddTodo;