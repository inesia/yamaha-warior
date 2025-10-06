import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Save, X } from 'lucide-react'

const ChallengeForm = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    periode: '',
    description: '',
    requirements: '',
    reward: '',
    status: 'active'
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

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
      newErrors.name = 'Challenge name is required'
    }
    
    if (!formData.periode.trim()) {
      newErrors.periode = 'Periode is required'
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    }
    
    if (!formData.requirements.trim()) {
      newErrors.requirements = 'Requirements are required'
    }
    
    if (!formData.reward.trim()) {
      newErrors.reward = 'Reward is required'
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
      
      // Redirect to challenges list
      navigate('/admin/challenges')
    } catch (error) {
      console.error('Error saving challenge:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/admin/challenges')}
            className="flex items-center text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Challenges
          </button>
          <div>
            <h1 className="text-2xl font-bold text-yamaha-dark">Create New Challenge</h1>
            <p className="text-sm text-gray-600">Fill in the details to create a new challenge</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Challenge Name */}
            <div className="lg:col-span-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Challenge Name *
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
                placeholder="Enter challenge name"
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>

            {/* Periode */}
            <div>
              <label htmlFor="periode" className="block text-sm font-medium text-gray-700 mb-2">
                Periode *
              </label>
              <input
                type="text"
                id="periode"
                name="periode"
                value={formData.periode}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue ${
                  errors.periode ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="e.g., 2024-01-01 - 2024-01-31"
              />
              {errors.periode && <p className="mt-1 text-sm text-red-600">{errors.periode}</p>}
            </div>

            {/* Status */}
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            {/* Description */}
            <div className="lg:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue ${
                  errors.description ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Describe the challenge in detail"
              />
              {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
            </div>

            {/* Requirements */}
            <div className="lg:col-span-2">
              <label htmlFor="requirements" className="block text-sm font-medium text-gray-700 mb-2">
                Requirements *
              </label>
              <textarea
                id="requirements"
                name="requirements"
                rows={4}
                value={formData.requirements}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue ${
                  errors.requirements ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="List the requirements for this challenge"
              />
              {errors.requirements && <p className="mt-1 text-sm text-red-600">{errors.requirements}</p>}
            </div>

            {/* Reward */}
            <div className="lg:col-span-2">
              <label htmlFor="reward" className="block text-sm font-medium text-gray-700 mb-2">
                Reward *
              </label>
              <input
                type="text"
                id="reward"
                name="reward"
                value={formData.reward}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue ${
                  errors.reward ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="e.g., 100 points + merchandise"
              />
              {errors.reward && <p className="mt-1 text-sm text-red-600">{errors.reward}</p>}
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => navigate('/admin/challenges')}
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
              {loading ? 'Saving...' : 'Save Challenge'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ChallengeForm
