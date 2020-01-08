import React, { useState } from 'react'
import Select from 'react-select'

const EditForm = (props) => {
    const [year, setYear] = useState('')
    const [name, setName] = useState('')
    const [selected, setSelected] = useState('')

    if (!props.show) {
        return null
    }
    const authors = props.authors.data.allAuthors
    const options = []
    authors.forEach(element => {
        options.push({ value: element.name, label: element.name })
    });
    
    const submit = async (e) => {
        e.preventDefault()
        const born = parseInt(year)
        console.log(name)
        await props.setBorn({
            variables: { name, born }
        })
        setYear('')
        setName('')
    }

    const handleSelect = selected => {
        setName(selected.value)
        setSelected(selected)
    };

    return (
        <div>
            <h2>set birthyear</h2>
            <form onSubmit={submit}>
                <Select
                    value={selected}
                    onChange={handleSelect}
                    options={options}
                />
                born
            <input
                    value={year}
                    onChange={({ target }) => setYear(target.value)}
                />
                <button type='submit'>update author</button>
            </form>
        </div>
    )
}
/**
 *                 name
            <input
                    value={name}
                    onChange={({ target }) => setName(target.value)}
                />
 */
export default EditForm