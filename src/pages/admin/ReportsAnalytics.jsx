import { useState } from 'react'
import AlertModal from '../../components/AlertModal'
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Trophy, 
  Calendar,
  Download,
  Filter,
  Eye,
  Target,
  Award,
  Activity,
  Clock,
  Star,
  Zap,
  ChevronDown,
  ChevronUp,
  RefreshCw
} from 'lucide-react'
import { mockMembers, mockChallenges, mockSubmissions, mockLeaderboard } from '../../data/mockData'

const ReportsAnalytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30d')
  const [selectedMetric, setSelectedMetric] = useState('overview')
  const [isExporting, setIsExporting] = useState(false)
  
  // Modal states
  const [showAlert, setShowAlert] = useState(false)
  const [alertData, setAlertData] = useState({})

  // Mock analytics data
  const analyticsData = {
    overview: {
      totalMembers: mockMembers.length,
      activeMembers: mockMembers.filter(m => m.lastActive === '2024-01-21').length,
      totalChallenges: mockChallenges.length,
      activeChallenges: mockChallenges.filter(c => c.status === 'active').length,
      totalSubmissions: mockSubmissions.length,
      approvedSubmissions: mockSubmissions.filter(s => s.status === 'approved').length,
      totalPoints: mockSubmissions.reduce((sum, s) => sum + (s.status === 'approved' ? 100 : 0), 0),
      engagementRate: 78.5,
      completionRate: 65.2
    },
    challenges: {
      mostPopular: 'NMAX Your Style',
      leastPopular: 'Yamaha Filano Hybrid',
      avgCompletionTime: '3.2 days',
      successRate: 72.8
    },
    members: {
      topPerformers: mockMembers.slice(0, 5),
      newMembers: mockMembers.filter(m => m.createdAt === '2024-01-21').length,
      retentionRate: 85.3,
      avgPointsPerMember: 245.6
    }
  }

  const periods = [
    { id: '7d', label: '7 Hari Terakhir' },
    { id: '30d', label: '30 Hari Terakhir' },
    { id: '90d', label: '90 Hari Terakhir' },
    { id: '1y', label: '1 Tahun Terakhir' }
  ]

  const metrics = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'challenges', label: 'Challenges', icon: Trophy },
    { id: 'members', label: 'Members', icon: Users },
    { id: 'engagement', label: 'Engagement', icon: Activity }
  ]

  const handleExport = async () => {
    setIsExporting(true)
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsExporting(false)
    setAlertData({
      title: 'Berhasil!',
      message: 'Report berhasil diekspor dan akan dikirim ke email Anda.',
      type: 'success'
    })
    setShowAlert(true)
  }

  const getMetricColor = (value, type) => {
    if (type === 'rate') {
      if (value >= 80) return 'text-green-600'
      if (value >= 60) return 'text-yellow-600'
      return 'text-red-600'
    }
    return 'text-yamaha-blue'
  }

  const getMetricIcon = (value, type) => {
    if (type === 'rate') {
      if (value >= 80) return <TrendingUp className="w-4 h-4 text-green-600" />
      if (value >= 60) return <Clock className="w-4 h-4 text-yellow-600" />
      return <Target className="w-4 h-4 text-red-600" />
    }
    return <BarChart3 className="w-4 h-4 text-yamaha-blue" />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-yamaha-dark">Reports & Analytics</h1>
          <p className="mt-1 text-sm text-gray-600">Comprehensive insights and performance metrics</p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-3">
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-yamaha-blue rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {isExporting ? (
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Download className="w-4 h-4 mr-2" />
            )}
            {isExporting ? 'Exporting...' : 'Export Report'}
          </button>
        </div>
      </div>

      {/* Period & Metric Selectors */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Period:</span>
            </div>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-yamaha-blue focus:border-yamaha-blue"
            >
              {periods.map(period => (
                <option key={period.id} value={period.id}>{period.label}</option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Metric:</span>
            <select
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-yamaha-blue focus:border-yamaha-blue"
            >
              {metrics.map(metric => (
                <option key={metric.id} value={metric.id}>{metric.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Key Metrics - Compact */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600">Total Members</p>
              <p className="text-lg font-bold text-yamaha-dark">{analyticsData.overview.totalMembers}</p>
            </div>
            <Users className="w-5 h-5 text-yamaha-blue" />
          </div>
        </div>
        
        <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600">Active Members</p>
              <p className="text-lg font-bold text-yamaha-dark">{analyticsData.overview.activeMembers}</p>
            </div>
            <Activity className="w-5 h-5 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600">Total Challenges</p>
              <p className="text-lg font-bold text-yamaha-dark">{analyticsData.overview.totalChallenges}</p>
            </div>
            <Trophy className="w-5 h-5 text-yellow-600" />
          </div>
        </div>
        
        <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600">Total Points</p>
              <p className="text-lg font-bold text-yamaha-dark">{analyticsData.overview.totalPoints}</p>
            </div>
            <Award className="w-5 h-5 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-900">Engagement Rate</h3>
            {getMetricIcon(analyticsData.overview.engagementRate, 'rate')}
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-yamaha-blue h-2 rounded-full transition-all duration-500"
                style={{ width: `${analyticsData.overview.engagementRate}%` }}
              ></div>
            </div>
            <span className={`text-sm font-bold ${getMetricColor(analyticsData.overview.engagementRate, 'rate')}`}>
              {analyticsData.overview.engagementRate}%
            </span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-900">Completion Rate</h3>
            {getMetricIcon(analyticsData.overview.completionRate, 'rate')}
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${analyticsData.overview.completionRate}%` }}
              ></div>
            </div>
            <span className={`text-sm font-bold ${getMetricColor(analyticsData.overview.completionRate, 'rate')}`}>
              {analyticsData.overview.completionRate}%
            </span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-900">Success Rate</h3>
            {getMetricIcon(analyticsData.challenges.successRate, 'rate')}
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-yellow-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${analyticsData.challenges.successRate}%` }}
              ></div>
            </div>
            <span className={`text-sm font-bold ${getMetricColor(analyticsData.challenges.successRate, 'rate')}`}>
              {analyticsData.challenges.successRate}%
            </span>
          </div>
        </div>
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performers */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Top Performers</h3>
            <Star className="w-5 h-5 text-yellow-500" />
          </div>
          <div className="space-y-3">
            {analyticsData.members.topPerformers.map((member, index) => (
              <div key={member.id} className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-8 h-8 bg-yamaha-blue text-white text-sm font-bold rounded-full">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{member.name}</p>
                  <p className="text-xs text-gray-500">{member.email}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-yamaha-blue">{member.points || 0} pts</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Challenge Performance */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Challenge Performance</h3>
            <Trophy className="w-5 h-5 text-yamaha-blue" />
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Most Popular</span>
              <span className="text-sm font-medium text-gray-900">{analyticsData.challenges.mostPopular}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Least Popular</span>
              <span className="text-sm font-medium text-gray-900">{analyticsData.challenges.leastPopular}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Avg Completion Time</span>
              <span className="text-sm font-medium text-gray-900">{analyticsData.challenges.avgCompletionTime}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Success Rate</span>
              <span className="text-sm font-bold text-green-600">{analyticsData.challenges.successRate}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Member Analytics */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Member Analytics</h3>
          <Users className="w-5 h-5 text-yamaha-blue" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-yamaha-blue">{analyticsData.members.newMembers}</p>
            <p className="text-sm text-gray-600">New Members</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">{analyticsData.members.retentionRate}%</p>
            <p className="text-sm text-gray-600">Retention Rate</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">{analyticsData.members.avgPointsPerMember}</p>
            <p className="text-sm text-gray-600">Avg Points/Member</p>
          </div>
        </div>
      </div>

      {/* Export Options */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Export Options</h3>
          <Download className="w-5 h-5 text-yamaha-blue" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">PDF Report</span>
          </button>
          <button className="flex items-center justify-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">Excel Data</span>
          </button>
          <button className="flex items-center justify-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">CSV Export</span>
          </button>
        </div>
      </div>

      {/* Alert Modal */}
      <AlertModal
        show={showAlert}
        onClose={() => setShowAlert(false)}
        title={alertData.title}
        message={alertData.message}
        type={alertData.type}
        buttonText="OK"
      />
    </div>
  )
}

export default ReportsAnalytics
