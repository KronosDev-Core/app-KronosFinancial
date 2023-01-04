import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: '/api/',
  withCredentials: !0
})

export default axiosInstance;