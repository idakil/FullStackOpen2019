import React from 'react'
import { connect } from 'react-redux'
import { likeBlog, removeBlog, createComment } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'
import { useParams } from 'react-router-dom'
import { Button, Form, InputGroup, FormControl } from 'react-bootstrap'
const Blog = (props) => {
    let { blogId } = useParams()
    const blog = props.blogs.find(blog => blog.id === blogId)
    if (blog === undefined) { return null }
    const butVisible = { display: props.user.id === blog.user.id ? 'block' : 'none' }

    const handleUpdate = async () => {
        let blog = props.blogs.find(b => b.id === blogId)
        if (blog.likes === null) {
            blog.likes = 0
        }
        blog.likes ++
        await props.likeBlog(blog)
    }

    const handleRemove = async () => {
        const blog = props.blogs.find(b => b.id === blogId)
        if (window.confirm(`remove ${blog.title} by ${blog.author}`)) {
            props.removeBlog(blogId)
        }
    }

    const addComment = async (event) => {
        event.preventDefault()
        await props.createComment(blogId, event.target.comment.value)
    }

    const generateId = () => {
        const maxId = props.blogs.length
        return maxId + Math.random(99999)
    }

    return (
        <div >
            <h2> &quot; {blog.title} &quot;</h2>
            <div style={{ fontSize: 1.5 + 'em' }}>
                Likes  {blog.likes} <Button variant="outline-success" onClick={handleUpdate} data-cy='likeButton'>Like</Button>
            </div>
            added by {blog.user.name}
            <div style={{ paddingTop: 20 }}>
                <h3>comments</h3>
                <Form onSubmit={addComment}>
                    <InputGroup className="mb-3" size="sm">
                        <FormControl
                            placeholder="comment"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            name="comment"
                        />
                        <InputGroup.Append>
                            <Button variant="outline-dark" type="submit">add comment</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Form>
                <ul>
                    {props.blogs.map(blog =>
                        blog.comments.map(comment => <li key={generateId()}>{comment}</li>))}
                </ul>
            </div>
            <div style={butVisible} className='buttonDiv'>
                <Button variant="outline-danger" onClick={handleRemove} >Remove</Button>
            </div>
        </div>
    )
    /*const [visible, setVisible] = useState(false)
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
    )*/
}

const mapStateToProps = (state) => {
    return {
        blogs: state.blogs,
        user: state.user
    }
}

const mapDispatchToProps = {
    likeBlog, removeBlog, showNotification, createComment
}


export default connect(mapStateToProps, mapDispatchToProps)(Blog)
