import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (content) => {
  const response = await axios.post(baseUrl, { content: content, votes: 0 })
  return response.data
}

const update = async (id, updated) => {
  const response = await axios.put(`${ baseUrl }/${id}`, updated)
  return response.data
}
export default { getAll, create, update }