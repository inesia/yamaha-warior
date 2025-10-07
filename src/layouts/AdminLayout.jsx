import { useState } from 'react'
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom'
import { 
  Users, 
  Trophy, 
  FileText, 
  BarChart3, 
  Award,
  Activity,
  Menu,
  X,
  LogOut,
  User,
  Shield,
  Image,
  Bell,
  Settings,
  UserPlus,
  Gift
} from 'lucide-react'
import useAdminStore from '../store/adminStore'

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { adminUser, adminLogout } = useAdminStore()

  const menuItems = [
    { path: '/admin/members', label: 'Member', icon: Users, roles: ['all'] },
    { path: '/admin/activity-members', label: 'Activity Members', icon: Activity, roles: ['all'] },
    { path: '/admin/challenges', label: 'Challenge', icon: Trophy, roles: ['super_admin', 'content_manager'] },
    { path: '/admin/posting-challenge', label: 'Posting Challenge', icon: FileText, roles: ['super_admin', 'moderator'] },
    { path: '/admin/leaderboard-challenge', label: 'Leaderboard Challenge', icon: BarChart3, roles: ['all'] },
    { path: '/admin/winner-periode', label: 'Winner Periode', icon: Award, roles: ['all'] },
    { path: '/admin/reports-analytics', label: 'Reports & Analytics', icon: BarChart3, roles: ['super_admin', 'content_manager'] },
    { path: '/admin/announcement-management', label: 'Announcement Management', icon: Bell, roles: ['super_admin', 'content_manager'] },
    { path: '/admin/landing-content-management', label: 'Landing Content', icon: Settings, roles: ['super_admin', 'content_manager'] },
    { path: '/admin/referral-management', label: 'Referral Management', icon: UserPlus, roles: ['all'] },
    { path: '/admin/redeem-management', label: 'Hadiah & Redeem', icon: Gift, roles: ['all'] },
    { path: '/admin/admin-management', label: 'Admin Management', icon: Shield, roles: ['super_admin'] }
  ]

  // Filter menu based on user role
  const filteredMenuItems = menuItems.filter(item => 
    item.roles.includes('all') || item.roles.includes(adminUser?.role)
  )

  const handleLogout = () => {
    adminLogout()
    navigate('/admin/login')
  }

  const isActive = (path) => location.pathname === path

  return (
    <div className="min-h-screen bg-gray-50 flex lg:flex-row flex-col">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:sticky lg:top-0 lg:h-screen flex flex-col ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-yamaha-blue flex items-center justify-center">
              <Trophy className="w-5 h-5 text-white" />
            </div>
            <span className="ml-3 text-xl font-bold text-yamaha-dark">Admin Panel</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Admin info */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-yamaha-blue rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-yamaha-dark">{adminUser?.name}</p>
              <div className="flex items-center mt-1">
                {adminUser?.role === 'super_admin' && (
                  <span className="px-2 py-0.5 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">
                    👑 Super Admin
                  </span>
                )}
                {adminUser?.role === 'moderator' && (
                  <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                    🛡️ Moderator
                  </span>
                )}
                {adminUser?.role === 'content_manager' && (
                  <span className="px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                    📝 Content Manager
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 mt-6">
          {filteredMenuItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-6 py-3 text-sm font-medium transition-colors duration-200 ${
                  isActive(item.path)
                    ? 'bg-yamaha-blue text-white border-r-4 border-yamaha-red'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-yamaha-blue'
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Logout button */}
        <div className="p-6">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col lg:ml-0">
        {/* Top bar */}
        <div className="sticky top-0 z-40 bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-yamaha-dark">
                {filteredMenuItems.find(item => isActive(item.path))?.label || 'Admin Dashboard'}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500">
                Welcome, {adminUser?.name}
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
