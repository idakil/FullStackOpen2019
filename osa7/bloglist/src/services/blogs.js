import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = async()  => {
    const request = await axios.get(baseUrl)
    return request.data
}


const create = async newObject => {
    try{
        const config = {
            headers: {
                Authorization: token
            }
        }
        const response = await axios.post(baseUrl, newObject, config)
        return response.data
    }catch(ex){
        return null
    }
}

const createComment = async (id, comment) => {
    const request = await axios.post(`${ baseUrl }/${id}/comments`, comment)
    return request.data
}

const update = async (id, newObject) => {
    try{
        const config = {
            headers: {
                Authorization: token
            }
        }
        const request = await axios.put(`${ baseUrl }/${id}`, newObject, config)
        return request.data
    }catch(ex){
        return null
    }
}

const remove = async (id) => {
    try{
        const config = {
            headers: {
                Authorization: token
            }
        }
        const request = await axios.delete(`${ baseUrl }/${id}`, config)
        return request.data
    }catch(ex){
        return null
    }
}

export default { getAll,create, update, setToken, remove, createComment }