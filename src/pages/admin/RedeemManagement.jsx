import { useState } from 'react'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Gift,
  Package,
  CheckCircle,
  Clock,
  XCircle,
  Search,
  Filter,
  Download,
  Award,
  Calendar,
  DollarSign,
  User,
  Eye,
  Truck,
  Star,
  Image as ImageIcon,
  Tag
} from 'lucide-react'
import ConfirmModal from '../../components/ConfirmModal'

const RedeemManagement = () => {
  const [activeTab, setActiveTab] = useState('redeems') // 'redeems' or 'rewards'
  
  // Rewards Management State
  const [rewards, setRewards] = useState([
    {
      id: 1,
      name: 'Yamaha Filano Model Kit',
      description: 'Model kit Yamaha Filano eksklusif dengan detail yang sangat akurat',
      type: 'physical',
      category: 'merchandise',
      pointsRequired: 50000,
      stock: 100,
      image: 'https://www.yamahamotor.co.id/wp-content/uploads/2024/11/Yamaha-Filano-Hybrid-Lux.png',
      status: 'active',
      featured: true,
      createdAt: '2025-01-15',
      updatedAt: '2025-01-15'
    },
    {
      id: 2,
      name: 'Voucher Belanja 100K',
      description: 'Voucher belanja senilai Rp 100.000 untuk produk Yamaha',
      type: 'voucher',
      category: 'voucher',
      pointsRequired: 25000,
      stock: 500,
      image: 'https://www.yamahamotor.co.id/wp-content/uploads/2024/12/YAMAHA-AEROX-ALPHA.png',
      status: 'active',
      featured: false,
      createdAt: '2025-01-15',
      updatedAt: '2025-01-15'
    },
    {
      id: 3,
      name: 'Cashback 50K',
      description: 'Cashback langsung ke rekening senilai Rp 50.000',
      type: 'cash',
      category: 'cashback',
      pointsRequired: 15000,
      stock: 1000,
      image: 'https://www.yamahamotor.co.id/wp-content/uploads/2025/05/YAMAHA-GEAR-ULTIMA-HYBRID.png',
      status: 'active',
      featured: true,
      createdAt: '2025-01-15',
      updatedAt: '2025-01-15'
    }
  ])

  const [redeems, setRedeems] = useState([
    {
      id: 1,
      userId: 101,
      userName: 'Ahmad Rizki',
      userEmail: 'ahmad@email.com',
      rewardId: 1,
      rewardName: 'Yamaha Filano Model Kit',
      rewardType: 'physical',
      pointsUsed: 50000,
      status: 'pending',
      requestDate: '2025-01-20',
      approvedDate: null,
      shippedDate: null,
      deliveredDate: null,
      trackingNumber: null,
      shippingAddress: 'Jl. Sudirman No. 123, Jakarta Selatan',
      notes: 'Menunggu verifikasi alamat pengiriman'
    },
    {
      id: 2,
      userId: 102,
      userName: 'Siti Nurhaliza',
      userEmail: 'siti@email.com',
      rewardId: 2,
      rewardName: 'Voucher Belanja 100K',
      rewardType: 'voucher',
      pointsUsed: 25000,
      status: 'approved',
      requestDate: '2025-01-18',
      approvedDate: '2025-01-19',
      shippedDate: null,
      deliveredDate: null,
      trackingNumber: null,
      shippingAddress: null,
      notes: 'Voucher akan dikirim via email'
    },
    {
      id: 3,
      userId: 103,
      userName: 'Budi Santoso',
      userEmail: 'budi@email.com',
      rewardId: 3,
      rewardName: 'Yamaha T-Shirt Exclusive',
      rewardType: 'physical',
      pointsUsed: 30000,
      status: 'shipped',
      requestDate: '2025-01-15',
      approvedDate: '2025-01-16',
      shippedDate: '2025-01-22',
      deliveredDate: null,
      trackingNumber: 'JNE123456789',
      shippingAddress: 'Jl. Thamrin No. 456, Jakarta Pusat',
      notes: 'Barang sudah dikirim via JNE'
    },
    {
      id: 4,
      userId: 104,
      userName: 'Dewi Kartika',
      userEmail: 'dewi@email.com',
      rewardId: 4,
      rewardName: 'Cashback 50K',
      rewardType: 'cash',
      pointsUsed: 40000,
      status: 'delivered',
      requestDate: '2025-01-10',
      approvedDate: '2025-01-11',
      shippedDate: null,
      deliveredDate: '2025-01-12',
      trackingNumber: null,
      shippingAddress: null,
      notes: 'Cashback sudah ditransfer ke rekening'
    }
  ])

  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [selectedRedeem, setSelectedRedeem] = useState(null)
  const [redeemToDelete, setRedeemToDelete] = useState(null)

  // Reward Management States
  const [showRewardModal, setShowRewardModal] = useState(false)
  const [showRewardEditModal, setShowRewardEditModal] = useState(false)
  const [showRewardDeleteConfirm, setShowRewardDeleteConfirm] = useState(false)
  const [selectedReward, setSelectedReward] = useState(null)
  const [rewardToDelete, setRewardToDelete] = useState(null)
  const [rewardSearchTerm, setRewardSearchTerm] = useState('')
  const [rewardFilterType, setRewardFilterType] = useState('all')
  const [rewardFilterCategory, setRewardFilterCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterRewardType, setFilterRewardType] = useState('all')

  const [formData, setFormData] = useState({
    userId: '',
    userName: '',
    userEmail: '',
    rewardId: '',
    rewardName: '',
    rewardType: 'physical',
    pointsUsed: '',
    status: 'pending',
    trackingNumber: '',
    shippingAddress: '',
    notes: ''
  })

  const [rewardFormData, setRewardFormData] = useState({
    name: '',
    description: '',
    type: 'physical',
    category: 'merchandise',
    pointsRequired: '',
    stock: '',
    image: '',
    status: 'active',
    featured: false
  })

  // Filter redeems
  const filteredRedeems = redeems.filter(redeem => {
    const matchesSearch = redeem.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         redeem.rewardName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         redeem.trackingNumber?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || redeem.status === filterStatus
    const matchesRewardType = filterRewardType === 'all' || redeem.rewardType === filterRewardType
    return matchesSearch && matchesStatus && matchesRewardType
  })

  // Filter rewards
  const filteredRewards = rewards.filter(reward => {
    const matchesSearch = reward.name.toLowerCase().includes(rewardSearchTerm.toLowerCase()) ||
                         reward.description.toLowerCase().includes(rewardSearchTerm.toLowerCase())
    const matchesType = rewardFilterType === 'all' || reward.type === rewardFilterType
    const matchesCategory = rewardFilterCategory === 'all' || reward.category === rewardFilterCategory
    return matchesSearch && matchesType && matchesCategory
  })

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </span>
        )
      case 'approved':
        return (
          <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
            <CheckCircle className="w-3 h-3 mr-1" />
            Approved
          </span>
        )
      case 'shipped':
        return (
          <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">
            <Truck className="w-3 h-3 mr-1" />
            Shipped
          </span>
        )
      case 'delivered':
        return (
          <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
            <Package className="w-3 h-3 mr-1" />
            Delivered
          </span>
        )
      case 'cancelled':
        return (
          <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
            <XCircle className="w-3 h-3 mr-1" />
            Cancelled
          </span>
        )
      default:
        return null
    }
  }

  const getRewardTypeBadge = (type) => {
    switch (type) {
      case 'physical':
        return <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">Physical</span>
      case 'voucher':
        return <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">Voucher</span>
      case 'cash':
        return <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Cash</span>
      default:
        return <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">Other</span>
    }
  }

  // Reward Management Functions
  const getRewardStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Active</span>
      case 'inactive':
        return <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">Inactive</span>
      default:
        return <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">Unknown</span>
    }
  }

  const getRewardCategoryBadge = (category) => {
    switch (category) {
      case 'merchandise':
        return <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">Merchandise</span>
      case 'voucher':
        return <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">Voucher</span>
      case 'cashback':
        return <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Cashback</span>
      default:
        return <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">Other</span>
    }
  }

  const handleAddReward = () => {
    const newReward = {
      id: rewards.length + 1,
      ...rewardFormData,
      pointsRequired: parseInt(rewardFormData.pointsRequired),
      stock: parseInt(rewardFormData.stock),
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    }
    setRewards([...rewards, newReward])
    setShowRewardModal(false)
    resetRewardForm()
  }

  const handleEditReward = () => {
    const updatedRewards = rewards.map(reward => 
      reward.id === selectedReward.id 
        ? { ...reward, ...rewardFormData, pointsRequired: parseInt(rewardFormData.pointsRequired), stock: parseInt(rewardFormData.stock), updatedAt: new Date().toISOString().split('T')[0] }
        : reward
    )
    setRewards(updatedRewards)
    setShowRewardEditModal(false)
    setSelectedReward(null)
    resetRewardForm()
  }

  const handleDeleteReward = (reward) => {
    setRewardToDelete(reward)
    setShowRewardDeleteConfirm(true)
  }

  const handleDeleteConfirm = () => {
    if (rewardToDelete) {
      setRewards(rewards.filter(reward => reward.id !== rewardToDelete.id))
      setShowRewardDeleteConfirm(false)
      setRewardToDelete(null)
    }
  }

  const openEditRewardModal = (reward) => {
    setSelectedReward(reward)
    setRewardFormData({
      name: reward.name,
      description: reward.description,
      type: reward.type,
      category: reward.category,
      pointsRequired: reward.pointsRequired.toString(),
      stock: reward.stock.toString(),
      image: reward.image,
      status: reward.status,
      featured: reward.featured
    })
    setShowRewardEditModal(true)
  }

  const resetRewardForm = () => {
    setRewardFormData({
      name: '',
      description: '',
      type: 'physical',
      category: 'merchandise',
      pointsRequired: '',
      stock: '',
      image: '',
      status: 'active',
      featured: false
    })
  }

  const handleRewardImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setRewardFormData({ ...rewardFormData, image: e.target.result })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddRedeem = () => {
    const newRedeem = {
      id: redeems.length + 1,
      ...formData,
      pointsUsed: parseInt(formData.pointsUsed),
      requestDate: new Date().toISOString().split('T')[0],
      approvedDate: null,
      shippedDate: null,
      deliveredDate: null
    }
    setRedeems([...redeems, newRedeem])
    setShowAddModal(false)
    resetForm()
  }

  const handleEditRedeem = () => {
    setRedeems(redeems.map(redeem => 
      redeem.id === selectedRedeem.id 
        ? { 
            ...redeem, 
            ...formData,
            pointsUsed: parseInt(formData.pointsUsed),
            approvedDate: formData.status === 'approved' && !redeem.approvedDate 
              ? new Date().toISOString().split('T')[0] 
              : redeem.approvedDate,
            shippedDate: formData.status === 'shipped' && !redeem.shippedDate 
              ? new Date().toISOString().split('T')[0] 
              : redeem.shippedDate,
            deliveredDate: formData.status === 'delivered' && !redeem.deliveredDate 
              ? new Date().toISOString().split('T')[0] 
              : redeem.deliveredDate
          }
        : redeem
    ))
    setShowEditModal(false)
    setSelectedRedeem(null)
    resetForm()
  }

  const handleDeleteRedeem = (redeemId) => {
    setRedeemToDelete(redeemId)
    setShowDeleteConfirm(true)
  }

  const handleRedeemDeleteConfirm = () => {
    if (redeemToDelete) {
      setRedeems(redeems.filter(redeem => redeem.id !== redeemToDelete.id))
      setRedeemToDelete(null)
    }
    setShowDeleteConfirm(false)
  }

  const openEditModal = (redeem) => {
    setSelectedRedeem(redeem)
    setFormData({
      userId: redeem.userId.toString(),
      userName: redeem.userName,
      userEmail: redeem.userEmail,
      rewardId: redeem.rewardId.toString(),
      rewardName: redeem.rewardName,
      rewardType: redeem.rewardType,
      pointsUsed: redeem.pointsUsed.toString(),
      status: redeem.status,
      trackingNumber: redeem.trackingNumber || '',
      shippingAddress: redeem.shippingAddress || '',
      notes: redeem.notes
    })
    setShowEditModal(true)
  }

  const resetForm = () => {
    setFormData({
      userId: '',
      userName: '',
      userEmail: '',
      rewardId: '',
      rewardName: '',
      rewardType: 'physical',
      pointsUsed: '',
      status: 'pending',
      trackingNumber: '',
      shippingAddress: '',
      notes: ''
    })
  }

  const exportRedeems = () => {
    // In real implementation, export to CSV/Excel
    console.log('Exporting redeems...')
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-yamaha-dark">Hadiah & Redeem</h1>
          <p className="mt-1 text-sm text-gray-600">Kelola hadiah dan sistem redeem serta tracking pengiriman</p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-2">
          <button
            onClick={exportRedeems}
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
            Add Redeem
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('redeems')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'redeems'
                ? 'border-yamaha-blue text-yamaha-blue'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center">
              <Gift className="w-4 h-4 mr-2" />
              Redeem Management
            </div>
          </button>
          <button
            onClick={() => setActiveTab('rewards')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'rewards'
                ? 'border-yamaha-blue text-yamaha-blue'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center">
              <Star className="w-4 h-4 mr-2" />
              Reward Management
            </div>
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'redeems' && (
        <>
          {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Gift className="w-5 h-5 text-yamaha-blue" />
            </div>
            <div className="ml-3">
              <p className="text-xs font-medium text-gray-600">Total Redeems</p>
              <p className="text-xl font-bold text-yamaha-dark">{redeems.length}</p>
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
                {redeems.filter(r => r.status === 'pending').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Truck className="w-5 h-5 text-purple-600" />
            </div>
            <div className="ml-3">
              <p className="text-xs font-medium text-gray-600">Shipped</p>
              <p className="text-xl font-bold text-yamaha-dark">
                {redeems.filter(r => r.status === 'shipped').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Package className="w-5 h-5 text-green-600" />
            </div>
            <div className="ml-3">
              <p className="text-xs font-medium text-gray-600">Delivered</p>
              <p className="text-xl font-bold text-yamaha-dark">
                {redeems.filter(r => r.status === 'delivered').length}
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
              placeholder="Search redeems..."
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
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
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
              <option value="physical">Physical</option>
              <option value="voucher">Voucher</option>
              <option value="cash">Cash</option>
            </select>
          </div>
        </div>
      </div>

      {/* Redeems Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reward
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Points
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tracking
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
              {filteredRedeems.map((redeem) => (
                <tr key={redeem.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-yamaha-blue rounded-full flex items-center justify-center mr-2">
                        <span className="text-white font-medium text-xs">
                          {redeem.userName.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{redeem.userName}</div>
                        <div className="text-xs text-gray-500">{redeem.userEmail}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-col">
                      <div className="text-sm font-medium text-gray-900">{redeem.rewardName}</div>
                      {getRewardTypeBadge(redeem.rewardType)}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {redeem.pointsUsed.toLocaleString()} pts
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    {getStatusBadge(redeem.status)}
                  </td>
                  <td className="px-4 py-4">
                    {redeem.trackingNumber ? (
                      <div className="text-sm text-gray-900">{redeem.trackingNumber}</div>
                    ) : (
                      <div className="text-sm text-gray-400">-</div>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-xs text-gray-900">
                      <div>Request: {new Date(redeem.requestDate).toLocaleDateString()}</div>
                      {redeem.approvedDate && (
                        <div>Approved: {new Date(redeem.approvedDate).toLocaleDateString()}</div>
                      )}
                      {redeem.shippedDate && (
                        <div>Shipped: {new Date(redeem.shippedDate).toLocaleDateString()}</div>
                      )}
                      {redeem.deliveredDate && (
                        <div>Delivered: {new Date(redeem.deliveredDate).toLocaleDateString()}</div>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => openEditModal(redeem)}
                        className="text-gray-600 hover:text-gray-800"
                        title="Edit Redeem"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteRedeem(redeem.id)}
                        className="text-red-600 hover:text-red-800"
                        title="Delete Redeem"
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

      {/* Add Redeem Modal */}
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
                    <Gift className="h-6 w-6 text-white" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Add New Redeem
                    </h3>
                    <div className="mt-4 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">User ID</label>
                          <input
                            type="text"
                            value={formData.userId}
                            onChange={(e) => setFormData({...formData, userId: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
                            placeholder="Enter user ID"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">User Name</label>
                          <input
                            type="text"
                            value={formData.userName}
                            onChange={(e) => setFormData({...formData, userName: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
                            placeholder="Enter user name"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">User Email</label>
                        <input
                          type="email"
                          value={formData.userEmail}
                          onChange={(e) => setFormData({...formData, userEmail: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
                          placeholder="Enter user email"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Reward ID</label>
                          <input
                            type="text"
                            value={formData.rewardId}
                            onChange={(e) => setFormData({...formData, rewardId: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
                            placeholder="Enter reward ID"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Reward Name</label>
                          <input
                            type="text"
                            value={formData.rewardName}
                            onChange={(e) => setFormData({...formData, rewardName: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
                            placeholder="Enter reward name"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Reward Type</label>
                          <select
                            value={formData.rewardType}
                            onChange={(e) => setFormData({...formData, rewardType: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
                          >
                            <option value="physical">Physical</option>
                            <option value="voucher">Voucher</option>
                            <option value="cash">Cash</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Points Used</label>
                          <input
                            type="number"
                            value={formData.pointsUsed}
                            onChange={(e) => setFormData({...formData, pointsUsed: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
                            placeholder="Enter points used"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                          <select
                            value={formData.status}
                            onChange={(e) => setFormData({...formData, status: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
                          >
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tracking Number</label>
                        <input
                          type="text"
                          value={formData.trackingNumber}
                          onChange={(e) => setFormData({...formData, trackingNumber: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
                          placeholder="Enter tracking number"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Shipping Address</label>
                        <textarea
                          value={formData.shippingAddress}
                          onChange={(e) => setFormData({...formData, shippingAddress: e.target.value})}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
                          placeholder="Enter shipping address"
                        />
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
                  onClick={handleAddRedeem}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-yamaha-blue text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yamaha-blue sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Add Redeem
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

      {/* Edit Redeem Modal */}
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
                      Edit Redeem
                    </h3>
                    <div className="mt-4 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">User ID</label>
                          <input
                            type="text"
                            value={formData.userId}
                            onChange={(e) => setFormData({...formData, userId: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">User Name</label>
                          <input
                            type="text"
                            value={formData.userName}
                            onChange={(e) => setFormData({...formData, userName: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">User Email</label>
                        <input
                          type="email"
                          value={formData.userEmail}
                          onChange={(e) => setFormData({...formData, userEmail: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Reward ID</label>
                          <input
                            type="text"
                            value={formData.rewardId}
                            onChange={(e) => setFormData({...formData, rewardId: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Reward Name</label>
                          <input
                            type="text"
                            value={formData.rewardName}
                            onChange={(e) => setFormData({...formData, rewardName: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Reward Type</label>
                          <select
                            value={formData.rewardType}
                            onChange={(e) => setFormData({...formData, rewardType: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
                          >
                            <option value="physical">Physical</option>
                            <option value="voucher">Voucher</option>
                            <option value="cash">Cash</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Points Used</label>
                          <input
                            type="number"
                            value={formData.pointsUsed}
                            onChange={(e) => setFormData({...formData, pointsUsed: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                          <select
                            value={formData.status}
                            onChange={(e) => setFormData({...formData, status: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
                          >
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tracking Number</label>
                        <input
                          type="text"
                          value={formData.trackingNumber}
                          onChange={(e) => setFormData({...formData, trackingNumber: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Shipping Address</label>
                        <textarea
                          value={formData.shippingAddress}
                          onChange={(e) => setFormData({...formData, shippingAddress: e.target.value})}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
                        />
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
                  onClick={handleEditRedeem}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-yamaha-blue text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yamaha-blue sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Update Redeem
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
        onConfirm={handleRedeemDeleteConfirm}
        title="Konfirmasi Hapus Redeem"
        message="Apakah Anda yakin ingin menghapus redeem ini? Tindakan ini tidak dapat dibatalkan."
        confirmText="Ya, Hapus"
        cancelText="Batal"
        type="warning"
      />
        </>
      )}

      {/* Reward Management Tab */}
      {activeTab === 'rewards' && (
        <>
          {/* Reward Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Star className="w-5 h-5 text-yamaha-blue" />
                </div>
                <div className="ml-3">
                  <p className="text-xs font-medium text-gray-600">Total Rewards</p>
                  <p className="text-xl font-bold text-yamaha-dark">{rewards.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div className="ml-3">
                  <p className="text-xs font-medium text-gray-600">Active Rewards</p>
                  <p className="text-xl font-bold text-yamaha-dark">
                    {rewards.filter(r => r.status === 'active').length}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Award className="w-5 h-5 text-purple-600" />
                </div>
                <div className="ml-3">
                  <p className="text-xs font-medium text-gray-600">Featured Rewards</p>
                  <p className="text-xl font-bold text-yamaha-dark">
                    {rewards.filter(r => r.featured).length}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Package className="w-5 h-5 text-yellow-600" />
                </div>
                <div className="ml-3">
                  <p className="text-xs font-medium text-gray-600">Total Stock</p>
                  <p className="text-xl font-bold text-yamaha-dark">
                    {rewards.reduce((sum, r) => sum + r.stock, 0)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Reward Search and Filter */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search rewards..."
                    value={rewardSearchTerm}
                    onChange={(e) => setRewardSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
                  />
                </div>
                <select
                  value={rewardFilterType}
                  onChange={(e) => setRewardFilterType(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
                >
                  <option value="all">All Types</option>
                  <option value="physical">Physical</option>
                  <option value="voucher">Voucher</option>
                  <option value="cash">Cash</option>
                </select>
                <select
                  value={rewardFilterCategory}
                  onChange={(e) => setRewardFilterCategory(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
                >
                  <option value="all">All Categories</option>
                  <option value="merchandise">Merchandise</option>
                  <option value="voucher">Voucher</option>
                  <option value="cashback">Cashback</option>
                </select>
              </div>
              <button
                onClick={() => setShowRewardModal(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-yamaha-blue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yamaha-blue"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Reward
              </button>
            </div>
          </div>

          {/* Rewards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRewards.map((reward) => (
              <div key={reward.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="relative">
                  <img
                    src={reward.image}
                    alt={reward.name}
                    className="w-full h-48 object-cover"
                  />
                  {reward.featured && (
                    <div className="absolute top-2 right-2">
                      <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                        <Star className="w-3 h-3 mr-1" />
                        Featured
                      </span>
                    </div>
                  )}
                  <div className="absolute top-2 left-2">
                    {getRewardStatusBadge(reward.status)}
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-yamaha-dark">{reward.name}</h3>
                    <div className="flex space-x-1">
                      <button
                        onClick={() => openEditRewardModal(reward)}
                        className="p-1 text-gray-400 hover:text-yamaha-blue"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteReward(reward)}
                        className="p-1 text-gray-400 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{reward.description}</p>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex space-x-2">
                      {getRewardTypeBadge(reward.type)}
                      {getRewardCategoryBadge(reward.category)}
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-yamaha-blue">
                      <DollarSign className="w-4 h-4 mr-1" />
                      <span className="font-medium">{reward.pointsRequired.toLocaleString()} pts</span>
                    </div>
                    <div className="text-gray-500">
                      Stock: {reward.stock}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Add Reward Modal */}
      {showRewardModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-yamaha-dark">Add New Reward</h3>
                <button
                  onClick={() => setShowRewardModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Reward Name</label>
                    <input
                      type="text"
                      value={rewardFormData.name}
                      onChange={(e) => setRewardFormData({...rewardFormData, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                    <select
                      value={rewardFormData.type}
                      onChange={(e) => setRewardFormData({...rewardFormData, type: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
                    >
                      <option value="physical">Physical</option>
                      <option value="voucher">Voucher</option>
                      <option value="cash">Cash</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={rewardFormData.description}
                    onChange={(e) => setRewardFormData({...rewardFormData, description: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                      value={rewardFormData.category}
                      onChange={(e) => setRewardFormData({...rewardFormData, category: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
                    >
                      <option value="merchandise">Merchandise</option>
                      <option value="voucher">Voucher</option>
                      <option value="cashback">Cashback</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Points Required</label>
                    <input
                      type="number"
                      value={rewardFormData.pointsRequired}
                      onChange={(e) => setRewardFormData({...rewardFormData, pointsRequired: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                    <input
                      type="number"
                      value={rewardFormData.stock}
                      onChange={(e) => setRewardFormData({...rewardFormData, stock: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                  <input
                    type="url"
                    value={rewardFormData.image}
                    onChange={(e) => setRewardFormData({...rewardFormData, image: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
                  />
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={rewardFormData.featured}
                      onChange={(e) => setRewardFormData({...rewardFormData, featured: e.target.checked})}
                      className="h-4 w-4 text-yamaha-blue focus:ring-yamaha-blue border-gray-300 rounded"
                    />
                    <label htmlFor="featured" className="ml-2 block text-sm text-gray-700">
                      Featured Reward
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="status"
                      checked={rewardFormData.status === 'active'}
                      onChange={(e) => setRewardFormData({...rewardFormData, status: e.target.checked ? 'active' : 'inactive'})}
                      className="h-4 w-4 text-yamaha-blue focus:ring-yamaha-blue border-gray-300 rounded"
                    />
                    <label htmlFor="status" className="ml-2 block text-sm text-gray-700">
                      Active
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowRewardModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddReward}
                  className="px-4 py-2 bg-yamaha-blue text-white rounded-md text-sm font-medium hover:bg-blue-700"
                >
                  Add Reward
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Reward Modal */}
      {showRewardEditModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-yamaha-dark">Edit Reward</h3>
                <button
                  onClick={() => setShowRewardEditModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Reward Name</label>
                    <input
                      type="text"
                      value={rewardFormData.name}
                      onChange={(e) => setRewardFormData({...rewardFormData, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                    <select
                      value={rewardFormData.type}
                      onChange={(e) => setRewardFormData({...rewardFormData, type: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
                    >
                      <option value="physical">Physical</option>
                      <option value="voucher">Voucher</option>
                      <option value="cash">Cash</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={rewardFormData.description}
                    onChange={(e) => setRewardFormData({...rewardFormData, description: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                      value={rewardFormData.category}
                      onChange={(e) => setRewardFormData({...rewardFormData, category: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
                    >
                      <option value="merchandise">Merchandise</option>
                      <option value="voucher">Voucher</option>
                      <option value="cashback">Cashback</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Points Required</label>
                    <input
                      type="number"
                      value={rewardFormData.pointsRequired}
                      onChange={(e) => setRewardFormData({...rewardFormData, pointsRequired: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                    <input
                      type="number"
                      value={rewardFormData.stock}
                      onChange={(e) => setRewardFormData({...rewardFormData, stock: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                  <input
                    type="url"
                    value={rewardFormData.image}
                    onChange={(e) => setRewardFormData({...rewardFormData, image: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
                  />
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="edit-featured"
                      checked={rewardFormData.featured}
                      onChange={(e) => setRewardFormData({...rewardFormData, featured: e.target.checked})}
                      className="h-4 w-4 text-yamaha-blue focus:ring-yamaha-blue border-gray-300 rounded"
                    />
                    <label htmlFor="edit-featured" className="ml-2 block text-sm text-gray-700">
                      Featured Reward
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="edit-status"
                      checked={rewardFormData.status === 'active'}
                      onChange={(e) => setRewardFormData({...rewardFormData, status: e.target.checked ? 'active' : 'inactive'})}
                      className="h-4 w-4 text-yamaha-blue focus:ring-yamaha-blue border-gray-300 rounded"
                    />
                    <label htmlFor="edit-status" className="ml-2 block text-sm text-gray-700">
                      Active
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowRewardEditModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEditReward}
                  className="px-4 py-2 bg-yamaha-blue text-white rounded-md text-sm font-medium hover:bg-blue-700"
                >
                  Update Reward
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Reward Confirmation Modal */}
      <ConfirmModal
        show={showRewardDeleteConfirm}
        onClose={() => setShowRewardDeleteConfirm(false)}
        onConfirm={handleDeleteConfirm}
        title="Konfirmasi Hapus Reward"
        message="Apakah Anda yakin ingin menghapus reward ini? Tindakan ini tidak dapat dibatalkan."
        confirmText="Ya, Hapus"
        cancelText="Batal"
        type="warning"
      />
    </div>
  )
}

export default RedeemManagement
