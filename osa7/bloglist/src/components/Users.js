import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { initializeUsers } from '../reducers/userReducer'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const Users = (props) => {
    useEffect(() => {
        props.initializeUsers()
    }, [])

    return (
        <div>
            <h2>Users</h2>
            <Table striped>
                <thead>
                    <tr>
                        <th>name</th>
                        <th>blogs created</th>
                    </tr>
                </thead>
                <tbody>

                    {props.users.map(user =>
                        <tr key={user.id}>
                            <td>
                                <Link to={`users/${user.id}`}>{user.name}</Link>
                            </td>
                            <td>{user.blogs.length}</td>
                        </tr>
                    )}
                </tbody>
            </Table>

        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        users: state.users
    }
}

const mapDispatchToProps = {
    initializeUsers
}


export default connect(mapStateToProps, mapDispatchToProps)(Users)
