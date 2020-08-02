import axios from 'axios'

const itemsAPI = axios.create({
  baseURL: 'http://localhost:5000/api/items',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    token: localStorage.getItem('token'),
  },
})

export default {
  async createItem(newItem) {
    const response = await itemsAPI.post('/', newItem)
    return response.data
  },
  async getMyItems() {
    const response = await itemsAPI.get('/me')
    return response.data
  },
  async getItems(category) {
    let params = ''
    if (category !== 'All') params = `?category=${category}`

    const response = await itemsAPI.get(`/${params}`)
    return response.data
  },
}