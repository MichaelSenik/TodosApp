import { todosService } from "../services/todos.service.js"

// TODOS
export const SET_TODOS = 'SET_TODOS'
export const REMOVE_TODO = 'REMOVE_TODO'
export const ADD_TODO = 'ADD_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'
export const SET_IS_LOADING = 'SET_IS_LOADING'

// FILTER
export const FILTER_TODOS = 'FILTER_TODOS'

// SORT
export const SORT_TODOS = 'SORT_TODOS'

const initialState = {
    todos: [],
    filterBy: todosService.getDefaultFilter(),
    sortBy: todosService.getDefaultSort(),
    isLoading: true,
}

export function todosReducer(state = initialState, action) {

    let todos

    switch (action.type) {
        // TODOS
        case SET_TODOS:
            return { ...state, todos: action.todos }
        case REMOVE_TODO:
            todos = state.todos.filter(todo => todo._id !== action.todoId)
            return { ...state, todos }
        case ADD_TODO:
            todos = [...state.todos, action.todo]
            return { ...state, todos }
        case UPDATE_TODO:
            todos = state.todos.map(todo => todo._id === action.todo._id ? action.todo : todo)
            return { ...state, todos }
        case FILTER_TODOS:
            return { ...state, filterBy: action.filterBy }
        case SORT_TODOS:
            return { ...state, sortBy: action.sortBy }
        case SET_IS_LOADING:
            return { ...state, isLoading: action.isLoading }

        // DEFAULT
        default:
            return state
    }
}