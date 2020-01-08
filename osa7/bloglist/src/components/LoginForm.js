import React from 'react'
import { connect } from 'react-redux'
import { useField } from '../hooks'
import { login } from '../reducers/loginReducer'
import { showNotification } from '../reducers/notificationReducer'
import { Button, Form } from 'react-bootstrap'

const LoginForm = (props) => {
    const username = useField('text')
    const password = useField('password')

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            props.login({ username: username.value, password: password.value })
            username.onReset()
            password.onReset()
        } catch (exception) {
            setTimeout(() => {
            }, 5000)
        }
    }

    return(
        <div className='text-center'>
            <h1>Sign in page</h1>
            <Form onSubmit={handleLogin} className='loginForm'>
                <Form.Group>
                <Form.Label style={{padding:5, fontSize:1.2+'em'}}> username </Form.Label>
                    <input {...username} placeholder='Username'/> 
                </Form.Group>
                <Form.Group>
                <Form.Label style={{padding:5, fontSize:1.2+'em'}}> password </Form.Label>
                    <input {...password} placeholder='Password'/>
                </Form.Group>

                <Button variant='dark' type="submit" data-cy="login">login</Button>
            </Form>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    }
}

const mapDispatchToProps = {
    login, showNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)