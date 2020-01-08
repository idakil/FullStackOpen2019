import blogService from '../services/blogs'
import { showNotification } from './notificationReducer'


const blogReducer = (state = [], action) => {
    switch (action.type) {
    case 'CREATE':
        return [...state, action.data]
    case 'LIKE': {
        const changed = { ...action.data }
        return state.map(blog =>
            blog.id !== changed.id ? blog : changed
        )
    }
    case 'COMMENT':{
        const changed = { ...action.data }
        return state.map(blog =>
            blog.id !== changed.id ? blog : changed
        )
    }
    case 'INIT':
        return action.data
    case 'REMOVE':
        return state.filter((b) => { return b.id !== action.data.id })
    default:
        return state
    }
}

export const createComment = (id, comment) => {
    return async dispatch => {
        const commentedBlog = await blogService.createComment(id, { comment:comment })
        //removed ? dispatch(showNotification(`removed ${removed.title} by ${removed.author}`, false, 2)) : dispatch(showNotification('blog remove failed', true, 2))
        dispatch({
            type: 'COMMENT',
            data: commentedBlog
        })
    }
}

export const removeBlog = (id) => {
    return async dispatch => {
        const removed = await blogService.remove(id)
        removed ? dispatch(showNotification(`removed ${removed.title} by ${removed.author}`, false, 2)) : dispatch(showNotification('blog remove failed', true, 2))
        dispatch({
            type: 'REMOVE',
            data: removed
        })
    }
}

export const createBlog = (blog) => {
    return async dispatch => {
        const createdBlog = await blogService.create(blog)
        createdBlog ? dispatch(showNotification(`created ${createdBlog.title} by ${createdBlog.author}`, false, 2)) : dispatch(showNotification('blog creation failed', true, 2))
        dispatch({
            type: 'CREATE',
            data: createdBlog
        })
    }
}

export const likeBlog = (blog) => {
    return async dispatch => {
        const likedBlog = await blogService.update(blog.id, blog)
        likedBlog ? dispatch(showNotification(`liked ${likedBlog.title} by ${likedBlog.author}`, false, 2)) : dispatch(showNotification('blog update failed', true, 2))
        dispatch({
            type: 'LIKE',
            data: likedBlog
        })
    }
}

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT',
            data: blogs
        })
    }
}

export default blogReducer