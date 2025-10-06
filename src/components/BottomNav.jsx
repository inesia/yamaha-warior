import { NavLink } from 'react-router-dom'
import { Home, Trophy, Award, User, MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'

const BottomNav = () => {
  const navItems = [
    { path: '/dashboard', icon: Home, label: 'Beranda' },
    { path: '/challenges', icon: Trophy, label: 'Challenge' },
    { path: '/leaderboard', icon: Award, label: 'Peringkat' },
    { path: '/chat', icon: MessageCircle, label: 'Chat' },
    { path: '/profile', icon: User, label: 'Profil' },
  ]

  // Handle navigation with scroll to top
  const handleNavClick = () => {
    // Scroll to top when navigation is clicked
    window.scrollTo({ top: 0, behavior: 'smooth' })
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t-4 border-gray-100 safe-bottom z-50 shadow-2xl">
      <div className="max-w-lg mx-auto px-2">
        <div className="flex items-center justify-around h-16">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={handleNavClick}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center flex-1 py-2 px-1 transition-all relative ${
                  isActive ? 'text-yamaha-blue' : 'text-gray-400'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {/* Active Indicator - Top Border */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute top-0 left-0 right-0 h-1 bg-yamaha-blue"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  
                  {/* Icon with background */}
                  <motion.div
                    animate={{ 
                      scale: isActive ? 1 : 0.95,
                      y: isActive ? -2 : 0
                    }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className={`${isActive ? 'bg-yamaha-blue/10' : ''} p-2 transition-colors`}
                  >
                    <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                  </motion.div>
                  
                  {/* Label */}
                  <span className={`text-[10px] mt-0.5 font-medium transition-all ${
                    isActive ? 'font-bold' : 'font-normal'
                  }`}>
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default BottomNav
