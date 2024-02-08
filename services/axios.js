// api/axios.js
import dotenv from 'dotenv'
dotenv.config()
import axios from 'axios'

const axiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? process.env.VUE_APP_URL_PROD
      : process.env.VUE_APP_URL_DEV,
})

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth._token.local')

  if (token) {
    config.headers.Authorization = `${token}`
  }
  return config
})

export default axiosInstance
