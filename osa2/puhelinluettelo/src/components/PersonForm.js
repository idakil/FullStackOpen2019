import React from 'react'

const PersonForm = () => {
    return <form >
        <div>
            name: <input id="name"  />
        </div>
        <div>
            number: <input  id="number"/>
        </div>
        <div>
            <button type="submit">add</button>
        </div>
    </form>
}

export default PersonForm