import { useNavigate } from 'react-router-dom'
import { ChevronLeft, Bell } from 'lucide-react'
import { motion } from 'framer-motion'

const Header = ({ title, showBack = false, showNotification = true, transparent = false }) => {
  const navigate = useNavigate()

  return (
    <header className={`sticky top-0 z-40 safe-top ${transparent ? 'bg-transparent' : 'bg-white border-b-4 border-gray-100'}`}>
      <div className="flex items-center justify-between h-16 px-4 max-w-lg mx-auto">
        {/* Left Side */}
        <div className="flex items-center flex-1">
          {showBack ? (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(-1)}
              className="p-2 -ml-2 hover:bg-gray-100 active:bg-gray-200 transition-colors border-l-4 border-transparent hover:border-yamaha-blue"
            >
              <ChevronLeft size={24} className={transparent ? 'text-white' : 'text-yamaha-dark'} />
            </motion.button>
          ) : null}
        </div>

        {/* Center Title */}
        <h1 className={`font-black text-lg ${transparent ? 'text-white' : 'text-yamaha-dark'}`}>
          {title}
        </h1>

        {/* Right Side */}
        <div className="flex items-center justify-end flex-1">
          {showNotification && (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/notifications')}
              className="p-2 -mr-2 hover:bg-gray-100 active:bg-gray-200 transition-colors relative border-r-4 border-transparent hover:border-yamaha-blue"
            >
              <Bell size={24} className={transparent ? 'text-white' : 'text-yamaha-dark'} />
              {/* Notification badge */}
              <span className="absolute top-1.5 right-1.5 w-3 h-3 bg-red-500 rounded-full shadow-md"></span>
            </motion.button>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
