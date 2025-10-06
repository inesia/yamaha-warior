import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import Header from '../../components/Header'
import { 
  Camera, 
  Upload, 
  Image, 
  Heart, 
  Share2, 
  Download,
  Filter,
  Grid,
  List,
  Star,
  Trophy,
  Calendar,
  MapPin,
  Tag
} from 'lucide-react'

const Gallery = () => {
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)

  // Mock data untuk foto-foto user
  const userPhotos = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=400&h=400&fit=crop',
      title: 'Daily Ride with Yamaha',
      description: 'Morning ride to work with my trusted Yamaha',
      date: '2024-01-20',
      location: 'Jakarta',
      tags: ['#YamahaWarior', '#DailyRide', '#MorningVibes'],
      likes: 24,
      challenge: 'Share Your Daily Ride',
      points: 100
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=400&h=400&fit=crop',
      title: 'Weekend Adventure',
      description: 'Exploring new routes with the community',
      date: '2024-01-18',
      location: 'Bogor',
      tags: ['#WeekendRide', '#Adventure', '#Community'],
      likes: 18,
      challenge: 'Weekend Warrior',
      points: 150
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
      title: 'Safety First',
      description: 'Always wear proper safety gear',
      date: '2024-01-15',
      location: 'Bandung',
      tags: ['#SafetyFirst', '#Helmet', '#Gear'],
      likes: 32,
      challenge: 'Safety Campaign',
      points: 75
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=400&fit=crop',
      title: 'Service Day',
      description: 'Regular maintenance at Yamaha service center',
      date: '2024-01-12',
      location: 'Yamaha Service Center',
      tags: ['#Service', '#Maintenance', '#YamahaService'],
      likes: 15,
      challenge: 'Service Challenge',
      points: 200
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=400&h=400&fit=crop',
      title: 'Community Meetup',
      description: 'Great time with fellow Yamaha riders',
      date: '2024-01-10',
      location: 'Yamaha Showroom',
      tags: ['#Community', '#Meetup', '#YamahaFamily'],
      likes: 45,
      challenge: 'Community Builder',
      points: 300
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=400&h=400&fit=crop',
      title: 'Sunset Ride',
      description: 'Beautiful sunset during evening ride',
      date: '2024-01-08',
      location: 'Ancol',
      tags: ['#Sunset', '#EveningRide', '#Beautiful'],
      likes: 28,
      challenge: 'Golden Hour',
      points: 125
    }
  ]

  const [viewMode, setViewMode] = useState('grid')
  const [filterTag, setFilterTag] = useState('all')

  const filteredPhotos = filterTag === 'all' 
    ? userPhotos 
    : userPhotos.filter(photo => photo.tags.some(tag => tag.toLowerCase().includes(filterTag.toLowerCase())))

  const handleLike = (photoId) => {
    // Simulate like functionality
    console.log('Liked photo:', photoId)
  }

  const handleShare = async (photo) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: photo.title,
          text: photo.description,
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
      <Header title="Galeri Foto" showBack={true} />

      <div className="max-w-lg mx-auto px-6 py-6">
        {/* Stats Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-yamaha p-6 mb-6 text-white clip-corner relative overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
          
          <div className="relative z-10">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-black text-white mb-1">{userPhotos.length}</div>
                <div className="text-xs text-white/80 font-semibold">Total Foto</div>
              </div>
              <div>
                <div className="text-2xl font-black text-white mb-1">
                  {userPhotos.reduce((sum, photo) => sum + photo.likes, 0)}
                </div>
                <div className="text-xs text-white/80 font-semibold">Total Likes</div>
              </div>
              <div>
                <div className="text-2xl font-black text-white mb-1">
                  {userPhotos.reduce((sum, photo) => sum + photo.points, 0)}
                </div>
                <div className="text-xs text-white/80 font-semibold">Total Poin</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center justify-between mb-6"
        >
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-yamaha-dark" />
            <select 
              value={filterTag}
              onChange={(e) => setFilterTag(e.target.value)}
              className="text-sm font-semibold text-yamaha-dark bg-transparent border-none outline-none"
            >
              <option value="all">Semua Tag</option>
              <option value="daily">Daily Ride</option>
              <option value="weekend">Weekend</option>
              <option value="safety">Safety</option>
              <option value="community">Community</option>
            </select>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 ${viewMode === 'grid' ? 'bg-yamaha-blue text-white' : 'bg-gray-200 text-gray-600'}`}
            >
              <Grid size={16} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 ${viewMode === 'list' ? 'bg-yamaha-blue text-white' : 'bg-gray-200 text-gray-600'}`}
            >
              <List size={16} />
            </button>
          </div>
        </motion.div>

        {/* Photos Grid/List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={viewMode === 'grid' ? 'grid grid-cols-2 gap-4' : 'space-y-4'}
        >
          {filteredPhotos.map((photo) => (
            <motion.div
              key={photo.id}
              whileHover={{ y: -2 }}
              className={`bg-white shadow-sm hover:shadow-lg transition-all ${
                viewMode === 'grid' ? 'aspect-square' : 'p-4'
              }`}
            >
              {viewMode === 'grid' ? (
                <div className="relative h-full">
                  <img 
                    src={photo.image} 
                    alt={photo.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleLike(photo.id)}
                        className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-colors"
                      >
                        <Heart size={16} className="text-white" />
                      </button>
                      <button
                        onClick={() => handleShare(photo)}
                        className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-colors"
                      >
                        <Share2 size={16} className="text-white" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Points Badge */}
                  <div className="absolute top-2 right-2 bg-yamaha-blue text-white text-xs px-2 py-1 font-bold">
                    +{photo.points} pts
                  </div>
                </div>
              ) : (
                <div className="flex gap-4">
                  <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                    <img 
                      src={photo.image} 
                      alt={photo.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-yamaha-dark mb-1">{photo.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{photo.description}</p>
                    
                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-2">
                      <div className="flex items-center gap-1">
                        <Calendar size={12} />
                        <span>{photo.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin size={12} />
                        <span>{photo.location}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleLike(photo.id)}
                          className="flex items-center gap-1 text-gray-500 hover:text-red-500 transition-colors"
                        >
                          <Heart size={14} />
                          <span className="text-xs">{photo.likes}</span>
                        </button>
                        <div className="flex items-center gap-1 text-yamaha-blue">
                          <Trophy size={14} />
                          <span className="text-xs font-bold">+{photo.points} pts</span>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => handleShare(photo)}
                        className="text-gray-500 hover:text-yamaha-blue transition-colors"
                      >
                        <Share2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Upload Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/challenges')}
          className="fixed bottom-20 right-6 w-14 h-14 bg-yamaha-blue text-white rounded-full shadow-lg hover:bg-yamaha-blue/90 transition-colors flex items-center justify-center z-10"
        >
          <Upload size={24} />
        </motion.button>

        {/* Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-yamaha-blue/10 to-transparent border-l-4 border-yamaha-blue p-4 mt-6"
        >
          <div className="flex items-start gap-3">
            <Camera size={20} className="text-yamaha-blue flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-yamaha-dark mb-2">Tips Foto Terbaik</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Gunakan pencahayaan alami untuk hasil terbaik</li>
                <li>• Pastikan motor terlihat jelas dalam frame</li>
                <li>• Gunakan hashtag yang relevan untuk lebih banyak engagement</li>
                <li>• Bagikan cerita menarik di caption</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Gallery
