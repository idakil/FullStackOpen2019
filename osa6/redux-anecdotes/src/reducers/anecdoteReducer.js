import anecdoteService from '../services/anecdotes'

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    const updated = await anecdoteService.update(anecdote.id, anecdote)
    dispatch({
      type:'VOTE',
      data: updated

    })
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const anecdote = await anecdoteService.create(content)
    dispatch({
      type:'CREATE',
      data: anecdote
    })
  }
}

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch(action.type){
    case 'VOTE':
      const id = action.data.id
      const toVote = state.find(a => a.id === id)
      const changed = { 
        ...toVote, 
        votes: toVote.votes += 1
      }
      return state.map(a =>
        a.id !== id ? a : changed 
      )
    case 'CREATE':
      return [...state, action.data]
    case 'INITIALIZE':      
      return action.data
    default:
      return state
  }
}

export const initAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
        type: 'INITIALIZE',
        data: anecdotes

    })
  }

}

export default reducer