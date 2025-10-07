import { motion } from 'framer-motion'
import { ArrowLeft, FileText, Shield, Users, Bell } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const TermsConditions = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-yamaha-blue to-blue-600 text-white p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <FileText size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-black">Syarat & Ketentuan</h1>
                <p className="text-white/80">Yamaha Warrior Community</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="p-8">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-yamaha-dark mb-6">Syarat & Ketentuan Yamaha Warrior</h2>
              
              <div className="space-y-6">
                <section>
                  <h3 className="text-xl font-semibold text-yamaha-dark mb-3 flex items-center gap-2">
                    <Shield size={20} />
                    1. Penerimaan Syarat
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Dengan menggunakan aplikasi Yamaha Warrior, Anda menyetujui untuk terikat oleh syarat dan ketentuan ini. 
                    Jika Anda tidak menyetujui syarat-syarat ini, harap tidak menggunakan aplikasi ini.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-yamaha-dark mb-3 flex items-center gap-2">
                    <Users size={20} />
                    2. Keanggotaan
                  </h3>
                  <div className="text-gray-700 leading-relaxed space-y-3">
                    <p>• Keanggotaan Yamaha Warrior terbuka untuk pemilik motor Yamaha</p>
                    <p>• Setiap anggota bertanggung jawab untuk menjaga keamanan akun mereka</p>
                    <p>• Yamaha berhak menonaktifkan akun yang melanggar ketentuan</p>
                    <p>• Satu orang hanya dapat memiliki satu akun</p>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-yamaha-dark mb-3 flex items-center gap-2">
                    <Bell size={20} />
                    3. Challenge & Rewards
                  </h3>
                  <div className="text-gray-700 leading-relaxed space-y-3">
                    <p>• Challenge dapat berubah sewaktu-waktu tanpa pemberitahuan sebelumnya</p>
                    <p>• Rewards memiliki masa berlaku dan syarat penukaran tertentu</p>
                    <p>• Yamaha berhak membatalkan reward jika ditemukan pelanggaran</p>
                    <p>• Poin tidak dapat ditransfer ke akun lain</p>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-yamaha-dark mb-3">4. Konten & Perilaku</h3>
                  <div className="text-gray-700 leading-relaxed space-y-3">
                    <p>• Anggota dilarang mengunggah konten yang melanggar hukum atau SARA</p>
                    <p>• Konten yang diunggah harus asli dan tidak melanggar hak cipta</p>
                    <p>• Dilarang melakukan spam atau aktivitas yang mengganggu pengguna lain</p>
                    <p>• Yamaha berhak menghapus konten yang melanggar ketentuan</p>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-yamaha-dark mb-3">5. Pembatasan Tanggung Jawab</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Yamaha tidak bertanggung jawab atas kerugian yang timbul dari penggunaan aplikasi ini, 
                    termasuk namun tidak terbatas pada kehilangan data, gangguan layanan, atau kerugian finansial.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-yamaha-dark mb-3">6. Perubahan Ketentuan</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Yamaha berhak mengubah syarat dan ketentuan ini sewaktu-waktu. 
                    Perubahan akan diberitahukan melalui aplikasi atau email. 
                    Penggunaan berkelanjutan setelah perubahan dianggap sebagai persetujuan.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-yamaha-dark mb-3">7. Hukum yang Berlaku</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Syarat dan ketentuan ini diatur oleh hukum Republik Indonesia. 
                    Setiap sengketa akan diselesaikan melalui pengadilan yang berwenang di Jakarta.
                  </p>
                </section>
              </div>

              <div className="mt-8 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <p className="text-sm text-blue-800">
                  <strong>Terakhir diperbarui:</strong> {new Date().toLocaleDateString('id-ID', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default TermsConditions
