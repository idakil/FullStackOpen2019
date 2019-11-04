import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/services'
import Notification from './components/Notification'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filtered, setFiltered] = useState([])
    const [notification, setNotification] = useState({})

    const getAll = () => {
        personService.getAll()
            .then(response => {
                setPersons(response)
                setFiltered(response)
              })
    }
    useEffect(() => {
        getAll()
    }, [])

    const handleChange = (event) => {
        if(event.target.id === "name"){
            setNewName(event.target.value)
        }else{
            setNewNumber(event.target.value)
        }
    }
    const handleFilter = (event) => {
        const filteredSuggestions = persons.filter((suggestion) =>
            suggestion.name.toLowerCase().indexOf(event.target.value.toLowerCase()) > -1
        )
        setFiltered(filteredSuggestions)
    }

    const updatePerson = (personObject) => {
        window.confirm(`${newName} already exists in phonebook, replace the old number with a new one?`)
        let id;
        persons.forEach(element => {
            if(element.name === newName){
                id = element.id;
            }
        });
        personService.update(id,personObject)
            .then(response =>{
                setNotification({message: `Updated ${newName}`, error: false})
                getAll()
            })
            .catch(error => {
                setNotification({message: `Person ${personObject.name} does not exist`, error: true})
                setPersons(persons.filter(n=> n.id !== id))
            })
    }

    const addPerson = (event) => {
        event.preventDefault();
        const personObject = {
            name: newName,
            number: newNumber
        }
        if (persons.filter(e => e.name === newName).length > 0) {
            updatePerson(personObject)
        } else {
            personService.create(personObject)
                .then(response => {
                    getAll();
                    setNotification({message: `Added ${newName}`, error: false})
                })
                .catch(error =>{
                    setNotification({message: error.response.data.error, error: true})
                })

        }
    }

    const deletePerson = (person) => {
        window.confirm(`Delete ${person.name} from phonebook?`)
        personService.remove(person.id)
            .then(response => {
                setNotification(`Deleted ${person.name}`)
                getAll();
            })
            .catch(error => {
                console.log(error)
                setNotification({message: `Person ${person.name} does not exist`, error: true})

                setPersons(persons.filter(n=> n.id !== person.id))
                alert(`Person ${person.name} does not exist`)
            })
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={notification}/>
            <div onChange={handleFilter}>
                <Filter />
            </div>
            
            <h2>Add a new</h2>
            <div onSubmit={addPerson} onChange={handleChange}>
                <PersonForm newName={newName} newNumber={newNumber} />
            </div>
            <h2>Numbers</h2>
            <Persons key={persons} persons={filtered} onClick={deletePerson}/>
        </div>
    )

}

export default App