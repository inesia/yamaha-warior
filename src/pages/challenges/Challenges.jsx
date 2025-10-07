import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/Header'
import { Trophy, Clock, Users, ChevronRight, Filter } from 'lucide-react'

const AuthenticatedChallenges = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('all') // all, active, completed

  const challenges = [
    {
      id: 1,
      title: 'Pilano My Style',
      description: 'Peserta membuat video TikTok atau Instagram Reels yang menunjukkan momen sehari-hari dengan gaya feminim dan pastel yang memorable.',
      category: 'Social Media',
      points: 100,
      deadline: '2 days left',
      participants: 1250,
      difficulty: 'Easy',
      status: 'active',
      image: 'https://yamahasumberbarumotor.com/wp-content/uploads/2023/12/banner-1.jpg',
    },
    {
      id: 2,
      title: 'Fazzio Fashion Ride',
      description: 'Peserta membuat video Instagram atau TikTok yang menunjukkan gaya outfit paling keren dengan Yamaha Fazzio.',
      category: 'Content Creation',
      points: 250,
      deadline: '5 days left',
      participants: 890,
      difficulty: 'Medium',
      status: 'active',
      image: 'https://www.tjahaja-baru.com/uploads/products/groups/banner/a9bf749187c4656490e4ae1e06158a2f.jpeg',
    },
    {
      id: 3,
      title: 'NMAX Your Style',
      description: 'Ekspresi diri dan gaya hidup urban dengan NMAX. Tunjukkan petualangan singkat dan lifestyle kamu bersama NMAX.',
      category: 'Community',
      points: 150,
      deadline: '1 week left',
      participants: 2100,
      difficulty: 'Easy',
      status: 'active',
      image: 'https://tjahaja-baru.com/uploads/products/groups/banner/95f2cdee6ca3ebd17665b94af87843c2.jpeg',
    },
    {
      id: 4,
      title: 'NMAX Smart Journey',
      description: 'Tantangan membuat video dokumentasi perjalanan untuk profesional muda yang menunjukkan sisi kepraktisan, efisiensi, dan gaya hidup smart professional.',
      category: 'Photography',
      points: 300,
      deadline: '3 days left',
      participants: 670,
      difficulty: 'Medium',
      status: 'active',
      image: 'https://tjahaja-baru.com/uploads/products/groups/banner/95f2cdee6ca3ebd17665b94af87843c2.jpeg',
    },
    {
      id: 5,
      title: 'Yamaha Filano Hybrid',
      description: 'Tunjukkan gaya riding yang mix-and-match outfit keren hari dengan motor gaya hidup chic',
      category: 'Event',
      points: 500,
      deadline: '2 weeks left',
      participants: 345,
      difficulty: 'Hard',
      status: 'active',
      image: 'https://www.yamahamotor.co.id/wp-content/uploads/2024/11/Yamaha-Filano-Hybrid-Lux.png',
    },
  ]

  const tabs = [
    { id: 'all', label: 'Semua Challenge' },
    { id: 'active', label: 'Aktif' },
    { id: 'completed', label: 'Selesai' },
  ]

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-100 text-green-700'
      case 'Medium':
        return 'bg-yellow-100 text-yellow-700'
      case 'Hard':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Challenge" showBack={false} />

      <div className="max-w-lg mx-auto px-6 py-6">
        {/* Filter Tabs */}
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
          <button className="p-2 bg-white rounded-full text-gray-600 hover:bg-gray-100">
            <Filter size={20} />
          </button>
        </div>

        {/* Stats Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-yamaha text-white p-6 mb-6 border-l-4 border-white/40"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm mb-1">Challenge Tersedia</p>
              <p className="text-3xl font-black">{challenges.length}</p>
            </div>
            <div className="bg-white/20 p-4">
              <Trophy size={32} />
            </div>
          </div>
          <p className="text-sm text-white/80 mt-4">
            Selesaikan challenge untuk raih poin dan naik ke puncak leaderboard!
          </p>
        </motion.div>

        {/* Challenges List */}
        <div className="space-y-4">
          {challenges.map((challenge, index) => (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(`/challenges/${challenge.id}`)}
              className="bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer border-l-4 border-yamaha-blue"
            >
              {/* Challenge Image */}
              <div className="relative h-40 bg-gradient-yamaha">
                <img
                  src={challenge.image}
                  alt={challenge.title}
                  className="w-full h-full object-cover "
                />
                <div className="absolute top-3 left-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(challenge.difficulty)}`}>
                    {challenge.difficulty}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="bg-yamaha-blue text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                    +{challenge.points} pts
                  </span>
                </div>
              </div>

              {/* Challenge Info */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <span className="text-xs text-yamaha-blue font-semibold mb-1 block">
                      {challenge.category}
                    </span>
                    <h3 className="font-bold text-lg text-yamaha-dark mb-1">
                      {challenge.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {challenge.description}
                    </p>
                  </div>
                  <ChevronRight size={20} className="text-gray-400 flex-shrink-0 mt-1" />
                </div>

                {/* Meta Info */}
                <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-1 text-xs text-gray-600">
                    <Clock size={14} />
                    <span>{challenge.deadline}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-600">
                    <Users size={14} />
                    <span>{challenge.participants.toLocaleString()} joined</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AuthenticatedChallenges
