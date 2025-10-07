import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Play, Eye, Code, Smartphone, Monitor } from 'lucide-react'
import GoogleOneTapSimulation from '../../components/GoogleOneTapSimulation'

const GoogleOneTapDemo = () => {
  const [showSimulation, setShowSimulation] = useState(false)
  const [user, setUser] = useState(null)

  const handleSignIn = (credentials) => {
    setUser(credentials)
    console.log('User signed in:', credentials)
  }

  const handleClose = () => {
    setShowSimulation(false)
  }

  const triggerSimulation = () => {
    setShowSimulation(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-yamaha-blue to-blue-600 text-white p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => window.history.back()}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
              <div>
                <h1 className="text-2xl font-black">Google One Tap Simulation</h1>
                <p className="text-white/80">Demo simulasi Google One Tap tanpa API</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-6">
        {/* Demo Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8"
        >
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Play size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold">Live Demo</h2>
                <p className="text-white/80">Klik tombol di bawah untuk melihat simulasi Google One Tap</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Demo Button */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">Demo Interaktif</h3>
                <button
                  onClick={triggerSimulation}
                  className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-3"
                >
                  <Play size={20} />
                  Tampilkan Google One Tap
                </button>
                
                {user && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-semibold text-green-800 mb-2">✅ Berhasil Login!</h4>
                    <p className="text-sm text-green-700">Email: {user.email}</p>
                    <p className="text-sm text-green-700">Password: {'*'.repeat(user.password.length)}</p>
                  </div>
                )}
              </div>

              {/* Features */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">Fitur Simulasi</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">Animasi slide-in yang smooth</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">UI yang mirip dengan Google One Tap</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">Form login dengan validasi</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">Loading state yang realistis</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">Responsive design</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Code Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8"
        >
          <div className="bg-gray-800 p-4 text-white">
            <div className="flex items-center gap-3">
              <Code size={20} />
              <h3 className="text-lg font-semibold">Implementasi</h3>
            </div>
          </div>
          
          <div className="p-6">
            <div className="bg-gray-50 rounded-lg p-4 overflow-x-auto">
              <pre className="text-sm text-gray-800">
{`import GoogleOneTapSimulation from './components/GoogleOneTapSimulation'

const MyComponent = () => {
  const [showOneTap, setShowOneTap] = useState(false)
  
  const handleSignIn = (credentials) => {
    console.log('User signed in:', credentials)
    // Handle authentication logic here
  }
  
  return (
    <>
      <button onClick={() => setShowOneTap(true)}>
        Show Google One Tap
      </button>
      
      {showOneTap && (
        <GoogleOneTapSimulation
          onClose={() => setShowOneTap(false)}
          onSignIn={handleSignIn}
        />
      )}
    </>
  )
}`}
              </pre>
            </div>
          </div>
        </motion.div>

        {/* Device Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4 text-white">
            <div className="flex items-center gap-3">
              <Smartphone size={20} />
              <h3 className="text-lg font-semibold">Responsive Design</h3>
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Smartphone size={32} className="text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Mobile</h4>
                <p className="text-sm text-gray-600">Optimized untuk layar mobile dengan touch-friendly interface</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Monitor size={32} className="text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Desktop</h4>
                <p className="text-sm text-gray-600">Perfect untuk desktop dengan hover effects dan keyboard navigation</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Google One Tap Simulation Modal */}
      {showSimulation && (
        <GoogleOneTapSimulation
          onClose={handleClose}
          onSignIn={handleSignIn}
        />
      )}
    </div>
  )
}

export default GoogleOneTapDemo
