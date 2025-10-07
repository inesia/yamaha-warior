import { useState } from 'react'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Users,
  UserPlus,
  Gift,
  TrendingUp,
  Eye,
  EyeOff,
  Search,
  Filter,
  Download,
  Award,
  Calendar,
  DollarSign,
  Clock
} from 'lucide-react'
import ConfirmModal from '../../components/ConfirmModal'

const ReferralManagement = () => {
  const [referrals, setReferrals] = useState([
    {
      id: 1,
      referrerId: 101,
      referrerName: 'Ahmad Rizki',
      referrerEmail: 'ahmad@email.com',
      refereeId: 201,
      refereeName: 'Siti Nurhaliza',
      refereeEmail: 'siti@email.com',
      status: 'completed',
      rewardAmount: 50000,
      rewardType: 'points',
      referralCode: 'REF001',
      createdAt: '2025-01-15',
      completedAt: '2025-01-20',
      notes: 'Referral berhasil, user sudah mendaftar dan aktif'
    },
    {
      id: 2,
      referrerId: 102,
      referrerName: 'Budi Santoso',
      referrerEmail: 'budi@email.com',
      refereeId: 202,
      refereeName: 'Dewi Kartika',
      refereeEmail: 'dewi@email.com',
      status: 'pending',
      rewardAmount: 50000,
      rewardType: 'points',
      referralCode: 'REF002',
      createdAt: '2025-01-18',
      completedAt: null,
      notes: 'Menunggu verifikasi aktivitas referee'
    },
    {
      id: 3,
      referrerId: 103,
      referrerName: 'Citra Dewi',
      referrerEmail: 'citra@email.com',
      refereeId: 203,
      refereeName: 'Eko Prasetyo',
      refereeEmail: 'eko@email.com',
      status: 'completed',
      rewardAmount: 100000,
      rewardType: 'voucher',
      referralCode: 'REF003',
      createdAt: '2025-01-10',
      completedAt: '2025-01-25',
      notes: 'Referral berhasil, reward berupa voucher'
    }
  ])

  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [selectedReferral, setSelectedReferral] = useState(null)
  const [referralToDelete, setReferralToDelete] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterRewardType, setFilterRewardType] = useState('all')

  const [formData, setFormData] = useState({
    referrerId: '',
    referrerName: '',
    referrerEmail: '',
    refereeId: '',
    refereeName: '',
    refereeEmail: '',
    status: 'pending',
    rewardAmount: '',
    rewardType: 'points',
    referralCode: '',
    notes: ''
  })

  // Filter referrals
  const filteredReferrals = referrals.filter(referral => {
    const matchesSearch = referral.referrerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         referral.refereeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         referral.referralCode.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || referral.status === filterStatus
    const matchesRewardType = filterRewardType === 'all' || referral.rewardType === filterRewardType
    return matchesSearch && matchesStatus && matchesRewardType
  })

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
            <Award className="w-3 h-3 mr-1" />
            Completed
          </span>
        )
      case 'pending':
        return (
          <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </span>
        )
      case 'cancelled':
        return (
          <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
            <X className="w-3 h-3 mr-1" />
            Cancelled
          </span>
        )
      default:
        return null
    }
  }

  const getRewardTypeBadge = (type) => {
    switch (type) {
      case 'points':
        return <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">Points</span>
      case 'voucher':
        return <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">Voucher</span>
      case 'cash':
        return <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Cash</span>
      default:
        return <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">Other</span>
    }
  }

  const handleAddReferral = () => {
    const newReferral = {
      id: referrals.length + 1,
      ...formData,
      rewardAmount: parseInt(formData.rewardAmount),
      createdAt: new Date().toISOString().split('T')[0],
      completedAt: formData.status === 'completed' ? new Date().toISOString().split('T')[0] : null
    }
    setReferrals([...referrals, newReferral])
    setShowAddModal(false)
    resetForm()
  }

  const handleEditReferral = () => {
    setReferrals(referrals.map(referral => 
      referral.id === selectedReferral.id 
        ? { 
            ...referral, 
            ...formData,
            rewardAmount: parseInt(formData.rewardAmount),
            completedAt: formData.status === 'completed' && !referral.completedAt 
              ? new Date().toISOString().split('T')[0] 
              : referral.completedAt
          }
        : referral
    ))
    setShowEditModal(false)
    setSelectedReferral(null)
    resetForm()
  }

  const handleDeleteReferral = (referralId) => {
    setReferralToDelete(referralId)
    setShowDeleteConfirm(true)
  }

  const handleDeleteConfirm = () => {
    if (referralToDelete) {
      setReferrals(referrals.filter(referral => referral.id !== referralToDelete))
      setReferralToDelete(null)
    }
    setShowDeleteConfirm(false)
  }

  const openEditModal = (referral) => {
    setSelectedReferral(referral)
    setFormData({
      referrerId: referral.referrerId.toString(),
      referrerName: referral.referrerName,
      referrerEmail: referral.referrerEmail,
      refereeId: referral.refereeId.toString(),
      refereeName: referral.refereeName,
      refereeEmail: referral.refereeEmail,
      status: referral.status,
      rewardAmount: referral.rewardAmount.toString(),
      rewardType: referral.rewardType,
      referralCode: referral.referralCode,
      notes: referral.notes
    })
    setShowEditModal(true)
  }

  const resetForm = () => {
    setFormData({
      referrerId: '',
      referrerName: '',
      referrerEmail: '',
      refereeId: '',
      refereeName: '',
      refereeEmail: '',
      status: 'pending',
      rewardAmount: '',
      rewardType: 'points',
      referralCode: '',
      notes: ''
    })
  }

  const generateReferralCode = () => {
    const code = 'REF' + Math.random().toString(36).substr(2, 6).toUpperCase()
    setFormData({...formData, referralCode: code})
  }

  const exportReferrals = () => {
    // In real implementation, export to CSV/Excel
    console.log('Exporting referrals...')
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-yamaha-dark">Referral Management</h1>
          <p className="mt-1 text-sm text-gray-600">Kelola sistem referral dan reward untuk user</p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-2">
          <button
            onClick={exportReferrals}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yamaha-blue"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-yamaha-blue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yamaha-blue"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Referral
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <UserPlus className="w-5 h-5 text-yamaha-blue" />
            </div>
            <div className="ml-3">
              <p className="text-xs font-medium text-gray-600">Total Referrals</p>
              <p className="text-xl font-bold text-yamaha-dark">{referrals.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Award className="w-5 h-5 text-green-600" />
            </div>
            <div className="ml-3">
              <p className="text-xs font-medium text-gray-600">Completed</p>
              <p className="text-xl font-bold text-yamaha-dark">
                {referrals.filter(r => r.status === 'completed').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <div className="ml-3">
              <p className="text-xs font-medium text-gray-600">Pending</p>
              <p className="text-xl font-bold text-yamaha-dark">
                {referrals.filter(r => r.status === 'pending').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <DollarSign className="w-5 h-5 text-purple-600" />
            </div>
            <div className="ml-3">
              <p className="text-xs font-medium text-gray-600">Total Rewards</p>
              <p className="text-xl font-bold text-yamaha-dark">
                {referrals.filter(r => r.status === 'completed').reduce((sum, r) => sum + r.rewardAmount, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search referrals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
            />
          </div>
          <div className="sm:w-48">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div className="sm:w-48">
            <select
              value={filterRewardType}
              onChange={(e) => setFilterRewardType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
            >
              <option value="all">All Reward Types</option>
              <option value="points">Points</option>
              <option value="voucher">Voucher</option>
              <option value="cash">Cash</option>
            </select>
          </div>
        </div>
      </div>

      {/* Referrals Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Referral Code
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Referrer
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Referee
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reward
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredReferrals.map((referral) => (
                <tr key={referral.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <div className="text-sm font-medium text-yamaha-dark">{referral.referralCode}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-yamaha-blue rounded-full flex items-center justify-center mr-2">
                        <span className="text-white font-medium text-xs">
                          {referral.referrerName.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{referral.referrerName}</div>
                        <div className="text-xs text-gray-500">{referral.referrerEmail}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-2">
                        <span className="text-white font-medium text-xs">
                          {referral.refereeName.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{referral.refereeName}</div>
                        <div className="text-xs text-gray-500">{referral.refereeEmail}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-col">
                      <div className="text-sm font-medium text-gray-900">
                        {referral.rewardAmount.toLocaleString()}
                      </div>
                      {getRewardTypeBadge(referral.rewardType)}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    {getStatusBadge(referral.status)}
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-xs text-gray-900">
                      <div>Created: {new Date(referral.createdAt).toLocaleDateString()}</div>
                      {referral.completedAt && (
                        <div>Completed: {new Date(referral.completedAt).toLocaleDateString()}</div>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => openEditModal(referral)}
                        className="text-gray-600 hover:text-gray-800"
                        title="Edit Referral"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteReferral(referral.id)}
                        className="text-red-600 hover:text-red-800"
                        title="Delete Referral"
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

      {/* Add Referral Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" onClick={() => setShowAddModal(false)}>
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-yamaha-blue sm:mx-0 sm:h-10 sm:w-10">
                    <UserPlus className="h-6 w-6 text-white" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Add New Referral
                    </h3>
                    <div className="mt-4 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Referrer ID</label>
                          <input
                            type="text"
                            value={formData.referrerId}
                            onChange={(e) => setFormData({...formData, referrerId: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
                            placeholder="Enter referrer ID"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Referrer Name</label>
                          <input
                            type="text"
                            value={formData.referrerName}
                            onChange={(e) => setFormData({...formData, referrerName: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
                            placeholder="Enter referrer name"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Referrer Email</label>
                        <input
                          type="email"
                          value={formData.referrerEmail}
                          onChange={(e) => setFormData({...formData, referrerEmail: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
                          placeholder="Enter referrer email"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Referee ID</label>
                          <input
                            type="text"
                            value={formData.refereeId}
                            onChange={(e) => setFormData({...formData, refereeId: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
                            placeholder="Enter referee ID"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Referee Name</label>
                          <input
                            type="text"
                            value={formData.refereeName}
                            onChange={(e) => setFormData({...formData, refereeName: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
                            placeholder="Enter referee name"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Referee Email</label>
                        <input
                          type="email"
                          value={formData.refereeEmail}
                          onChange={(e) => setFormData({...formData, refereeEmail: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
                          placeholder="Enter referee email"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Referral Code</label>
                          <div className="flex">
                            <input
                              type="text"
                              value={formData.referralCode}
                              onChange={(e) => setFormData({...formData, referralCode: e.target.value})}
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:ring-yamaha-blue focus:border-yamaha-blue"
                              placeholder="Enter referral code"
                            />
                            <button
                              type="button"
                              onClick={generateReferralCode}
                              className="px-3 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 hover:bg-gray-100"
                            >
                              Generate
                            </button>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Reward Amount</label>
                          <input
                            type="number"
                            value={formData.rewardAmount}
                            onChange={(e) => setFormData({...formData, rewardAmount: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
                            placeholder="Enter reward amount"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Reward Type</label>
                          <select
                            value={formData.rewardType}
                            onChange={(e) => setFormData({...formData, rewardType: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
                          >
                            <option value="points">Points</option>
                            <option value="voucher">Voucher</option>
                            <option value="cash">Cash</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select
                          value={formData.status}
                          onChange={(e) => setFormData({...formData, status: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
                        >
                          <option value="pending">Pending</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                        <textarea
                          value={formData.notes}
                          onChange={(e) => setFormData({...formData, notes: e.target.value})}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
                          placeholder="Enter notes"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleAddReferral}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-yamaha-blue text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yamaha-blue sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Add Referral
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yamaha-blue sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Referral Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" onClick={() => setShowEditModal(false)}>
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-yamaha-blue sm:mx-0 sm:h-10 sm:w-10">
                    <Edit className="h-6 w-6 text-white" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Edit Referral
                    </h3>
                    <div className="mt-4 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Referrer ID</label>
                          <input
                            type="text"
                            value={formData.referrerId}
                            onChange={(e) => setFormData({...formData, referrerId: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Referrer Name</label>
                          <input
                            type="text"
                            value={formData.referrerName}
                            onChange={(e) => setFormData({...formData, referrerName: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Referrer Email</label>
                        <input
                          type="email"
                          value={formData.referrerEmail}
                          onChange={(e) => setFormData({...formData, referrerEmail: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Referee ID</label>
                          <input
                            type="text"
                            value={formData.refereeId}
                            onChange={(e) => setFormData({...formData, refereeId: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Referee Name</label>
                          <input
                            type="text"
                            value={formData.refereeName}
                            onChange={(e) => setFormData({...formData, refereeName: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Referee Email</label>
                        <input
                          type="email"
                          value={formData.refereeEmail}
                          onChange={(e) => setFormData({...formData, refereeEmail: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Referral Code</label>
                          <input
                            type="text"
                            value={formData.referralCode}
                            onChange={(e) => setFormData({...formData, referralCode: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Reward Amount</label>
                          <input
                            type="number"
                            value={formData.rewardAmount}
                            onChange={(e) => setFormData({...formData, rewardAmount: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Reward Type</label>
                          <select
                            value={formData.rewardType}
                            onChange={(e) => setFormData({...formData, rewardType: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
                          >
                            <option value="points">Points</option>
                            <option value="voucher">Voucher</option>
                            <option value="cash">Cash</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select
                          value={formData.status}
                          onChange={(e) => setFormData({...formData, status: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
                        >
                          <option value="pending">Pending</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                        <textarea
                          value={formData.notes}
                          onChange={(e) => setFormData({...formData, notes: e.target.value})}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleEditReferral}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-yamaha-blue text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yamaha-blue sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Update Referral
                </button>
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yamaha-blue sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        show={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDeleteConfirm}
        title="Konfirmasi Hapus Referral"
        message="Apakah Anda yakin ingin menghapus referral ini? Tindakan ini tidak dapat dibatalkan."
        confirmText="Ya, Hapus"
        cancelText="Batal"
        type="warning"
      />
    </div>
  )
}

export default ReferralManagement
