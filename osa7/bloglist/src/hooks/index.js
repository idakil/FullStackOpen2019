import { useState } from 'react'
import axios from 'axios'

export const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    const onReset = () => {
        setValue('')
    }

    return {
        type,
        value,
        onChange,
        onReset
    }
}

export const useResource = (baseUrl) => {
    const [resources, setResources] = useState([])

    const create = async (resource) => {
        const response = await axios.post(baseUrl, resource)
        setResources([...resources, response.data])
        return response.data
    }

    const getAll = async () => {
        const response = await axios.get(baseUrl)
        setResources(response.data)
        return resources
    }

    const service = {
        create, getAll
    }

    return [
        resources, service
    ]
}