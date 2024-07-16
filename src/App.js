import logo from './logo.svg';
import './App.sass';
import Square from "./board/Square";
import Board from "./board/Board";
import TodoList from "./todos/TodoList";
import Header from "./Header";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {GetTodosFetch} from "./store/todos";
import AddTodo from "./tools/AddTodo";
import Tools from "./tools/Tools";

function App() {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        dispatch(GetTodosFetch()).then(() => setLoading(true))
    }, [])

    return (
        <div className={'App'}>
            <Header/>
            <div className={'body'}>
                <div className={'navbar'}>
                    <AddTodo/>
                    <Tools/>
                </div>
                {!loading && <h1 style={{alignSelf:'center'}}>Loading...</h1>}
                {loading && <TodoList/>}
            </div>

        </div>
    )
}

export default App;
