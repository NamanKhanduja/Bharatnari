import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api/v1'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/'
    }
    return Promise.reject(error.response?.data || error)
  }
)

export const sendOTP = async (email) => {
  try {
    const response = await api.post('/auth/send-otp', { email })
    return response
  } catch (error) {
    throw error
  }
}

export const verifyOTP = async (email, otp, otpId) => {
  try {
    const response = await api.post('/auth/verify-otp', { email, otp, otpId })
    return response
  } catch (error) {
    throw error
  }
}

export const login = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password })
    return response
  } catch (error) {
    throw error
  }
}

export const refreshToken = async (refreshToken) => {
  try {
    const response = await api.post('/auth/refresh', { refreshToken })
    return response
  } catch (error) {
    throw error
  }
}

export const logout = async () => {
  try {
    const response = await api.post('/auth/logout')
    return response
  } catch (error) {
    throw error
  }
}
