import axios from 'axios'

const usersAPI = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export default {
  signup(signupInfo) {
    const response = usersAPI
      .post('/auth/signup', signupInfo)
      .then((response) => {
        localStorage.setItem('name', response.data.name)
        localStorage.setItem('email', response.data.email)
        localStorage.setItem('token', response.data.token)
      })
      .catch((err) => console.error(err))
    return response
  },
  login(loginInfo) {
    const response = usersAPI
      .post('/auth/login', loginInfo)
      .then((response) => {
        localStorage.setItem('name', response.data.name)
        localStorage.setItem('email', response.data.email)
        localStorage.setItem('token', response.data.token)
      })
      .catch((err) => console.error(err))
    return response
  },
}
