import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, ArrowLeft, Wifi, WifiOff } from 'lucide-react'
import EmbeddedChat from '../../components/EmbeddedChat'

const LiveChat = () => {
  const [connectionStatus, setConnectionStatus] = useState('checking')
  const webhookUrl = 'https://n8n-3fu1ae3ivrpe.rendang.sumopod.my.id/webhook/af4649e1-f102-4537-adc9-9e2e835e646c/chat'

  useEffect(() => {
    // Check webhook connectivity
    const checkConnection = async () => {
      try {
        const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ test: true })
        })
        setConnectionStatus(response.ok ? 'connected' : 'error')
      } catch (error) {
        setConnectionStatus('error')
      }
    }
    checkConnection()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-yamaha-blue to-blue-600 text-white p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => window.history.back()}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageCircle size={24} />
                </div>
                <div>
                  <h1 className="text-2xl font-black">Live Chat Support</h1>
                  <div className="flex items-center gap-2 text-sm">
                    {connectionStatus === 'checking' && (
                      <>
                        <div className="w-2 h-2 bg-yellow-300 rounded-full animate-pulse"></div>
                        <span>Checking connection...</span>
                      </>
                    )}
                    {connectionStatus === 'connected' && (
                      <>
                        <Wifi size={16} />
                        <span>Connected to support</span>
                      </>
                    )}
                    {connectionStatus === 'error' && (
                      <>
                        <WifiOff size={16} />
                        <span>Connection issue - Limited support</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="max-w-4xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <EmbeddedChat isFullPage={true} />
        </motion.div>

        {/* Support Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <h3 className="font-bold text-sm text-gray-800 mb-2">🕒 Jam Operasional</h3>
            <p className="text-xs text-gray-600">24/7 Support Available</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <h3 className="font-bold text-sm text-gray-800 mb-2">⚡ Response Time</h3>
            <p className="text-xs text-gray-600">Rata-rata 2-5 menit</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <h3 className="font-bold text-sm text-gray-800 mb-2">🎯 Support Area</h3>
            <p className="text-xs text-gray-600">Challenge, Rewards, Account</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default LiveChat
