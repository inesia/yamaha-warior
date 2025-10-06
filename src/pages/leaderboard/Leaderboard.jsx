import { useState } from 'react'
import { motion } from 'framer-motion'
import Header from '../../components/Header'
import { useAuthStore } from '../../store/authStore'
import { Trophy, TrendingUp, Medal, Crown } from 'lucide-react'

const AuthenticatedLeaderboard = () => {
  const user = useAuthStore((state) => state.user)
  const [activeTab, setActiveTab] = useState('weekly') // weekly, monthly, alltime

  const tabs = [
    { id: 'weekly', label: 'Mingguan' },
    { id: 'monthly', label: 'Bulanan' },
    { id: 'alltime', label: 'Sepanjang Waktu' },
  ]

  const leaderboardData = [
    {
      rank: 1,
      name: 'Alex Warrior',
      points: 5240,
      avatar: 'https://i.pravatar.cc/150?img=1',
      badge: 'Legend',
      isCurrentUser: false,
    },
    {
      rank: 2,
      name: 'Sarah Champion',
      points: 4850,
      avatar: 'https://i.pravatar.cc/150?img=5',
      badge: 'Master',
      isCurrentUser: false,
    },
    {
      rank: 3,
      name: 'Mike Rider',
      points: 4320,
      avatar: 'https://i.pravatar.cc/150?img=3',
      badge: 'Master',
      isCurrentUser: false,
    },
    {
      rank: 4,
      name: 'Emma Swift',
      points: 3890,
      avatar: 'https://i.pravatar.cc/150?img=9',
      badge: 'Expert',
      isCurrentUser: false,
    },
    {
      rank: 5,
      name: 'John Cruise',
      points: 3560,
      avatar: 'https://i.pravatar.cc/150?img=7',
      badge: 'Expert',
      isCurrentUser: false,
    },
    {
      rank: 6,
      name: user?.name || 'You',
      points: user?.points || 0,
      avatar: user?.picture || 'https://i.pravatar.cc/150?img=8',
      badge: user?.rank || 'Rookie',
      isCurrentUser: true,
    },
  ]

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Crown size={24} className="text-yamaha-blue" />
      case 2:
        return <Medal size={24} className="text-gray-700" />
      case 3:
        return <Medal size={24} className="text-gray-500" />
      default:
        return <span className="text-lg font-bold text-gray-600">#{rank}</span>
    }
  }

  const getRankBadgeColor = (rank) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-blue-400 to-blue-600'
      case 2:
        return 'bg-gradient-to-r from-gray-600 to-gray-800'
      case 3:
        return 'bg-gradient-to-r from-gray-400 to-gray-600'
      default:
        return 'bg-white'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Peringkat" showBack={false} />

      <div className="max-w-lg mx-auto px-6 py-6">
        {/* Tabs */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-yamaha-blue text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Top 3 Podium */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-yamaha p-6 mb-6 text-white clip-corner"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <Trophy size={24} />
            <h2 className="text-xl font-black">Top Warior</h2>
          </div>

          <div className="flex items-end justify-center gap-4">
            {/* Second Place */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col items-center"
            >
              <div className="relative mb-2">
                <img
                  src={leaderboardData[1].avatar}
                  alt={leaderboardData[1].name}
                  className="w-16 h-16 rounded-full border-4 border-gray-700"
                />
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gray-700 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
                  2
                </div>
              </div>
              <p className="text-sm font-semibold text-center mb-1">{leaderboardData[1].name.split(' ')[0]}</p>
              <div className="bg-gray-700 text-white px-3 py-1 rounded-full text-xs font-bold">
                {leaderboardData[1].points}
              </div>
            </motion.div>

            {/* First Place */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center"
            >
              <Crown size={32} className="text-yamaha-blue mb-2" />
              <div className="relative mb-2">
                <img
                  src={leaderboardData[0].avatar}
                  alt={leaderboardData[0].name}
                  className="w-20 h-20 rounded-full border-4 border-yamaha-blue shadow-lg"
                />
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-yamaha-blue text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-black">
                  1
                </div>
              </div>
              <p className="text-base font-bold text-center mb-1">{leaderboardData[0].name.split(' ')[0]}</p>
              <div className="bg-yamaha-blue text-white px-4 py-1 rounded-full text-sm font-black shadow-md">
                {leaderboardData[0].points}
              </div>
            </motion.div>

            {/* Third Place */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="flex flex-col items-center"
            >
              <div className="relative mb-2">
                <img
                  src={leaderboardData[2].avatar}
                  alt={leaderboardData[2].name}
                  className="w-16 h-16 rounded-full border-4 border-gray-500"
                />
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gray-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
                  3
                </div>
              </div>
              <p className="text-sm font-semibold text-center mb-1">{leaderboardData[2].name.split(' ')[0]}</p>
              <div className="bg-gray-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                {leaderboardData[2].points}
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Full Leaderboard */}
        <div className="space-y-3">
          {leaderboardData.map((player, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`${getRankBadgeColor(player.rank)} ${
                player.isCurrentUser ? 'ring-2 ring-yamaha-blue' : ''
              } p-4 shadow-sm clip-corner ${
                player.rank > 3 ? 'bg-white' : 'text-white'
              }`}
            >
              <div className="flex items-center gap-4">
                {/* Rank */}
                <div className="w-10 flex items-center justify-center">
                  {getRankIcon(player.rank)}
                </div>

                {/* Avatar */}
                <img
                  src={player.avatar}
                  alt={player.name}
                  className="w-12 h-12 rounded-full"
                />

                {/* Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className={`font-bold ${player.rank <= 3 ? 'text-white' : 'text-yamaha-dark'}`}>
                      {player.name}
                    </h3>
                    {player.isCurrentUser && (
                      <span className="bg-yamaha-blue text-white text-xs px-2 py-0.5 rounded-full font-semibold">
                        Kamu
                      </span>
                    )}
                  </div>
                  <span className={`text-xs ${player.rank <= 3 ? 'text-white/80' : 'text-gray-500'}`}>
                    {player.badge}
                  </span>
                </div>

                {/* Points */}
                <div className="text-right">
                  <p className={`text-xl font-black ${player.rank <= 3 ? 'text-white' : 'text-yamaha-dark'}`}>
                    {player.points}
                  </p>
                  <p className={`text-xs ${player.rank <= 3 ? 'text-white/80' : 'text-gray-500'}`}>
                    poin
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Your Rank Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white p-6 mt-6 border-2 border-yamaha-blue clip-corner"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Peringkat Kamu Saat Ini</p>
              <p className="text-3xl font-black text-yamaha-dark">#{leaderboardData[5].rank}</p>
            </div>
            <div className="text-right">
              <p className="text-gray-600 text-sm mb-1">Poin ke Peringkat Selanjutnya</p>
              <div className="flex items-center gap-2">
                <TrendingUp size={20} className="text-yamaha-blue" />
                <p className="text-2xl font-black text-yamaha-blue">
                  {leaderboardData[4].points - leaderboardData[5].points}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default AuthenticatedLeaderboard
