import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

export const GetTodosFetch = createAsyncThunk('todos/FetchTodos',
    async function () {
        const response = await fetch('http://localhost:3000/todos')
        return await response.json()
    })

export const AddTodoFetch = createAsyncThunk(
    'todos/AddTodo',
    async function (arg, thunkAPI) {
        const response = await fetch('http://localhost:3000/todos', {
            method: "POST",
            body: JSON.stringify({
                id: Date.now().toString(),
                title: arg.title,
                completed: false,
                date: arg.date,
                subtasks: []
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(() => window.location.reload())
        thunkAPI.dispatch(addTodoStore([arg.title, arg.date]))


    }
)

export const ChangeCompletedTodoFetch = createAsyncThunk(
    'todos/ChangeCompletedTodoFetch',
    async function (arg, thunkAPI) {
        const response = await fetch(`http://localhost:3000/todos/${arg.id}`, {
            method: "PATCH",
            body: JSON.stringify({
                completed: !arg.completed,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        thunkAPI.dispatch(changeTodosCompleted(arg.id))
    }
)

export const ChangeCompletedSubtaskFetch = createAsyncThunk(
    'todos/ChangeCompletedSubtaskFetch',
    async function (arg, thunkAPI) {
        const response = fetch(`http://localhost:3000/todos/${arg.id}`,
            {
                method: "PATCH",
                body: JSON.stringify({
                    subtasks: arg.subtasks.map(subtask => subtask.id === arg.subtask_id ? {
                        ...subtask,
                        completed: !subtask.completed
                    } : subtask)
                })
            })
    }
)

export const AddSubtasksFetch = createAsyncThunk(
    'todos/AddSubtasksFetch',
    async function (arg, thunkAPI) {
        // const new_subtasks = arg.subtasks.slice().push(arg.subtask)
        const new_subtask = {
            id: Date.now().toString(),
            title: arg.subtask,
            completed: false
        }
        const response = await fetch(`http://localhost:3000/todos/${arg.id}`, {
            method: "PATCH",
            body: JSON.stringify({
                subtasks: [...arg.subtasks, new_subtask]
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        thunkAPI.dispatch(addSubtasks([arg.id, arg.subtask]))
    }
)

export const ChangeTodoDateFetch = createAsyncThunk(
    'todos/ChangeTodoDateFetch',
    async function (arg, thunkAPI) {
        const response = await fetch(`http://localhost:3000/todos/${arg.id}`,
            {
                method: "PATCH",
                body: JSON.stringify({
                    date: arg.new_date
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        thunkAPI.dispatch(changeTodosDate([arg.id, arg.new_date]))
    }
)

export const TodosSlice = createSlice({
    name: 'todos',
    initialState: {
        todos: [],
        todos_search: [],
        status: null,
        error: null,
        search: false
    },
    reducers: {
        addTodoStore: (state, action) => {
            const [title, date] = action.payload
            const todo = {
                id: Date.now().toString(),
                title: title,
                completed: false,
                date: date,
                subtasks: []
            }
            state.todos.push(todo)
        },
        changeTodosCompleted: (state, action) => {
            const [find_todo] = state.todos.filter((todo) => todo.id === action.payload)
            find_todo.completed = !find_todo.completed
        },
        changeTodosDate: (state, action) => {
            const [id, new_date] = action.payload
            const [find_todo] = state.todos.filter((todo) => todo.id === id)
            find_todo.date = new_date
            if (state.search) {
                const [find_todo_search] = state.todos_search.filter(todo => todo.id === id)
                find_todo_search.date = new_date
            }
        },
        addSubtasks: (state, action) => {
            const [todo_id, title_subtask] = action.payload
            const subtask = {
                id: Date.now().toString(),
                title: title_subtask,
                completed: false
            }
            let [find_todo] = state.todos.filter(todo => todo.id === todo_id)
            find_todo.subtasks.push(subtask)
            if (state.search) {
                let [find_todo_search] = state.todos_search.filter(todo => todo.id === todo_id)
                find_todo_search.subtasks.push(subtask)
            }
        },
        changeSubtaskCompleted: (state, action) => {
            const [todo_id, subtask_id] = action.payload
            let [find_todo] = state.todos.filter(todo => todo.id === todo_id)
            let [find_subtask] = find_todo.subtasks.filter(subtask => subtask.id === subtask_id)
            find_subtask.completed = !find_subtask.completed
            if (state.search) {
                let [find_todo_search] = state.todos_search.filter(todo => todo.id === todo_id)
                let [find_subtask_search] = find_todo_search.subtasks.filter(subtask => subtask.id === subtask_id)
                find_subtask_search.completed = !find_subtask_search.completed
            }
        },
        findText: (state, action) => {
            state.todos_search = state.todos.filter((todo) => todo.title.includes(action.payload))
            state.search = true
        },
        clear: (state) => {
            state.search = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(GetTodosFetch.fulfilled, (state, action) => {
                action.payload.map(post => state.todos.push(post))
            })
            .addCase(AddTodoFetch.rejected, (state, action) => {
                state.error = 'Error!!!'
            })
            .addCase(ChangeCompletedTodoFetch.fulfilled, (state, action) => {
                console.log('good')
            })
    }
})

export const TodosReducer = TodosSlice.reducer

export const {
    changeTodosCompleted,
    changeTodosDate,
    addSubtasks,
    changeSubtaskCompleted,
    findText,
    clear,
    addTodoStore
} = TodosSlice.actions