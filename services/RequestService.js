import axios from 'axios'

const itemsAPI = axios.create({
  baseURL: `${process.env.VUE_APP_API}/requests`,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    token: localStorage.getItem('token'),
  },
})

export default {
  async addRequest(newRequest) {
    const response = await itemsAPI.post('/', newRequest)
    return response.data
  },
  async getMyRequests() {
    const response = await itemsAPI.get('/me')
    return response.data
  },
  async getRequestsByItemId(id) {
    const response = await itemsAPI.get(`/${id}`)
    return response.data
  },
  async updateRequest(request) {
    const response = await itemsAPI.put(`/${request.id}`, {
      itemId: request.itemId,
    })
    console.log(response)
    return response
  },
  async deleteRequestbyId(id) {
    const response = await itemsAPI.delete(`/${id}`)
    return response
  },
}
