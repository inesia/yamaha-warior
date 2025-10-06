import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAdminStore from '../../store/adminStore'
import { 
  Search, 
  Plus, 
  Eye, 
  Edit, 
  Trash2, 
  Filter,
  Download,
  Users,
  Trophy,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Award,
  CheckCircle,
  Clock,
  XCircle,
  X,
  Save,
  AlertTriangle
} from 'lucide-react'
import { mockMembers } from '../../data/mockData'

const Members = () => {
  const { hasPermission } = useAdminStore()
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [selectedMembers, setSelectedMembers] = useState([])
  const [members, setMembers] = useState(mockMembers)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isSingleDeleteModalOpen, setIsSingleDeleteModalOpen] = useState(false)
  const [memberToDelete, setMemberToDelete] = useState(null)
  const [newMember, setNewMember] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    yamahaBrand: '',
    totalPoints: 0,
    challenges: [],
    joinedAt: new Date().toISOString()
  })

  // Filter members based on search and status
  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.yamahaBrand.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = filterStatus === 'all' || 
                          (filterStatus === 'active' && member.challenges.length > 0) ||
                          (filterStatus === 'inactive' && member.challenges.length === 0)
    
    return matchesSearch && matchesStatus
  })

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedMembers(filteredMembers.map(member => member.id))
    } else {
      setSelectedMembers([])
    }
  }

  const handleSelectMember = (memberId, checked) => {
    if (checked) {
      setSelectedMembers([...selectedMembers, memberId])
    } else {
      setSelectedMembers(selectedMembers.filter(id => id !== memberId))
    }
  }

  const getStatusBadge = (member) => {
    const activeChallenges = member.challenges.filter(c => c.status === 'completed').length
    if (activeChallenges > 0) {
      return <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Active</span>
    }
    return <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">Inactive</span>
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

  // Handle add member
  const handleAddMember = () => {
    if (newMember.name && newMember.email && newMember.phone && newMember.address && newMember.yamahaBrand) {
      const member = {
        ...newMember,
        id: Date.now().toString(),
        totalPoints: 0,
        challenges: [],
        joinedAt: new Date().toISOString()
      }
      setMembers([...members, member])
      setNewMember({
        name: '',
        email: '',
        phone: '',
        address: '',
        yamahaBrand: '',
        totalPoints: 0,
        challenges: [],
        joinedAt: new Date().toISOString()
      })
      setIsDrawerOpen(false)
    }
  }

  // Handle export
  const handleExport = () => {
    const csvContent = [
      ['Name', 'Email', 'Phone', 'Address', 'Yamaha Brand', 'Total Points', 'Status', 'Joined Date'],
      ...filteredMembers.map(member => [
        member.name,
        member.email,
        member.phone,
        member.address,
        member.yamahaBrand,
        member.totalPoints,
        member.challenges.length > 0 ? 'Active' : 'Inactive',
        new Date(member.joinedAt).toLocaleDateString()
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `members-export-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  // Handle bulk delete
  const handleBulkDelete = () => {
    setMembers(members.filter(member => !selectedMembers.includes(member.id)))
    setSelectedMembers([])
    setIsDeleteModalOpen(false)
  }

  // Handle single delete
  const handleDeleteMember = (memberId) => {
    setMembers(members.filter(member => member.id !== memberId))
  }

  // Handle single delete with confirmation
  const handleSingleDeleteClick = (member) => {
    setMemberToDelete(member)
    setIsSingleDeleteModalOpen(true)
  }

  // Confirm single delete
  const confirmSingleDelete = () => {
    if (memberToDelete) {
      handleDeleteMember(memberToDelete.id)
      setIsSingleDeleteModalOpen(false)
      setMemberToDelete(null)
    }
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-yamaha-dark">Member Management</h1>
          <p className="mt-1 text-sm text-gray-600">Manage and view all registered members ({members.length} total)</p>
        </div>
        <div className="mt-4 sm:mt-0">
          {hasPermission('manage_users') && (
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-yamaha-blue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yamaha-blue"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Member
            </button>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="w-5 h-5 text-yamaha-blue" />
            </div>
            <div className="ml-3">
              <p className="text-xs font-medium text-gray-600">Total Members</p>
              <p className="text-xl font-bold text-yamaha-dark">{members.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Trophy className="w-5 h-5 text-green-600" />
            </div>
            <div className="ml-3">
              <p className="text-xs font-medium text-gray-600">Active Members</p>
              <p className="text-xl font-bold text-yamaha-dark">
                {members.filter(m => m.challenges.length > 0).length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Calendar className="w-5 h-5 text-yellow-600" />
            </div>
            <div className="ml-3">
              <p className="text-xs font-medium text-gray-600">New This Month</p>
              <p className="text-xl font-bold text-yamaha-dark">
                {members.filter(m => new Date(m.joinedAt) > new Date('2024-01-01')).length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Trophy className="w-5 h-5 text-purple-600" />
            </div>
            <div className="ml-3">
              <p className="text-xs font-medium text-gray-600">Total Points</p>
              <p className="text-xl font-bold text-yamaha-dark">
                {members.reduce((sum, m) => sum + m.totalPoints, 0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search members..."
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
              <option value="all">All Members</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          
          {/* Actions */}
          <div className="flex items-center space-x-2">
            {selectedMembers.length > 0 && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">{selectedMembers.length} selected</span>
                <button 
                  onClick={() => setIsDeleteModalOpen(true)}
                  className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded-md hover:bg-red-200"
                >
                  Delete
                </button>
              </div>
            )}
            <button 
              onClick={handleExport}
              className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-800"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Members Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left">
                  <input
                    type="checkbox"
                    checked={selectedMembers.length === filteredMembers.length && filteredMembers.length > 0}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="rounded border-gray-300 text-yamaha-blue focus:ring-yamaha-blue"
                  />
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Member Info
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact Details
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Yamaha Brand
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Challenge Status
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Points & Stats
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredMembers.map((member) => (
                <tr 
                  key={member.id} 
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => navigate(`/admin/members/${member.id}`)}
                >
                  <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={selectedMembers.includes(member.id)}
                      onChange={(e) => handleSelectMember(member.id, e.target.checked)}
                      className="rounded border-gray-300 text-yamaha-blue focus:ring-yamaha-blue"
                    />
                  </td>
                  
                  {/* Member Info */}
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-yamaha-blue rounded-full flex items-center justify-center mr-2">
                        <span className="text-white font-medium text-xs">
                          {member.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{member.name}</div>
                        <div className="text-xs text-gray-500 flex items-center">
                          <Mail className="w-3 h-3 mr-1" />
                          {member.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  
                  {/* Contact Details */}
                  <td className="px-4 py-3">
                    <div className="text-xs text-gray-900 flex items-center mb-1">
                      <Phone className="w-3 h-3 mr-1" />
                      {member.phone}
                    </div>
                    <div className="text-xs text-gray-500 flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      {member.address.length > 25 ? `${member.address.substring(0, 25)}...` : member.address}
                    </div>
                  </td>
                  
                  {/* Yamaha Brand */}
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                      {member.yamahaBrand}
                    </span>
                  </td>
                  
                  {/* Challenge Status */}
                  <td className="px-4 py-3">
                    <div className="space-y-1">
                      {member.challenges.slice(0, 1).map((challenge, index) => (
                        <div key={index} className="flex items-center">
                          {getChallengeStatusIcon(challenge.status)}
                          <span className={`ml-1 px-2 py-0.5 text-xs font-medium rounded-full ${getChallengeStatusColor(challenge.status)}`}>
                            {challenge.name.length > 15 ? `${challenge.name.substring(0, 15)}...` : challenge.name}
                          </span>
                        </div>
                      ))}
                      {member.challenges.length > 1 && (
                        <div className="text-xs text-gray-500">
                          +{member.challenges.length - 1} more
                        </div>
                      )}
                    </div>
                  </td>
                  
                  {/* Points & Stats */}
                  <td className="px-4 py-3">
                    <div className="text-xs font-medium text-gray-900 flex items-center">
                      <Award className="w-3 h-3 mr-1 text-yamaha-blue" />
                      {member.totalPoints} pts
                    </div>
                    <div className="text-xs text-gray-500">
                      {member.challenges.filter(c => c.status === 'completed').length}/{member.challenges.length} done
                    </div>
                  </td>
                  
                  {/* Status */}
                  <td className="px-4 py-3">
                    {getStatusBadge(member)}
                  </td>
                  
                  {/* Actions */}
                  <td className="px-4 py-3 text-sm font-medium" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center space-x-2">
                      <Link
                        to={`/admin/members/${member.id}`}
                        className="text-yamaha-blue hover:text-blue-700"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      {hasPermission('manage_users') && (
                        <>
                          <Link
                            to={`/admin/members/${member.id}/edit`}
                            className="text-gray-600 hover:text-gray-800"
                            title="Edit Member"
                          >
                            <Edit className="w-4 h-4" />
                          </Link>
                          <button 
                            onClick={() => handleSingleDeleteClick(member)}
                            className="text-red-600 hover:text-red-800"
                            title="Delete Member"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Member Drawer */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div 
            className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300" 
            onClick={() => setIsDrawerOpen(false)}
          ></div>
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl transform transition-transform duration-300 ease-in-out translate-x-0">
            <div className="flex h-full flex-col">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                <h2 className="text-lg font-semibold text-gray-900">Add New Member</h2>
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
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      value={newMember.name}
                      onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
                      placeholder="Enter member name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={newMember.email}
                      onChange={(e) => setNewMember({...newMember, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
                      placeholder="Enter email address"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      value={newMember.phone}
                      onChange={(e) => setNewMember({...newMember, phone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
                      placeholder="Enter phone number"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <textarea
                      value={newMember.address}
                      onChange={(e) => setNewMember({...newMember, address: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
                      placeholder="Enter address"
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Yamaha Brand</label>
                    <select
                      value={newMember.yamahaBrand}
                      onChange={(e) => setNewMember({...newMember, yamahaBrand: e.target.value})}
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
                    onClick={() => setIsDrawerOpen(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddMember}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-yamaha-blue rounded-md hover:bg-blue-700"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Member
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
                    <h3 className="text-lg font-medium text-gray-900">Delete Members</h3>
                    <p className="text-sm text-gray-500">
                      Are you sure you want to delete {selectedMembers.length} member(s)? This action cannot be undone.
                    </p>
                  </div>
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setIsDeleteModalOpen(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleBulkDelete}
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

      {/* Single Delete Confirmation Modal */}
      {isSingleDeleteModalOpen && (
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
                    <h3 className="text-lg font-medium text-gray-900">Delete Member</h3>
                    <p className="text-sm text-gray-500">
                      Are you sure you want to delete <strong>{memberToDelete?.name}</strong>? This action cannot be undone.
                    </p>
                  </div>
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => {
                      setIsSingleDeleteModalOpen(false)
                      setMemberToDelete(null)
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmSingleDelete}
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

export default Members
