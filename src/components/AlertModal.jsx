import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react'

const AlertModal = ({ 
  show, 
  onClose, 
  title, 
  message, 
  type = 'info', 
  buttonText = 'OK',
  showButton = true 
}) => {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle size={48} className="text-green-500" />
      case 'error':
        return <XCircle size={48} className="text-red-500" />
      case 'warning':
        return <AlertTriangle size={48} className="text-yellow-500" />
      case 'info':
      default:
        return <Info size={48} className="text-blue-500" />
    }
  }

  const getIconBg = () => {
    switch (type) {
      case 'success':
        return 'bg-green-100'
      case 'error':
        return 'bg-red-100'
      case 'warning':
        return 'bg-yellow-100'
      case 'info':
      default:
        return 'bg-blue-100'
    }
  }

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-hidden modal-container">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.3 }}
            className="bg-white rounded-2xl w-full max-w-md shadow-2xl relative overflow-hidden modal-container"
          >
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-yamaha-blue/5 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-yamaha-blue/5 rounded-full translate-y-12 -translate-x-12"></div>
            
            <div className="relative z-10 p-6">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>

              {/* Icon */}
              <div className="flex justify-center mb-4">
                <div className={`w-20 h-20 ${getIconBg()} rounded-full flex items-center justify-center`}>
                  {getIcon()}
                </div>
              </div>

              {/* Content */}
              <div className="text-center">
                <h2 className="text-xl font-bold text-yamaha-dark mb-2">
                  {title}
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {message}
                </p>

                {/* Button */}
                {showButton && (
                  <button
                    onClick={onClose}
                    className={`w-full py-3 px-6 font-semibold rounded-lg transition-colors ${
                      type === 'success' 
                        ? 'bg-green-500 hover:bg-green-600 text-white'
                        : type === 'error'
                        ? 'bg-red-500 hover:bg-red-600 text-white'
                        : type === 'warning'
                        ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
                        : 'bg-yamaha-blue hover:bg-yamaha-blue/90 text-white'
                    }`}
                  >
                    {buttonText}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default AlertModal
