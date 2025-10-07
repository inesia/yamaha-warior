import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, X, Loader2 } from 'lucide-react'

const ConfirmModal = ({ 
  show, 
  onClose, 
  onConfirm,
  title, 
  message, 
  confirmText = 'Ya, Keluar',
  cancelText = 'Batal',
  isLoading = false,
  type = 'warning'
}) => {
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
                disabled={isLoading}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <X size={20} className="text-gray-500" />
              </button>

              {/* Icon */}
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center">
                  <AlertTriangle size={48} className="text-yellow-500" />
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

                {/* Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={onClose}
                    disabled={isLoading}
                    className="flex-1 py-3 px-6 font-semibold rounded-lg transition-colors bg-gray-100 hover:bg-gray-200 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {cancelText}
                  </button>
                  <button
                    onClick={onConfirm}
                    disabled={isLoading}
                    className="flex-1 py-3 px-6 font-semibold rounded-lg transition-colors bg-red-500 hover:bg-red-600 text-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Keluar...
                      </>
                    ) : (
                      confirmText
                    )}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default ConfirmModal
