import React from 'react'
//import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const Notification = (props) => {
    const isError = props.notification.error
    let className = isError ? 'error' : 'success'
    return (
        <div style={{ display: props.notification.display }} className = {className}>
            { props.notification.message }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        notification: state.notification
    }
}

/*
Notification.propTypes = {
    props: PropTypes.object.isRequired
}*/

export default connect(mapStateToProps)(Notification)