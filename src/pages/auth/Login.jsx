import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuthStore } from '../../store/authStore'
import { Chrome, ArrowLeft } from 'lucide-react'
import { useState } from 'react'
import GoogleOneTapSimulation from '../../components/GoogleOneTapSimulation'
import AlertModal from '../../components/AlertModal'

const Login = () => {
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)
  const [showOneTap, setShowOneTap] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [alertData, setAlertData] = useState({})

  // Klik tombol Google akan memicu One Tap Simulation
  const handleGoogleLogin = () => {
    setShowOneTap(true)
  }

  // Callback saat user klik "Sign in" di modal simulasi
  const handleOneTapSignIn = ({ email }) => {
    const dummyUserData = {
      id: 'demo-user-' + Date.now(),
      name: 'Demo Warior',
      email: email || 'demo@yamahawarior.com',
      picture: 'https://ui-avatars.com/api/?name=Demo+Warior&background=0066B3&color=fff&size=200',
      points: 1250,
      rank: 'Silver Warior',
      level: 5,
      completedChallenges: 8,
      joinedDate: new Date().toISOString(),
      profileCompleted: false, // Set false untuk demo flow baru
    }

    const dummyToken = 'demo-token-' + Date.now()

    login(dummyUserData, dummyToken)

    // Cek apakah user sudah melengkapi profil
    if (!dummyUserData.profileCompleted) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      navigate('/complete-profile')
    } else {
      const selectedChallengeId = localStorage.getItem('selectedChallengeId')
      if (selectedChallengeId) {
        localStorage.removeItem('selectedChallengeId')
        setAlertData({
          title: 'Login Berhasil!',
          message: 'Kamu akan diarahkan ke challenge yang dipilih.',
          type: 'success'
        })
        setShowAlert(true)
        window.scrollTo({ top: 0, behavior: 'smooth' })
        navigate(`/challenges/${selectedChallengeId}`)
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        navigate('/dashboard')
      }
    }
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-yamaha-blue via-blue-600 to-yamaha-dark flex flex-col">
      {/* Header */}
      <div className="safe-top p-4">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' })
            navigate('/')
          }}
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

            {/* Info Text */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Dengan masuk menggunakan Google, Anda otomatis terdaftar sebagai member Yamaha Warrior
              </p>
            </div>
          </div>

        </motion.div>
      </div>

      {/* One Tap Simulation Modal */}
      {showOneTap && (
        <GoogleOneTapSimulation
          onClose={() => setShowOneTap(false)}
          onSignIn={handleOneTapSignIn}
        />
      )}

      {/* Alert Modal */}
      <AlertModal
        show={showAlert}
        onClose={() => setShowAlert(false)}
        title={alertData.title}
        message={alertData.message}
        type={alertData.type}
        buttonText="OK"
      />
    </div>
  )
}

export default Login
