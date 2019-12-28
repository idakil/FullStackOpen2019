const intialState = { message: 'default message', display: 'none' }


export const showNotification = (message, secs) => {
    return async dispatch => {
        dispatch({
            type: 'SHOW',
            message,
        })
        setTimeout(() => {
            dispatch({
                type: 'HIDE',
                message,
            })
        }, secs*1000)
    }
}

const notificationReducer = (state = intialState, action) => {
    switch (action.type) {
        case 'SHOW':
            const s = {
                ...state,
                message: action.message,
                display: 'block'
            }
            return s
        case 'HIDE':
            const st = {
                ...state,
                message: action.message,
                display: 'none'
            }
            return st
        default:
            return state
    }
}

export default notificationReducer