import { useState } from 'react'
import { 
  Search, 
  Filter,
  Calendar,
  User,
  Trophy,
  Award,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Download,
  TrendingUp,
  Activity,
  Users,
  Star
} from 'lucide-react'
import { mockMembers } from '../../data/mockData'

const ActivityMembers = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterPeriod, setFilterPeriod] = useState('all')
  const [filterActivity, setFilterActivity] = useState('all')
  const [viewMode, setViewMode] = useState('cards') // 'cards' or 'timeline'
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(20)
  const [members] = useState(mockMembers)

  // Generate mock activity data
  const generateActivityData = () => {
    const activities = []
    const activityTypes = ['challenge_joined', 'challenge_completed', 'submission_approved', 'submission_rejected', 'points_earned', 'level_up']
    
    members.forEach(member => {
      // Generate 3-5 activities per member
      const memberActivities = Math.floor(Math.random() * 3) + 3
      
      for (let i = 0; i < memberActivities; i++) {
        const activityType = activityTypes[Math.floor(Math.random() * activityTypes.length)]
        const daysAgo = Math.floor(Math.random() * 30) + 1
        const activityDate = new Date()
        activityDate.setDate(activityDate.getDate() - daysAgo)
        
        activities.push({
          id: `${member.id}-${i}`,
          memberId: member.id,
          memberName: member.name,
          memberEmail: member.email,
          activityType,
          description: getActivityDescription(activityType),
          points: activityType === 'points_earned' ? Math.floor(Math.random() * 100) + 10 : 0,
          challengeName: member.challenges[Math.floor(Math.random() * member.challenges.length)]?.name || 'Ride Challenge',
          timestamp: activityDate,
          status: activityType.includes('approved') ? 'success' : activityType.includes('rejected') ? 'error' : 'info'
        })
      }
    })
    
    return activities.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
  }

  const getActivityDescription = (type) => {
    const descriptions = {
      challenge_joined: 'Joined a new challenge',
      challenge_completed: 'Completed a challenge',
      submission_approved: 'Submission approved',
      submission_rejected: 'Submission rejected',
      points_earned: 'Earned points',
      level_up: 'Level up achieved'
    }
    return descriptions[type] || 'Activity performed'
  }

  const getActivityIcon = (type, status) => {
    switch (type) {
      case 'challenge_joined':
        return <Trophy className="w-4 h-4 text-blue-500" />
      case 'challenge_completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'submission_approved':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'submission_rejected':
        return <XCircle className="w-4 h-4 text-red-500" />
      case 'points_earned':
        return <Award className="w-4 h-4 text-yellow-500" />
      case 'level_up':
        return <Star className="w-4 h-4 text-purple-500" />
      default:
        return <Activity className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'success':
        return <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Success</span>
      case 'error':
        return <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">Failed</span>
      case 'info':
        return <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">Info</span>
      default:
        return <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">{status}</span>
    }
  }

  const [activities] = useState(generateActivityData())

  // Filter activities
  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.challengeName.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesPeriod = filterPeriod === 'all' || 
                         (filterPeriod === 'today' && isToday(activity.timestamp)) ||
                         (filterPeriod === 'week' && isThisWeek(activity.timestamp)) ||
                         (filterPeriod === 'month' && isThisMonth(activity.timestamp))
    
    const matchesActivity = filterActivity === 'all' || activity.activityType === filterActivity
    
    return matchesSearch && matchesPeriod && matchesActivity
  })

  const isToday = (date) => {
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  const isThisWeek = (date) => {
    const now = new Date()
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    return date >= weekAgo
  }

  const isThisMonth = (date) => {
    const now = new Date()
    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
  }

  const getTotalActivities = () => activities.length
  const getTodayActivities = () => activities.filter(a => isToday(a.timestamp)).length
  const getActiveMembers = () => new Set(activities.map(a => a.memberId)).size
  const getTotalPoints = () => activities.reduce((sum, a) => sum + a.points, 0)

  // Pagination
  const totalPages = Math.ceil(filteredActivities.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedActivities = filteredActivities.slice(startIndex, endIndex)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-yamaha-dark">Activity Members</h1>
          <p className="mt-1 text-sm text-gray-600">Monitor member activities and engagement</p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-3">
          {/* View Toggle */}
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('cards')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                viewMode === 'cards' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Cards
            </button>
            <button
              onClick={() => setViewMode('timeline')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                viewMode === 'timeline' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Timeline
            </button>
          </div>
          
          <button className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-800">
            <Download className="w-4 h-4 mr-2" />
            Export Activity
          </button>
        </div>
      </div>

      {/* Stats Cards - Compact */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-1.5 bg-blue-100 rounded-lg">
              <Activity className="w-5 h-5 text-yamaha-blue" />
            </div>
            <div className="ml-3">
              <p className="text-xs font-medium text-gray-600">Total Activities</p>
              <p className="text-lg font-bold text-yamaha-dark">{getTotalActivities()}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-1.5 bg-green-100 rounded-lg">
              <Clock className="w-5 h-5 text-green-600" />
            </div>
            <div className="ml-3">
              <p className="text-xs font-medium text-gray-600">Today's Activities</p>
              <p className="text-lg font-bold text-yamaha-dark">{getTodayActivities()}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-1.5 bg-yellow-100 rounded-lg">
              <Users className="w-5 h-5 text-yellow-600" />
            </div>
            <div className="ml-3">
              <p className="text-xs font-medium text-gray-600">Active Members</p>
              <p className="text-lg font-bold text-yamaha-dark">{getActiveMembers()}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-1.5 bg-purple-100 rounded-lg">
              <Award className="w-5 h-5 text-purple-600" />
            </div>
            <div className="ml-3">
              <p className="text-xs font-medium text-gray-600">Points Earned</p>
              <p className="text-lg font-bold text-yamaha-dark">{getTotalPoints()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search activities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue w-full sm:w-64"
              />
            </div>
            
            {/* Period Filter */}
            <select
              value={filterPeriod}
              onChange={(e) => setFilterPeriod(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
            
            {/* Activity Filter */}
            <select
              value={filterActivity}
              onChange={(e) => setFilterActivity(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
            >
              <option value="all">All Activities</option>
              <option value="challenge_joined">Challenge Joined</option>
              <option value="challenge_completed">Challenge Completed</option>
              <option value="submission_approved">Submission Approved</option>
              <option value="submission_rejected">Submission Rejected</option>
              <option value="points_earned">Points Earned</option>
              <option value="level_up">Level Up</option>
            </select>
          </div>
        </div>
      </div>

      {/* Activity Cards */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
          <p className="text-sm text-gray-600">Member activities and engagement in card view</p>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
            {paginatedActivities.map((activity, index) => (
              <div key={activity.id} className="bg-white rounded-lg p-3 hover:shadow-md transition-all duration-200 border border-gray-200 hover:border-yamaha-blue/20">
                {/* Compact Header */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {/* Avatar */}
                    <div className="w-7 h-7 bg-yamaha-blue rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-medium text-xs">
                        {activity.memberName.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-medium text-gray-900 truncate">{activity.memberName}</h4>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    {getActivityIcon(activity.activityType, activity.status)}
                  </div>
                </div>
                
                {/* Activity Content - Compact */}
                <div className="space-y-1">
                  <p className="text-xs text-gray-700 font-medium leading-tight">{activity.description}</p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="flex items-center truncate">
                      <Trophy className="w-3 h-3 mr-1 flex-shrink-0" />
                      <span className="truncate">{activity.challengeName}</span>
                    </span>
                    <span className="flex items-center text-xs text-gray-400 ml-2">
                      <Clock className="w-3 h-3 mr-1" />
                      {activity.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </span>
                  </div>
                  
                  {activity.points > 0 && (
                    <div className="flex items-center justify-center pt-1">
                      <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                        <Award className="w-3 h-3 mr-1" />
                        +{activity.points}
                      </span>
                    </div>
                  )}
                </div>
                
                {/* Status Badge */}
                <div className="mt-2 flex items-center justify-between">
                  {getStatusBadge(activity.status)}
                  <button className="text-yamaha-blue hover:text-blue-700 text-xs p-1">
                    <Eye className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing {startIndex + 1} to {Math.min(endIndex, filteredActivities.length)} of {filteredActivities.length} activities
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <div className="flex items-center space-x-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const page = i + 1
                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-1 text-sm rounded-md ${
                          currentPage === page
                            ? 'bg-yamaha-blue text-white'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                        }`}
                      >
                        {page}
                      </button>
                    )
                  })}
                </div>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Empty State */}
      {filteredActivities.length === 0 && (
        <div className="text-center py-12">
          <Activity className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No activities found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm || filterPeriod !== 'all' || filterActivity !== 'all'
              ? 'Try adjusting your search or filter criteria.'
              : 'No member activities have been recorded yet.'
            }
          </p>
        </div>
      )}
    </div>
  )
}

export default ActivityMembers
