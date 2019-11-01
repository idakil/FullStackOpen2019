import React from 'react'
import Person from './Person'

const Persons = ({persons, onClick}) => {

    return <ul>
        {persons.map((p) =>
            <Person key={p.name} person={p} onClick={onClick} />
    )}
    </ul>
}

export default Persons