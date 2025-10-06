import { useState } from 'react'
import { MessageCircle, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import EmbeddedChat from './EmbeddedChat'

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Chat Widget Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-yamaha-blue to-blue-600 text-white p-4 rounded-full shadow-2xl transition-all duration-300"
        style={{ 
          boxShadow: '0 8px 32px rgba(59, 130, 246, 0.4)'
        }}
      >
        <MessageCircle size={24} />
      </motion.button>

      {/* Chat Widget Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 z-50 flex items-end justify-end p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="relative"
              onClick={(e) => e.stopPropagation()}
            >
              <EmbeddedChat onClose={() => setIsOpen(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default ChatWidget
