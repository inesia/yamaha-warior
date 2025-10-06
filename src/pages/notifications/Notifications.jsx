import { motion } from 'framer-motion'
import Header from '../../components/Header'
import { Bell, Trophy, Award, TrendingUp, Info, CheckCircle, Star, Zap, Gift, Target, Users, Calendar } from 'lucide-react'

const Notifications = () => {
  const notifications = [
    {
      id: 1,
      type: 'challenge',
      icon: Target,
      title: 'Challenge Baru Tersedia!',
      message: 'Challenge "Pilano My Style" sudah aktif. Ikuti sekarang dan raih hingga 300 poin!',
      time: '5 menit lalu',
      read: false,
    },
    {
      id: 2,
      type: 'success',
      icon: CheckCircle,
      title: 'Challenge Selesai!',
      message: 'Selamat! Kamu mendapat 100 poin untuk menyelesaikan "Share Your Daily Ride".',
      time: '2 jam lalu',
      read: false,
    },
    {
      id: 3,
      type: 'rank',
      icon: Star,
      title: 'Naik Peringkat!',
      message: 'Luar biasa! Kamu telah mencapai peringkat Rookie Warior. Terus semangat!',
      time: '1 hari lalu',
      read: true,
    },
    {
      id: 4,
      type: 'achievement',
      icon: Award,
      title: 'Pencapaian Baru Terbuka',
      message: 'Kamu mendapat badge pencapaian "First Step"!',
      time: '2 hari lalu',
      read: true,
    },
    {
      id: 5,
      type: 'info',
      icon: Gift,
      title: 'Event Khusus Weekend',
      message: 'Ikuti challenge weekend kami dan dapatkan 2x poin. Waktu terbatas!',
      time: '3 hari lalu',
      read: true,
    },
    {
      id: 6,
      type: 'challenge',
      icon: Trophy,
      title: 'Submission Disetujui',
      message: 'Submission kamu untuk "Weekend Warrior" telah disetujui. +250 poin!',
      time: '4 hari lalu',
      read: true,
    },
  ]

  const getIconColor = (type) => {
    switch (type) {
      case 'challenge':
        return 'bg-yamaha-blue/10 text-yamaha-blue'
      case 'success':
        return 'bg-green-100 text-green-600'
      case 'rank':
        return 'bg-yellow-100 text-yellow-600'
      case 'achievement':
        return 'bg-purple-100 text-purple-600'
      case 'info':
        return 'bg-blue-100 text-blue-600'
      default:
        return 'bg-gray-100 text-gray-600'
    }
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Notifikasi" showBack={true} showNotification={false} />

      <div className="max-w-lg mx-auto px-6 py-6">
        {/* Header Info */}
        {unreadCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-yamaha text-white p-4 mb-6 flex items-center justify-between clip-corner relative overflow-hidden"
          >
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-8 -translate-x-8"></div>
            
            <div className="flex items-center gap-3 relative z-10">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Bell size={20} />
              </div>
              <div>
                <p className="font-bold">Kamu punya {unreadCount} notifikasi baru</p>
                <p className="text-sm text-white/80">Tetap update dengan progress kamu</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Notifications List */}
        <div className="space-y-3">
          {notifications.map((notification, index) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`bg-white p-4 shadow-sm clip-corner ${
                !notification.read ? 'border-l-4 border-yamaha-blue' : ''
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className={`${getIconColor(notification.type)} w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0`}>
                  <notification.icon size={20} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h4 className={`font-bold ${!notification.read ? 'text-yamaha-dark' : 'text-gray-700'}`}>
                      {notification.title}
                    </h4>
                    {!notification.read && (
                      <span className="w-2 h-2 bg-yamaha-blue rounded-full flex-shrink-0 mt-2"></span>
                    )}
                  </div>
                  <p className={`text-sm mb-2 ${!notification.read ? 'text-gray-700' : 'text-gray-500'}`}>
                    {notification.message}
                  </p>
                  <span className="text-xs text-gray-500">{notification.time}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {notifications.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="bg-gradient-yamaha w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 clip-corner">
              <Bell size={32} className="text-white" />
            </div>
            <h3 className="font-bold text-lg text-yamaha-dark mb-2">Tidak Ada Notifikasi</h3>
            <p className="text-gray-600 text-sm">
              Semua sudah dibaca! Cek lagi nanti untuk update terbaru.
            </p>
          </motion.div>
        )}

        {/* Mark All as Read Button */}
        {unreadCount > 0 && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileTap={{ scale: 0.98 }}
            className="w-full mt-6 bg-white text-yamaha-blue border-2 border-yamaha-blue font-semibold py-3 hover:bg-yamaha-blue hover:text-white transition-colors clip-corner"
          >
            Tandai Semua Sudah Dibaca
          </motion.button>
        )}
      </div>
    </div>
  )
}

export default Notifications
