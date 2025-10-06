import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import Header from '../../components/Header'
import AlertModal from '../../components/AlertModal'
import { 
  Gift, 
  Trophy, 
  Star, 
  Award, 
  ShoppingBag, 
  Clock, 
  CheckCircle, 
  Zap,
  Crown,
  Target,
  Heart,
  Sparkles,
  X,
  Upload,
  FileText,
  Car,
  User,
  AlertCircle
} from 'lucide-react'

const Rewards = () => {
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)
  
  // Modal states
  const [showVerificationModal, setShowVerificationModal] = useState(false)
  const [selectedReward, setSelectedReward] = useState(null)
  const [verificationStep, setVerificationStep] = useState(1) // 1: Form, 2: Upload, 3: Review
  
  // Verification form data
  const [verificationData, setVerificationData] = useState({
    fullName: '',
    email: user?.email || '',
    phone: '',
    address: '',
    ktpNumber: '',
    stnkNumber: '',
    motorcycleBrand: 'Yamaha',
    motorcycleModel: '',
    motorcycleYear: '',
    ktpFile: null,
    stnkFile: null,
    selfieFile: null
  })
  
  const [uploadedFiles, setUploadedFiles] = useState({
    ktp: null,
    stnk: null,
    selfie: null
  })

  // Alert modal states
  const [alertModal, setAlertModal] = useState({
    show: false,
    title: '',
    message: '',
    type: 'info'
  })

  // Mock data untuk rewards yang tersedia
  const availableRewards = [
    {
      id: 1,
      title: 'Yamaha Merchandise Pack',
      description: 'Tas Yamaha, Sticker Set, dan Keychain Eksklusif',
      points: 500,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop',
      category: 'Merchandise',
      stock: 50,
      icon: ShoppingBag,
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 2,
      title: 'Voucher Belanja 50K',
      description: 'Voucher belanja di dealer Yamaha resmi',
      points: 750,
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
      category: 'Voucher',
      stock: 25,
      icon: Gift,
      color: 'from-green-500 to-green-600'
    },
    {
      id: 3,
      title: 'Service Gratis',
      description: 'Service berkala gratis di dealer Yamaha',
      points: 1000,
      image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=300&fit=crop',
      category: 'Service',
      stock: 10,
      icon: Target,
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 4,
      title: 'Yamaha Helmet Premium',
      description: 'Helmet Yamaha dengan desain eksklusif',
      points: 2000,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      category: 'Safety Gear',
      stock: 5,
      icon: Crown,
      color: 'from-red-500 to-red-600'
    }
  ]

  // Mock data untuk rewards yang sudah ditebus
  const redeemedRewards = [
    {
      id: 1,
      title: 'Yamaha Sticker Pack',
      points: 200,
      redeemedDate: '2024-01-15',
      status: 'completed',
      icon: Star
    },
    {
      id: 2,
      title: 'Voucher 25K',
      points: 400,
      redeemedDate: '2024-01-10',
      status: 'pending',
      icon: Clock
    }
  ]

  const handleRedeem = (reward) => {
    if (user?.points < reward.points) {
      setAlertModal({
        show: true,
        title: 'Poin Tidak Cukup',
        message: `Kamu membutuhkan ${reward.points} poin untuk redeem hadiah ini. Saat ini kamu memiliki ${user?.points || 0} poin.`,
        type: 'warning'
      })
      return
    }
    
    setSelectedReward(reward)
    setShowVerificationModal(true)
    setVerificationStep(1)
  }

  const handleFileUpload = (type, file) => {
    const newFile = {
      id: Math.random().toString(36),
      file: file,
      preview: URL.createObjectURL(file),
      name: file.name,
      size: file.size
    }
    
    setUploadedFiles(prev => ({
      ...prev,
      [type]: newFile
    }))
  }

  const removeFile = (type) => {
    if (uploadedFiles[type]) {
      URL.revokeObjectURL(uploadedFiles[type].preview)
    }
    setUploadedFiles(prev => ({
      ...prev,
      [type]: null
    }))
  }

  const handleInputChange = (field, value) => {
    setVerificationData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const nextStep = () => {
    if (verificationStep < 3) {
      setVerificationStep(prev => prev + 1)
    }
  }

  const prevStep = () => {
    if (verificationStep > 1) {
      setVerificationStep(prev => prev - 1)
    }
  }

  const submitVerification = () => {
    // Simulate verification submission for demo
    setShowVerificationModal(false)
    setVerificationStep(1)
    setSelectedReward(null)
    setUploadedFiles({ ktp: null, stnk: null, selfie: null })
    setVerificationData({
      fullName: '',
      email: user?.email || '',
      phone: '',
      address: '',
      ktpNumber: '',
      stnkNumber: '',
      motorcycleBrand: 'Yamaha',
      motorcycleModel: '',
      motorcycleYear: '',
      ktpFile: null,
      stnkFile: null,
      selfieFile: null
    })
    
    // Show success modal
    setAlertModal({
      show: true,
      title: 'Verifikasi Berhasil!',
      message: 'Demo: Data verifikasi berhasil dikirim! Proses verifikasi akan disimulasikan. Tim kami akan memverifikasi data kamu dalam 1-3 hari kerja.',
      type: 'success'
    })
  }

  const closeModal = () => {
    setShowVerificationModal(false)
    setVerificationStep(1)
    setSelectedReward(null)
    setUploadedFiles({ ktp: null, stnk: null, selfie: null })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Hadiah Saya" showBack={true} />

      <div className="max-w-lg mx-auto px-6 py-6">
        {/* User Points Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-yamaha p-6 mb-6 text-white clip-corner relative overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-black text-white mb-1">Poin Saya</h2>
                <p className="text-white/80 text-sm">Tukarkan poin untuk hadiah menarik</p>
              </div>
              <div className="text-right">
                <div className="text-4xl font-black text-white mb-1">{user?.points || 0}</div>
                <div className="text-sm text-white/70 font-semibold">Total Poin</div>
              </div>
            </div>
            
            {/* Progress to next reward */}
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-white/90 font-semibold">Progress ke hadiah berikutnya</span>
                <span className="text-white font-bold">{user?.points || 0} / 500 pts</span>
              </div>
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-white transition-all duration-500"
                  style={{ width: `${Math.min(((user?.points || 0) / 500) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Available Rewards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Gift size={20} className="text-yamaha-dark" />
            <h2 className="text-xl font-bold text-yamaha-dark">Hadiah Tersedia</h2>
          </div>

          <div className="space-y-4">
            {availableRewards.map((reward) => (
              <motion.div
                key={reward.id}
                whileHover={{ y: -2 }}
                className="bg-white p-4 shadow-sm hover:shadow-lg transition-all border-l-4 border-yamaha-blue"
              >
                <div className="flex gap-4">
                  <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                    <img 
                      src={reward.image} 
                      alt={reward.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-yamaha-dark mb-1">{reward.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{reward.description}</p>
                      </div>
                      <div className={`w-8 h-8 ${reward.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                        <reward.icon size={16} className="text-white" />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs">
                        <span className="bg-yamaha-blue text-white px-2 py-1 font-bold">
                          {reward.points} pts
                        </span>
                        <span className="text-gray-500 font-semibold">
                          Stock: {reward.stock}
                        </span>
                      </div>
                      
                      <button
                        onClick={() => handleRedeem(reward)}
                        disabled={user?.points < reward.points || reward.stock === 0}
                        className={`px-4 py-2 text-sm font-bold transition-all ${
                          user?.points >= reward.points && reward.stock > 0
                            ? 'bg-yamaha-blue text-white hover:bg-yamaha-blue/90'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        {user?.points >= reward.points ? 'Redeem' : 'Poin Kurang'}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Redeemed Rewards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Trophy size={20} className="text-yamaha-dark" />
            <h2 className="text-xl font-bold text-yamaha-dark">Hadiah Ditebus</h2>
          </div>

          <div className="space-y-3">
            {redeemedRewards.map((reward) => (
              <div key={reward.id} className="bg-white p-4 shadow-sm border-l-4 border-green-500">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <reward.icon size={18} className="text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-yamaha-dark">{reward.title}</h3>
                      <p className="text-sm text-gray-600">{reward.points} poin • {reward.redeemedDate}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <span className={`text-xs px-2 py-1 rounded-full font-bold ${
                      reward.status === 'completed' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {reward.status === 'completed' ? 'Selesai' : 'Pending'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-yamaha-blue/10 to-transparent border-l-4 border-yamaha-blue p-4"
        >
          <div className="flex items-start gap-3">
            <Sparkles size={20} className="text-yamaha-blue flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-yamaha-dark mb-2">Tips Mendapatkan Poin</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Selesaikan challenge harian untuk mendapat poin</li>
                <li>• Bagikan konten di social media dengan hashtag resmi</li>
                <li>• Ajak teman bergabung untuk bonus poin</li>
                <li>• Ikuti event khusus untuk poin 2x lipat</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Verification Drawer */}
      {showVerificationModal && (
        <div 
          className="fixed inset-0 bg-black/50 z-50"
          onClick={closeModal}
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", duration: 0.4, bounce: 0.1 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between z-10">
              <div>
                <h2 className="text-xl font-bold text-yamaha-dark">Verifikasi Data</h2>
                <p className="text-sm text-gray-600">Step {verificationStep} dari 3</p>
              </div>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={24} className="text-gray-500" />
              </button>
            </div>

            {/* Drawer Content */}
            <div className="p-6 pb-20">
              {/* Step 1: Personal Information */}
              {verificationStep === 1 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <User size={20} className="text-yamaha-blue" />
                    <h3 className="font-bold text-yamaha-dark">Informasi Pribadi</h3>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      value={verificationData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yamaha-blue focus:border-transparent"
                      placeholder="Masukkan nama lengkap sesuai KTP"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={verificationData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yamaha-blue focus:border-transparent"
                      placeholder="email@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Nomor Telepon
                    </label>
                    <input
                      type="tel"
                      value={verificationData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yamaha-blue focus:border-transparent"
                      placeholder="08xxxxxxxxxx"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Alamat Lengkap
                    </label>
                    <textarea
                      value={verificationData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yamaha-blue focus:border-transparent"
                      rows={3}
                      placeholder="Masukkan alamat lengkap untuk pengiriman hadiah"
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Document Upload */}
              {verificationStep === 2 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 mb-4">
                    <FileText size={20} className="text-yamaha-blue" />
                    <h3 className="font-bold text-yamaha-dark">Upload Dokumen</h3>
                  </div>

                  {/* KTP Upload */}
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                    <div className="text-center">
                      <FileText size={32} className="text-gray-400 mx-auto mb-2" />
                      <h4 className="font-semibold text-gray-700 mb-1">Upload KTP</h4>
                      <p className="text-sm text-gray-500 mb-3">Foto KTP yang jelas dan terbaca</p>
                      
                      {uploadedFiles.ktp ? (
                        <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                          <div className="flex items-center gap-2">
                            <FileText size={16} className="text-green-600" />
                            <span className="text-sm font-medium">{uploadedFiles.ktp.name}</span>
                          </div>
                          <button
                            onClick={() => removeFile('ktp')}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ) : (
                        <div>
                          <input
                            type="file"
                            id="ktp-upload"
                            accept="image/*"
                            onChange={(e) => handleFileUpload('ktp', e.target.files[0])}
                            className="hidden"
                          />
                          <label
                            htmlFor="ktp-upload"
                            className="inline-flex items-center gap-2 bg-yamaha-blue text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-yamaha-blue/90 transition-colors"
                          >
                            <Upload size={16} />
                            Pilih File
                          </label>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* STNK Upload */}
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                    <div className="text-center">
                      <Car size={32} className="text-gray-400 mx-auto mb-2" />
                      <h4 className="font-semibold text-gray-700 mb-1">Upload STNK</h4>
                      <p className="text-sm text-gray-500 mb-3">STNK motor Yamaha yang masih berlaku</p>
                      
                      {uploadedFiles.stnk ? (
                        <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                          <div className="flex items-center gap-2">
                            <Car size={16} className="text-green-600" />
                            <span className="text-sm font-medium">{uploadedFiles.stnk.name}</span>
                          </div>
                          <button
                            onClick={() => removeFile('stnk')}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ) : (
                        <div>
                          <input
                            type="file"
                            id="stnk-upload"
                            accept="image/*"
                            onChange={(e) => handleFileUpload('stnk', e.target.files[0])}
                            className="hidden"
                          />
                          <label
                            htmlFor="stnk-upload"
                            className="inline-flex items-center gap-2 bg-yamaha-blue text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-yamaha-blue/90 transition-colors"
                          >
                            <Upload size={16} />
                            Pilih File
                          </label>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Selfie Upload */}
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                    <div className="text-center">
                      <User size={32} className="text-gray-400 mx-auto mb-2" />
                      <h4 className="font-semibold text-gray-700 mb-1">Upload Selfie</h4>
                      <p className="text-sm text-gray-500 mb-3">Selfie dengan KTP untuk verifikasi identitas</p>
                      
                      {uploadedFiles.selfie ? (
                        <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                          <div className="flex items-center gap-2">
                            <User size={16} className="text-green-600" />
                            <span className="text-sm font-medium">{uploadedFiles.selfie.name}</span>
                          </div>
                          <button
                            onClick={() => removeFile('selfie')}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ) : (
                        <div>
                          <input
                            type="file"
                            id="selfie-upload"
                            accept="image/*"
                            onChange={(e) => handleFileUpload('selfie', e.target.files[0])}
                            className="hidden"
                          />
                          <label
                            htmlFor="selfie-upload"
                            className="inline-flex items-center gap-2 bg-yamaha-blue text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-yamaha-blue/90 transition-colors"
                          >
                            <Upload size={16} />
                            Pilih File
                          </label>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Review & Submit */}
              {verificationStep === 3 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle size={20} className="text-yamaha-blue" />
                    <h3 className="font-bold text-yamaha-dark">Review Data</h3>
                  </div>

                  {/* Selected Reward */}
                  {selectedReward && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-yamaha-dark mb-2">Hadiah yang akan di-redeem:</h4>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden">
                          <img src={selectedReward.image} alt={selectedReward.title} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="font-semibold text-yamaha-dark">{selectedReward.title}</p>
                          <p className="text-sm text-gray-600">{selectedReward.points} poin</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Personal Info Review */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-yamaha-dark">Data Pribadi:</h4>
                    <div className="bg-gray-50 p-3 rounded-lg space-y-1">
                      <p className="text-sm"><span className="font-medium">Nama:</span> {verificationData.fullName}</p>
                      <p className="text-sm"><span className="font-medium">Email:</span> {verificationData.email}</p>
                      <p className="text-sm"><span className="font-medium">Telepon:</span> {verificationData.phone}</p>
                      <p className="text-sm"><span className="font-medium">Alamat:</span> {verificationData.address}</p>
                    </div>
                  </div>

                  {/* Documents Review */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-yamaha-dark">Dokumen:</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center gap-2">
                          <FileText size={16} className="text-gray-600" />
                          <span className="text-sm">KTP</span>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          uploadedFiles.ktp ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {uploadedFiles.ktp ? 'Uploaded' : 'Belum diupload'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Car size={16} className="text-gray-600" />
                          <span className="text-sm">STNK</span>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          uploadedFiles.stnk ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {uploadedFiles.stnk ? 'Uploaded' : 'Belum diupload'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center gap-2">
                          <User size={16} className="text-gray-600" />
                          <span className="text-sm">Selfie</span>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          uploadedFiles.selfie ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {uploadedFiles.selfie ? 'Uploaded' : 'Belum diupload'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Warning */}
                  <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                    <div className="flex items-start gap-2">
                      <AlertCircle size={16} className="text-blue-600 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-blue-800">
                        <p className="font-semibold mb-1">Demo Mode:</p>
                        <ul className="space-y-1 text-xs">
                          <li>• Semua field bersifat opsional untuk demo</li>
                          <li>• Upload dokumen tidak wajib untuk testing</li>
                          <li>• Proses verifikasi akan disimulasikan</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Drawer Footer */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 safe-bottom">
              <div className="flex gap-3">
                {verificationStep > 1 && (
                  <button
                    onClick={prevStep}
                    className="flex-1 py-4 px-4 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Kembali
                  </button>
                )}
                
                {verificationStep < 3 ? (
                  <button
                    onClick={nextStep}
                    className="flex-1 py-4 px-4 bg-yamaha-blue text-white font-semibold rounded-lg hover:bg-yamaha-blue/90 transition-colors"
                  >
                    Lanjut
                  </button>
                ) : (
                  <button
                    onClick={submitVerification}
                    className="flex-1 py-4 px-4 bg-yamaha-blue text-white font-semibold rounded-lg hover:bg-yamaha-blue/90 transition-colors"
                  >
                    Kirim Verifikasi
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Alert Modal */}
      <AlertModal
        show={alertModal.show}
        onClose={() => setAlertModal(prev => ({ ...prev, show: false }))}
        title={alertModal.title}
        message={alertModal.message}
        type={alertModal.type}
      />
    </div>
  )
}

export default Rewards
