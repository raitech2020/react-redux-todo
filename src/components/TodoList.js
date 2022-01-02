import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import TodoItem from "./TodoItem";
import {getTodoAsync} from "../redux/todoSlice";

const TodoList = () => {
    const dispatch = useDispatch()
    const todos = useSelector((state) => state.todos)

    useEffect(() => {
        dispatch(getTodoAsync())
    }, [dispatch])

    return (
        <ul className='list-group'>
            {todos.map((todo) => (
                <TodoItem key={todo.id}
                          id={todo.id}
                          title={todo.title}
                          completed={todo.completed}
                />
            ))}
        </ul>
    )
}

export default TodoList
