import { todosReducer } from "./todos.reducer.js"
import { userReducer } from "./user.reducer.js"

const { createStore, combineReducers } = Redux

const rootReducer = combineReducers({
    todosModule: todosReducer,
    userModule: userReducer
})



const middleware = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
export const store = createStore(rootReducer, middleware)


// For debug
store.subscribe(() => {
    console.log('Current state is:', store.getState())
})