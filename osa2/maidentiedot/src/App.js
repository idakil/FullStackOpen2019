import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Country from './Country'



const App = () => {
    const [countries, setCountries] = useState([])
    const [filtered, setFiltered] = useState([])

    useEffect(() => {
        axios.get('https://restcountries.eu/rest/v2/all').then(response => {
            setCountries(response.data)
        })
    }, [])

    const handleFilter = (event) => {
        const filteredSuggestions = countries.filter((suggestion) =>
            suggestion.name.toLowerCase().indexOf(event.target.value.toLowerCase()) > -1
        )
        setFiltered(filteredSuggestions)
    }

    function showCountryInfo(a){
        setFiltered([a])
    }

    const Show = () => {
        if (filtered.length === 1) {
            return <Country country={filtered[0]}/>
        } else if (filtered.length > 10) {
            return <div>Too many matches keep on writing ({filtered.length})</div>
        }
        else {
            const b = filtered.map((a) => {
                return <div key={a.name}>{a.name} <button onClick={() => showCountryInfo(a)}>show</button></div>
            })
            return b;
        }
    }

    return (
        <div>
            find countries: <input onChange={handleFilter} />
            {Show()}
        </div>

    )
}

export default App