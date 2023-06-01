import { storageService } from './async-storage.service.js'
import { userService } from './user.service.js'
import { localStorageService } from './storage.service.js'

const STORAGE_KEY = 'todosDB'

export const todosService = {
    query,
    getById,
    save,
    remove,
    getEmptyTodo,
    getDefaultFilter,
    getDefaultSort,
}


_createDB()


function query(filterBy = {}, sortBy = {}) {
    // return axios.get(BASE_URL).then(res => res.data)
    return storageService.query(STORAGE_KEY)
        .then(todos => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                todos = todos.filter(todo => regExp.test(todo.txt))
            }

            if (filterBy.isDone) {
                todos = todos.filter(todo => todo.isDone === true)
            } else {
                if (filterBy.isDone === false) {
                    todos = todos.filter(todo => todo.isDone === false)
                }
            }

            if (sortBy.type && sortBy.type !== 'txt') {
                todos = todos.sort((todo1, todo2) => (sortBy.desc) * (todo2[sortBy.type] - todo1[sortBy.type]))
            } else if (sortBy.type && sortBy.type === 'txt') {
                todos = todos.sort((todo1, todo2) => (sortBy.desc) * (todo1[sortBy.type].localeCompare(todo2[sortBy.type])))
            }

            return todos
        })
}
function getById(todoId) {
    return storageService.get(STORAGE_KEY, todoId)
}
function remove(todoId) {
    // return Promise.reject('Not now!')
    return storageService.remove(STORAGE_KEY, todoId)
}
function save(todo) {
    if (todo._id) {
        return storageService.put(STORAGE_KEY, todo)
    } else {
        // when switching to backend - remove the next line
        todo.owner = userService.getLoggedinUser()
        return storageService.post(STORAGE_KEY, todo)
    }
}

function getEmptyTodo() {
    return {
        txt: '',
        isDone: false,
        importance: 1,
        createdAt: Date.now(),
    }
}

function getDefaultFilter(searchParams = { get: () => { } }) {
    return {
        txt: searchParams.get('txt') || '',
        isDone: null,
    }
}

function getDefaultSort() {
    return {
        type: '',
        desc: 1
    }
}

function _createDB() {
    const localStorage = localStorageService.loadFromStorage(STORAGE_KEY)
    if (!localStorage) localStorageService.saveToStorage(STORAGE_KEY, [])
}