import React, {useState} from 'react'

const Notification = ({message}) => {
    const [display, setDisplay] = useState(false)
    const isError = message.error;
    
    const show = () => {
        setDisplay(true)
    }
    if (Object.values(message).length < 1) {
        return null
    }else{
        setTimeout(show, 3000)
    }
    let className = isError ? 'error' : 'success';
    return (
        <div style={{display: (display ? 'none' : 'block')}} className = {className}>
        {message.message}
    </div>
    )
}

export default Notification