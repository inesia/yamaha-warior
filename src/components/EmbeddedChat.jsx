import { useState, useEffect, useRef } from 'react'
import { MessageCircle, X, Send, Phone, Mail, Clock, Loader2, Minimize2, Maximize2, ArrowLeft, Wifi, WifiOff } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const EmbeddedChat = ({ isFullPage = false, onClose }) => {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isOnline, setIsOnline] = useState(true)
  const messagesEndRef = useRef(null)

  const webhookUrl = 'https://n8n-3fu1ae3ivrpe.rendang.sumopod.my.id/webhook/af4649e1-f102-4537-adc9-9e2e835e646c/chat'

  // Initialize with welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 1,
          text: 'Halo! 👋 Selamat datang di Yamaha Warior Live Chat! Ada yang bisa kami bantu?',
          sender: 'admin',
          timestamp: new Date(),
          type: 'welcome'
        }
      ])
    }
  }, [])

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  // Check webhook connectivity
  useEffect(() => {
    const checkConnection = async () => {
      try {
        const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ test: true })
        })
        setIsOnline(response.ok)
      } catch (error) {
        setIsOnline(false)
      }
    }
    checkConnection()
  }, [])

  const handleSendMessage = async () => {
    if (message.trim() && !isLoading) {
      const userMessage = {
        id: Date.now(),
        text: message,
        sender: 'user',
        timestamp: new Date(),
        type: 'text'
      }
      
      setMessages(prev => [...prev, userMessage])
      const currentMessage = message
      setMessage('')
      setIsLoading(true)
      setIsTyping(true)

      // Add support info after first user message
      const isFirstUserMessage = messages.filter(msg => msg.sender === 'user').length === 0

      try {
        // Simulate API call with demo responses
        setTimeout(() => {
          // Generate contextual responses based on user message
          let botResponse = 'Terima kasih atas pesan Anda! Tim kami akan segera merespons.'
          
          const message = currentMessage.toLowerCase()
          if (message.includes('challenge') || message.includes('tantangan')) {
            botResponse = 'Untuk mengikuti challenge, silakan buka menu Challenge di aplikasi. Pilih challenge yang tersedia dan ikuti instruksi yang diberikan. Setiap challenge memiliki deadline dan reward yang berbeda! 🏆'
          } else if (message.includes('poin') || message.includes('point')) {
            botResponse = 'Poin bisa didapatkan dengan menyelesaikan challenge, mengikuti event, atau melalui program referral. Cek leaderboard untuk melihat peringkat Anda! ⭐'
          } else if (message.includes('reward') || message.includes('hadiah')) {
            botResponse = 'Reward akan dikirim setelah challenge selesai dan verifikasi. Pastikan profil Anda lengkap untuk memudahkan proses pengiriman reward! 🎁'
          } else if (message.includes('akun') || message.includes('account')) {
            botResponse = 'Untuk masalah akun, silakan cek profil Anda di menu Profile. Jika ada masalah, berikan detail error yang Anda alami untuk bantuan lebih lanjut! 🔧'
          } else if (message.includes('leaderboard') || message.includes('peringkat')) {
            botResponse = 'Leaderboard menampilkan peringkat berdasarkan total poin. Ada leaderboard mingguan, bulanan, dan sepanjang waktu. Semangat untuk naik peringkat! 📊'
          } else if (message.includes('referral') || message.includes('teman')) {
            botResponse = 'Program referral memberikan bonus poin untuk Anda dan teman yang diajak bergabung. Bagikan kode referral Anda untuk mendapatkan bonus! 👥'
          }

          const botMessage = {
            id: Date.now() + 1,
            text: botResponse,
            sender: 'admin',
            timestamp: new Date(),
            type: 'text'
          }
          
          const newMessages = [...messages, userMessage, botMessage]
          
          // Add support info after first user message
          if (isFirstUserMessage) {
            const supportInfo = {
              id: Date.now() + 2,
              text: '📋 **Informasi Support:**\n\n🕒 **Jam Operasional:** 24/7 Support Available\n⚡ **Response Time:** Rata-rata 2-5 menit\n🎯 **Support Area:** Challenge, Rewards, Account',
              sender: 'admin',
              timestamp: new Date(),
              type: 'info'
            }
            newMessages.push(supportInfo)
          }
          
          setMessages(newMessages)
          setIsTyping(false)
          setIsLoading(false)
        }, 1500)

        // Optional: Try real webhook in background (non-blocking)
        fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: currentMessage,
            user: 'Yamaha Warior User',
            timestamp: new Date().toISOString(),
            source: 'web_app'
          })
        }).catch(error => {
          console.log('Webhook not available, using demo response:', error)
        })

      } catch (error) {
        console.error('Error sending message:', error)
        // Fallback response instead of error message
        setTimeout(() => {
          const botMessage = {
            id: Date.now() + 1,
            text: 'Terima kasih atas pesan Anda! Tim kami akan segera merespons.',
            sender: 'admin',
            timestamp: new Date(),
            type: 'text'
          }
          
          const newMessages = [...messages, userMessage, botMessage]
          
          // Add support info after first user message
          if (isFirstUserMessage) {
            const supportInfo = {
              id: Date.now() + 2,
              text: '📋 **Informasi Support:**\n\n🕒 **Jam Operasional:** 24/7 Support Available\n⚡ **Response Time:** Rata-rata 2-5 menit\n🎯 **Support Area:** Challenge, Rewards, Account',
              sender: 'admin',
              timestamp: new Date(),
              type: 'info'
            }
            newMessages.push(supportInfo)
          }
          
          setMessages(newMessages)
          setIsTyping(false)
          setIsLoading(false)
        }, 1500)
      }
    }
  }

  const handleQuickMessage = async (quickMessage) => {
    const userMessage = {
      id: Date.now(),
      text: quickMessage,
      sender: 'user',
      timestamp: new Date(),
      type: 'quick'
    }
    
    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)
    setIsTyping(true)

    // Add support info after first user message
    const isFirstUserMessage = messages.filter(msg => msg.sender === 'user').length === 0

    try {
      // Simulate API call with demo responses
      setTimeout(() => {
        // Generate contextual responses based on quick message
        let botResponse = 'Terima kasih atas pesan Anda! Tim kami akan segera merespons.'
        
        const message = quickMessage.toLowerCase()
        if (message.includes('challenge') || message.includes('tantangan')) {
          botResponse = 'Untuk mengikuti challenge, silakan buka menu Challenge di aplikasi. Pilih challenge yang tersedia dan ikuti instruksi yang diberikan. Setiap challenge memiliki deadline dan reward yang berbeda! 🏆'
        } else if (message.includes('poin') || message.includes('point')) {
          botResponse = 'Poin bisa didapatkan dengan menyelesaikan challenge, mengikuti event, atau melalui program referral. Cek leaderboard untuk melihat peringkat Anda! ⭐'
        } else if (message.includes('reward') || message.includes('hadiah')) {
          botResponse = 'Reward akan dikirim setelah challenge selesai dan verifikasi. Pastikan profil Anda lengkap untuk memudahkan proses pengiriman reward! 🎁'
        } else if (message.includes('akun') || message.includes('account')) {
          botResponse = 'Untuk masalah akun, silakan cek profil Anda di menu Profile. Jika ada masalah, berikan detail error yang Anda alami untuk bantuan lebih lanjut! 🔧'
        } else if (message.includes('leaderboard') || message.includes('peringkat')) {
          botResponse = 'Leaderboard menampilkan peringkat berdasarkan total poin. Ada leaderboard mingguan, bulanan, dan sepanjang waktu. Semangat untuk naik peringkat! 📊'
        } else if (message.includes('referral') || message.includes('teman')) {
          botResponse = 'Program referral memberikan bonus poin untuk Anda dan teman yang diajak bergabung. Bagikan kode referral Anda untuk mendapatkan bonus! 👥'
        }

        const botMessage = {
          id: Date.now() + 1,
          text: botResponse,
          sender: 'admin',
          timestamp: new Date(),
          type: 'text'
        }
        
        const newMessages = [...messages, userMessage, botMessage]
        
        // Add support info after first user message
        if (isFirstUserMessage) {
          const supportInfo = {
            id: Date.now() + 2,
            text: '📋 **Informasi Support:**\n\n🕒 **Jam Operasional:** 24/7 Support Available\n⚡ **Response Time:** Rata-rata 2-5 menit\n🎯 **Support Area:** Challenge, Rewards, Account',
            sender: 'admin',
            timestamp: new Date(),
            type: 'info'
          }
          newMessages.push(supportInfo)
        }
        
        setMessages(newMessages)
        setIsTyping(false)
        setIsLoading(false)
      }, 1500)

      // Optional: Try real webhook in background (non-blocking)
      fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: quickMessage,
          user: 'Yamaha Warior User',
          timestamp: new Date().toISOString(),
          source: 'web_app'
        })
      }).catch(error => {
        console.log('Webhook not available, using demo response:', error)
      })

    } catch (error) {
      console.error('Error sending message:', error)
      // Fallback response instead of error message
      setTimeout(() => {
        const botMessage = {
          id: Date.now() + 1,
          text: 'Terima kasih atas pesan Anda! Tim kami akan segera merespons.',
          sender: 'admin',
          timestamp: new Date(),
          type: 'text'
        }
        
        const newMessages = [...messages, userMessage, botMessage]
        
        // Add support info after first user message
        if (isFirstUserMessage) {
          const supportInfo = {
            id: Date.now() + 2,
            text: '📋 **Informasi Support:**\n\n🕒 **Jam Operasional:** 24/7 Support Available\n⚡ **Response Time:** Rata-rata 2-5 menit\n🎯 **Support Area:** Challenge, Rewards, Account',
            sender: 'admin',
            timestamp: new Date(),
            type: 'info'
          }
          newMessages.push(supportInfo)
        }
        
        setMessages(newMessages)
        setIsTyping(false)
        setIsLoading(false)
      }, 1500)
    }
  }

  const quickMessages = [
    'Halo, saya tertarik dengan program Yamaha Warior',
    'Bagaimana cara mengikuti challenge?',
    'Kapan periode challenge berikutnya?',
    'Saya butuh bantuan dengan akun saya',
    'Bagaimana cara melihat leaderboard?',
    'Kapan reward akan dikirim?'
  ]

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString('id-ID', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  const ChatContent = () => (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-gradient-to-r from-yamaha-blue to-blue-600 p-4 text-white flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {isFullPage && (
              <button
                onClick={() => window.history.back()}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
            )}
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <MessageCircle size={20} />
            </div>
            <div>
              <h3 className="font-bold text-sm">Yamaha Warior Live Chat</h3>
              <div className="flex items-center gap-2 text-xs">
                {isOnline ? (
                  <>
                    <Wifi size={14} />
                    <span>Connected to support</span>
                  </>
                ) : (
                  <>
                    <WifiOff size={14} />
                    <span>Connection issue - Limited support</span>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {!isFullPage && (
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-white/80 hover:text-white transition-colors"
              >
                {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
              </button>
            )}
            {onClose && (
              <button
                onClick={onClose}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 space-y-3 overflow-y-auto bg-gray-50">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-r from-yamaha-blue to-blue-600 text-white'
                  : msg.type === 'error'
                  ? 'bg-red-100 text-red-800 border border-red-200'
                  : msg.type === 'info'
                  ? 'bg-blue-50 text-blue-800 border border-blue-200'
                  : 'bg-white text-gray-800 shadow-sm border'
              }`}
            >
              <p className="whitespace-pre-wrap">{msg.text}</p>
              <p className={`text-xs mt-1 ${
                msg.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
              }`}>
                {formatTime(msg.timestamp)}
              </p>
            </div>
          </motion.div>
        ))}
        
        {/* Typing Indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="bg-white p-3 rounded-2xl text-sm shadow-sm border">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span className="text-gray-500 text-xs">Admin sedang mengetik...</span>
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Auto scroll anchor */}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Messages */}
      {messages.length <= 1 && (
        <div className="p-4 bg-white border-t">
          <p className="text-xs font-semibold text-gray-500 mb-2">Quick Messages:</p>
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
            {quickMessages.map((msg, index) => (
              <button
                key={index}
                onClick={() => handleQuickMessage(msg)}
                disabled={isLoading}
                className="flex-shrink-0 bg-yamaha-blue/10 hover:bg-yamaha-blue/20 text-yamaha-blue px-3 py-2 rounded-full text-xs transition-colors disabled:opacity-50 whitespace-nowrap"
              >
                {msg}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Message Input */}
      <div className="p-4 bg-white border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ketik pesan..."
            disabled={isLoading}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yamaha-blue focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
            onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
          />
          <button
            onClick={handleSendMessage}
            disabled={!message.trim() || isLoading}
            className="bg-yamaha-blue hover:bg-blue-700 disabled:bg-gray-300 text-white p-2 rounded-lg transition-colors disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Send size={16} />
            )}
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          {isLoading ? 'Mengirim pesan...' : 'Tekan Enter untuk mengirim'}
        </p>
      </div>
    </div>
  )

  if (isFullPage) {
    return (
      <div className="h-screen bg-white">
        <ChatContent />
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="bg-white rounded-2xl shadow-2xl w-full max-w-md h-[500px] flex flex-col overflow-hidden"
    >
      <ChatContent />
    </motion.div>
  )
}

export default EmbeddedChat
