import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {

    const vote = (anecdote) => {
        props.voteAnecdote(anecdote)
        const msg = `voted '${anecdote.content}'`
        props.showNotification(msg, 2)
        
    }
    console.log('ANECDOTES, ', props.anecdotes)
    return (
        <div>
            {props.anecdotes.sort((a, b) => a.votes < b.votes).map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>

    )
}

const toShow = ({ anecdotes, filter }) => {
    let filtered = []
    if (filter.letter !== '') {
        anecdotes.forEach(a => {
            if (a.content.toLowerCase().includes(filter)) {
                filtered.push(a)
            }
        });
    } else {
        filtered = anecdotes
    }
    return filtered
}

const mapStateToProps = (state) => {
    return {
        anecdotes: toShow(state)
    }
}

const mapDispatchToProps = {
    showNotification, voteAnecdote
}

const ConnectedAnecdotes = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
export default ConnectedAnecdotes