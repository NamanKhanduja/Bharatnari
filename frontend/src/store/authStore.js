import { create } from 'zustand'

export const useAuthStore = create((set) => ({
  email: null,
  otpId: null,
  token: null,
  user: null,
  isAuthenticated: false,

  setEmail: (email) => set({ email }),
  setOtpId: (otpId) => set({ otpId }),
  setToken: (token) => set({ token, isAuthenticated: true }),
  setUser: (user) => set({ user }),
  logout: () => set({ 
    token: null, 
    user: null, 
    isAuthenticated: false,
    email: null,
    otpId: null
  }),
  clearAuth: () => set({ 
    email: null,
    otpId: null,
    token: null, 
    user: null, 
    isAuthenticated: false 
  }),
}))
