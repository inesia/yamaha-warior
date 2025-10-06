import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Filter,
  Trophy,
  Users,
  Calendar,
  Award,
  Eye,
  Play,
  Pause,
  X,
  Save,
  Upload,
  Image,
  AlertTriangle,
  CheckCircle,
  XCircle
} from 'lucide-react'
import { mockChallenges } from '../../data/mockData'

const Challenges = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [viewMode, setViewMode] = useState('cards') // 'cards' or 'table'
  const [challenges, setChallenges] = useState(mockChallenges)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [challengeToDelete, setChallengeToDelete] = useState(null)
  const [editingChallenge, setEditingChallenge] = useState(null)
  const [newChallenge, setNewChallenge] = useState({
    name: '',
    periode: '',
    description: '',
    requirements: '',
    reward: '',
    status: 'active',
    image: null
  })

  // Filter challenges based on search and status
  const filteredChallenges = challenges.filter(challenge => {
    const matchesSearch = challenge.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         challenge.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = filterStatus === 'all' || challenge.status === filterStatus
    
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Active</span>
      case 'inactive':
        return <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">Inactive</span>
      case 'completed':
        return <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">Completed</span>
      default:
        return <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">{status}</span>
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <Play className="w-4 h-4 text-green-500" />
      case 'inactive':
        return <Pause className="w-4 h-4 text-gray-500" />
      default:
        return <Trophy className="w-4 h-4 text-gray-500" />
    }
  }

  // Handle create challenge
  const handleCreateChallenge = () => {
    if (newChallenge.name && newChallenge.periode && newChallenge.description && newChallenge.requirements && newChallenge.reward) {
      const challenge = {
        ...newChallenge,
        id: Date.now().toString(),
        participants: 0,
        submissions: 0,
        createdAt: new Date().toISOString().split('T')[0]
      }
      setChallenges([...challenges, challenge])
      setNewChallenge({
        name: '',
        periode: '',
        description: '',
        requirements: '',
        reward: '',
        status: 'active',
        image: null
      })
      setIsDrawerOpen(false)
    }
  }

  // Handle edit challenge
  const handleEditChallenge = (challenge) => {
    setEditingChallenge(challenge)
    setNewChallenge({
      name: challenge.name,
      periode: challenge.periode,
      description: challenge.description,
      requirements: challenge.requirements,
      reward: challenge.reward,
      status: challenge.status,
      image: null
    })
    setIsDrawerOpen(true)
  }

  // Handle update challenge
  const handleUpdateChallenge = () => {
    if (editingChallenge && newChallenge.name && newChallenge.periode && newChallenge.description && newChallenge.requirements && newChallenge.reward) {
      setChallenges(challenges.map(c => 
        c.id === editingChallenge.id 
          ? { ...c, ...newChallenge }
          : c
      ))
      setEditingChallenge(null)
      setNewChallenge({
        name: '',
        periode: '',
        description: '',
        requirements: '',
        reward: '',
        status: 'active',
        image: null
      })
      setIsDrawerOpen(false)
    }
  }

  // Handle delete challenge
  const handleDeleteChallenge = (challenge) => {
    setChallengeToDelete(challenge)
    setIsDeleteModalOpen(true)
  }

  // Confirm delete
  const confirmDelete = () => {
    if (challengeToDelete) {
      setChallenges(challenges.filter(c => c.id !== challengeToDelete.id))
      setIsDeleteModalOpen(false)
      setChallengeToDelete(null)
    }
  }

  // Handle status toggle
  const handleStatusToggle = (challengeId) => {
    setChallenges(challenges.map(c => 
      c.id === challengeId 
        ? { ...c, status: c.status === 'active' ? 'inactive' : 'active' }
        : c
    ))
  }

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setNewChallenge({...newChallenge, image: file})
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-yamaha-dark">Challenge Management</h1>
          <p className="mt-1 text-sm text-gray-600">Create and manage challenges</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            onClick={() => {
              setEditingChallenge(null)
              setNewChallenge({
                name: '',
                periode: '',
                description: '',
                requirements: '',
                reward: '',
                status: 'active',
                image: null
              })
              setIsDrawerOpen(true)
            }}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-yamaha-blue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yamaha-blue"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Challenge
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
              <p className="text-lg font-bold text-yamaha-dark">{challenges.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-1.5 bg-green-100 rounded-lg">
              <Play className="w-5 h-5 text-green-600" />
            </div>
            <div className="ml-3">
              <p className="text-xs font-medium text-gray-600">Active Challenges</p>
              <p className="text-lg font-bold text-yamaha-dark">
                {challenges.filter(c => c.status === 'active').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-1.5 bg-yellow-100 rounded-lg">
              <Users className="w-5 h-5 text-yellow-600" />
            </div>
            <div className="ml-3">
              <p className="text-xs font-medium text-gray-600">Total Participants</p>
              <p className="text-lg font-bold text-yamaha-dark">
                {challenges.reduce((sum, c) => sum + c.participants, 0)}
              </p>
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
              <p className="text-lg font-bold text-yamaha-dark">
                {challenges.reduce((sum, c) => sum + c.submissions, 0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
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
            
            {/* Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
            >
              <option value="all">All Challenges</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          
          {/* View Mode Toggle */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('cards')}
              className={`px-3 py-2 text-sm rounded-md ${
                viewMode === 'cards' 
                  ? 'bg-yamaha-blue text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Cards
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-2 text-sm rounded-md ${
                viewMode === 'table' 
                  ? 'bg-yamaha-blue text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Table
            </button>
          </div>
        </div>
      </div>

      {/* Challenges Content */}
      {viewMode === 'cards' ? (
        /* Card View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChallenges.map((challenge) => (
            <div key={challenge.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
              {/* Card Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-start justify-between">
                  <div className="flex items-center">
                    {getStatusIcon(challenge.status)}
                    <div className="ml-3">
                      <h3 className="text-lg font-semibold text-gray-900">{challenge.name}</h3>
                      <p className="text-sm text-gray-600">{challenge.periode}</p>
                    </div>
                  </div>
                  {getStatusBadge(challenge.status)}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6">
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{challenge.description}</p>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Participants</span>
                    <span className="text-sm font-medium">{challenge.participants}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Submissions</span>
                    <span className="text-sm font-medium">{challenge.submissions}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Reward</span>
                    <span className="text-sm font-medium text-yamaha-blue">{challenge.reward}</span>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 py-4 bg-gray-50 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => handleStatusToggle(challenge.id)}
                    className={`${challenge.status === 'active' ? 'text-red-600 hover:text-red-800' : 'text-green-600 hover:text-green-800'}`}
                    title={challenge.status === 'active' ? 'Deactivate' : 'Activate'}
                  >
                    {challenge.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  <button 
                    onClick={() => handleEditChallenge(challenge)}
                    className="text-gray-600 hover:text-gray-800"
                    title="Edit Challenge"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDeleteChallenge(challenge)}
                    className="text-red-600 hover:text-red-800"
                    title="Delete Challenge"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <Link
                  to={`/admin/challenges/${challenge.id}`}
                  className="text-sm text-yamaha-blue hover:text-blue-700 font-medium"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Table View */
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Challenge
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Periode
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Participants
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Submissions
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredChallenges.map((challenge) => (
                  <tr key={challenge.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{challenge.name}</div>
                        <div className="text-sm text-gray-500 line-clamp-1">{challenge.description}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{challenge.periode}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{challenge.participants}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{challenge.submissions}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(challenge.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => handleStatusToggle(challenge.id)}
                          className={`${challenge.status === 'active' ? 'text-red-600 hover:text-red-800' : 'text-green-600 hover:text-green-800'}`}
                          title={challenge.status === 'active' ? 'Deactivate' : 'Activate'}
                        >
                          {challenge.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </button>
                        <button 
                          onClick={() => handleEditChallenge(challenge)}
                          className="text-gray-600 hover:text-gray-800"
                          title="Edit Challenge"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteChallenge(challenge)}
                          className="text-red-600 hover:text-red-800"
                          title="Delete Challenge"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Create/Edit Challenge Drawer */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div 
            className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300" 
            onClick={() => setIsDrawerOpen(false)}
          ></div>
          <div className="absolute right-0 top-0 h-full w-full max-w-2xl bg-white shadow-xl transform transition-transform duration-300 ease-in-out translate-x-0">
            <div className="flex h-full flex-col">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  {editingChallenge ? 'Edit Challenge' : 'Create New Challenge'}
                </h2>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Form */}
              <div className="flex-1 overflow-y-auto px-6 py-4">
                <div className="space-y-4">
                  {/* Challenge Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Challenge Name</label>
                    <input
                      type="text"
                      value={newChallenge.name}
                      onChange={(e) => setNewChallenge({...newChallenge, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
                      placeholder="Enter challenge name"
                    />
                  </div>

                  {/* Periode */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Periode</label>
                    <input
                      type="text"
                      value={newChallenge.periode}
                      onChange={(e) => setNewChallenge({...newChallenge, periode: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
                      placeholder="e.g., 2024-01-01 - 2024-01-31"
                    />
                  </div>

                  {/* Status */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      value={newChallenge.status}
                      onChange={(e) => setNewChallenge({...newChallenge, status: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      value={newChallenge.description}
                      onChange={(e) => setNewChallenge({...newChallenge, description: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
                      placeholder="Describe the challenge in detail"
                      rows={3}
                    />
                  </div>

                  {/* Requirements */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Requirements</label>
                    <textarea
                      value={newChallenge.requirements}
                      onChange={(e) => setNewChallenge({...newChallenge, requirements: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
                      placeholder="List the requirements for this challenge"
                      rows={3}
                    />
                  </div>

                  {/* Reward */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Reward</label>
                    <input
                      type="text"
                      value={newChallenge.reward}
                      onChange={(e) => setNewChallenge({...newChallenge, reward: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
                      placeholder="e.g., 100 points + merchandise"
                    />
                  </div>

                  {/* Image Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Challenge Image</label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-gray-400 transition-colors">
                      <div className="space-y-1 text-center">
                        <Image className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                          <label htmlFor="image-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-yamaha-blue hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-yamaha-blue">
                            <span>Upload a file</span>
                            <input
                              id="image-upload"
                              name="image-upload"
                              type="file"
                              className="sr-only"
                              onChange={handleImageUpload}
                              accept="image/*"
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                        {newChallenge.image && (
                          <p className="text-sm text-green-600">✓ {newChallenge.image.name}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-gray-200 px-6 py-4">
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setIsDrawerOpen(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={editingChallenge ? handleUpdateChallenge : handleCreateChallenge}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-yamaha-blue rounded-md hover:bg-blue-700"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {editingChallenge ? 'Update Challenge' : 'Create Challenge'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0">
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-gray-900">Delete Challenge</h3>
                    <p className="text-sm text-gray-500">
                      Are you sure you want to delete <strong>{challengeToDelete?.name}</strong>? This action cannot be undone.
                    </p>
                  </div>
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => {
                      setIsDeleteModalOpen(false)
                      setChallengeToDelete(null)
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDelete}
                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Challenges
