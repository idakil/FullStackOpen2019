import React from 'react'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import { ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
const UserInfo = (props) => {
    let { userId } = useParams()
    const user = props.users.find(user => user.id === userId)
    if ( user === undefined) { return null }

    return (
        <div>
            <div>
                <h2>{user.name}</h2>

                <h3>added blogs</h3>
                <ListGroup>
                    {user.blogs.map(blog =>
                        <ListGroup.Item key={blog.id}><Link to={`/blogs/${blog.id}`}>{blog.title} </Link></ListGroup.Item>
                    )}
                </ListGroup>

            </div>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        users: state.users
    }
}
export default connect(mapStateToProps)(UserInfo)
