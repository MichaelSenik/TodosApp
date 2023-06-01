const { useSelector, useDispatch } = ReactRedux
const { useState, useEffect } = React


export function AppFooter() {

    const user = useSelector(storeState => storeState.userModule.loggedinUser)
    const todos = useSelector(storeState => storeState.todosModule.todos)
    const [doneTodos, setDoneTodos] = useState([])

    useEffect(() => {
        const doneTodos = todos.filter(todo => todo.isDone)
        setDoneTodos(doneTodos)
    }, [todos])

    function calculatePercentage() {
        const percentage = (doneTodos.length / todos.length) * 100
        return percentage.toFixed(2)
    }


    return (
        <footer className="app-footer full flex column justify-center align-center">
            {user && <section className="progress-bar">
                {!!todos.length && <span> You have done {calculatePercentage()}% Todos </span>}
            </section>}
            <h3> TodosApp </h3>
            <p> CoffeeRights 2023 | By Michael Senik </p>
        </footer>
    )
}