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
    <div className="h-screen bg-white">
      <EmbeddedChat isFullPage={true} />
    </div>
  )
}

export default LiveChat
