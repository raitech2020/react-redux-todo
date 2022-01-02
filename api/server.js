const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')
const cors = require('cors')
const {json} = require('body-parser')
const {nanoid} = require('nanoid')

dotenv.config({
    path: './config.env'
})

const app = express()
const port = 8000

app.use(cors())
app.use(json())

let todos = [
    {
        id: nanoid(),
        title: 'todo 1',
        completed: true,
    },
    {
        id: nanoid(),
        title: 'todo 2',
        completed: false,
    },
    {
        id: nanoid(),
        title: 'todo 3',
        completed: false,
    },
    {
        id: nanoid(),
        title: 'todo 4',
        completed: false,
    },
    {
        id: nanoid(),
        title: 'todo 5',
        completed: false,
    },
]

app.get('/', (req, res) => {
    res.send('Rabia\'s Server')
})

app.get('/todos', (req, res) => {
    res.send(todos)
})

app.post("/todos", (req, res) => {
    const todo = {
        id: nanoid(),
        title: req.body.title,
        completed: false,
    }
    todos.push(todo)
    res.send(todo)
})

app.patch("/todos/:id", (req, res) => {
    const id = req.params.id
    const index = todos.findIndex(todo => todo.id === id)
    const completed = Boolean(req.body.completed)
    if (index >= 0) {
        todos[index].completed = completed
    }
    res.send(todos[index])
})

app.delete("/todos/:id", (req, res) => {
    const id = req.params.id
    const index = todos.findIndex(todo => todo.id === id)
    if (index >= 0) {
        todos.splice(index, 1)
    }
    res.send(todos)
})

app.listen(port, () => {
    console.log(`server listening on ${port}`.green.bold)
})
