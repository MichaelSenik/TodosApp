const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter
const { Provider } = ReactRedux

import { AppFooter } from "./cmps/app-footer.jsx"
import { AppHeader } from "./cmps/app-header.jsx"
import { UserMsg } from "./cmps/user-msg.jsx"
import { store } from "./store/store.js"
import { About } from "./views/about.jsx"
import { Home } from "./views/home.jsx"
import { TodoDetails } from "./views/todo-details.jsx"
import { TodoEdit } from "./views/todo-edit.jsx"
import { TodosIndex } from "./views/todos-index.jsx"
import { UserProfile } from "./views/user-profile.jsx"



export function App() {

    return (
        <Provider store={store}>
            <Router>
                <section className="todos-app main-layout">
                    <AppHeader />
                    <main className="main-app main-layout full">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/todos" element={<TodosIndex />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/todos/:todoId" element={<TodoDetails />} />
                            <Route path="/todos/edit" element={<TodoEdit />} />
                            <Route path="/todos/edit/:todoId" element={<TodoEdit />} />
                            <Route path="/profile/:userId" element={<UserProfile />} />
                        </Routes>
                    </main>
                    <AppFooter />
                    <UserMsg />
                </section>
            </Router>
        </Provider>
    )
}
