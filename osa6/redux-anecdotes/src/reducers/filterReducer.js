const initialState = {letter: ''}

export const filterAnecdotes = (letter) => {
    return{
        type: 'FILTER',
        letter: letter
    }
}

const filterReducer = (state = initialState, action) => {
    switch(action.type){
        case 'FILTER':
            return action.letter
        default:
            return state
    }
}

export default filterReducer