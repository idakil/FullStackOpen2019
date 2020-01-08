const intialState = { message: 'default message', display: 'none' }

export const showNotification = (message, isError, secs) => {
    return async dispatch => {
        dispatch({
            type: 'SHOW',
            data: {
                message: message,
                error: isError
            }
        })
        setTimeout(() => {
            dispatch({
                type: 'HIDE',
            })
        }, secs*1000)
    }
}

const notificationReducer = (state = intialState, action) => {
    switch (action.type) {
    case 'SHOW':
        return action.data
    case 'HIDE':
        return {
            display: 'none',
            message: ''
        }
    default:
        return state
    }
}

export default notificationReducer