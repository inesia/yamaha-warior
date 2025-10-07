import { motion } from 'framer-motion'
import { ArrowLeft, Shield, Eye, Lock, Database, Mail } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const PrivacyPolicy = () => {
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
                <Shield size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-black">Kebijakan Privasi</h1>
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
              <h2 className="text-2xl font-bold text-yamaha-dark mb-6">Kebijakan Privasi Yamaha Warrior</h2>
              
              <div className="space-y-6">
                <section>
                  <h3 className="text-xl font-semibold text-yamaha-dark mb-3 flex items-center gap-2">
                    <Eye size={20} />
                    1. Informasi yang Kami Kumpulkan
                  </h3>
                  <div className="text-gray-700 leading-relaxed space-y-3">
                    <p><strong>Data Pribadi:</strong></p>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li>Nama lengkap</li>
                      <li>Alamat email</li>
                      <li>Nomor telepon</li>
                      <li>Informasi motor Yamaha yang dimiliki</li>
                    </ul>
                    <p><strong>Data Penggunaan:</strong></p>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li>Riwayat challenge yang diikuti</li>
                      <li>Poin dan pencapaian</li>
                      <li>Interaksi dengan aplikasi</li>
                      <li>Data analitik penggunaan</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-yamaha-dark mb-3 flex items-center gap-2">
                    <Database size={20} />
                    2. Cara Kami Menggunakan Data
                  </h3>
                  <div className="text-gray-700 leading-relaxed space-y-3">
                    <p>• Menyediakan layanan aplikasi Yamaha Warrior</p>
                    <p>• Mengirim notifikasi tentang challenge dan event</p>
                    <p>• Memberikan rekomendasi yang personal</p>
                    <p>• Menganalisis penggunaan untuk perbaikan layanan</p>
                    <p>• Mengirim informasi promo dan produk Yamaha (dengan persetujuan)</p>
                    <p>• Memverifikasi keanggotaan dan mencegah penyalahgunaan</p>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-yamaha-dark mb-3 flex items-center gap-2">
                    <Lock size={20} />
                    3. Keamanan Data
                  </h3>
                  <div className="text-gray-700 leading-relaxed space-y-3">
                    <p>• Data disimpan dengan enkripsi yang aman</p>
                    <p>• Akses data dibatasi hanya untuk personel yang berwenang</p>
                    <p>• Sistem keamanan diperbarui secara berkala</p>
                    <p>• Backup data dilakukan secara rutin</p>
                    <p>• Tidak ada data yang dibagikan tanpa persetujuan eksplisit</p>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-yamaha-dark mb-3">4. Berbagi Data dengan Pihak Ketiga</h3>
                  <div className="text-gray-700 leading-relaxed space-y-3">
                    <p>Kami tidak menjual, menyewakan, atau membagikan data pribadi Anda kepada pihak ketiga, kecuali:</p>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li>Dengan persetujuan eksplisit dari Anda</li>
                      <li>Untuk memenuhi kewajiban hukum</li>
                      <li>Dengan penyedia layanan yang terpercaya (dengan perjanjian kerahasiaan)</li>
                      <li>Dalam hal merger atau akuisisi perusahaan</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-yamaha-dark mb-3 flex items-center gap-2">
                    <Mail size={20} />
                    5. Komunikasi & Marketing
                  </h3>
                  <div className="text-gray-700 leading-relaxed space-y-3">
                    <p>• Kami akan mengirim email/SMS hanya dengan persetujuan Anda</p>
                    <p>• Anda dapat berhenti berlangganan kapan saja</p>
                    <p>• Email penting tentang akun tetap akan dikirim</p>
                    <p>• Preferensi komunikasi dapat diubah di pengaturan akun</p>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-yamaha-dark mb-3">6. Hak Anda</h3>
                  <div className="text-gray-700 leading-relaxed space-y-3">
                    <p>Anda memiliki hak untuk:</p>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li>Mengakses data pribadi yang kami miliki</li>
                      <li>Memperbarui atau memperbaiki data yang tidak akurat</li>
                      <li>Menghapus akun dan data pribadi</li>
                      <li>Membatasi penggunaan data untuk tujuan tertentu</li>
                      <li>Mengajukan keluhan tentang pengolahan data</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-yamaha-dark mb-3">7. Penyimpanan Data</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Data pribadi akan disimpan selama akun Anda aktif dan selama diperlukan untuk menyediakan layanan. 
                    Data dapat dihapus setelah akun dinonaktifkan atau atas permintaan Anda.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-yamaha-dark mb-3">8. Perubahan Kebijakan</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Kebijakan privasi ini dapat diperbarui dari waktu ke waktu. 
                    Perubahan signifikan akan diberitahukan melalui aplikasi atau email. 
                    Penggunaan berkelanjutan setelah perubahan dianggap sebagai persetujuan.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-yamaha-dark mb-3">9. Kontak</h3>
                  <div className="text-gray-700 leading-relaxed space-y-3">
                    <p>Jika Anda memiliki pertanyaan tentang kebijakan privasi ini, silakan hubungi:</p>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p><strong>Email:</strong> privacy@yamaha-motor.co.id</p>
                      <p><strong>Telepon:</strong> 0804-1-123456</p>
                      <p><strong>Alamat:</strong> PT Yamaha Indonesia Motor Manufacturing, Jakarta</p>
                    </div>
                  </div>
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

export default PrivacyPolicy
