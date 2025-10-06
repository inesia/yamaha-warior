import { useState } from 'react'
import { 
  Search, 
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Download,
  Users,
  FileText,
  Award,
  Calendar
} from 'lucide-react'
import { mockSubmissions, mockChallenges } from '../../data/mockData'

const PostingChallenge = () => {
  const [activeTab, setActiveTab] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [selectedSubmissions, setSelectedSubmissions] = useState([])
  const [submissions] = useState(mockSubmissions)
  const [challenges] = useState(mockChallenges)

  // Get unique challenge names for tabs
  const challengeNames = ['all', ...new Set(submissions.map(s => s.challengeName))]

  // Filter submissions based on active tab, search, and status
  const filteredSubmissions = submissions.filter(submission => {
    const matchesTab = activeTab === 'all' || submission.challengeName === activeTab
    const matchesSearch = submission.participantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         submission.challengeName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || submission.status === filterStatus
    
    return matchesTab && matchesSearch && matchesStatus
  })

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedSubmissions(filteredSubmissions.map(submission => submission.id))
    } else {
      setSelectedSubmissions([])
    }
  }

  const handleSelectSubmission = (submissionId, checked) => {
    if (checked) {
      setSelectedSubmissions([...selectedSubmissions, submissionId])
    } else {
      setSelectedSubmissions(selectedSubmissions.filter(id => id !== submissionId))
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'approved':
        return (
          <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
            <CheckCircle className="w-3 h-3 mr-1" />
            Approved
          </span>
        )
      case 'rejected':
        return (
          <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
            <XCircle className="w-3 h-3 mr-1" />
            Rejected
          </span>
        )
      case 'pending':
        return (
          <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
            {status}
          </span>
        )
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-500" />
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />
      default:
        return <Clock className="w-5 h-5 text-gray-500" />
    }
  }

  const handleBulkAction = (action) => {
    if (selectedSubmissions.length === 0) return
    
    // Simulate bulk action
    console.log(`Bulk ${action} for submissions:`, selectedSubmissions)
    
    // Clear selection
    setSelectedSubmissions([])
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-yamaha-dark">Posting Challenge Review</h1>
          <p className="mt-1 text-sm text-gray-600">Review and manage challenge submissions</p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-2">
          {selectedSubmissions.length > 0 && (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleBulkAction('approve')}
                className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-md hover:bg-green-200"
              >
                Approve Selected
              </button>
              <button
                onClick={() => handleBulkAction('reject')}
                className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded-md hover:bg-red-200"
              >
                Reject Selected
              </button>
            </div>
          )}
          <button className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-800">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Stats Cards - Compact */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-1.5 bg-blue-100 rounded-lg">
              <FileText className="w-5 h-5 text-yamaha-blue" />
            </div>
            <div className="ml-3">
              <p className="text-xs font-medium text-gray-600">Total Submissions</p>
              <p className="text-lg font-bold text-yamaha-dark">{submissions.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-1.5 bg-yellow-100 rounded-lg">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <div className="ml-3">
              <p className="text-xs font-medium text-gray-600">Pending Review</p>
              <p className="text-lg font-bold text-yamaha-dark">
                {submissions.filter(s => s.status === 'pending').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-1.5 bg-green-100 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div className="ml-3">
              <p className="text-xs font-medium text-gray-600">Approved</p>
              <p className="text-lg font-bold text-yamaha-dark">
                {submissions.filter(s => s.status === 'approved').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-1.5 bg-red-100 rounded-lg">
              <XCircle className="w-5 h-5 text-red-600" />
            </div>
            <div className="ml-3">
              <p className="text-xs font-medium text-gray-600">Rejected</p>
              <p className="text-lg font-bold text-yamaha-dark">
                {submissions.filter(s => s.status === 'rejected').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Challenge Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {challengeNames.map((challengeName) => (
              <button
                key={challengeName}
                onClick={() => setActiveTab(challengeName)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === challengeName
                    ? 'border-yamaha-blue text-yamaha-blue'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {challengeName === 'all' ? 'All Challenges' : challengeName}
                <span className={`ml-2 py-0.5 px-2 rounded-full text-xs ${
                  activeTab === challengeName
                    ? 'bg-yamaha-blue text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {challengeName === 'all' 
                    ? submissions.length 
                    : submissions.filter(s => s.challengeName === challengeName).length
                  }
                </span>
              </button>
            ))}
          </nav>
        </div>

        {/* Filters */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search submissions..."
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
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            
            {/* Selection Info */}
            {selectedSubmissions.length > 0 && (
              <div className="text-sm text-gray-600">
                {selectedSubmissions.length} submission(s) selected
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Submissions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSubmissions.map((submission) => (
          <div key={submission.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
            {/* Card Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedSubmissions.includes(submission.id)}
                    onChange={(e) => handleSelectSubmission(submission.id, e.target.checked)}
                    className="rounded border-gray-300 text-yamaha-blue focus:ring-yamaha-blue mr-3"
                  />
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">{submission.participantName}</h3>
                    <p className="text-xs text-gray-600">{submission.challengeName}</p>
                  </div>
                </div>
                {getStatusBadge(submission.status)}
              </div>
            </div>

            {/* Screenshot */}
            <div className="aspect-video bg-gray-100">
              <img
                src={submission.screenshot}
                alt="Submission screenshot"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Card Body */}
            <div className="p-4">
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  {new Date(submission.submittedAt).toLocaleDateString()}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="w-4 h-4 mr-2" />
                  {submission.participantName}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Award className="w-4 h-4 mr-2" />
                  {submission.challengeName}
                </div>
                {submission.url && (
                  <div className="flex items-center text-sm">
                    <a
                      href={submission.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-yamaha-blue hover:text-blue-700 truncate"
                    >
                      View Post
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Card Footer */}
            <div className="px-4 py-3 bg-gray-50 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <button className="text-green-600 hover:text-green-700">
                  <CheckCircle className="w-4 h-4" />
                </button>
                <button className="text-red-600 hover:text-red-700">
                  <XCircle className="w-4 h-4" />
                </button>
                <button className="text-yamaha-blue hover:text-blue-700">
                  <Eye className="w-4 h-4" />
                </button>
              </div>
              <div className="text-xs text-gray-500">
                {submission.reviewedAt ? `Reviewed ${new Date(submission.reviewedAt).toLocaleDateString()}` : 'Not reviewed'}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredSubmissions.length === 0 && (
        <div className="text-center py-12">
          <FileText className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No submissions found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm || filterStatus !== 'all' 
              ? 'Try adjusting your search or filter criteria.'
              : 'No submissions have been submitted yet.'
            }
          </p>
        </div>
      )}
    </div>
  )
}

export default PostingChallenge
