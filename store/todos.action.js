import { todosService } from "../services/todos.service.js"
import { store } from '../store/store.js'
import { ADD_TODO, FILTER_TODOS, REMOVE_TODO, SET_IS_LOADING, SET_TODOS, SORT_TODOS, UPDATE_TODO } from '../store/todos.reducer.js'



export function loadTodos(filterBy = {}, sortBy = {}) {
    return todosService.query(filterBy, sortBy)
        .then((todos) => {
            store.dispatch({ type: SET_TODOS, todos })
        })
        .catch((err) => {
            console.log('todo action -> Cannot load todos', err);
            throw err
        })
        .finally(() => store.dispatch({ type: SET_IS_LOADING, isLoading: false }))
}

export function removeTodo(todoId) {
    return todosService.remove(todoId)
        .then(() => {
            store.dispatch({ type: REMOVE_TODO, todoId })
        })
        .catch(err => {
            console.log('todo action -> Cannot remove todo', err)
            throw err
        })
}

export function saveTodo(todo) {
    const type = todo._id ? UPDATE_TODO : ADD_TODO
    return todosService.save(todo)
        .then(savedTodo => {
            store.dispatch({ type, todo: savedTodo })
            return savedTodo
        })
        .catch(err => {
            console.log('todo action -> Cannot save todo', err)
            throw err
        })
}

export function setFilterBy(filterBy) {
    store.dispatch({ type: FILTER_TODOS, filterBy })
}

export function setSortBy(sortBy) {
    store.dispatch({ type: SORT_TODOS, sortBy })
}
