import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const getTodoAsync = createAsyncThunk(
    "todos/getTodoAsync",
    async () => {
        const response = await fetch("http://localhost:8000/todos")
        if (response.ok) {
            const todos = await response.json()
            // return an action object
            return {
                todos: todos
            }
        }
    }
)

export const addTodoAsync = createAsyncThunk(
    "todos/addTodoAsync",
    async (payload) => {
        const response = await fetch("http://localhost:8000/todos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({title: payload.title})
        })

        if (response.ok) {
            const todo = await response.json()
            return {
                todo: todo
            }
        }
    }
)

export const toggleCompleteAsync = createAsyncThunk(
    "todos/toggleCompleteAsync",
    async (payload) => {
        const response = await fetch(`http://localhost:8000/todos/${payload.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                completed: payload.completed
            })
        })
        if (response.ok) {
            const todo = await response.json()
            // return action
            return {id: todo.id, completed: todo.completed}
        }
    }
)

export const deleteTodoAsync = createAsyncThunk(
    "todos/deleteTodoAsync",
    async (payload) => {
        const response = await fetch(`http://localhost:8000/todos/${payload.id}`, {
            method: 'DELETE',
        })
        if (response.ok) {
            return {id: payload.id}
        }
    }
)

const todoSlice = createSlice({
    name: "todos",
    initialState: [
        {id: 1, title: 'todo1', completed: false},
        {id: 2, title: 'todo2', completed: false},
        {id: 3, title: 'todo3', completed: true},
    ],
    reducers: {
        addTodo: (state, action) => {
            const newTodo = {
                id: Date.now(),
                title: action.payload.title,
                completed: false
            }
            state.push(newTodo)
        },
        toggleComplete: (state, action) => {
            // find index
            const index = state.findIndex((todo) => todo.id === action.payload.id)
            // update state
            state[index].completed = action.payload.completed
        },
        deleteTodo: (state, action) => {
            return state.filter((todo) => todo.id !== action.payload.id)
        }
    },
    extraReducers: {
        [getTodoAsync.pending]: (state, action) => {
        },
        [getTodoAsync.fulfilled]: (state, action) => {
            return action.payload.todos
        },
        [getTodoAsync.rejected]: (state, action) => {
        },
        [addTodoAsync.pending]: (state, action) => {
        },
        [addTodoAsync.fulfilled]: (state, action) => {
            state.push(action.payload.todo)
        },
        [addTodoAsync.rejected]: (state, action) => {
        },
        [toggleCompleteAsync.fulfilled]: (state, action) => {
            // find index
            const index = state.findIndex((todo) => todo.id === action.payload.id)
            // update state
            state[index].completed = action.payload.completed
        },
        [deleteTodoAsync.fulfilled]: (state, action) => {
            return state.filter(todo => todo.id !== action.payload.id)
        }
    }
})

export const {addTodo, toggleComplete, deleteTodo} = todoSlice.actions
export default todoSlice.reducer
