import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

const GoogleOneTapSimulation = ({ onClose, onSignIn }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Delay untuk efek slide in
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleSignIn = async () => {
    setIsLoading(true)
    // Simulasi loading
    setTimeout(() => {
      setIsLoading(false)
      onSignIn({ email: 'demo@yamahawarior.com' })
      onClose()
    }, 2000)
  }

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => {
      onClose()
    }, 300)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
          >
            {/* Header dengan Google branding */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 relative">
              <button
                onClick={handleClose}
                className="absolute top-3 right-3 text-white/80 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-red-500 rounded flex items-center justify-center">
                    <span className="text-white font-bold text-xs">G</span>
                  </div>
                </div>
                <div>
                  <h2 className="text-white font-semibold text-lg">Sign in</h2>
                  <p className="text-white/80 text-sm">to continue to Yamaha Warrior</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Google Sign In Button - Main Option */}
              <button 
                onClick={handleSignIn}
                disabled={isLoading}
                className="w-full flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="w-5 h-5 bg-gradient-to-r from-blue-500 to-red-500 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-xs">G</span>
                </div>
                <span className="text-gray-700 font-medium flex-1 text-left">Continue with Google</span>
                {isLoading && (
                  <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                )}
              </button>

              {/* Footer intentionally left empty (no signup links) */}
            </div>

            {/* Bottom info */}
            <div className="bg-gray-50 px-6 py-4 border-t">
              <p className="text-xs text-gray-500 text-center">
                By signing in, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default GoogleOneTapSimulation
