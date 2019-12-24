import React, { useState, useEffect } from 'react'
import loginService from './services/login'
import blogService from './services/blogs'
import Blog from './components/Blog'
import BlogForm from './components/CreateBlogForm'
import Notification from './components/Notification'
import Toggable from './components/Toggable'
import { useField } from './hooks'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const username = useField('text')
    const password = useField('password')
    const [user, setUser] = useState(null)
    const [message, setMessage] = useState({})

    const blogFormRef = React.createRef()

    useEffect(() => {
        getAllBlogs()
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const getAllBlogs = async () => {
        const response = await blogService.getAll()
        setBlogs(response)
        return response
    }

    const handleLogout = async () => {
        window.localStorage.clear()
    }

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username: username.value, password: password.value
            })
            if (!user) {
                setMessage({ message: 'wrong username or password', error: true })

            } else {
                window.localStorage.setItem(
                    'loggedUser', JSON.stringify(user)
                )
                blogService.setToken(user.token)
                setUser(user)
            }
            username.onReset()
            password.onReset()
        } catch (exception) {
            setTimeout(() => {
            }, 5000)
        }
    }

    const createBlog = async (event) => {
        event.preventDefault()
        blogFormRef.current.toggleVisibility()

        const blog = {
            title: event.target.title.value,
            author: event.target.author.value,
            url: event.target.url.value,
            user: user
        }
        const createdBlog = await blogService.create(blog)
        const newBlogArray = await getAllBlogs()
        if (!createdBlog) {
            setMessage({ message: 'blog creation failed', error: true })
        } else {
            setBlogs([...newBlogArray])
            setMessage({ message: `${blog.title} by ${blog.author} added`, error: false })
        }
    }

    const handleUpdate = async id => {
        let blog = blogs.find(b => b.id === id)
        if (blog.likes === null) {
            blog.likes = 0
        }
        blog.likes = blog.likes + 1
        const updatedBlog = blogService.update(id, blog)
        if (!updatedBlog) {
            setMessage({ message: 'blog update failed', error: true })
        } else {
            setMessage({ message: 'blog updated', error: false })
        }
    }

    const handleRemove = async id => {
        const blog = blogs.find(b => b.id === id)
        if (window.confirm(`remove ${blog.title} by ${blog.author}`)) {
            blogService.remove(id)
            setBlogs(blogs.filter((b) => { return b.id !== id }))
        }
    }

    const loginForm = () => (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin} className='loginForm'>
                <div>
                    username
                    <input {...username}/> <br/>
                    password
                    <input {...password}/>
                </div>
                <button type="submit">login</button>
            </form>
        </div>

    )

    const loggedIn = () => (
        <div>
            <h1>Blogs</h1>
            <div>{user.name} logged in</div>
            <div >
                <Toggable buttonLabel={'create'} ref={blogFormRef}>
                    <BlogForm onSubmit={createBlog} key={blogs} />
                </Toggable>
            </div>
            {blogs.sort((a, b) => a.likes < b.likes).map(blog =>
                <Blog key={blog.id}
                    blog={blog}
                    handleUpdate={() => handleUpdate(blog.id)}
                    handleRemove={() => handleRemove(blog.id)}
                    user={user}
                />
            )}
            <form>
                <button onClick={handleLogout}>logout</button>
            </form>
        </div>
    )

    return (
        <div>
            <Notification message={message} />
            {user === null ? loginForm() : loggedIn()}

        </div>
    )
}


export default App
