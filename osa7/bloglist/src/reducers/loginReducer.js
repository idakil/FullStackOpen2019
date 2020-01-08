import loginService from '../services/login'
import blogService from '../services/blogs'
import { showNotification } from './notificationReducer'

const userReducer = (state = {}, action) => {
    switch (action.type) {
    case 'LOGIN':
        return action.user
    case 'LOGOUT':
        return {}
    default:
        return state
    }
}

export const logout = () => {
    window.localStorage.clear()
    return async dispatch => {
        dispatch({
            type: 'LOGOUT',
            user: {}
        })
    }
}

export const initializeUser = () => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    let user = JSON.parse(loggedUserJSON)
    if(user) {
        blogService.setToken(user.token)
    }

    return async dispatch => {
        dispatch({
            type: 'LOGIN',
            user: user
        })
    }
}

export const login = (credentials) => {
    return async dispatch => {
        let user = await loginService.login(credentials)
        if (user) {
            window.localStorage.setItem(
                'loggedUser', JSON.stringify(user)
            )
            blogService.setToken(user.token)
            dispatch(showNotification('logged in', false, 2))
        } else {
            user = {}
            dispatch(showNotification('logging in failed', true, 2))

        }
        dispatch({
            type: 'LOGIN',
            user: user
        })
    }
}

export default userReducer