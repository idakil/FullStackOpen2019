import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleUpdate, handleRemove, user }) => {
    const [visible, setVisible] = useState(false)

    const showWhenVisible = { display: visible ? 'block' : 'none' }
    const butVisible = { display: user.id === blog.user.id ? 'block' : 'none' }
    const toggleVisibility = () => {
        setVisible(!visible)
    }

    return (
        <div className='blogInfo'>
            <div onClick={toggleVisibility} className='show'>
                {blog.title} {blog.author}
            </div>
            <div style={showWhenVisible} className='showWhenClicked'>
                <div>
                    <a href={blog.url}>{blog.url} </a>
                </div>
                <div>
                    {blog.likes} <button onClick = {handleUpdate}>like</button>
                </div>
        added by {blog.user.name}
                <div style={butVisible} className='buttonDiv'>
                    <button id="removeButton" onClick = {handleRemove}>remove</button>
                </div>
            </div>
        </div>
    )
}

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    handleRemove: PropTypes.func.isRequired,
    handleUpdate: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
}


export default Blog