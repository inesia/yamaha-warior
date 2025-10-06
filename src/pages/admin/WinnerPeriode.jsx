import { useState } from 'react'
import { 
  Search, 
  Filter,
  Trophy,
  Medal,
  Crown,
  Award,
  Calendar,
  Users,
  Download,
  Eye,
  Star,
  Gift
} from 'lucide-react'
import { mockWinners, mockChallenges } from '../../data/mockData'

const WinnerPeriode = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedChallenge, setSelectedChallenge] = useState('all')
  const [selectedWinner, setSelectedWinner] = useState(null)
  const [winners] = useState(mockWinners)
  const [challenges] = useState(mockChallenges)

  // Filter winners based on search and selected challenge
  const filteredWinners = winners.filter(winner => {
    const matchesSearch = winner.challengeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         winner.periode.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesChallenge = selectedChallenge === 'all' || winner.challengeId.toString() === selectedChallenge
    
    return matchesSearch && matchesChallenge
  })

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />
      case 3:
        return <Medal className="w-6 h-6 text-amber-600" />
      default:
        return <span className="w-6 h-6 flex items-center justify-center text-sm font-bold text-gray-500">#{rank}</span>
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

  const getTotalWinners = () => {
    return winners.reduce((sum, winner) => sum + winner.winners.length, 0)
  }

  const getTotalParticipants = () => {
    return winners.reduce((sum, winner) => sum + winner.totalParticipants, 0)
  }

  const getTotalSubmissions = () => {
    return winners.reduce((sum, winner) => sum + winner.totalSubmissions, 0)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-yamaha-dark">Winner Periode</h1>
          <p className="mt-1 text-sm text-gray-600">View winners and results from completed challenges</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-800">
            <Download className="w-4 h-4 mr-2" />
            Export Winners
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
              <p className="text-xs font-medium text-gray-600">Completed Challenges</p>
              <p className="text-lg font-bold text-yamaha-dark">{winners.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-1.5 bg-yellow-100 rounded-lg">
              <Crown className="w-5 h-5 text-yellow-600" />
            </div>
            <div className="ml-3">
              <p className="text-xs font-medium text-gray-600">Total Winners</p>
              <p className="text-lg font-bold text-yamaha-dark">{getTotalWinners()}</p>
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
            <div className="p-1.5 bg-purple-100 rounded-lg">
              <Award className="w-5 h-5 text-purple-600" />
            </div>
            <div className="ml-3">
              <p className="text-xs font-medium text-gray-600">Total Submissions</p>
              <p className="text-lg font-bold text-yamaha-dark">{getTotalSubmissions()}</p>
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

      {/* Winners List */}
      <div className="space-y-6">
        {filteredWinners.map((winner) => (
          <div key={winner.challengeId} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* Challenge Header */}
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Trophy className="w-5 h-5 text-yamaha-blue mr-3" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{winner.challengeName}</h3>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      {winner.periode}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">
                    {winner.totalParticipants} participants • {winner.totalSubmissions} submissions
                  </div>
                </div>
              </div>
            </div>

            {/* Winners Podium */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {winner.winners.map((winnerData, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border-2 ${
                      winnerData.rank === 1 
                        ? 'bg-yellow-50 border-yellow-200' 
                        : winnerData.rank === 2 
                        ? 'bg-gray-50 border-gray-200' 
                        : 'bg-amber-50 border-amber-200'
                    }`}
                  >
                    <div className="text-center">
                      <div className="flex justify-center mb-3">
                        {getRankIcon(winnerData.rank)}
                      </div>
                      <div className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full border ${getRankBadge(winnerData.rank)} mb-2`}>
                        #{winnerData.rank}
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-1">{winnerData.name}</h4>
                      <div className="flex items-center justify-center text-sm text-gray-600 mb-2">
                        <Award className="w-4 h-4 mr-1" />
                        {winnerData.points} points
                      </div>
                      <div className="flex items-center justify-center text-sm text-yamaha-blue">
                        <Gift className="w-4 h-4 mr-1" />
                        {winnerData.prize}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Challenge Stats */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-yamaha-dark">{winner.totalParticipants}</div>
                  <div className="text-sm text-gray-600">Total Participants</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-yamaha-dark">{winner.totalSubmissions}</div>
                  <div className="text-sm text-gray-600">Submissions</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-yamaha-dark">
                    {Math.round((winner.totalSubmissions / winner.totalParticipants) * 100)}%
                  </div>
                  <div className="text-sm text-gray-600">Submission Rate</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredWinners.length === 0 && (
        <div className="text-center py-12">
          <Trophy className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No winners found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm || selectedChallenge !== 'all' 
              ? 'Try adjusting your search or filter criteria.'
              : 'No challenges have been completed yet.'
            }
          </p>
        </div>
      )}

      {/* Winner Detail Modal */}
      {selectedWinner && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-yamaha-blue sm:mx-0 sm:h-10 sm:w-10">
                    <Trophy className="h-6 w-6 text-white" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Winner Details
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Detailed information about the winner will be displayed here.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={() => setSelectedWinner(null)}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-yamaha-blue text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yamaha-blue sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default WinnerPeriode
