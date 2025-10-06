import { useState, useEffect, useRef } from 'react'
import { MessageCircle, X, Send, Phone, Mail, Clock, Loader2, Minimize2, Maximize2 } from 'lucide-react'
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

      try {
        const response = await fetch(webhookUrl, {
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
        })

        if (response.ok) {
          const data = await response.json()
          
          // Simulate typing delay for better UX
          setTimeout(() => {
            const botMessage = {
              id: Date.now() + 1,
              text: data.response || data.message || 'Terima kasih atas pesan Anda! Tim kami akan segera merespons.',
              sender: 'admin',
              timestamp: new Date(),
              type: 'text'
            }
            setMessages(prev => [...prev, botMessage])
            setIsTyping(false)
            setIsLoading(false)
          }, 1500)
        } else {
          throw new Error('Failed to send message')
        }
      } catch (error) {
        console.error('Error sending message:', error)
        const errorMessage = {
          id: Date.now() + 1,
          text: 'Maaf, terjadi kesalahan koneksi. Silakan coba lagi atau hubungi admin langsung.',
          sender: 'admin',
          timestamp: new Date(),
          type: 'error'
        }
        setMessages(prev => [...prev, errorMessage])
        setIsTyping(false)
        setIsLoading(false)
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

    try {
      const response = await fetch(webhookUrl, {
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
      })

      if (response.ok) {
        const data = await response.json()
        
        setTimeout(() => {
          const botMessage = {
            id: Date.now() + 1,
            text: data.response || data.message || 'Terima kasih atas pesan Anda! Tim kami akan segera merespons.',
            sender: 'admin',
            timestamp: new Date(),
            type: 'text'
          }
          setMessages(prev => [...prev, botMessage])
          setIsTyping(false)
          setIsLoading(false)
        }, 1500)
      } else {
        throw new Error('Failed to send message')
      }
    } catch (error) {
      console.error('Error sending message:', error)
      const errorMessage = {
        id: Date.now() + 1,
        text: 'Maaf, terjadi kesalahan. Silakan coba lagi atau hubungi admin langsung.',
        sender: 'admin',
        timestamp: new Date(),
        type: 'error'
      }
      setMessages(prev => [...prev, errorMessage])
      setIsTyping(false)
      setIsLoading(false)
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
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <MessageCircle size={20} />
            </div>
            <div>
              <h3 className="font-bold text-sm">Yamaha Warior Live Chat</h3>
              <div className="flex items-center gap-1 text-xs">
                <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-300' : 'bg-red-300'}`}></div>
                <span>{isOnline ? 'Online' : 'Offline'}</span>
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
          <div className="grid grid-cols-1 gap-2">
            {quickMessages.slice(0, 3).map((msg, index) => (
              <button
                key={index}
                onClick={() => handleQuickMessage(msg)}
                disabled={isLoading}
                className="text-left bg-yamaha-blue/10 hover:bg-yamaha-blue/20 text-yamaha-blue p-2 rounded-lg text-xs transition-colors disabled:opacity-50"
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
      <div className="min-h-screen bg-gray-100">
        <div className="h-screen max-w-4xl mx-auto bg-white shadow-lg">
          <ChatContent />
        </div>
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
