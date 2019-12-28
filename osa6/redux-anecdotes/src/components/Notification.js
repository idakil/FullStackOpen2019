import React from 'react'
import {connect} from 'react-redux'

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }
  style.display = props.notification.display
 return (
    <div style={style}>
      {props.notification.message} 
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
      notification: state.notification
  }
}

const c = connect(mapStateToProps)(Notification)
export default c