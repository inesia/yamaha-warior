import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Users, Heart, MessageCircle, Share2, Filter, Search, Trophy, Award, Calendar } from 'lucide-react'

const Members = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }, [])

  // Mock data untuk posting members
  const memberPosts = [
    {
      id: 1,
      user: {
        name: 'Sarah Putri',
        avatar: '/images/hero1.jpg',
        location: 'Jakarta',
        verified: true
      },
      post: {
        image: '/images/hero1.jpg',
        caption: 'Morning ride dengan Yamaha Filano! 💕 #PilanoMyStyle #YamahaWarior',
        hashtags: ['#PilanoMyStyle', '#YamahaWarior', '#MorningRide'],
        challenge: 'Pilano My Style Challenge'
      },
      stats: {
        likes: 1247,
        comments: 89,
        shares: 23
      },
      timestamp: '2 jam yang lalu',
      verified: true
    },
    {
      id: 2,
      user: {
        name: 'Ahmad Rizki',
        avatar: '/images/hero2.jpg',
        location: 'Bandung',
        verified: false
      },
      post: {
        image: '/images/hero2.jpg',
        caption: 'NMAX Smart Journey - Perjalanan ke kantor dengan style! 🚀 #NMAXSmartJourney',
        hashtags: ['#NMAXSmartJourney', '#SmartRide', '#Professional'],
        challenge: 'NMAX Smart Journey Challenge'
      },
      stats: {
        likes: 892,
        comments: 45,
        shares: 12
      },
      timestamp: '4 jam yang lalu',
      verified: false
    },
    {
      id: 3,
      user: {
        name: 'Maya Sari',
        avatar: '/images/hero3.jpg',
        location: 'Surabaya',
        verified: true
      },
      post: {
        image: '/images/hero3.jpg',
        caption: 'Fazzio Fashion Ride - Mix and match outfit dengan Fazzio! ✨ #FazzioFashionRide',
        hashtags: ['#FazzioFashionRide', '#FashionRide', '#Style'],
        challenge: 'Fazzio Fashion Ride Challenge'
      },
      stats: {
        likes: 1567,
        comments: 123,
        shares: 34
      },
      timestamp: '6 jam yang lalu',
      verified: true
    },
    {
      id: 4,
      user: {
        name: 'Budi Santoso',
        avatar: '/images/hero1.jpg',
        location: 'Yogyakarta',
        verified: false
      },
      post: {
        image: '/images/hero1.jpg',
        caption: 'NMAX Your Style - Weekend adventure dengan NMAX! 🏍️ #NMAXYourStyle',
        hashtags: ['#NMAXYourStyle', '#WeekendAdventure', '#Lifestyle'],
        challenge: 'NMAX Your Style Challenge'
      },
      stats: {
        likes: 743,
        comments: 67,
        shares: 18
      },
      timestamp: '8 jam yang lalu',
      verified: false
    },
    {
      id: 5,
      user: {
        name: 'Dewi Lestari',
        avatar: '/images/hero2.jpg',
        location: 'Medan',
        verified: true
      },
      post: {
        image: '/images/hero2.jpg',
        caption: 'Pilano My Style - Pastel vibes dengan Filano! 🌸 #PilanoMyStyle',
        hashtags: ['#PilanoMyStyle', '#PastelVibes', '#Feminine'],
        challenge: 'Pilano My Style Challenge'
      },
      stats: {
        likes: 2103,
        comments: 156,
        shares: 42
      },
      timestamp: '1 hari yang lalu',
      verified: true
    }
  ]

  const filterOptions = [
    { value: 'all', label: 'Semua Posting' },
    { value: 'verified', label: 'Verified Members' },
    { value: 'trending', label: 'Trending' },
    { value: 'recent', label: 'Terbaru' }
  ]

  const filteredPosts = memberPosts.filter(post => {
    const matchesSearch = post.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.post.caption.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.post.hashtags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesFilter = filterType === 'all' || 
                         (filterType === 'verified' && post.verified) ||
                         (filterType === 'trending' && post.stats.likes > 1000) ||
                         (filterType === 'recent' && post.timestamp.includes('jam'))
    
    return matchesSearch && matchesFilter
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-yamaha-blue to-blue-600 text-white p-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
            <Users size={20} />
            <span className="font-bold text-sm">Yamaha Warior Members</span>
          </div>
          <h1 className="text-3xl font-black mb-2">Posting Members</h1>
          <p className="text-white/90 text-sm">
            Lihat posting terbaru dari komunitas Yamaha Warior
          </p>
        </motion.div>
      </div>

      {/* Search and Filter */}
      <div className="px-6 -mt-10 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-4 border-l-4 border-yamaha-blue"
        >
          {/* Search Bar */}
          <div className="relative mb-4">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Cari posting, member, atau hashtag..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yamaha-blue focus:border-transparent"
            />
          </div>

          {/* Filter Options */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {filterOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setFilterType(option.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  filterType === option.value
                    ? 'bg-yamaha-blue text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Posts Grid */}
      <div className="px-6 space-y-6">
        {filteredPosts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group bg-white overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-l-4 border-yamaha-blue"
          >
            {/* User Info */}
            <div className="p-4 flex items-center gap-3">
              <div className="relative">
                <img
                  src={post.user.avatar}
                  alt={post.user.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                {post.verified && (
                  <div className="absolute -bottom-1 -right-1 bg-yamaha-blue text-white rounded-full p-1">
                    <Trophy size={12} />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-gray-800">{post.user.name}</h3>
                  {post.verified && (
                    <span className="bg-yamaha-blue text-white text-xs px-2 py-0.5 rounded-full font-semibold">
                      Verified
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>{post.user.location}</span>
                  <span>•</span>
                  <span>{post.timestamp}</span>
                </div>
              </div>
            </div>

            {/* Post Image */}
            <div className="relative">
              <img
                src={post.post.image}
                alt="Post content"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4">
                <div className="bg-yamaha-blue/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold">
                  {post.post.challenge}
                </div>
              </div>
            </div>

            {/* Post Content */}
            <div className="p-4">
              <p className="text-gray-800 mb-3 leading-relaxed">
                {post.post.caption}
              </p>

              {/* Hashtags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {post.post.hashtags.map((hashtag, idx) => (
                  <span
                    key={idx}
                    className="bg-yamaha-blue/10 text-yamaha-blue px-2 py-1 rounded-full text-xs font-medium"
                  >
                    {hashtag}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors">
                    <Heart size={18} />
                    <span className="text-sm font-medium">{post.stats.likes}</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors">
                    <MessageCircle size={18} />
                    <span className="text-sm font-medium">{post.stats.comments}</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-600 hover:text-green-500 transition-colors">
                    <Share2 size={18} />
                    <span className="text-sm font-medium">{post.stats.shares}</span>
                  </button>
                </div>
                <div className="flex items-center gap-1 text-yamaha-blue">
                  <Award size={16} />
                  <span className="text-sm font-semibold">Challenge</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredPosts.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 px-6"
        >
          <Users size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">Tidak ada posting ditemukan</h3>
          <p className="text-gray-500 text-sm">
            Coba ubah kata kunci pencarian atau filter
          </p>
        </motion.div>
      )}

    </div>
  )
}

export default Members
