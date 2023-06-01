import { showSuccessMsg } from "../services/event-bus.service.js"
import { todosService } from "../services/todos.service.js"
import { saveTodo } from "../store/todos.action.js"
import { addActivity } from "../store/user.action.js"

const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouterDOM

export function TodoEdit() {

    const [todoToEdit, setTodoToEdit] = useState(todosService.getEmptyTodo())
    const { todoId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (todoId) loadTodo()
    }, [])

    function loadTodo() {
        todosService.getById(todoId)
            .then(setTodoToEdit)
            .catch(err => {
                console.log('Had issued in todo edit:', err);
                navigate('/todos')
                showErrorMsg('Todo not found!')
            })
    }

    function handleChange({ target }) {
        const field = target.name
        const value = target.type === 'number' ? (+target.value || '') : target.value
        setTodoToEdit(prevTodoToEdit => ({ ...prevTodoToEdit, [field]: value }))
    }

    function onSaveTodo(ev) {
        ev.preventDefault()

        if (todoToEdit._id) addActivity({ txt: `Updated the Todo: '${todoToEdit.txt}'`, at: Date.now() })
        else addActivity({ txt: `Added a Todo: ${todoToEdit.txt}`, at: Date.now() })

        saveTodo(todoToEdit)
            .then((savedTodo) => {
                navigate('/todos')
                showSuccessMsg(`Todo '${savedTodo._id}' saved!`)
            })
    }

    const { txt } = todoToEdit

    return (
        <section className="todo-edit">
            <h2>Save Todo</h2>

            <form onSubmit={onSaveTodo}>
                <input required onChange={handleChange} value={txt} type="text" name="txt" id="txt" placeholder="Enter your todo" />
                <button> Save </button>
            </form>
            <button onClick={() => navigate('/todos')}> Back </button>

        </section>
    )
}