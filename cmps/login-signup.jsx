
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { userService } from '../services/user.service.js'
import { SET_USER } from '../store/user.reducer.js'

const { useState, useEffect } = React

function getEmptyCredentials() {
    return {
        fullname: '',
        username: 'muki',
        password: 'muki1',
    }
}

export function LoginSignup({ dispatch }) {

    const [credentials, setCredentials] = useState(getEmptyCredentials())
    const [isSignupState, setIsSignupState] = useState(false)

    function handleCredentialsChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        const updatedCredentials = { ...credentials, [field]: value }
        setCredentials(updatedCredentials)
    }

    function onSubmit(ev) {
        ev.preventDefault()
        const method = isSignupState ? 'signup' : 'login'
        return userService[method](credentials)
            .then((user) => {
                showSuccessMsg(`Welcome ${user.fullname}`)
                dispatch({ type: SET_USER, user })
            })
            .catch(err => {
                showErrorMsg('OOps try again')
            })
    }

    function onToggleSignupState() {
        setIsSignupState(!isSignupState)
    }

    const { username, password, fullname } = credentials

    return (
        <div className="login-page">

            <form className="login-form" onSubmit={onSubmit}>
                <input
                    type="text"
                    name="username"
                    value={username}
                    placeholder="Username"
                    onChange={handleCredentialsChange}
                    required
                    autoFocus
                />

                <input
                    type="password"
                    name="password"
                    value={password}
                    placeholder="Password"
                    onChange={handleCredentialsChange}
                    required
                />

                {isSignupState && <input
                    type="text"
                    name="fullname"
                    value={fullname}
                    placeholder="Full name"
                    onChange={handleCredentialsChange}
                    required
                />}

                <button>{isSignupState ? 'Signup' : 'Login'}</button>
            </form>

            <div className="btns">
                <a href="#" onClick={onToggleSignupState}>
                    {isSignupState ? 'Already a member? Login' : 'New user? Signup here'}
                </a >
            </div>
        </div >
    )
}

