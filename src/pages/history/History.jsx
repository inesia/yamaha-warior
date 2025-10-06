import { motion } from 'framer-motion'
import Header from '../../components/Header'
import { CheckCircle, Clock, XCircle, TrendingUp, Calendar } from 'lucide-react'

const History = () => {
  const activities = [
    {
      id: 1,
      type: 'challenge_completed',
      title: 'Share Your Daily Ride',
      description: 'Challenge completed successfully',
      points: 100,
      status: 'completed',
      date: '2025-10-05T10:30:00',
      image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=100&h=100&fit=crop',
    },
    {
      id: 2,
      type: 'challenge_submitted',
      title: 'Weekend Warrior',
      description: 'Submission under review',
      points: 250,
      status: 'pending',
      date: '2025-10-04T15:20:00',
      image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=100&h=100&fit=crop',
    },
    {
      id: 3,
      type: 'challenge_rejected',
      title: 'Community Builder',
      description: 'Submission did not meet requirements',
      points: 0,
      status: 'rejected',
      date: '2025-10-03T09:15:00',
      image: 'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=100&h=100&fit=crop',
    },
    {
      id: 4,
      type: 'rank_up',
      title: 'Rank Up!',
      description: 'You reached Rookie Warior rank',
      points: 0,
      status: 'achievement',
      date: '2025-10-02T14:00:00',
    },
    {
      id: 5,
      type: 'challenge_completed',
      title: 'First Step Challenge',
      description: 'Welcome bonus received',
      points: 50,
      status: 'completed',
      date: '2025-10-01T12:00:00',
      image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=100&h=100&fit=crop',
    },
  ]

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={20} className="text-yamaha-blue" />
      case 'pending':
        return <Clock size={20} className="text-gray-600" />
      case 'rejected':
        return <XCircle size={20} className="text-gray-400" />
      case 'achievement':
        return <TrendingUp size={20} className="text-yamaha-dark" />
      default:
        return null
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-blue-100 text-blue-700'
      case 'pending':
        return 'bg-gray-100 text-gray-700'
      case 'rejected':
        return 'bg-gray-200 text-gray-600'
      case 'achievement':
        return 'bg-yamaha-dark/10 text-yamaha-dark'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60))

    if (diffInHours < 24) {
      if (diffInHours < 1) return 'Just now'
      return `${diffInHours}h ago`
    } else {
      const diffInDays = Math.floor(diffInHours / 24)
      if (diffInDays === 1) return 'Yesterday'
      if (diffInDays < 7) return `${diffInDays}d ago`
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    }
  }

  const groupByDate = (activities) => {
    const groups = {}
    activities.forEach((activity) => {
      const date = new Date(activity.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
      if (!groups[date]) {
        groups[date] = []
      }
      groups[date].push(activity)
    })
    return groups
  }

  const groupedActivities = groupByDate(activities)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Riwayat Aktivitas" showBack={true} />

      <div className="max-w-lg mx-auto px-6 py-6">
        {/* Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-yamaha text-white rounded-2xl p-6 mb-6"
        >
          <h2 className="text-lg font-bold mb-4">Ringkasan Aktivitas</h2>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-3xl font-black">
                {activities.filter((a) => a.status === 'completed').length}
              </p>
              <p className="text-xs text-white/80 mt-1">Selesai</p>
            </div>
            <div>
              <p className="text-3xl font-black">
                {activities.filter((a) => a.status === 'pending').length}
              </p>
              <p className="text-xs text-white/80 mt-1">Pending</p>
            </div>
            <div>
              <p className="text-3xl font-black">
                {activities.reduce((sum, a) => sum + a.points, 0)}
              </p>
              <p className="text-xs text-white/80 mt-1">Total Poin</p>
            </div>
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="space-y-6">
          {Object.entries(groupedActivities).map(([date, activities], groupIndex) => (
            <div key={date}>
              {/* Date Header */}
              <div className="flex items-center gap-2 mb-4">
                <Calendar size={16} className="text-gray-500" />
                <h3 className="text-sm font-semibold text-gray-500">{date}</h3>
              </div>

              {/* Activities */}
              <div className="space-y-3">
                {activities.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (groupIndex * activities.length + index) * 0.05 }}
                    className="bg-white rounded-xl p-4 shadow-sm"
                  >
                    <div className="flex items-start gap-4">
                      {/* Image or Icon */}
                      {activity.image ? (
                        <img
                          src={activity.image}
                          alt={activity.title}
                          className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-gradient-yamaha flex items-center justify-center flex-shrink-0">
                          {getStatusIcon(activity.status)}
                        </div>
                      )}

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h4 className="font-bold text-yamaha-dark">{activity.title}</h4>
                          {activity.points > 0 && (
                            <span className="text-yamaha-blue font-bold text-sm whitespace-nowrap">
                              +{activity.points}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{activity.description}</p>
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadge(
                              activity.status
                            )}`}
                          >
                            {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                          </span>
                          <span className="text-xs text-gray-500">{formatDate(activity.date)}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State (if no activities) */}
        {activities.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock size={32} className="text-gray-400" />
            </div>
            <h3 className="font-bold text-lg text-yamaha-dark mb-2">Belum Ada Aktivitas</h3>
            <p className="text-gray-600 text-sm">
              Selesaikan challenge untuk melihat riwayat aktivitas kamu disini
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default History
