import { TodosReducer  }  from './todos'
import {configureStore} from "@reduxjs/toolkit";


export const store = configureStore({
    reducer: {
        todos: TodosReducer
    }
})