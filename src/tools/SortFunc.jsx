import React, {useState} from 'react';
import Button from "../UI/Button";
import {useDispatch} from "react-redux";
import {sortTodos} from "../store/todos";

const SortFunc = () => {
    const dispatch = useDispatch()
    const [chosenOption, setChosenOption] = useState('')

    function sortBy() {
        dispatch(sortTodos(chosenOption))
    }
    return (
        <div className={'sort'}>
            <span>Sort by</span>
            <select
                value={chosenOption}
                onChange={event => setChosenOption(event.target.value)}
            >
                <option disabled={true}></option>
                <option value={'id'}>date create</option>
                <option value={'date'}>date</option>
                <option value={'title'}>title</option>
                <option value={'completed'}>completed</option>
            </select>
            <Button clickFunc={sortBy}>sort</Button>
        </div>
    );
};

export default SortFunc;