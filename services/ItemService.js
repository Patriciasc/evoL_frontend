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
  createItem(newItem) {
    const response = itemsAPI
      .post('/', newItem)
      .then((response) => {
        console.log('itemService: Item was created')
      })
      .catch((err) => console.error(err))
    return response
  },
  async getMyItems() {
    console.log('ItemService: getMyItems')
    const response = await itemsAPI.get('/me')
    return response.data
  },
}
