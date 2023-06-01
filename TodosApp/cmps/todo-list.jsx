const { Link, NavLink } = ReactRouterDOM

import { TodoPreview } from "./todo-preview.jsx";


export function TodoList({ todos, onRemoveTodo }) {


    return (
        <ul className="todos-list">
            {todos.map(todo =>
                <li key={todo._id} className="todo flex align-center">
                    <TodoPreview todo={todo} />
                    <section className="btns-list-container flex align-center">
                        <button onClick={() => onRemoveTodo(todo._id)} className="btn-remove"> Remove </button>
                        <Link to={`/todos/edit/${todo._id}`}> <button className="btn-edit"> Edit </button> </Link>
                        <Link to={`/todos/${todo._id}`}> <button className="btn-details"> Details </button> </Link>
                    </section>
                </li>
            )}
        </ul>
    )
}