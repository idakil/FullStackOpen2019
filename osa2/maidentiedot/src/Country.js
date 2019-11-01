import React from 'react'
import Weather from './Weather'

const Country = (props) => {
    const country = props.country;
    const languages = country.languages.map((l) => {
        return <li key={l.name}>{l.name}</li>
    })

    return (
        <div>
            <h2>{country.name}</h2>
            <div>capital {country.capital}</div>
            <div>population {country.population}</div>
            <h2>languages</h2>
            <ul>
                {languages}
            </ul>
            <img src={country.flag} alt="flag" style={{ width: 200, height: 100 }}></img>
            <Weather capital={country.capital}/>
        </div>
    )
}

export default Country;