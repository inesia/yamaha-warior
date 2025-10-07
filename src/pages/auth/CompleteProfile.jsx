import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuthStore } from '../../store/authStore'
import { User, Mail, Bike, Phone, ArrowRight } from 'lucide-react'

const CompleteProfile = () => {
  const navigate = useNavigate()
  const updateUser = useAuthStore((state) => state.updateUser)
  const user = useAuthStore((state) => state.user)
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: '',
    motorcycle: '',
    agreeTerms: false,
    agreePrivacy: false,
    agreeMarketing: false
  })
  
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

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Nama lengkap harus diisi'
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Nomor telepon harus diisi'
    }
    
    if (!formData.motorcycle) {
      newErrors.motorcycle = 'Pilihan motor harus diisi'
    }
    
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'Anda harus menyetujui Syarat & Ketentuan'
    }
    
    if (!formData.agreePrivacy) {
      newErrors.agreePrivacy = 'Anda harus menyetujui Kebijakan Privasi'
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
      
      // Update user data
      const updatedUserData = {
        ...user,
        name: formData.name,
        phone: formData.phone,
        motorcycle: formData.motorcycle,
        motorcycleName: yamahaMotorcycles.find(m => m.value === formData.motorcycle)?.label || '',
        agreeTerms: formData.agreeTerms,
        agreePrivacy: formData.agreePrivacy,
        agreeMarketing: formData.agreeMarketing,
        profileCompleted: true,
        completedAt: new Date().toISOString()
      }
      
      updateUser(updatedUserData)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      navigate('/dashboard')
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yamaha-blue via-blue-600 to-yamaha-dark flex flex-col">
      {/* Content */}
      <div className="flex-1 flex flex-col justify-center px-6 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md mx-auto w-full"
        >
          {/* Welcome Message */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-black text-white mb-2 drop-shadow-lg">
              SELAMAT DATANG!
            </h1>
            <p className="text-white/95 text-lg font-medium">
              Lengkapi profil untuk pengalaman terbaik
            </p>
          </div>

          {/* Profile Completion Card */}
          <div className="bg-white p-8 shadow-2xl mb-6 border-l-4 border-yamaha-blue">
            <h2 className="text-2xl font-bold text-yamaha-dark mb-2 text-center">
              Lengkapi Profil Anda
            </h2>
            <p className="text-gray-600 text-center mb-8">
              Informasi ini akan membantu kami memberikan pengalaman yang lebih personal
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Nama Lengkap */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Lengkap <span className="text-red-500">*</span>
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

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nomor Telepon <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Masukkan nomor telepon"
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
                      errors.phone ? 'border-red-500' : 'border-gray-200'
                    }`}
                  />
                </div>
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>

              {/* Motorcycle Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Motor Yamaha Anda <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Bike className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <select
                    name="motorcycle"
                    value={formData.motorcycle}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all appearance-none bg-white ${
                      errors.motorcycle ? 'border-red-500' : 'border-gray-200'
                    }`}
                  >
                    {yamahaMotorcycles.map((motorcycle) => (
                      <option key={motorcycle.value} value={motorcycle.value}>
                        {motorcycle.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                {errors.motorcycle && <p className="text-red-500 text-xs mt-1">{errors.motorcycle}</p>}
              </div>

              {/* Terms & Conditions */}
              <div className="space-y-4 pt-4 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-700">Persetujuan</h3>
                
                {/* Terms & Conditions */}
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
                    <button 
                      type="button" 
                      onClick={() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                        navigate('/terms-conditions')
                      }}
                      className="text-blue-600 hover:text-blue-700 font-medium underline"
                    >
                      Syarat & Ketentuan
                    </button>{' '}
                    Yamaha Warrior <span className="text-red-500">*</span>
                  </label>
                </div>
                {errors.agreeTerms && <p className="text-red-500 text-xs mt-1 ml-7">{errors.agreeTerms}</p>}

                {/* Privacy Policy */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    name="agreePrivacy"
                    checked={formData.agreePrivacy}
                    onChange={handleInputChange}
                    className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label className="text-sm text-gray-600">
                    Saya menyetujui{' '}
                    <button 
                      type="button" 
                      onClick={() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                        navigate('/privacy-policy')
                      }}
                      className="text-blue-600 hover:text-blue-700 font-medium underline"
                    >
                      Kebijakan Privasi
                    </button>{' '}
                    dan pengolahan data pribadi <span className="text-red-500">*</span>
                  </label>
                </div>
                {errors.agreePrivacy && <p className="text-red-500 text-xs mt-1 ml-7">{errors.agreePrivacy}</p>}

                {/* Marketing Consent */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    name="agreeMarketing"
                    checked={formData.agreeMarketing}
                    onChange={handleInputChange}
                    className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label className="text-sm text-gray-600">
                    Saya setuju menerima informasi promo, event, dan update produk Yamaha melalui email/SMS
                  </label>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4">
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
                      Menyimpan...
                    </>
                  ) : (
                    <>
                      <ArrowRight size={20} />
                      Lengkapi Profil
                    </>
                  )}
                </motion.button>
              </div>
            </form>

            {/* Info Text */}
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                Semua field wajib diisi untuk pengalaman terbaik
              </p>
            </div>
          </div>

          {/* Benefits Info */}
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
            <h3 className="text-white font-bold mb-3">🎯 Manfaat Melengkapi Profil:</h3>
            <ul className="text-white/90 text-sm space-y-2">
              <li>• Rekomendasi challenge yang sesuai dengan motor Anda</li>
              <li>• Akses ke komunitas rider dengan motor yang sama</li>
              <li>• Notifikasi event dan promo khusus</li>
              <li>• Personalisasi pengalaman aplikasi</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default CompleteProfile
