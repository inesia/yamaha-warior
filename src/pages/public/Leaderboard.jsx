import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Trophy, Award, Medal, Crown, Star, TrendingUp, Users, Calendar, Filter, Search } from 'lucide-react'

const PublicLeaderboard = () => {
  const [filterPeriod, setFilterPeriod] = useState('monthly')
  const [searchTerm, setSearchTerm] = useState('')

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }, [])

  // Mock data untuk leaderboard
  const leaderboardData = [
    {
      id: 1,
      rank: 1,
      user: {
        name: 'Sarah Putri',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        location: 'Jakarta',
        verified: true
      },
      stats: {
        points: 15420,
        challenges: 28,
        wins: 5,
        streak: 12
      },
      badge: 'Champion',
      color: 'from-yellow-400 to-yellow-600'
    },
    {
      id: 2,
      rank: 2,
      user: {
        name: 'Ahmad Rizki',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        location: 'Bandung',
        verified: true
      },
      stats: {
        points: 12850,
        challenges: 24,
        wins: 3,
        streak: 8
      },
      badge: 'Elite',
      color: 'from-gray-400 to-gray-600'
    },
    {
      id: 3,
      rank: 3,
      user: {
        name: 'Maya Sari',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        location: 'Surabaya',
        verified: true
      },
      stats: {
        points: 11200,
        challenges: 22,
        wins: 4,
        streak: 6
      },
      badge: 'Elite',
      color: 'from-amber-600 to-amber-800'
    },
    {
      id: 4,
      rank: 4,
      user: {
        name: 'Budi Santoso',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        location: 'Yogyakarta',
        verified: false
      },
      stats: {
        points: 9850,
        challenges: 20,
        wins: 2,
        streak: 4
      },
      badge: 'Pro',
      color: 'from-blue-500 to-blue-700'
    },
    {
      id: 5,
      rank: 5,
      user: {
        name: 'Dewi Lestari',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
        location: 'Medan',
        verified: true
      },
      stats: {
        points: 9200,
        challenges: 18,
        wins: 3,
        streak: 5
      },
      badge: 'Pro',
      color: 'from-blue-500 to-blue-700'
    },
    {
      id: 6,
      rank: 6,
      user: {
        name: 'Rizki Pratama',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
        location: 'Semarang',
        verified: false
      },
      stats: {
        points: 8750,
        challenges: 16,
        wins: 1,
        streak: 3
      },
      badge: 'Rising',
      color: 'from-green-500 to-green-700'
    },
    {
      id: 7,
      rank: 7,
      user: {
        name: 'Siti Nurhaliza',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
        location: 'Makassar',
        verified: true
      },
      stats: {
        points: 8200,
        challenges: 15,
        wins: 2,
        streak: 4
      },
      badge: 'Rising',
      color: 'from-green-500 to-green-700'
    },
    {
      id: 8,
      rank: 8,
      user: {
        name: 'Fajar Nugroho',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        location: 'Palembang',
        verified: false
      },
      stats: {
        points: 7800,
        challenges: 14,
        wins: 1,
        streak: 2
      },
      badge: 'Rising',
      color: 'from-green-500 to-green-700'
    },
    {
      id: 9,
      rank: 9,
      user: {
        name: 'Indah Sari',
        avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
        location: 'Bali',
        verified: true
      },
      stats: {
        points: 7350,
        challenges: 13,
        wins: 1,
        streak: 3
      },
      badge: 'Rising',
      color: 'from-green-500 to-green-700'
    },
    {
      id: 10,
      rank: 10,
      user: {
        name: 'Andi Wijaya',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        location: 'Bandung',
        verified: false
      },
      stats: {
        points: 6900,
        challenges: 12,
        wins: 0,
        streak: 1
      },
      badge: 'Rising',
      color: 'from-green-500 to-green-700'
    }
  ]

  const periodOptions = [
    { value: 'weekly', label: 'Mingguan' },
    { value: 'monthly', label: 'Bulanan' },
    { value: 'alltime', label: 'Sepanjang Masa' }
  ]

  const filteredData = leaderboardData.filter(user => 
    user.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.user.location.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Crown size={24} className="text-yellow-500" />
      case 2:
        return <Medal size={24} className="text-gray-400" />
      case 3:
        return <Medal size={24} className="text-amber-600" />
      default:
        return <span className="text-2xl font-black text-gray-400">#{rank}</span>
    }
  }

  const getRankColor = (rank) => {
    switch (rank) {
      case 1:
        return 'from-yellow-400 to-yellow-600'
      case 2:
        return 'from-gray-300 to-gray-500'
      case 3:
        return 'from-amber-500 to-amber-700'
      default:
        return 'from-gray-100 to-gray-300'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100">
      {/* Header dengan Background Pattern */}
      <div className="relative bg-gradient-to-br from-yamaha-blue via-blue-600 to-yamaha-dark text-white p-6 pb-24 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 -translate-y-32 translate-x-32 rotate-45"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 translate-y-24 -translate-x-24 rotate-45"></div>
          <div className="absolute top-20 left-10 w-32 h-32 border-4 border-white/10 rotate-12"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 border-4 border-white/10 -rotate-12"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center relative z-10"
        >
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 mb-4">
            <Trophy size={20} className="text-yellow-300" strokeWidth={1.5} />
            <span className="font-black text-sm">Yamaha Warior Leaderboard</span>
          </div>
          <h1 className="text-3xl font-black mb-3 leading-tight">Top 10 Warior</h1>
          <p className="text-white/90 text-sm max-w-2xl mx-auto">
            Ranking berdasarkan poin dan prestasi challenge
          </p>
          
          {/* Stats Banner */}
          <div className="grid grid-cols-3 gap-3 mt-6 max-w-sm mx-auto">
            <div className="bg-white/10 backdrop-blur-sm p-3">
              <div className="text-xl font-black text-yellow-300">10</div>
              <div className="text-xs text-white/80 font-semibold">Top Warior</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-3">
              <div className="text-xl font-black text-yellow-300">1.2K</div>
              <div className="text-xs text-white/80 font-semibold">Total Warior</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-3">
              <div className="text-xl font-black text-yellow-300">50K</div>
              <div className="text-xs text-white/80 font-semibold">Total Poin</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Search and Filter */}
      <div className="px-6 -mt-12 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/95 backdrop-blur-sm shadow-lg p-4 relative overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-yamaha-blue/5 -translate-y-16 translate-x-16 rotate-45"></div>
          
          {/* Search Bar */}
          <div className="relative mb-4">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yamaha-blue" strokeWidth={1.5} />
            <input
              type="text"
              placeholder="Cari nama atau lokasi warior..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-yamaha-blue/20 focus:outline-none focus:ring-1 focus:ring-yamaha-blue focus:border-yamaha-blue bg-white/80 backdrop-blur-sm text-gray-700 text-sm"
            />
          </div>

          {/* Period Filter */}
          <div className="flex gap-2 overflow-x-auto pb-1">
            {periodOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setFilterPeriod(option.value)}
                className={`px-4 py-2 text-xs font-bold whitespace-nowrap transition-all ${
                  filterPeriod === option.value
                    ? 'bg-gradient-yamaha text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Leaderboard */}
      <div className="px-6 space-y-4">
        {filteredData.map((user, index) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className={`group bg-white/95 backdrop-blur-sm overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ${
              user.rank <= 3 ? 'ring-2 ring-red-500/20 shadow-xl' : 'shadow-md'
            }`}
          >
            {/* Top 3 Special Header */}
            {user.rank <= 3 && (
              <div className={`bg-gradient-to-r ${getRankColor(user.rank)} text-white p-3 relative overflow-hidden`}>
                <div className="flex items-center justify-center gap-2 relative z-10">
                  {getRankIcon(user.rank)}
                  <span className="font-black text-sm">
                    {user.rank === 1 ? '🏆 CHAMPION' : user.rank === 2 ? '🥈 RUNNER UP' : '🥉 THIRD PLACE'}
                  </span>
                </div>
              </div>
            )}

            <div className="p-4">
              <div className="flex items-center gap-4">
                {/* Rank */}
                <div className="flex-shrink-0">
                  {user.rank <= 3 ? (
                    <div className="w-12 h-12 bg-gradient-to-br from-yamaha-blue to-blue-600 flex items-center justify-center shadow-md">
                      {getRankIcon(user.rank)}
                    </div>
                  ) : (
                    <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center shadow-sm">
                      <span className="text-lg font-black text-gray-600">#{user.rank}</span>
                    </div>
                  )}
                </div>

                {/* User Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="relative">
                      <img
                        src={user.user.avatar}
                        alt={user.user.name}
                        className="w-10 h-10 object-cover border border-red-500/20 shadow-sm"
                      />
                      {user.user.verified && (
                        <div className="absolute -top-1 -right-1 bg-yamaha-blue text-white w-4 h-4 flex items-center justify-center text-xs font-bold">
                          ✓
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-black text-sm text-gray-800">{user.user.name}</h3>
                        {user.user.verified && (
                          <div className="bg-red-500 text-white text-xs px-2 py-0.5 font-bold">
                            Verified
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-gray-500 font-semibold">📍 {user.user.location}</span>
                        <span className="bg-gradient-to-r from-yamaha-blue to-blue-600 text-white px-2 py-0.5 text-xs font-bold">
                          {user.badge}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div className="bg-gradient-to-br from-red-500/10 to-transparent border-l-2 border-red-500 p-3">
                      <div className="flex items-center gap-1 mb-1">
                        <Star size={14} className="text-red-500" strokeWidth={1.5} />
                        <span className="text-xs font-bold text-gray-600">Points</span>
                      </div>
                      <div className="text-lg font-black text-red-500">
                        {user.stats.points.toLocaleString()}
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-red-500/10 to-transparent border-l-2 border-red-500 p-3">
                      <div className="flex items-center gap-1 mb-1">
                        <Trophy size={14} className="text-red-500" strokeWidth={1.5} />
                        <span className="text-xs font-bold text-gray-600">Wins</span>
                      </div>
                      <div className="text-lg font-black text-red-500">
                        {user.stats.wins}
                      </div>
                    </div>
                  </div>

                  {/* Additional Stats */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-4 text-xs text-gray-600">
                      <div className="flex items-center gap-1">
                        <Award size={12} className="text-red-500" strokeWidth={1.5} />
                        <span className="font-semibold">{user.stats.challenges} challenges</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <TrendingUp size={12} className="text-red-500" strokeWidth={1.5} />
                        <span className="font-semibold">{user.stats.streak} streak</span>
                      </div>
                    </div>
                    {user.rank <= 3 && (
                      <div className="flex items-center gap-1 text-red-500 bg-red-500/10 px-2 py-1">
                        <Crown size={12} strokeWidth={1.5} />
                        <span className="text-xs font-bold">Top {user.rank}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredData.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16 px-6"
        >
          <div className="bg-white/95 backdrop-blur-sm p-6 shadow-lg max-w-sm mx-auto">
            <div className="w-16 h-16 bg-gradient-yamaha flex items-center justify-center mx-auto mb-4">
              <Trophy size={32} className="text-white" strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-black text-gray-700 mb-2">Tidak ada data ditemukan</h3>
            <p className="text-gray-500 text-xs leading-relaxed mb-4">
              Coba ubah kata kunci pencarian atau filter periode
            </p>
            <button
              onClick={() => setSearchTerm('')}
              className="bg-gradient-yamaha text-white px-4 py-2 text-sm font-bold hover:opacity-90 transition-all"
            >
              Reset Pencarian
            </button>
          </div>
        </motion.div>
      )}

    </div>
  )
}

export default PublicLeaderboard
