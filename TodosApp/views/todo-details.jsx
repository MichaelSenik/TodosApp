import { todosService } from "../services/todos.service.js"

const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM


export function TodoDetails() {

    const [todo, setTodo] = useState(null)
    const { todoId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadTodo()
    }, [todo])

    function loadTodo() {
        todosService.getById(todoId)
            .then(setTodo)
            .catch((err) => {
                console.log('Had issue in Todo details:', err)
                navigate('/todos')
            })
    }

    function onBack() {
        navigate('/todos')
    }

    if (!todo) return <div>Loading...</div>

    return (
        <section className="todo-details">
            <h1> My Todo </h1>
            <div className="todo-content flex align-center">
                <h2>{todo.txt}</h2>
                <p>{todo.isDone ? 'Done' : 'Undone'}</p>
            </div>
            <button onClick={onBack}>Back</button>
        </section>
    )
}