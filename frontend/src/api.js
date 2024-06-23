import axios from "axios"
import { ACCESS_TOKEN } from "./constant"

const api = axios.create({
    baseURL: "http://localhost:8000", // Replace with your API base URL
    timeout: 5000, // Request timeout in milliseconds
  });


  api.interceptors.request.use(
    (config) =>{
        const token =localStorage.getItem(ACCESS_TOKEN)
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config

    },
    (error) =>{
        return Promise.reject(error)
    }
  )
  export default api