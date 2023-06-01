import { logout } from "../store/user.action.js"
import { LoginSignup } from "./login-signup.jsx"

const { Link, NavLink } = ReactRouterDOM
const { useSelector, useDispatch } = ReactRedux
const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouterDOM

export function AppHeader() {

    const dispatch = useDispatch()
    const user = useSelector(storeState => storeState.userModule.loggedinUser)
    const todos = useSelector(storeState => storeState.todosModule.todos)
    const [doneTodos, setDoneTodos] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const doneTodos = todos.filter(todo => todo.isDone)
        setDoneTodos(doneTodos)
    }, [todos])

    function calculatePercentage() {
        const percentage = (doneTodos.length / todos.length) * 100
        return percentage.toFixed(2)
    }

    function onLogout() {
        logout()
            .then(navigate('/'))
    }

    return <header className="app-header full main-layout">
        <div className="main-header-content flex space-between align-center">
            <Link to="/">
                <h2>TodosApp</h2>
            </Link>

            {user && <section className="user-info flex align-center">
                <p> {user.fullname} <span> ${user.balance.toLocaleString()} </span> </p>
                <button onClick={onLogout}> Logout </button>
            </section>}

            {!user && <section className="user-info flex align-center">
                <LoginSignup dispatch={dispatch} />
            </section>}

            {user && <section className="progress-bar">
                {!!todos.length && <span> You have done {calculatePercentage()}% Todos </span>}
            </section>}

            <nav className="flex align-items">
                <NavLink to="/"> Home </NavLink>
                <NavLink to="/todos"> Todos </NavLink>
                {user && <NavLink to={`/profile/${user._id}`}> Profile </NavLink>}
                <NavLink to="/about"> About </NavLink>
            </nav>
        </div>
    </header>
}
