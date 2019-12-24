import React from 'react'
import PropTypes from 'prop-types'
import { useField } from '../hooks'

const BlogForm = ({ onSubmit }) => {
    const title = useField('text')
    const author = useField('text')
    const url = useField('text')

    return (
        <form onSubmit={onSubmit} id="blogForm">
            <h2>Create new</h2>
            <div>
                title
                <input {...title} name="title"/>
            </div>
            <div>
                author
                <input {...author} name="author"/>
            </div>
            <div>
                url
                <input {...url} name="url"/>
            </div>
            <button type="submit">create</button>
        </form>
    )
}

BlogForm.propTypes = {
    onSubmit: PropTypes.func.isRequired
}

export default BlogForm