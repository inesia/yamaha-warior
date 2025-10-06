import { create } from 'zustand'

const useAdminStore = create((set, get) => ({
  // Admin authentication state
  isAdminAuthenticated: false,
  adminUser: null,
  
  // Admin login
  adminLogin: async (email, password) => {
    // Mock admin credentials
    const adminCredentials = {
      'admin@yamaha.com': { 
        id: 1, 
        email: 'admin@yamaha.com', 
        name: 'Super Admin', 
        role: 'super_admin',
        password: 'admin123'
      },
      'moderator@yamaha.com': { 
        id: 2, 
        email: 'moderator@yamaha.com', 
        name: 'Moderator', 
        role: 'moderator',
        password: 'mod123'
      },
      'content@yamaha.com': { 
        id: 3, 
        email: 'content@yamaha.com', 
        name: 'Content Manager', 
        role: 'content_manager',
        password: 'content123'
      }
    }

    const admin = adminCredentials[email]
    
    if (admin && admin.password === password) {
      set({ 
        isAdminAuthenticated: true, 
        adminUser: { 
          id: admin.id, 
          email: admin.email, 
          name: admin.name, 
          role: admin.role 
        } 
      })
      return { success: true, admin: admin }
    }
    
    return { success: false, error: 'Invalid credentials' }
  },

  // Admin logout
  adminLogout: () => {
    set({ isAdminAuthenticated: false, adminUser: null })
  },

  // Check admin permissions
  hasPermission: (permission) => {
    const { adminUser } = get()
    if (!adminUser) return false
    
    const rolePermissions = {
      super_admin: ['all'],
      moderator: ['view_users', 'review_submissions', 'view_analytics'],
      content_manager: ['manage_challenges', 'view_submissions', 'view_analytics', 'manage_winners']
    }
    
    const permissions = rolePermissions[adminUser.role] || []
    return permissions.includes('all') || permissions.includes(permission)
  }
}))

export default useAdminStore
