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
    console.log('ItemService: createItem')
    console.log(newItem)
    const response = await itemsAPI.post('/', newItem)
    return response.data
  },
  async getMyItems() {
    console.log('ItemService: getMyItems')
    const response = await itemsAPI.get('/me')
    return response.data
  },
}
