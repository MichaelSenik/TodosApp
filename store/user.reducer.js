import { userService } from "../services/user.service.js"

// USER
export const SET_USER = 'SET_USER'
export const SET_USER_BALANCE = 'SET_USER_BALANCE'
export const SET_USER_ACTIVITIES = 'SET_USER_ACTIVITIES'
export const SET_USER_PREF = 'SET_USER_PREF'


const initialState = {
    loggedinUser: userService.getLoggedinUser(),
}

export function userReducer(state = initialState, action) {

    switch (action.type) {
        // USER
        case SET_USER:
            return { ...state, loggedinUser: action.user }
        case SET_USER_BALANCE:
            const user = { ...state.loggedinUser, balance: action.newBalance }
            return { ...state, loggedinUser: user }
        case SET_USER_ACTIVITIES:
            const updatedUser = { ...state.loggedinUser, activities: [...state.loggedinUser.activities, action.newActivity] }
            return { ...state, loggedinUser: updatedUser }
        case SET_USER_PREF:
            const updatedPrefUser = {
                ...state.loggedinUser,
                fullname: action.newPrefs.fullname,
                prefs: action.newPrefs
            }
            return { ...state, loggedinUser: updatedPrefUser }

        // DEFAULT
        default:
            return state
    }
}