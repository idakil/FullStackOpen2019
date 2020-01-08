import React from 'react'
import { connect } from 'react-redux'
import Blog from './Blog'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'
import { Route, Link } from 'react-router-dom'

const BlogList = (props) => {

    return (
        <div>
            <ul>
                {props.blogs.sort((a, b) => a.likes < b.likes).map(blog =>
                    <li key={blog.id} className='blogInfo'>
                        <Link to={`/blogs/${blog.id}`} > {blog.title} by {blog.author}</Link>
                    </li>

                )}
            </ul>
            <Route
                path='/blogs/:blogId/'
                strict
                sensitive
                render={({ match }) => {
                    return match && <Blog match={match} />
                }}
            />
        </div>

    )
}

const mapStateToProps = (state) => {
    return {
        blogs: state.blogs,
        user: state.user
    }
}

const mapDispatchToProps = {
    likeBlog, removeBlog, showNotification
}


export default connect(mapStateToProps, mapDispatchToProps)(BlogList)