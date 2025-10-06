import { useState } from 'react'
import { 
  Search, 
  Filter,
  Trophy,
  Medal,
  Crown,
  Users,
  Award,
  Download,
  Eye,
  Calendar,
  TrendingUp
} from 'lucide-react'
import { mockLeaderboard, mockChallenges } from '../../data/mockData'

const LeaderboardChallenge = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedChallenge, setSelectedChallenge] = useState('all')
  const [leaderboard] = useState(mockLeaderboard)
  const [challenges] = useState(mockChallenges)

  // Filter leaderboard based on search and selected challenge
  const filteredLeaderboard = leaderboard.filter(item => {
    const matchesSearch = item.challengeName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesChallenge = selectedChallenge === 'all' || item.challengeId.toString() === selectedChallenge
    
    return matchesSearch && matchesChallenge
  })

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Crown className="w-5 h-5 text-yellow-500" />
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />
      case 3:
        return <Medal className="w-5 h-5 text-amber-600" />
      default:
        return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold text-gray-500">#{rank}</span>
    }
  }

  const getRankBadge = (rank) => {
    switch (rank) {
      case 1:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 2:
        return 'bg-gray-100 text-gray-800 border-gray-200'
      case 3:
        return 'bg-amber-100 text-amber-800 border-amber-200'
      default:
        return 'bg-gray-50 text-gray-600 border-gray-100'
    }
  }

  const getTotalParticipants = () => {
    return leaderboard.reduce((sum, item) => sum + item.participants.length, 0)
  }

  const getTotalPoints = () => {
    return leaderboard.reduce((sum, item) => 
      sum + item.participants.reduce((itemSum, participant) => itemSum + participant.points, 0), 0
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-yamaha-dark">Leaderboard Challenge</h1>
          <p className="mt-1 text-sm text-gray-600">View rankings and performance across all challenges</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-800">
            <Download className="w-4 h-4 mr-2" />
            Export Leaderboard
          </button>
        </div>
      </div>

      {/* Stats Cards - Compact */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-1.5 bg-blue-100 rounded-lg">
              <Trophy className="w-5 h-5 text-yamaha-blue" />
            </div>
            <div className="ml-3">
              <p className="text-xs font-medium text-gray-600">Total Challenges</p>
              <p className="text-lg font-bold text-yamaha-dark">{leaderboard.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-1.5 bg-green-100 rounded-lg">
              <Users className="w-5 h-5 text-green-600" />
            </div>
            <div className="ml-3">
              <p className="text-xs font-medium text-gray-600">Total Participants</p>
              <p className="text-lg font-bold text-yamaha-dark">{getTotalParticipants()}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-1.5 bg-yellow-100 rounded-lg">
              <Award className="w-5 h-5 text-yellow-600" />
            </div>
            <div className="ml-3">
              <p className="text-xs font-medium text-gray-600">Total Points</p>
              <p className="text-lg font-bold text-yamaha-dark">{getTotalPoints()}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-1.5 bg-purple-100 rounded-lg">
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <div className="ml-3">
              <p className="text-xs font-medium text-gray-600">Avg Points/Challenge</p>
              <p className="text-lg font-bold text-yamaha-dark">
                {Math.round(getTotalPoints() / leaderboard.length)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search challenges..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue w-full sm:w-64"
              />
            </div>
            
            {/* Challenge Filter */}
            <select
              value={selectedChallenge}
              onChange={(e) => setSelectedChallenge(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
            >
              <option value="all">All Challenges</option>
              {challenges.map(challenge => (
                <option key={challenge.id} value={challenge.id}>
                  {challenge.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Leaderboard Tables */}
      <div className="space-y-6">
        {filteredLeaderboard.map((item) => (
          <div key={item.challengeId} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* Challenge Header */}
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Trophy className="w-5 h-5 text-yamaha-blue mr-3" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{item.challengeName}</h3>
                    <p className="text-sm text-gray-600">{item.participants.length} participants</p>
                  </div>
                </div>
                <button className="flex items-center text-sm text-yamaha-blue hover:text-blue-700">
                  <Eye className="w-4 h-4 mr-2" />
                  View Details
                </button>
              </div>
            </div>

            {/* Leaderboard Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rank
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Participant
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Points
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Submitted
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {item.participants.map((participant, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getRankIcon(participant.rank)}
                          <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full border ${getRankBadge(participant.rank)}`}>
                            #{participant.rank}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{participant.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Award className="w-4 h-4 text-yamaha-blue mr-2" />
                          <span className="text-sm font-medium text-gray-900">{participant.points}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="w-4 h-4 mr-2" />
                          {new Date(participant.submittedAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button className="text-yamaha-blue hover:text-blue-700">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="text-gray-600 hover:text-gray-800">
                            View Profile
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredLeaderboard.length === 0 && (
        <div className="text-center py-12">
          <Trophy className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No leaderboard data found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm || selectedChallenge !== 'all' 
              ? 'Try adjusting your search or filter criteria.'
              : 'No challenges have participants yet.'
            }
          </p>
        </div>
      )}
    </div>
  )
}

export default LeaderboardChallenge
