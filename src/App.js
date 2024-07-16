import './App.sass';
import TodoList from "./todos/TodoList";
import Header from "./Header";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {GetTodosFetch} from "./store/todos";
import Tools from "./tools/Tools";
import Footer from "./Footer";

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
                    <Tools/>
                {useSelector(state => state.todos.error)}
                {!loading && <h1 style={{alignSelf:'center'}}>Loading...</h1>}
                {loading && <TodoList/>}
            </div>
            <Footer/>
        </div>
    )
}

export default App;
