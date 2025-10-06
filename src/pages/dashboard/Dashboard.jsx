import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { Trophy, TrendingUp, Award, ChevronRight, Target, Upload, Users, Zap, Star, Clock, Bell, Sun, CloudSun, Sunset, Moon, Heart, Flame, AlertCircle } from 'lucide-react'

const Dashboard = () => {
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)
  
  // Get time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return { text: 'Selamat Pagi', Icon: Sun, color: 'text-yellow-300' }
    if (hour < 15) return { text: 'Selamat Siang', Icon: CloudSun, color: 'text-orange-300' }
    if (hour < 18) return { text: 'Selamat Sore', Icon: Sunset, color: 'text-orange-400' }
    return { text: 'Selamat Malam', Icon: Moon, color: 'text-blue-200' }
  }
  
  const greeting = getGreeting()

  const stats = [
    { 
      label: 'Total Poin', 
      value: user?.points || 0, 
      icon: Trophy, 
      color: 'bg-yamaha-blue',
      trend: '+120',
      subtitle: 'Bulan ini'
    },
    { 
      label: 'Peringkat', 
      value: user?.rank || 'Rookie', 
      icon: Award, 
      color: 'bg-yamaha-dark',
      rank: '#127',
      subtitle: 'dari 1.2K'
    },
    { 
      label: 'Streak', 
      value: '7', 
      icon: Flame, 
      color: 'bg-gradient-to-r from-red-500 to-red-600',
      subtitle: 'Hari Berturut'
    },
  ]

  const activeChallenges = [
    {
      id: 1,
      title: 'Share Your Daily Ride',
      description: 'Post your Yamaha on Instagram Stories',
      points: 100,
      deadline: '2 days left',
      progress: 0,
      total: 5,
    },
    {
      id: 2,
      title: 'Weekend Warrior',
      description: 'Share 3 posts about your weekend rides',
      points: 250,
      deadline: '5 days left',
      progress: 0,
      total: 3,
    },
    {
      id: 3,
      title: 'Community Builder',
      description: 'Tag 5 friends in your Yamaha content',
      points: 150,
      deadline: '1 week left',
      progress: 0,
      total: 5,
    },
  ]

  const recentActivities = [
    {
      id: 1,
      user: 'John Doe',
      action: 'completed a challenge',
      points: 100,
      time: '2 hours ago',
    },
    {
      id: 2,
      user: 'Jane Smith',
      action: 'reached Warrior rank',
      points: 500,
      time: '5 hours ago',
    },
    {
      id: 3,
      user: 'Mike Johnson',
      action: 'submitted new content',
      points: 50,
      time: '1 day ago',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Gradient */}
      <div className="gradient-yamaha text-white pt-6 pb-24 px-6 safe-top relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 -translate-y-32 translate-x-32 rotate-45"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 translate-y-24 -translate-x-24 rotate-45"></div>
          <div className="absolute top-20 left-10 w-32 h-32 border-4 border-white/10 rotate-12"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 border-4 border-white/10 -rotate-12"></div>
        </div>

        <div className="max-w-lg mx-auto relative z-10">
          {/* Top Bar with Notification */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-6"
          >
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-white/70" />
              <span className="text-white/70 text-xs font-semibold">
                {new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
            </div>
            <button 
              onClick={() => navigate('/notifications')}
              className="relative p-2 hover:bg-white/10 transition-colors"
            >
              <Bell size={20} className="text-white" />
              <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>
          </motion.div>

          {/* Welcome Message with Avatar */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6"
          >
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div className="relative">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm flex items-center justify-center border-4 border-white/40 relative overflow-hidden group">
                  <span className="text-2xl font-black text-white">
                    {(user?.name || 'W').charAt(0).toUpperCase()}
                  </span>
                  {/* Level Badge */}
                  <div className="absolute -bottom-1 -right-1 bg-yamaha-dark border-2 border-white px-1.5 py-0.5">
                    <span className="text-[8px] font-black text-yamaha-blue">LV.1</span>
                  </div>
                </div>
              </div>
              
              {/* Greeting Text */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <greeting.Icon size={20} className={greeting.color} strokeWidth={2} />
                  <p className="text-white/90 text-sm font-bold">{greeting.text},</p>
                </div>
                <h1 className="text-3xl font-black leading-tight">{user?.name || 'Demo Warior'}</h1>
                <p className="text-white/70 text-xs font-semibold mt-1">Mari selesaikan challenge hari ini!</p>
              </div>
            </div>
          </motion.div>

          {/* Stats Cards - Compact */}
          <div className="grid grid-cols-3 gap-2">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -2 }}
                className="bg-white/10 backdrop-blur-md p-3 border-l-4 border-white/40 cursor-pointer hover:bg-white/15 transition-all group relative overflow-hidden"
              >
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-12 h-12 bg-white/5 -translate-y-6 translate-x-6 rotate-45 group-hover:scale-150 transition-transform"></div>
                
                {/* Icon */}
                <div className={`${stat.color} w-8 h-8 flex items-center justify-center mb-2 relative z-10 group-hover:scale-110 transition-transform`}>
                  <stat.icon size={16} className="text-white" strokeWidth={2.5} />
                </div>
                
                {/* Value */}
                <div className="relative z-10">
                  <p className="text-lg font-black mb-0.5 group-hover:scale-105 transition-transform">{stat.value}</p>
                  
                  {/* Trend/Rank Badge */}
                  {stat.trend && (
                    <div className="inline-flex items-center gap-1 bg-green-400/20 px-1.5 py-0.5 mb-1">
                      <TrendingUp size={8} className="text-green-400" />
                      <span className="text-[9px] text-green-400 font-bold">{stat.trend}</span>
                    </div>
                  )}
                  
                  {stat.rank && (
                    <div className="inline-flex items-center gap-1 bg-white/20 px-1.5 py-0.5 mb-1">
                      <span className="text-[9px] text-white font-bold">{stat.rank}</span>
                    </div>
                  )}
                  
                  {/* Label */}
                  <p className="text-[9px] text-white/70 font-bold uppercase tracking-wide">{stat.label}</p>
                  
                  {/* Subtitle */}
                  <p className="text-[8px] text-white/60 font-medium mt-0.5">{stat.subtitle}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-lg mx-auto px-6 -mt-16 pb-6">
        {/* Rank Progress Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-5 shadow-lg shadow-gray-200/50 mb-6 border-l-4 border-yamaha-blue relative overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-yamaha-blue/5 -translate-y-16 translate-x-16 rotate-45"></div>
          
          <div className="relative z-10">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Star size={20} className="text-yellow-500" fill="currentColor" />
                  <h3 className="text-lg font-black text-yamaha-dark">Level Progress</h3>
                </div>
                <p className="text-sm text-gray-600">Tingkatkan rank kamu untuk unlock rewards</p>
              </div>
              <div className="bg-gradient-yamaha text-white px-3 py-1 flex items-center gap-1">
                <Zap size={14} fill="currentColor" />
                <span className="text-xs font-black">{user?.rank || 'ROOKIE'}</span>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600 font-semibold">Progress ke Warrior</span>
                <span className="text-yamaha-blue font-black">{user?.points || 0} / 1000 pts</span>
              </div>
              <div className="h-3 bg-gray-200 relative overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${((user?.points || 0) / 1000) * 100}%` }}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="h-full bg-gradient-yamaha relative"
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                </motion.div>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500 font-semibold">Rookie</span>
                <span className="text-gray-500 font-semibold">Warrior</span>
              </div>
            </div>
            
            {/* Next Rewards */}
            <div className="mt-4 pt-4 border-t-2 border-gray-100">
              <p className="text-xs text-gray-500 font-semibold mb-2">Unlock berikutnya:</p>
              <div className="flex gap-2">
                <div className="flex-1 bg-gradient-to-br from-yamaha-blue/10 to-transparent p-3 border-l-4 border-yamaha-blue">
                  <div className="flex items-center gap-2">
                    <Trophy size={16} className="text-yamaha-blue" />
                    <div>
                      <p className="text-xs font-black text-yamaha-dark">Warrior Badge</p>
                      <p className="text-[10px] text-gray-600 font-semibold">1000 points</p>
                    </div>
                  </div>
                </div>
                <div className="flex-1 bg-gradient-to-br from-gray-100 to-transparent p-3 border-l-4 border-gray-300">
                  <div className="flex items-center gap-2">
                    <Award size={16} className="text-gray-500" />
                    <div>
                      <p className="text-xs font-black text-yamaha-dark">Exclusive Merch</p>
                      <p className="text-[10px] text-gray-600 font-semibold">2500 points</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white p-5 shadow-lg shadow-gray-200/50 mb-6 border-l-4 border-yamaha-blue"
        >
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => navigate('/challenges')}
              className="gradient-yamaha text-white p-5 flex flex-col items-center gap-2 hover:opacity-90 transition-all shadow-md clip-corner group"
            >
              <Trophy size={26} strokeWidth={2.5} className="group-hover:scale-110 transition-transform" />
              <span className="text-sm font-bold">Lihat Challenge</span>
            </button>
            <button
              onClick={() => navigate('/leaderboard')}
              className="bg-gradient-to-r from-red-500 to-red-600 text-white p-5 flex flex-col items-center gap-2 hover:from-red-600 hover:to-red-700 transition-all shadow-md clip-corner group"
            >
              <TrendingUp size={26} strokeWidth={2.5} className="group-hover:scale-110 transition-transform" />
              <span className="text-sm font-bold">Peringkat</span>
            </button>
          </div>
        </motion.div>

        {/* Active Challenges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-yamaha-dark">Challenge Aktif</h2>
            <button
              onClick={() => navigate('/challenges')}
              className="text-yamaha-blue text-sm font-semibold flex items-center gap-1"
            >
              Lihat Semua
              <ChevronRight size={16} />
            </button>
          </div>

          <div className="space-y-3">
            {activeChallenges.map((challenge) => (
              <motion.div
                key={challenge.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(`/challenges/${challenge.id}`)}
                className="bg-white p-4 shadow-sm hover:shadow-lg transition-all cursor-pointer border-l-4 border-yamaha-blue group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-bold text-yamaha-dark mb-1 group-hover:text-yamaha-blue transition-colors">{challenge.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{challenge.description}</p>
                    <div className="flex items-center gap-3 text-xs">
                      <span className="bg-yamaha-blue text-white px-3 py-1 font-bold border-l-4 border-white">+{challenge.points} pts</span>
                      <span className="bg-red-500 text-white px-3 py-1 font-bold border-l-4 border-white">🔥 Hot</span>
                      <span className="text-gray-500 font-semibold">• {challenge.deadline}</span>
                    </div>
                  </div>
                  <div className="bg-yamaha-blue/10 p-2">
                    <Upload size={20} className="text-yamaha-blue" />
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-gray-600 font-semibold">
                    <span>Progres</span>
                    <span>{challenge.progress}/{challenge.total}</span>
                  </div>
                  <div className="h-2 bg-gray-200 overflow-hidden relative">
                    <div
                      className="h-full bg-yamaha-blue transition-all absolute inset-y-0 left-0"
                      style={{ width: `${(challenge.progress / challenge.total) * 100}%` }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Special Alert */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-6"
        >
          <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-4 clip-corner relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-8 -translate-x-8"></div>
            
            <div className="relative z-10 flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <AlertCircle size={20} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-sm mb-1">Event Khusus Weekend!</h3>
                <p className="text-xs text-white/90">Dapatkan 2x poin untuk semua challenge. Berakhir dalam 2 hari!</p>
              </div>
              <button className="bg-white text-red-600 text-xs font-bold px-3 py-1 rounded-full hover:bg-white/90 transition-colors">
                Join
              </button>
            </div>
          </div>
        </motion.div>

        {/* Community Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Users size={20} className="text-yamaha-dark" />
            <h2 className="text-xl font-bold text-yamaha-dark">Aktivitas Komunitas</h2>
          </div>

          <div className="bg-white p-5 shadow-sm border-l-4 border-yamaha-blue">
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 pb-4 border-b-2 border-gray-100 last:border-0 last:pb-0">
                  <div className="w-10 h-10 bg-gradient-yamaha flex items-center justify-center text-white font-black text-sm flex-shrink-0">
                    {activity.user.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-yamaha-dark">
                      <span className="font-bold">{activity.user}</span> {activity.action}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="bg-yamaha-blue text-white text-xs px-2 py-0.5 font-bold">+{activity.points} pts</span>
                      <span className="bg-red-500 text-white text-xs px-2 py-0.5 font-bold flex items-center gap-1">
                        <Heart size={10} fill="currentColor" />
                        Trending
                      </span>
                      <span className="text-xs text-gray-500 font-medium">• {activity.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Dashboard
