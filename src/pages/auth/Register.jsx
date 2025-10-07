import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuthStore } from '../../store/authStore'
import { ArrowLeft, User, Mail, Lock, Eye, EyeOff, CheckCircle, Bike, Check, X } from 'lucide-react'

const Register = () => {
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    motorcycles: [], // Changed to array for multiple selection
    agreeTerms: false
  })
  
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})

  // Data pilihan motor Yamaha (diringkas dari lini resmi Yamaha Indonesia)
  const yamahaMotorcycles = [
    { value: '', label: 'Pilih Motor Yamaha Anda' },
    // MAXi Series
    { value: 'xmax-connected', label: 'MAXi — XMAX Connected' },
    { value: 'all-new-nmax-155', label: 'MAXi — All New NMAX 155' },
    { value: 'aerox-155-connected', label: 'MAXi — AEROX 155 Connected' },
    { value: 'lexi', label: 'MAXi — Lexi' },
    { value: 'lexi-s', label: 'MAXi — Lexi S' },
    { value: 'lexi-155', label: 'MAXi — Lexi 155' },
    // Classy Series
    { value: 'fazzio-hybrid', label: 'Classy — Fazzio Hybrid' },
    { value: 'grand-filano-hybrid', label: 'Classy — Grand Filano Hybrid' },
    // Matic Series
    { value: 'gear-125', label: 'Matic — GEAR 125' },
    { value: 'freego', label: 'Matic — FreeGo' },
    { value: 'mio-m3', label: 'Matic — Mio M3' },
    // Sport Series
    { value: 'yzf-r15-connected', label: 'Sport — YZF-R15 Connected' },
    { value: 'yzf-r25', label: 'Sport — YZF-R25' },
    { value: 'mt-15', label: 'Sport — MT-15' },
    { value: 'mt-25', label: 'Sport — MT-25' },
    { value: 'xsr-155', label: 'Sport — XSR 155' },
    { value: 'vixion', label: 'Sport — Vixion' },
    // Off-road / Adventure
    { value: 'wr155r', label: 'Off-road — WR155R' },
    // Moped / Bebek
    { value: 'mx-king-150', label: 'Moped — MX King 150' },
    { value: 'jupiter-z1', label: 'Moped — Jupiter Z1' },
    { value: 'vega-force', label: 'Moped — Vega Force' },
    // Lainnya
    { value: 'other', label: 'Lainnya' }
  ]

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  // Handle multiple motorcycle selection
  const handleMotorcycleChange = (motorcycleValue) => {
    setFormData(prev => {
      const currentMotorcycles = prev.motorcycles
      const isSelected = currentMotorcycles.includes(motorcycleValue)
      
      let newMotorcycles
      if (isSelected) {
        // Remove motorcycle if already selected
        newMotorcycles = currentMotorcycles.filter(m => m !== motorcycleValue)
      } else {
        // Add motorcycle if not selected
        newMotorcycles = [...currentMotorcycles, motorcycleValue]
      }
      
      return {
        ...prev,
        motorcycles: newMotorcycles
      }
    })
    
    // Clear error when user makes selection
    if (errors.motorcycles) {
      setErrors(prev => ({
        ...prev,
        motorcycles: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Nama lengkap harus diisi'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email harus diisi'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Format email tidak valid'
    }
    
    if (!formData.password) {
      newErrors.password = 'Password harus diisi'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password minimal 6 karakter'
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Password tidak sama'
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Nomor telepon harus diisi'
    }
    
    if (formData.motorcycles.length === 0) {
      newErrors.motorcycles = 'Pilih minimal satu motor Yamaha'
    }
    
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'Anda harus menyetujui syarat dan ketentuan'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsLoading(true)
    
    // Simulasi API call
    setTimeout(() => {
      setIsLoading(false)
      
      // Mock user data untuk demo
      const selectedMotorcycles = formData.motorcycles.map(motorcycleValue => {
        const motorcycle = yamahaMotorcycles.find(m => m.value === motorcycleValue)
        return {
          value: motorcycleValue,
          label: motorcycle?.label || 'Unknown'
        }
      })

      const newUserData = {
        id: 'user-' + Date.now(),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        motorcycles: selectedMotorcycles, // Array of motorcycle objects
        primaryMotorcycle: selectedMotorcycles[0]?.value || '', // First motorcycle as primary
        primaryMotorcycleName: selectedMotorcycles[0]?.label || 'Unknown',
        picture: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}&background=0066B3&color=fff&size=200`,
        points: 0,
        rank: 'Rookie',
        level: 1,
        completedChallenges: 0,
        joinedDate: new Date().toISOString(),
      }
      
      const dummyToken = 'demo-token-' + Date.now()
      
      // Save to store
      login(newUserData, dummyToken)
      
      // Scroll to top and redirect to dashboard
      window.scrollTo({ top: 0, behavior: 'smooth' })
      navigate('/dashboard')
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yamaha-blue via-blue-600 to-yamaha-dark flex flex-col">
      {/* Header */}
      <div className="safe-top p-4">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' })
            navigate('/login')
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
          <div className="text-center mb-8">
            <h1 className="text-4xl font-black text-white mb-2 drop-shadow-lg">
              YAMAHA WARIOR
            </h1>
            <p className="text-white/95 text-lg font-medium">
              Bergabung dengan komunitas
            </p>
          </div>

          {/* Register Card */}
          <div className="bg-white p-8 shadow-2xl mb-6 border-l-4 border-yamaha-blue">
            <h2 className="text-2xl font-bold text-yamaha-dark mb-2 text-center">
              Daftar Akun Baru
            </h2>
            <p className="text-gray-600 text-center mb-8">
              Lengkapi data untuk bergabung
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Nama Lengkap */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Lengkap
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Masukkan nama lengkap"
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
                      errors.name ? 'border-red-500' : 'border-gray-200'
                    }`}
                  />
                </div>
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Masukkan email"
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
                      errors.email ? 'border-red-500' : 'border-gray-200'
                    }`}
                  />
                </div>
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nomor Telepon
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Masukkan nomor telepon"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
                      errors.phone ? 'border-red-500' : 'border-gray-200'
                    }`}
                  />
                </div>
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>

              {/* Motorcycle Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Motor Yamaha Anda <span className="text-gray-500">(Pilih satu atau lebih)</span>
                </label>
                
                {/* Selected Motorcycles Display */}
                {formData.motorcycles.length > 0 && (
                  <div className="mb-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm font-medium text-blue-800 mb-2">Motor yang dipilih:</p>
                    <div className="flex flex-wrap gap-2">
                      {formData.motorcycles.map((motorcycleValue) => {
                        const motorcycle = yamahaMotorcycles.find(m => m.value === motorcycleValue)
                        return (
                          <motion.span
                            key={motorcycleValue}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
                          >
                            {motorcycle?.label}
                            <button
                              type="button"
                              onClick={() => handleMotorcycleChange(motorcycleValue)}
                              className="ml-1 hover:bg-blue-200 rounded-full p-0.5 transition-colors"
                            >
                              <X size={12} />
                            </button>
                          </motion.span>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* Motorcycle Checkbox List */}
                <div className={`max-h-60 overflow-y-auto border rounded-lg p-3 space-y-2 ${
                  errors.motorcycles ? 'border-red-500' : 'border-gray-200'
                }`}>
                  {yamahaMotorcycles.filter(m => m.value !== '').map((motorcycle) => (
                    <motion.label
                      key={motorcycle.value}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={formData.motorcycles.includes(motorcycle.value)}
                        onChange={() => handleMotorcycleChange(motorcycle.value)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <Bike className="text-gray-400" size={16} />
                      <span className="text-sm text-gray-700 flex-1">{motorcycle.label}</span>
                      {formData.motorcycles.includes(motorcycle.value) && (
                        <Check className="text-blue-600" size={16} />
                      )}
                    </motion.label>
                  ))}
                </div>
                {errors.motorcycles && <p className="text-red-500 text-xs mt-1">{errors.motorcycles}</p>}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Masukkan password"
                    className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
                      errors.password ? 'border-red-500' : 'border-gray-200'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Konfirmasi Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Ulangi password"
                    className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
                      errors.confirmPassword ? 'border-red-500' : 'border-gray-200'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
              </div>

              {/* Terms Agreement */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleInputChange}
                  className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label className="text-sm text-gray-600">
                  Saya menyetujui{' '}
                  <button type="button" className="text-blue-600 hover:text-blue-700 font-medium">
                    Syarat & Ketentuan
                  </button>{' '}
                  dan{' '}
                  <button type="button" className="text-blue-600 hover:text-blue-700 font-medium">
                    Kebijakan Privasi
                  </button>
                </label>
              </div>
              {errors.agreeTerms && <p className="text-red-500 text-xs mt-1">{errors.agreeTerms}</p>}

              {/* Submit Button */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-yamaha-blue to-blue-600 text-white font-bold py-4 px-6 flex items-center justify-center gap-3 hover:from-blue-600 hover:to-yamaha-blue transition-all shadow-lg hover:shadow-xl clip-corner disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Membuat Akun...
                  </>
                ) : (
                  <>
                    <CheckCircle size={20} />
                    Daftar Sekarang
                  </>
                )}
              </motion.button>
            </form>

            {/* Login Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Sudah punya akun?{' '}
                <button
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                    navigate('/login')
                  }}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Masuk di sini
                </button>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Register
