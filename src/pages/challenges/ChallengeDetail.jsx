import { motion } from 'framer-motion'
import { useNavigate, useParams } from 'react-router-dom'
import Header from '../../components/Header'
import { Trophy, Clock, Users, Target, CheckCircle, Upload } from 'lucide-react'

const ChallengeDetail = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  // Mock data - in production, fetch based on id
  const challenge = {
    id: id,
    title: 'Share Your Daily Ride',
    description: 'Post your Yamaha on Instagram Stories and tag @yamahamotorindo to earn points. Make sure your bike is clearly visible and use our official hashtag #YamahaWarior.',
    category: 'Social Media',
    points: 100,
    deadline: '2 days left',
    endDate: 'Oct 7, 2025',
    participants: 1250,
    difficulty: 'Easy',
    status: 'active',
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&h=400&fit=crop',
    requirements: [
      'Must be a Yamaha matic motorcycle owner',
      'Post on Instagram Stories or Feed',
      'Tag @yamahamotorindo',
      'Use hashtag #YamahaWarior',
      'Submit screenshot as proof',
    ],
    rewards: [
      { points: 100, description: 'Base points for completion' },
      { points: 50, description: 'Bonus for creative content' },
      { points: 25, description: 'Extra for using all hashtags' },
    ],
    steps: [
      'Take a great photo of your Yamaha motorcycle',
      'Post it on your Instagram account',
      'Tag @yamahamotorindo and use #YamahaWarior',
      'Take a screenshot of your post',
      'Upload the screenshot here to submit',
    ],
  }

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100">
      <Header title="Detail Challenge" showBack={true} />

      {/* Hero Image */}
      <div className="relative h-56 bg-gradient-yamaha">
        <img
          src={challenge.image}
          alt={challenge.title}
          className="w-full h-full object-cover mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(challenge.difficulty)}`}>
            {challenge.difficulty}
          </span>
          <span className="bg-yamaha-blue text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
            +{challenge.points} pts
          </span>
        </div>

        {/* Title */}
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <span className="text-xs font-semibold opacity-90">{challenge.category}</span>
          <h1 className="text-2xl font-black mt-1">{challenge.title}</h1>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-6 py-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white rounded-xl p-4 text-center">
            <Clock size={20} className="mx-auto text-yamaha-blue mb-1" />
            <p className="text-xs text-gray-600">Deadline</p>
            <p className="font-bold text-sm text-yamaha-dark">{challenge.deadline}</p>
          </div>
          <div className="bg-white rounded-xl p-4 text-center">
            <Users size={20} className="mx-auto text-yamaha-blue mb-1" />
            <p className="text-xs text-gray-600">Joined</p>
            <p className="font-bold text-sm text-yamaha-dark">{challenge.participants}</p>
          </div>
          <div className="bg-white rounded-xl p-4 text-center">
            <Trophy size={20} className="mx-auto text-yamaha-blue mb-1" />
            <p className="text-xs text-gray-600">Max Points</p>
            <p className="font-bold text-sm text-yamaha-dark">{challenge.points + 75}</p>
          </div>
        </div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 mb-4"
        >
          <h2 className="font-bold text-lg text-yamaha-dark mb-3">Tentang Challenge</h2>
          <p className="text-gray-600 leading-relaxed">{challenge.description}</p>
        </motion.div>

        {/* Requirements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-6 mb-4"
        >
          <h2 className="font-bold text-lg text-yamaha-dark mb-4">Persyaratan</h2>
          <ul className="space-y-3">
            {challenge.requirements.map((req, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-600 text-sm">{req}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-6 mb-4"
        >
          <h2 className="font-bold text-lg text-yamaha-dark mb-4">Cara Menyelesaikan</h2>
          <ol className="space-y-4">
            {challenge.steps.map((step, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="bg-yamaha-blue text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                  {index + 1}
                </div>
                <span className="text-gray-600 text-sm pt-0.5">{step}</span>
              </li>
            ))}
          </ol>
        </motion.div>

        {/* Rewards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-yamaha-dark text-white rounded-2xl p-6 mb-6 border-2 border-yamaha-blue"
        >
          <div className="flex items-center gap-2 mb-4">
            <Target size={24} />
            <h2 className="font-bold text-lg">Rincian Hadiah</h2>
          </div>
          <div className="space-y-3">
            {challenge.rewards.map((reward, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-white/90">{reward.description}</span>
                <span className="font-bold text-lg">+{reward.points}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-white/20 flex items-center justify-between">
            <span className="font-semibold">Total Maksimal</span>
            <span className="text-2xl font-black">
              +{challenge.rewards.reduce((sum, r) => sum + r.points, 0)} pts
            </span>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate(`/challenges/${id}/submit`)}
          className="w-full bg-yamaha-blue text-white font-bold text-lg py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg hover:bg-yamaha-blue/90 transition-colors mb-6"
        >
          <Upload size={24} />
          Ikuti & Submit Challenge
        </motion.button>
      </div>
    </div>
  )
}

export default ChallengeDetail
