import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/Header'
import { Trophy, Calendar, Users, Award, Filter, Search, Clock, Gift, Video, Instagram, Camera, ArrowRight } from 'lucide-react'

const PublicChallenges = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('active')

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }, [])

  // Mock data untuk challenges
  const challenges = [
    {
      id: 1,
      hashtag: '#PILANOMYSTYLE',
      title: 'Pilano My Style',
      target: 'Wanita Muda',
      product: 'Yamaha Filano',
      description: 'Peserta membuat video TikTok atau Instagram Reels yang menunjukkan momen sehari-hari dengan gaya feminim dan pastel yang memorable.',
      requirements: [
        'Perlihatkan gaya riding yang mix-and-match outfit keren hari dengan motor gaya hidup chic',
        'Gunakan hashtag #PilanoMyStyle',
        'Durasi video minimal 15 detik',
        'Upload di Instagram atau TikTok'
      ],
      reward: 'Yamaha Filano, produk kecantikan',
      color: 'from-pink-500 to-purple-500',
      image: 'https://yamahasumberbarumotor.com/wp-content/uploads/2023/12/banner-1.jpg',
      status: 'active',
      participants: 1247,
      endDate: '2025-02-15',
      points: 1000
    },
    {
      id: 2,
      hashtag: '#FAZZIOFASHIONRIDE',
      title: 'Fazzio Fashion Ride',
      target: 'Wanita Muda',
      product: 'Yamaha Fazzio',
      description: 'Peserta membuat video Instagram atau TikTok yang menunjukkan gaya outfit paling keren dengan Yamaha Fazzio.',
      requirements: [
        'Kreatifitas pemilihan lokasi, outfit, dan tema',
        'Gunakan hashtag #FazzioFashionRide',
        'Tunjukkan gaya fashion yang trendy',
        'Durasi video minimal 30 detik'
      ],
      reward: 'Voucher fashion, tas, dan paket skin care',
      color: 'from-blue-500 to-cyan-500',
      image: 'https://www.tjahaja-baru.com/uploads/products/groups/banner/a9bf749187c4656490e4ae1e06158a2f.jpeg',
      status: 'active',
      participants: 892,
      endDate: '2025-02-20',
      points: 800
    },
    {
      id: 3,
      hashtag: '#NMAXSTYLE',
      title: 'NMAX Your Style',
      target: 'Lifestyle Enthusiast',
      product: 'Yamaha NMAX',
      description: 'Ekspresi diri dan gaya hidup urban dengan NMAX. Tunjukkan petualangan singkat dan lifestyle kamu bersama NMAX.',
      requirements: [
        'Video perjalanan singkat dengan NMAX',
        'Tunjukkan gaya hidup urban yang dinamis',
        'Gunakan hashtag #NMAXYourStyle',
        'Kreatif dalam pemilihan lokasi'
      ],
      reward: 'Gadget, voucher traveling, dan merchandise NMAX',
      color: 'from-yellow-500 to-orange-500',
      image: 'https://tjahaja-baru.com/uploads/products/groups/banner/95f2cdee6ca3ebd17665b94af87843c2.jpeg',
      status: 'active',
      participants: 1567,
      endDate: '2025-02-25',
      points: 1200
    },
    {
      id: 4,
      hashtag: '#NMAXSMARTJOURNEY',
      title: 'NMAX Smart Journey',
      target: 'Professional Muda',
      product: 'Yamaha NMAX',
      description: 'Tantangan membuat video dokumentasi perjalanan untuk profesional muda yang menunjukkan sisi kepraktisan, efisiensi, dan gaya hidup smart professional.',
      requirements: [
        'Dokumentasi perjalanan daily commute atau trip',
        'Tunjukkan aspek kepraktisan, flur kecerdasan',
        'Gunakan hashtag #NMAXSmartJourney',
        'Video minimal 45 detik'
      ],
      reward: 'Gadget pendukung mobilitas, earphones, tas laptop, dan power bank',
      color: 'from-indigo-500 to-blue-600',
      image: 'https://tjahaja-baru.com/uploads/products/groups/banner/95f2cdee6ca3ebd17665b94af87843c2.jpeg',
      status: 'active',
      participants: 743,
      endDate: '2025-03-01',
      points: 1500
    },
    {
      id: 5,
      hashtag: '#AEROXADVENTURE',
      title: 'Aerox Adventure',
      target: 'Adventure Seeker',
      product: 'Yamaha Aerox',
      description: 'Tunjukkan petualangan dan eksplorasi dengan Aerox. Challenge untuk para adventure seeker yang suka menjelajah.',
      requirements: [
        'Video petualangan dengan Aerox',
        'Tunjukkan lokasi yang menarik',
        'Gunakan hashtag #AeroxAdventure',
        'Durasi video minimal 60 detik'
      ],
      reward: 'Gear adventure, backpack, dan voucher traveling',
      color: 'from-green-500 to-emerald-600',
      image: 'https://www.yamahamotor.co.id/wp-content/uploads/2024/12/YAMAHA-AEROX-ALPHA.png',
      status: 'upcoming',
      participants: 0,
      endDate: '2025-03-10',
      points: 2000
    }
  ]

  const statusOptions = [
    { value: 'active', label: 'Aktif' },
    { value: 'upcoming', label: 'Segera' },
    { value: 'ended', label: 'Berakhir' }
  ]

  const filteredChallenges = challenges.filter(challenge => {
    const matchesSearch = challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         challenge.hashtag.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         challenge.target.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = filterStatus === 'all' || challenge.status === filterStatus
    
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'upcoming':
        return 'bg-blue-100 text-blue-800'
      case 'ended':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusLabel = (status) => {
    switch (status) {
      case 'active':
        return 'Aktif'
      case 'upcoming':
        return 'Segera'
      case 'ended':
        return 'Berakhir'
      default:
        return 'Unknown'
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  const handleJoinChallenge = (challengeId) => {
    // Simpan challenge ID yang dipilih ke localStorage untuk redirect setelah login
    localStorage.setItem('selectedChallengeId', challengeId.toString())
    
    // Redirect ke halaman login
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Challenge" showBack={false} />

      <div className="max-w-lg mx-auto px-6 py-6">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-yamaha p-6 mb-6 text-white clip-corner"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Trophy size={24} />
            <h2 className="text-xl font-black">Challenge Terbaru</h2>
          </div>
          <p className="text-center text-white/90 text-sm mb-4">
            Ikuti challenge dan raih hadiah menarik
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="text-center">
              <div className="text-2xl font-black text-white mb-1">5</div>
              <div className="text-xs text-blue-300">Challenge Aktif</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-white mb-1">10K+</div>
              <div className="text-xs text-blue-300">Peserta</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-white mb-1">500+</div>
              <div className="text-xs text-blue-300">Hadiah</div>
            </div>
          </div>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white shadow-lg p-4 border-l-4 border-yamaha-blue mb-6"
        >
          {/* Search Bar */}
          <div className="relative mb-4">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Cari challenge, hashtag, atau target..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yamaha-blue focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                filterStatus === 'all'
                  ? 'bg-yamaha-blue text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Semua
            </button>
            {statusOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setFilterStatus(option.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  filterStatus === option.value
                    ? 'bg-yamaha-blue text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Challenges Grid */}
        <div className="space-y-4">
        {filteredChallenges.map((challenge, index) => (
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group bg-white overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-l-4 border-yamaha-blue"
          >
            {/* Challenge Image Header */}
            <div className="relative h-64 overflow-hidden">
              <img
                src={challenge.image}
                alt={challenge.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${challenge.color} opacity-60`}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              
              {/* Status Badge */}
              <div className="absolute top-4 right-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(challenge.status)}`}>
                  {getStatusLabel(challenge.status)}
                </span>
              </div>

              {/* Challenge Hashtag */}
              <div className="absolute top-4 left-4">
                <div className="bg-white/95 backdrop-blur-sm px-4 py-2 border-l-4 border-yamaha-blue">
                  <p className="font-black text-yamaha-blue text-sm">{challenge.hashtag}</p>
                </div>
              </div>

              {/* Product Name */}
              <div className="absolute bottom-4 left-4">
                <h3 className="text-white font-black text-2xl mb-1">{challenge.title}</h3>
                <p className="text-white/90 text-sm font-semibold">{challenge.product}</p>
              </div>

              {/* Points Badge */}
              <div className="absolute bottom-4 right-4">
                <div className="bg-yamaha-blue/90 backdrop-blur-sm text-white px-3 py-2 rounded-full">
                  <div className="flex items-center gap-1">
                    <Award size={16} />
                    <span className="font-bold text-sm">{challenge.points} pts</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Challenge Content */}
            <div className="p-6">
              <p className="text-gray-700 text-sm leading-relaxed mb-4">
                {challenge.description}
              </p>

              {/* Target Audience */}
              <div className="bg-yamaha-blue/10 p-3 mb-4 border-l-4 border-yamaha-blue">
                <div className="flex items-center gap-2 mb-1">
                  <Users size={16} className="text-yamaha-blue" />
                  <span className="text-sm font-bold text-yamaha-dark">Target Audience</span>
                </div>
                <p className="text-gray-700 text-sm font-medium">{challenge.target}</p>
              </div>

              {/* Requirements */}
              <div className="mb-4">
                <h4 className="text-yamaha-dark font-bold text-sm mb-2 flex items-center gap-2">
                  <Video size={16} className="text-yamaha-blue" />
                  Requirements:
                </h4>
                <ul className="space-y-1.5">
                  {challenge.requirements.map((req, idx) => (
                    <li key={idx} className="text-gray-600 text-xs flex items-start gap-2">
                      <span className="text-yamaha-blue mt-1 font-bold">•</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Reward */}
              <div className="bg-gradient-to-r from-yamaha-blue/10 to-transparent border-l-4 border-yamaha-blue p-3 mb-4">
                <h4 className="text-yamaha-dark font-bold text-sm mb-1 flex items-center gap-2">
                  <Gift size={16} className="text-yamaha-blue" />
                  Hadiah:
                </h4>
                <p className="text-gray-700 text-xs font-semibold">{challenge.reward}</p>
              </div>

              {/* Stats and Info */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-yamaha-blue/10 p-3 border-l-4 border-yamaha-blue">
                  <div className="flex items-center gap-2 mb-1">
                    <Users size={14} className="text-yamaha-blue" />
                    <span className="text-xs font-semibold text-gray-600">Participants</span>
                  </div>
                  <div className="text-lg font-black text-yamaha-blue">
                    {challenge.participants.toLocaleString()}
                  </div>
                </div>
                <div className="bg-yamaha-blue/10 p-3 border-l-4 border-yamaha-blue">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock size={14} className="text-yamaha-blue" />
                    <span className="text-xs font-semibold text-gray-600">End Date</span>
                  </div>
                  <div className="text-sm font-bold text-gray-800">
                    {formatDate(challenge.endDate)}
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <button
                onClick={() => challenge.status === 'active' && handleJoinChallenge(challenge.id)}
                className={`w-full py-3 flex items-center justify-center gap-2 transition-all clip-corner font-bold ${
                  challenge.status === 'active'
                    ? 'bg-gradient-yamaha hover:opacity-90 text-white hover:shadow-lg cursor-pointer'
                    : challenge.status === 'upcoming'
                    ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
                disabled={challenge.status !== 'active'}
              >
                {challenge.status === 'active' ? (
                  <>
                    Ikuti Challenge
                    <ArrowRight size={18} />
                  </>
                ) : challenge.status === 'upcoming' ? (
                  'Segera Hadir'
                ) : (
                  'Challenge Berakhir'
                )}
              </button>
            </div>
          </motion.div>
        ))}
        </div>

        {/* Empty State */}
        {filteredChallenges.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="bg-white p-8 shadow-lg border-l-4 border-yamaha-blue">
              <Trophy size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">Tidak ada challenge ditemukan</h3>
              <p className="text-gray-500 text-sm">
                Coba ubah kata kunci pencarian atau filter
              </p>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  )
}

export default PublicChallenges
