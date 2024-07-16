import React, {useEffect} from 'react';
import './todo_list.sass'
import {useSelector} from "react-redux";
import Todo from "./Todo";

const TodoList = () => {
    const posts_search = useSelector(state => state.todos.todos_search)
    const posts = useSelector(state => state.todos.todos)
    const search = useSelector(state => state.todos.search)
    const todos = useSelector(state => state.todos.sort) ? posts : [...posts].reverse()
    const todos_search = [...posts_search].reverse()


    return (
        <div className={'todos_container'}>

            {!search && todos.map((todo) => {
                return (
                    <Todo key={todo.id} todo={todo}/>
                )
            })}
            {search && todos_search.map((todo) => {
                return (
                    <Todo key={todo.id} todo={todo}/>
                )
            })}
            {search && todos_search.length === 0  && <h1 style={{alignSelf: 'center'}}>nothing found</h1>}
        </div>
    );
};

export default TodoList;