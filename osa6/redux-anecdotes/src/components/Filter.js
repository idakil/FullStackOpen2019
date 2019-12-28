import React from 'react'
import {connect} from 'react-redux'
import {filterAnecdotes} from '../reducers/filterReducer'

const Filter = (props) => {

    const handleChange = (event) => {
        props.filterAnecdotes(event.target.value)
    }

    return (
        <div>
            <input onChange={handleChange}/>
        </div>
    )
}

export default connect(null, {filterAnecdotes})(Filter)