import React from 'react'

const CountryList = (props) => {
    const list = props.filtered.map((a) => {
        return <div key={a.name}>{a.name}</div>
    })
    return list
}
export default CountryList