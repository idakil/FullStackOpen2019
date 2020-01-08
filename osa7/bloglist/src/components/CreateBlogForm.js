import React from 'react'
//import PropTypes from 'prop-types'
import { useField } from '../hooks'
import { createBlog } from '../reducers/blogReducer'
import { connect } from 'react-redux'
import { showNotification } from '../reducers/notificationReducer'
import Toggable from './Toggable'
import { Form, Row, Col, Button } from 'react-bootstrap'

const BlogForm = (props, ) => {
    const title = useField('text')
    const author = useField('text')
    const url = useField('text')
    const blogFormRef = React.createRef()

    const newBlog = async (event) => {
        event.preventDefault()
        blogFormRef.current.toggleVisibility()
        const blog = {
            title: title.value,
            author: author.value,
            url: url.value,
            user: props.user,
            likes: 0
        }
        await props.createBlog(blog)
    }



    return (
        <Toggable buttonLabel={'create'} ref={blogFormRef}>
            <Form onSubmit={newBlog} id="blogForm">
                <h2>Create new</h2>
                <Form.Group as={Row} >
                    <Form.Label column sm={1}>
                        Title
                    </Form.Label>
                    <Col sm={1}>
                        <input {...title} name="title" />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} >
                    <Form.Label column sm={1}>
                        Author
                    </Form.Label>
                    <Col sm={1}>
                        <input {...author} name="author" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} >
                    <Form.Label column sm={1}>
                        URL
                    </Form.Label>
                    <Col sm={1}>
                        <input {...url} name="url" />
                    </Col>
                </Form.Group>
                <Button variant="outline-dark" type="submit" data-cy="createBlog">create</Button>
            </Form>
        </Toggable>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        blogs: state.blogs
    }
}

const mapDispatchToProps = {
    createBlog, showNotification
}

/*
BlogForm.propTypes = {
    onSubmit: PropTypes.func.isRequired
}*/

export default connect(mapStateToProps, mapDispatchToProps)(BlogForm)