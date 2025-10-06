import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { 
  ArrowLeft, 
  Save, 
  X, 
  User,
  Mail,
  Phone,
  MapPin,
  Award,
  Trophy
} from 'lucide-react'
import { mockMembers } from '../../data/mockData'

const MemberForm = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEdit = Boolean(id)
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    yamahaBrand: '',
    totalPoints: 0
  })
  
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  // Load member data if editing
  useEffect(() => {
    if (isEdit && id) {
      const member = mockMembers.find(m => m.id === parseInt(id))
      if (member) {
        setFormData({
          name: member.name,
          email: member.email,
          phone: member.phone,
          address: member.address,
          yamahaBrand: member.yamahaBrand,
          totalPoints: member.totalPoints
        })
      }
    }
  }, [id, isEdit])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required'
    }
    
    if (!formData.yamahaBrand.trim()) {
      newErrors.yamahaBrand = 'Yamaha brand is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Redirect to members list
      navigate('/admin/members')
    } catch (error) {
      console.error('Error saving member:', error)
    } finally {
      setLoading(false)
    }
  }

  const yamahaBrands = [
    'NMAX', 'Aerox', 'MT-15', 'R15', 'FZ', 'Vixion', 'Mio', 'Jupiter', 'Vega', 'Lexi'
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/admin/members')}
            className="flex items-center text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Members
          </button>
          <div>
            <h1 className="text-2xl font-bold text-yamaha-dark">
              {isEdit ? 'Edit Member' : 'Add New Member'}
            </h1>
            <p className="text-sm text-gray-600">
              {isEdit ? 'Update member information' : 'Fill in the details to add a new member'}
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="lg:col-span-2">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <User className="w-5 h-5 mr-2 text-yamaha-blue" />
                Personal Information
              </h3>
            </div>

            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue ${
                  errors.name ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter full name"
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-3 py-2 border rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue ${
                    errors.email ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter email address"
                />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-3 py-2 border rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue ${
                    errors.phone ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter phone number"
                />
              </div>
              {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
            </div>

            {/* Address */}
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                Address *
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                <textarea
                  id="address"
                  name="address"
                  rows={3}
                  value={formData.address}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-3 py-2 border rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue ${
                    errors.address ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter full address"
                />
              </div>
              {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
            </div>

            {/* Yamaha Brand */}
            <div>
              <label htmlFor="yamahaBrand" className="block text-sm font-medium text-gray-700 mb-2">
                Yamaha Brand *
              </label>
              <div className="relative">
                <Trophy className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select
                  id="yamahaBrand"
                  name="yamahaBrand"
                  value={formData.yamahaBrand}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-3 py-2 border rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue ${
                    errors.yamahaBrand ? 'border-red-300' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select Yamaha Brand</option>
                  {yamahaBrands.map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>
              {errors.yamahaBrand && <p className="mt-1 text-sm text-red-600">{errors.yamahaBrand}</p>}
            </div>

            {/* Points */}
            <div>
              <label htmlFor="totalPoints" className="block text-sm font-medium text-gray-700 mb-2">
                Total Points
              </label>
              <div className="relative">
                <Award className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="number"
                  id="totalPoints"
                  name="totalPoints"
                  value={formData.totalPoints}
                  onChange={handleChange}
                  min="0"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
                  placeholder="Enter total points"
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => navigate('/admin/members')}
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yamaha-blue"
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center px-4 py-2 text-sm font-medium text-white bg-yamaha-blue border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yamaha-blue disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4 mr-2" />
              {loading ? 'Saving...' : (isEdit ? 'Update Member' : 'Add Member')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default MemberForm
