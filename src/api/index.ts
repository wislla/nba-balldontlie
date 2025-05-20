import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.VITE_BASE_URL,
  timeout: Number(process.env.VITE_TIMEOUT),
  headers: {
    Authorization: process.env.VITE_BALLDONTLIE_KEY,
  },
})
