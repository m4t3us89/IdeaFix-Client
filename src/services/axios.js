import axios from 'axios'

const api = axios.create({
  baseURL: 'https://ideafix-api.herokuapp.com'
})

api.interceptors.request.use(
  function (config) {
    //const credentials = localStorage.getItem('credentials')
    //config.headers.token = credentials ? JSON.parse(credentials).token : null
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    if (error.response.status === 403) {
      localStorage.clear()
      window.location.href = '/'
      return
    }
    return Promise.reject(error)
  }
)
export default api