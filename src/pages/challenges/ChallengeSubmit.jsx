import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Header from '../../components/Header'
import AlertModal from '../../components/AlertModal'
import { Upload, Image, X, CheckCircle, Instagram, Hash } from 'lucide-react'

const ChallengeSubmit = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm()
  
  // Alert modal state
  const [alertModal, setAlertModal] = useState({
    show: false,
    title: '',
    message: '',
    type: 'info'
  })

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files)
    const newFiles = files.map((file) => ({
      id: Math.random().toString(36),
      file: file,
      preview: URL.createObjectURL(file),
    }))
    setUploadedFiles([...uploadedFiles, ...newFiles])
  }

  const removeFile = (id) => {
    setUploadedFiles(uploadedFiles.filter((f) => f.id !== id))
  }

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }, [])

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    
    // Scroll to top before submission
    window.scrollTo({ top: 0, behavior: 'smooth' })
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    
    // In production, send data to backend
    console.log('Submission:', { ...data, files: uploadedFiles })
    
    // Show success alert modal
    setAlertModal({
      show: true,
      title: 'Challenge Berhasil Disubmit!',
      message: 'Poin akan ditambahkan setelah review oleh tim Yamaha Warior. Terima kasih telah berpartisipasi!',
      type: 'success'
    })
    
    setIsSubmitting(false)
  }

  const handleAlertClose = () => {
    setAlertModal(prev => ({ ...prev, show: false }))
    navigate('/challenges', { 
      state: { 
        success: true, 
        message: 'Challenge submitted successfully! Points will be added after review.' 
      }
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100">
      <Header title="Submit Challenge" showBack={true} />

      <div className="max-w-lg mx-auto px-6 py-6">
        {/* Info Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-yamaha-blue/10 to-blue-50 border-l-4 border-yamaha-blue rounded-xl p-4 mb-6"
        >
          <div className="flex gap-3">
            <CheckCircle size={20} className="text-yamaha-blue flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-yamaha-dark text-sm mb-1">
                Panduan Submission
              </h3>
              <p className="text-yamaha-dark/80 text-xs leading-relaxed">
                Pastikan screenshot-mu menampilkan dengan jelas postingan, username, dan semua hashtag serta mention yang diperlukan.
              </p>
            </div>
          </div>
        </motion.div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Upload Screenshot */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6"
          >
            <h2 className="font-bold text-lg text-yamaha-dark mb-4">Upload Screenshot</h2>
            
            {/* Upload Area */}
            <label className="block border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-yamaha-blue hover:bg-yamaha-blue/5 transition-all duration-300 group">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileUpload}
                className="hidden"
              />
              <Upload size={40} className="mx-auto text-gray-400 group-hover:text-yamaha-blue mb-3 transition-colors" />
              <p className="font-semibold text-yamaha-dark mb-1 group-hover:text-yamaha-blue transition-colors">
                Upload Screenshot
              </p>
              <p className="text-sm text-gray-500 group-hover:text-yamaha-dark/70 transition-colors">
                PNG, JPG maksimal 10MB
              </p>
            </label>

            {/* Preview Uploaded Files */}
            {uploadedFiles.length > 0 && (
              <div className="mt-4 grid grid-cols-2 gap-3">
                {uploadedFiles.map((file) => (
                  <div key={file.id} className="relative group">
                    <img
                      src={file.preview}
                      alt="Preview"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeFile(file.id)}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Social Media Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-6"
          >
            <h2 className="font-bold text-lg text-yamaha-dark mb-4">Detail Social Media</h2>
            
            {/* Instagram Username */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-yamaha-dark mb-2">
                <div className="flex items-center gap-2">
                  <Instagram size={16} />
                  Username Instagram
                </div>
              </label>
              <input
                type="text"
                placeholder="@username_kamu"
                {...register('instagram')}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yamaha-blue focus:border-transparent"
              />
            </div>

            {/* Post URL */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-yamaha-dark mb-2">
                URL Postingan (Opsional)
              </label>
              <input
                type="url"
                placeholder="https://instagram.com/p/..."
                {...register('postUrl')}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yamaha-blue focus:border-transparent"
              />
            </div>

            {/* Hashtags Used */}
            <div>
              <label className="block text-sm font-semibold text-yamaha-dark mb-2">
                <div className="flex items-center gap-2">
                  <Hash size={16} />
                  Hashtag yang Digunakan
                </div>
              </label>
              <textarea
                placeholder="#YamahaWarior #YamahaMotorIndonesia"
                {...register('hashtags')}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yamaha-blue focus:border-transparent resize-none"
              />
            </div>
          </motion.div>

          {/* Additional Notes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-6"
          >
            <h2 className="font-bold text-lg text-yamaha-dark mb-4">Catatan Tambahan</h2>
            <textarea
              placeholder="Ceritakan lebih lanjut tentang submission kamu (opsional)"
              {...register('notes')}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yamaha-blue focus:border-transparent resize-none"
            />
          </motion.div>

          {/* Terms */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-start gap-3"
          >
            <input
              type="checkbox"
              {...register('terms')}
              className="mt-1"
            />
            <label className="text-sm text-gray-600">
              Saya konfirmasi bahwa ini adalah konten asli saya dan saya setuju dengan{' '}
              <a href="#" className="text-yamaha-blue font-semibold">
                Syarat & Ketentuan
              </a>
            </label>
          </motion.div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full font-bold text-lg py-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-lg ${
              isSubmitting
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none'
                : 'bg-gradient-yamaha text-white hover:shadow-xl hover:shadow-yamaha-blue/25'
            }`}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                Mengirim...
              </>
            ) : (
              <>
                <CheckCircle size={24} />
                Submit Challenge
              </>
            )}
          </motion.button>
        </form>
      </div>

      {/* Alert Modal */}
      <AlertModal
        show={alertModal.show}
        onClose={handleAlertClose}
        title={alertModal.title}
        message={alertModal.message}
        type={alertModal.type}
        buttonText="OK"
      />
    </div>
  )
}

export default ChallengeSubmit
