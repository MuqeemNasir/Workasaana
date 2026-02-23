import { create } from 'zustand'
import api from '../services/api'
import { toast } from 'react-toastify'

const useAuthStore = create((set) => ({
    user: null,
    token: localStorage.getItem('token') || null,
    isAuthenticated: !!localStorage.getItem('token'),
    isLoading: false,

    login: async (email, password) => {
        set({ isLoading: true })
        try {
            const { data } = await api.post('/auth/login', { email, password })

            localStorage.setItem('token', data.token)

            set({
                user: data,
                token: data.token,
                isAuthenticated: true,
                isLoading: false
            })

            toast.success("Welcome back!")
            return true
        } catch (error) {
            const msg = error.response?.data?.message || "Login Failed."
            toast.error(msg)
            set({ isLoading: false })
            return false
        }
    },

    signup: async (name, email, password) => {
        set({ isLoading: true })
        try {
            const { data } = await api.post('/auth/signup', { name, email, password })

            localStorage.setItem('token', data.token)

            set({
                user: data,
                token: data.token,
                isAuthenticated: true,
                isLoading: false
            })

            toast.success("Account created successfully!")
            return true
        } catch (error) {
            const msg = error.response?.data?.message || "Signup Failed."
            toast.error(msg)
            set({ isLoading: false })
            return false
        }
    },

    checkAuth: async () => {
        const token = localStorage.getItem('token')
        if(!token) return

        try{
            const {data} = await api.get('/auth/me')
            set({user: data, isAuthenticated: true})
        }catch(error){
            console.error("Session Expired")
            localStorage.removeItem('token')
            set({user: null, token: null, isAuthenticated: false})
        }
    },

    logout: () => {
        localStorage.removeItem('token')
        set({user: null, token: null, isAuthenticated: false})
        toast.info("Logged Out.")
    }
}))

export default useAuthStore