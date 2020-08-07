import axios from 'axios'

const usersAPI = axios.create({
  baseURL: `${process.env.VUE_APP_API}`,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export default {
  async signup(signupInfo) {
    const response = await usersAPI.post('/auth/signup', signupInfo)
    return response
  },
  async login(loginInfo) {
    const response = await usersAPI.post('/auth/login', loginInfo)
    return response
  },
}
