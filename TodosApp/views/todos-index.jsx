const { useEffect, useRef } = React
const { Link } = ReactRouterDOM
const { useSelector, useDispatch } = ReactRedux


import { loadTodos, removeTodo, setFilterBy, setSortBy } from "../store/todos.action.js"
import { TodoList } from "../cmps/todo-list.jsx"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { TodoFilter } from "../cmps/todo-filter.jsx"
import { addActivity } from "../store/user.action.js"
import { TodoSort } from "../cmps/todo-sort.jsx"

export function TodosIndex() {
    const dispatch = useDispatch()
    const todos = useSelector(storeState => storeState.todosModule.todos)
    const filterBy = useSelector(storeState => storeState.todosModule.filterBy)
    const sortBy = useSelector(storeState => storeState.todosModule.sortBy)
    const user = useSelector(storeState => storeState.userModule.loggedinUser)
    const isLoading = useSelector(storeState => storeState.todosModule.isLoading)
    const todosContainerRef = useRef()

    useEffect(() => {
        if (!user) return
        todosContainerRef.current.style.backgroundColor = user.prefs['bg-color']
        todosContainerRef.current.style.color = user.prefs.color
    }, [])

    useEffect(() => {
        loadTodos(filterBy, sortBy)
    }, [filterBy, sortBy])

    function onRemoveTodo(todoId) {
        removeTodo(todoId)
            .then(() => {
                const todo = todos.find(todo => todo._id === todoId)
                addActivity({ txt: `Removed the Todo: '${todo.txt}'`, at: Date.now() })
                showSuccessMsg(`Todo '${todoId}' removed`)
            })
            .catch(err => {
                showErrorMsg('Cannot remove todo')
            })
    }

    function onSetFilterBy(filterBy) {
        setFilterBy(filterBy)
    }

    function onSetSortBy(sortBy) {
        setSortBy(sortBy)
    }

    return (
        <section className="todos-container full main-layout" ref={todosContainerRef}>
            <div className="my-todos">
                <h1>My Todos</h1>
                {user && <Link to="/todos/edit"> <button className="btn-add-todo"> Add Todo </button> </Link>}
                <TodoFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} sortBy={sortBy} onSetSortBy={onSetSortBy} />
                {isLoading && <h3> Loading ... </h3>}
                {!isLoading && < hr />}
                {!isLoading && !todos.length && <h3> No Todos to show ... </h3>}
                {!!todos.length && <TodoList todos={todos} onRemoveTodo={onRemoveTodo} />}
            </div>
        </section>
    )
}