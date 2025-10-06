import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { 
  ArrowLeft, 
  Edit, 
  Mail, 
  Phone, 
  MapPin, 
  Trophy, 
  Calendar,
  Award,
  CheckCircle,
  Clock,
  XCircle,
  User,
  Star,
  TrendingUp,
  Activity,
  Target,
  BarChart3,
  X,
  Save
} from 'lucide-react'
import { mockMembers } from '../../data/mockData'

const MemberDetail = () => {
  const { id } = useParams()
  const [member, setMember] = useState(mockMembers.find(m => m.id === parseInt(id)))
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false)
  const [editMember, setEditMember] = useState({
    name: member?.name || '',
    email: member?.email || '',
    phone: member?.phone || '',
    address: member?.address || '',
    yamahaBrand: member?.yamahaBrand || ''
  })

  if (!member) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Member not found</p>
        <Link to="/admin/members" className="text-yamaha-blue hover:text-blue-700">
          Back to Members
        </Link>
      </div>
    )
  }

  const getChallengeStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />
      case 'rejected':
        return <XCircle className="w-4 h-4 text-red-500" />
      default:
        return <Clock className="w-4 h-4 text-gray-500" />
    }
  }

  const getChallengeStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getMemberStats = () => {
    const completedChallenges = member.challenges.filter(c => c.status === 'completed').length
    const pendingChallenges = member.challenges.filter(c => c.status === 'pending').length
    const totalChallenges = member.challenges.length
    const completionRate = totalChallenges > 0 ? Math.round((completedChallenges / totalChallenges) * 100) : 0
    
    return {
      completedChallenges,
      pendingChallenges,
      totalChallenges,
      completionRate
    }
  }

  const stats = getMemberStats()

  // Handle edit member
  const handleEditMember = () => {
    if (editMember.name && editMember.email && editMember.phone && editMember.address && editMember.yamahaBrand) {
      setMember({
        ...member,
        ...editMember
      })
      setIsEditDrawerOpen(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            to="/admin/members"
            className="flex items-center text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Members
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-yamaha-dark">{member.name}</h1>
            <p className="text-sm text-gray-600">Member Details</p>
          </div>
        </div>
        <button 
          onClick={() => setIsEditDrawerOpen(true)}
          className="flex items-center px-4 py-2 bg-yamaha-blue text-white rounded-md hover:bg-blue-700"
        >
          <Edit className="w-4 h-4 mr-2" />
          Edit Member
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Award className="w-6 h-6 text-yamaha-blue" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Points</p>
              <p className="text-2xl font-bold text-yamaha-dark">{member.totalPoints}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-yamaha-dark">{stats.completedChallenges}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-yamaha-dark">{stats.pendingChallenges}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Success Rate</p>
              <p className="text-2xl font-bold text-yamaha-dark">{stats.completionRate}%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Member Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium">{member.email}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="font-medium">{member.phone}</p>
                </div>
              </div>
              <div className="flex items-center md:col-span-2">
                <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">Address</p>
                  <p className="font-medium">{member.address}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Challenge History */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Challenge History</h2>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">
                  {stats.completedChallenges} completed • {stats.pendingChallenges} pending
                </span>
              </div>
            </div>
            <div className="space-y-4">
              {member.challenges.map((challenge, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {getChallengeStatusIcon(challenge.status)}
                      <div className="ml-3">
                        <p className="font-medium text-gray-900">{challenge.name}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span className="flex items-center">
                            <Award className="w-4 h-4 mr-1" />
                            {challenge.points} points
                          </span>
                          <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date().toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getChallengeStatusColor(challenge.status)}`}>
                        {challenge.status}
                      </span>
                      <button className="text-yamaha-blue hover:text-blue-700">
                        <Activity className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Member Profile */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Member Profile</h3>
            <div className="text-center">
              <div className="w-20 h-20 bg-yamaha-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-2xl">
                  {member.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900">{member.name}</h4>
              <p className="text-sm text-gray-600">{member.email}</p>
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Member Since</span>
                  <span className="font-medium">{new Date(member.joinedAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Last Active</span>
                  <span className="font-medium">{new Date(member.lastActive).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Stats */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <BarChart3 className="w-5 h-5 text-yamaha-blue mr-2" />
                  <span className="text-sm text-gray-600">Success Rate</span>
                </div>
                <span className="font-bold text-yamaha-dark">{stats.completionRate}%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Target className="w-5 h-5 text-green-500 mr-2" />
                  <span className="text-sm text-gray-600">Challenges</span>
                </div>
                <span className="font-bold text-yamaha-dark">{stats.totalChallenges}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-500 mr-2" />
                  <span className="text-sm text-gray-600">Avg Points</span>
                </div>
                <span className="font-bold text-yamaha-dark">
                  {stats.totalChallenges > 0 ? Math.round(member.totalPoints / stats.totalChallenges) : 0}
                </span>
              </div>
            </div>
          </div>

          {/* Yamaha Brand */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Yamaha Brand</h3>
            <div className="text-center">
              <div className="w-16 h-16 bg-yamaha-blue rounded-lg flex items-center justify-center mx-auto mb-3">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <p className="text-xl font-bold text-yamaha-dark">{member.yamahaBrand}</p>
              <p className="text-sm text-gray-600">Registered Motorcycle</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                Send Message
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                Reset Password
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                View Submissions
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md">
                Suspend Account
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Member Drawer */}
      {isEditDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div 
            className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300" 
            onClick={() => setIsEditDrawerOpen(false)}
          ></div>
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl transform transition-transform duration-300 ease-in-out translate-x-0">
            <div className="flex h-full flex-col">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                <h2 className="text-lg font-semibold text-gray-900">Edit Member</h2>
                <button
                  onClick={() => setIsEditDrawerOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Form */}
              <div className="flex-1 overflow-y-auto px-6 py-4">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      value={editMember.name}
                      onChange={(e) => setEditMember({...editMember, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
                      placeholder="Enter member name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={editMember.email}
                      onChange={(e) => setEditMember({...editMember, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
                      placeholder="Enter email address"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      value={editMember.phone}
                      onChange={(e) => setEditMember({...editMember, phone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
                      placeholder="Enter phone number"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <textarea
                      value={editMember.address}
                      onChange={(e) => setEditMember({...editMember, address: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
                      placeholder="Enter address"
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Yamaha Brand</label>
                    <select
                      value={editMember.yamahaBrand}
                      onChange={(e) => setEditMember({...editMember, yamahaBrand: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
                    >
                      <option value="">Select Yamaha Brand</option>
                      <option value="R15">R15</option>
                      <option value="R25">R25</option>
                      <option value="MT-15">MT-15</option>
                      <option value="MT-25">MT-25</option>
                      <option value="NMAX">NMAX</option>
                      <option value="Aerox">Aerox</option>
                      <option value="Mio">Mio</option>
                      <option value="Vega">Vega</option>
                      <option value="Jupiter">Jupiter</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-gray-200 px-6 py-4">
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setIsEditDrawerOpen(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleEditMember}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-yamaha-blue rounded-md hover:bg-blue-700"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
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

export default MemberDetail
