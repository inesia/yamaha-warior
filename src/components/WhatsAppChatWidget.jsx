import { useState } from 'react'
import { MessageCircle, X, Send, Phone, Mail, Clock } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const WhatsAppChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [isMinimized, setIsMinimized] = useState(false)

  const adminPhone = '+6281234567890' // Ganti dengan nomor WhatsApp admin
  const adminName = 'Yamaha Warior Admin'

  const handleSendMessage = () => {
    if (message.trim()) {
      const encodedMessage = encodeURIComponent(message)
      const whatsappUrl = `https://wa.me/${adminPhone.replace('+', '')}?text=${encodedMessage}`
      window.open(whatsappUrl, '_blank')
      setMessage('')
      setIsOpen(false)
    }
  }

  const handleQuickMessage = (quickMessage) => {
    const encodedMessage = encodeURIComponent(quickMessage)
    const whatsappUrl = `https://wa.me/${adminPhone.replace('+', '')}?text=${encodedMessage}`
    window.open(whatsappUrl, '_blank')
    setIsOpen(false)
  }

  const quickMessages = [
    'Halo, saya tertarik dengan program Yamaha Warior',
    'Bagaimana cara mengikuti challenge?',
    'Kapan periode challenge berikutnya?',
    'Saya butuh bantuan dengan akun saya'
  ]

  return (
    <>
      {/* Chat Widget Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-4 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-all duration-300"
        style={{ 
          background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
          boxShadow: '0 8px 32px rgba(37, 211, 102, 0.4)'
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
              className="bg-white rounded-2xl shadow-2xl w-full max-w-[425px] h-96 flex flex-col overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <MessageCircle size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm">{adminName}</h3>
                      <div className="flex items-center gap-1 text-xs text-green-100">
                        <div className="w-2 h-2 bg-green-300 rounded-full"></div>
                        <span>Online</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Chat Content */}
              <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                {/* Welcome Message */}
                <div className="bg-gray-100 rounded-2xl p-3 text-sm">
                  <p className="font-semibold text-gray-800 mb-1">Halo! 👋</p>
                  <p className="text-gray-600">
                    Selamat datang di Yamaha Warior! Ada yang bisa kami bantu?
                  </p>
                </div>

                {/* Quick Messages */}
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-gray-500">Quick Messages:</p>
                  {quickMessages.map((msg, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickMessage(msg)}
                      className="w-full text-left bg-yamaha-blue/10 hover:bg-yamaha-blue/20 text-yamaha-blue p-2 rounded-lg text-xs transition-colors"
                    >
                      {msg}
                    </button>
                  ))}
                </div>

                {/* Contact Info */}
                <div className="bg-gradient-to-r from-yamaha-blue/5 to-transparent p-3 rounded-lg border-l-4 border-yamaha-blue">
                  <div className="flex items-center gap-2 mb-2">
                    <Phone size={14} className="text-yamaha-blue" />
                    <span className="text-xs font-semibold text-yamaha-blue">Contact Info</span>
                  </div>
                  <p className="text-xs text-gray-600 mb-1">Admin: {adminPhone}</p>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock size={12} />
                    <span>Available 24/7</span>
                  </div>
                </div>
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ketik pesan..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yamaha-blue focus:border-transparent"
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!message.trim()}
                    className="bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white p-2 rounded-lg transition-colors"
                  >
                    <Send size={16} />
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Pesan akan dikirim ke WhatsApp Admin
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default WhatsAppChatWidget
