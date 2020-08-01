import axios from 'axios'

const itemsAPI = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    token: localStorage.getItem('token'),
  },
})

export default {
  createItem(newItem) {
    console.log('ItemService: createItem')
    const response = itemsAPI
      .post('/items', newItem)
      .then((response) => {
        console.log('Item was created')
      })
      .catch((err) => console.error(err))
    return response
  },
}
