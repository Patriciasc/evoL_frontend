import axios from 'axios'

const itemsAPI = axios.create({
  baseURL: `${process.env.VUE_APP_API}/items`,
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
  async getItemById(id) {
    const response = await itemsAPI.get(`/${id}`)
    return response.data[0]
  },
  async deleteItembyId(id) {
    const response = await itemsAPI.delete(`/${id}`)
    return response
  },
}
