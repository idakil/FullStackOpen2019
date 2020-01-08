import React, { useState } from 'react'
import { gql } from 'apollo-boost'

const USER = gql`
{
  me  {
    username
    favoriteGenre
  }
}
`

const LoginForm = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const client = props.client
    if (!props.show) {
        return null
      }
    const login = async (event) => {
        event.preventDefault()

        const result = await props.login({
            variables: { username, password }
        })

        const user = await client.query({
            query: USER,
        })

        if (result) {
            const token = result.data.login.value
            props.setToken(token)
            localStorage.setItem('user-token', token)
            localStorage.setItem('user', JSON.stringify(user.data.me))
        }
    }

    return (
        <div>
            <form onSubmit={login}>
                username
            <input type="text" value={username} onChange={({ target }) => setUsername(target.value)} />
                password
            <input type="password" value={password} onChange={({ target }) => setPassword(target.value)}/>
            <button type="submit">login</button>
            </form>
        </div>
    )
}

export default LoginForm