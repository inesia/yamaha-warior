import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuthStore } from '../../store/authStore'
import { Chrome, ArrowLeft } from 'lucide-react'

const Login = () => {
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)

  // DUMMY LOGIN - For demo purposes only
  const handleGoogleLogin = () => {
    // Mock user data untuk demo
    const dummyUserData = {
      id: 'demo-user-' + Date.now(),
      name: 'Demo Warior',
      email: 'demo@yamahawarior.com',
      picture: 'https://ui-avatars.com/api/?name=Demo+Warior&background=0066B3&color=fff&size=200',
      points: 1250,
      rank: 'Silver Warior',
      level: 5,
      completedChallenges: 8,
      joinedDate: new Date().toISOString(),
    }
    
    const dummyToken = 'demo-token-' + Date.now()
    
    // Save to store
    login(dummyUserData, dummyToken)
    
    // Check if user was trying to join a specific challenge
    const selectedChallengeId = localStorage.getItem('selectedChallengeId')
    if (selectedChallengeId) {
      // Clear the stored challenge ID
      localStorage.removeItem('selectedChallengeId')
      // Show success message and redirect to the specific challenge
      alert('Login berhasil! Kamu akan diarahkan ke challenge yang dipilih.')
      navigate(`/challenges/${selectedChallengeId}`)
    } else {
      // Redirect to dashboard
      navigate('/dashboard')
    }
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-yamaha-blue via-blue-600 to-yamaha-dark flex flex-col">
      {/* Header */}
      <div className="safe-top p-4">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/')}
          className="p-2 -ml-2 text-white bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors border-l-4 border-white/40"
        >
          <ArrowLeft size={24} />
        </motion.button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center px-6 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md mx-auto w-full"
        >
          {/* Logo/Brand */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-black text-white mb-4 drop-shadow-lg">
              YAMAHA<br/>WARIOR
            </h1>
            <p className="text-white/95 text-lg font-medium">
              Masuk untuk ikuti challenge
            </p>
          </div>

          {/* Login Card */}
          <div className="bg-white p-8 shadow-2xl mb-6 border-l-4 border-yamaha-blue">
            <h2 className="text-2xl font-bold text-yamaha-dark mb-2 text-center">
              Selamat Datang Kembali!
            </h2>
            <p className="text-gray-600 text-center mb-8">
              Lanjutkan perjalanan kamu sebagai Yamaha Warior
            </p>

            {/* Google Login Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGoogleLogin}
              className="w-full bg-gradient-to-r from-yamaha-blue to-blue-600 text-white font-bold py-4 px-6 flex items-center justify-center gap-3 hover:from-blue-600 hover:to-yamaha-blue transition-all shadow-lg hover:shadow-xl clip-corner"
            >
              <Chrome size={24} />
              Masuk dengan Google
            </motion.button>

            <p className="text-xs text-gray-500 text-center mt-6">
              Dengan masuk, kamu setuju dengan Syarat & Ketentuan serta Kebijakan Privasi kami
            </p>
          </div>

        </motion.div>
      </div>
    </div>
  )
}

export default Login
