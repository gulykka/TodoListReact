import React, {useState} from 'react';
import Button from "../UI/Button";
import './tools.sass'
import {useDispatch} from "react-redux";
import {clear, findText} from "../store/todos";

const Search = () => {
    const [text, setText] = useState('')
    const dispatch = useDispatch()
    function findTodo() {
        dispatch(findText(text))
    }
    function clearInput() {
        setText('')
        dispatch(clear())
    }
    return (
        <div>
            {
                <div className={'search'}>
                    <input value={text} onChange={event => setText(event.target.value)} placeholder="Search"/>
                    <Button disabled={!text} clickFunc={findTodo}>Find</Button>
                    <Button disabled={!text} clickFunc={clearInput}>Clear</Button>
                </div>
            }



        </div>
    );
};

export default Search;