import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      token: null,
      
      login: (userData, token) => set({ 
        user: userData, 
        isAuthenticated: true,
        token: token 
      }),
      
      logout: () => set({ 
        user: null, 
        isAuthenticated: false,
        token: null 
      }),
      
      updateUser: (userData) => set((state) => ({ 
        user: { ...state.user, ...userData } 
      })),
    }),
    {
      name: 'yamaha-warior-auth',
    }
  )
)
