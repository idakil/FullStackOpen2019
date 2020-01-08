import React, { useEffect } from 'react'
import BlogForm from './components/CreateBlogForm'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import { showNotification } from './reducers/notificationReducer'
import { connect } from 'react-redux'
import { logout, initializeUser } from './reducers/loginReducer'
import { initializeBlogs } from './reducers/blogReducer'
import {
    BrowserRouter as Router,
    Route, Link, Switch
} from 'react-router-dom'
import Users from './components/Users'
import Blog from './components/Blog'
import UserInfo from './components/UserInfo'
import { Table, Nav, Navbar, Button, Form } from 'react-bootstrap'
import logo from './images/logo.png'

const App = (props) => {

    useEffect(() => {

        props.initializeBlogs()
        props.initializeUser()

    }, [])

    const BlogView = () => {
        return (
            <div>
                <h1>Blogs</h1>
                <BlogForm key={props.blogs} />
                <Table striped hover size="sm">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.blogs.sort((a, b) => a.likes < b.likes).map(blog =>
                            <tr key={blog.id} className='blogInfo'>
                                <td> <Link to={`/blogs/${blog.id}`} > {blog.title}</Link></td>
                                <td>{blog.author}</td>
                            </tr>

                        )}
                    </tbody>
                </Table>
            </div>
        )
    }

    const Menu = () => {
        const padding = {
            paddingRight: 10,
            fontSize: 1.2 + 'em'
        }
        
        return (
            <Navbar bg="dark" variant="dark" >
                <Navbar.Brand href="/">
                    <img
                        alt=""
                        src={logo}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{' '}
                </Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Item><Link to='/' style={padding}>blogs</Link></Nav.Item>
                    <Nav.Item><Link to='/users' style={padding}>users</Link></Nav.Item>
                </Nav>
                <Navbar.Text style={padding}> {props.user.name} logged in </Navbar.Text>}
                <Form inline stlye={padding} onSubmit={logout}>
                    <Button variant="outline-light" type='submit'> logout </Button>
                </Form>
            </Navbar>
        )
    }

    const loggedIn = () => (
        <div>
            <Menu />
            <Switch>
                <Route exact path='/users' render={() => <Users />} />
                <Route path='/users/:userId'>
                    <UserInfo />
                </Route>
                <Route exact path='/' render={() => <BlogView />} >

                </Route>
                <Route path='/blogs/:blogId'>
                    <Blog />
                </Route>
            </Switch>
        </div>
    )
    return (
        <div className='container'>
            <Router>
                
                <div>
                    <Notification />
                    {props.user === null || Object.values(props.user).length === 0 ? <LoginForm /> : loggedIn()}
                </div>
            </Router>

        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        blogs: state.blogs
    }
}

const mapDispatchToProps = {
    showNotification, logout, initializeUser, initializeBlogs
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
