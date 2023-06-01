import { userService } from '../services/user.service.js'
import { store } from '../store/store.js'
import { SET_USER, SET_USER_BALANCE, SET_USER_ACTIVITIES, SET_USER_PREF } from '../store/user.reducer.js'

export function login(credentials) {
    return userService.login(credentials)
        .then(user => {
            store.dispatch({ type: SET_USER, user })
            return user
        })
        .catch(err => {
            console.error('Cannot login:', err)
            throw err
        })
}

export function signup(credentials) {
    return userService.signup(credentials)
        .then(user => {
            store.dispatch({ type: SET_USER, user })
            return user
        })
        .catch(err => {
            console.error('Cannot signup:', err)
            throw err
        })
}

export function logout() {
    return userService.logout()
        .then(() => {
            store.dispatch({ type: SET_USER, user: null })
        })
        .catch(err => {
            console.error('Cannot logout:', err)
            throw err
        })
}

export function checkout(diff) {
    return userService.updateBalance(diff)
        .then((newBalance) => {
            store.dispatch({ type: SET_USER_BALANCE, newBalance })
            // store.dispatch({ type: CLEAR_CART })
        })
        .catch(err => {
            console.error('Cannot logout:', err)
            throw err
        })
}

export function addActivity(activity) {
    return userService.addActivity(activity)
        .then((newActivity) => {
            store.dispatch({ type: SET_USER_ACTIVITIES, newActivity })
        })
        .catch(err => {
            console.error('Cannot add activity:', err)
            throw err
        })
}

export function updateUserPrefs(prefs) {
    return userService.updateUserPrefs(prefs)
        .then((newPrefs) => {
            store.dispatch({ type: SET_USER_PREF, newPrefs })
        })
        .catch(err => {
            console.error('Cannot update prefs:', err)
            throw err
        })
}