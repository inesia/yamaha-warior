import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import Header from '../../components/Header'
import {
  Trophy,
  Award,
  Target,
  Calendar,
  Settings,
  History,
  Share2,
  LogOut,
  ChevronRight,
  Edit,
  Star,
  Zap,
  Crown,
  User,
  Activity,
  Gift,
  Camera,
  Heart,
} from 'lucide-react'

const Profile = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()

  const stats = [
    { label: 'Poin', value: user?.points || 0, icon: Trophy, color: 'text-yamaha-blue', bg: 'bg-yamaha-blue/10' },
    { label: 'Challenge', value: '0', icon: Target, color: 'text-green-600', bg: 'bg-green-100' },
    { label: 'Peringkat', value: user?.rank || 'Rookie', icon: Crown, color: 'text-yellow-600', bg: 'bg-yellow-100' },
  ]

  const achievements = [
    { id: 1, name: 'First Step', icon: Star, unlocked: true, color: 'text-yellow-500' },
    { id: 2, name: 'Social Star', icon: Heart, unlocked: false, color: 'text-pink-500' },
    { id: 3, name: 'Warrior', icon: Zap, unlocked: false, color: 'text-blue-500' },
    { id: 4, name: 'Legend', icon: Crown, unlocked: false, color: 'text-purple-500' },
  ]

  const menuItems = [
    { icon: Activity, label: 'Riwayat Aktivitas', path: '/history', badge: null, color: 'text-blue-500' },
    { icon: Settings, label: 'Pengaturan', path: '/settings', badge: null, color: 'text-gray-500' },
    { icon: Gift, label: 'Hadiah Saya', path: '/rewards', badge: null, color: 'text-purple-500' },
    { icon: Camera, label: 'Galeri Foto', path: '/gallery', badge: null, color: 'text-green-500' },
    { icon: Share2, label: 'Bagikan Aplikasi', action: 'share', badge: null, color: 'text-yamaha-blue' },
  ]

  const handleLogout = () => {
    if (confirm('Apakah kamu yakin ingin keluar?')) {
      logout()
      navigate('/')
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Yamaha Warior',
          text: 'Gabung dengan aku di Yamaha Warior dan raih hadiah menarik!',
          url: window.location.origin,
        })
      } catch (err) {
        console.log('Error sharing:', err)
      }
    } else {
      alert('Fitur berbagi tidak tersedia di perangkat ini')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Profil" showBack={false} />

      <div className="max-w-lg mx-auto px-6 py-6">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-yamaha p-6 mb-6 text-white clip-corner relative overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative">
                <img
                  src={user?.picture || 'https://i.pravatar.cc/150?img=8'}
                  alt={user?.name}
                  className="w-20 h-20 rounded-full border-4 border-white shadow-lg"
                />
                <button className="absolute bottom-0 right-0 bg-white text-yamaha-blue p-1.5 rounded-full hover:bg-white/90 shadow-md">
                  <Edit size={14} />
                </button>
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-black text-white mb-1">
                  {user?.name || 'Yamaha Warior'}
                </h1>
                <p className="text-white/80 text-sm mb-2">{user?.email}</p>
                <div className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold">
                  <Calendar size={12} />
                  Bergabung {new Date(user?.joinedDate).toLocaleDateString('id-ID', { month: 'short', year: 'numeric' })}
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/20">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-3">
                  <stat.icon size={20} className="text-white" />
                </div>
                <p className="text-2xl font-black text-white mb-1">{stat.value}</p>
                <p className="text-xs text-white/80">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 mb-6 shadow-sm clip-corner"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-lg text-yamaha-dark">Pencapaian</h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">1/4</span>
              <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="w-1/4 h-full bg-gradient-yamaha"></div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`aspect-square flex flex-col items-center justify-center clip-corner ${
                  achievement.unlocked
                    ? 'bg-gradient-yamaha text-white'
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                <achievement.icon size={24} className={`mb-2 ${achievement.unlocked ? 'text-white' : achievement.color}`} />
                <span className="text-xs font-semibold text-center px-1">
                  {achievement.name}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Menu Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white overflow-hidden shadow-sm mb-6 clip-corner"
        >
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => (item.action === 'share' ? handleShare() : navigate(item.path))}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 active:bg-gray-100 transition-colors border-b border-gray-100 last:border-0"
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 ${item.color.replace('text-', 'bg-').replace('-500', '-100')} rounded-full flex items-center justify-center`}>
                  <item.icon size={18} className={item.color} />
                </div>
                <span className="font-semibold text-yamaha-dark">{item.label}</span>
              </div>
              <div className="flex items-center gap-2">
                {item.badge && (
                  <span className="bg-yamaha-red text-white text-xs px-2 py-1 rounded-full font-bold">
                    {item.badge}
                  </span>
                )}
                <ChevronRight size={20} className="text-gray-400" />
              </div>
            </button>
          ))}
        </motion.div>

        {/* Logout Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleLogout}
          className="w-full bg-white text-red-600 border-2 border-red-200 font-semibold py-4 flex items-center justify-center gap-2 hover:bg-red-50 transition-colors shadow-sm clip-corner"
        >
          <LogOut size={20} />
          Keluar
        </motion.button>
      </div>
    </div>
  )
}

export default Profile
