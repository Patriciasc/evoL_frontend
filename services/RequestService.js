import axios from 'axios'

const itemsAPI = axios.create({
  baseURL: 'http://localhost:5000/api/requests',
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
    console.log('getMyRequests')
    const response = await itemsAPI.get('/me')
    console.log('RequestService: ' + response.data)
    return response.data
  },
  async getRequestsByItemId(id) {
    console.log('getRequestsById')
    const response = await itemsAPI.get(`/${id}`)
    console.log(response.data)
    return response.data
  },
}
