import { useState } from 'react'
import { 
  Save, 
  Edit, 
  Eye,
  Users,
  Trophy,
  TrendingUp,
  Gift,
  Upload,
  Image as ImageIcon,
  FileText,
  Settings,
  Plus,
  Trash2,
  X
} from 'lucide-react'
import ConfirmModal from '../../components/ConfirmModal'

const LandingContentManagement = () => {
  const [activeTab, setActiveTab] = useState('hero')
  const [isEditing, setIsEditing] = useState(false)

  // Banner Management States
  const [banners, setBanners] = useState([
    {
      id: 1,
      title: 'Jadilah Warior',
      subtitle: 'Ikuti Challenge Yamaha dan Raih Hadiahnya',
      image: 'https://www.yamahamotor.co.id/wp-content/uploads/2024/11/Yamaha-Filano-Hybrid-Lux.png',
      cta: 'Mulai Challenge',
      type: 'hero',
      status: 'active',
      order: 1,
      createdAt: '2024-01-15'
    },
    {
      id: 2,
      title: 'Bagikan Momenmu',
      subtitle: 'Tunjukkan Kebanggaanmu di Social Media',
      image: 'https://www.yamahamotor.co.id/wp-content/uploads/2024/12/YAMAHA-AEROX-ALPHA.png',
      cta: 'Lihat Challenge',
      type: 'hero',
      status: 'active',
      order: 2,
      createdAt: '2024-01-15'
    },
    {
      id: 3,
      title: 'Menangkan Hadiah',
      subtitle: 'Berkompetisi dan Dapatkan Hadiah Menarik',
      image: 'https://www.yamahamotor.co.id/wp-content/uploads/2025/05/YAMAHA-GEAR-ULTIMA-HYBRID.png',
      cta: 'Join Sekarang',
      type: 'hero',
      status: 'active',
      order: 3,
      createdAt: '2024-01-15'
    }
  ])

  const [showBannerModal, setShowBannerModal] = useState(false)
  const [showBannerEditModal, setShowBannerEditModal] = useState(false)
  const [showBannerDeleteConfirm, setShowBannerDeleteConfirm] = useState(false)
  const [selectedBanner, setSelectedBanner] = useState(null)
  const [bannerToDelete, setBannerToDelete] = useState(null)
  const [bannerSearchTerm, setBannerSearchTerm] = useState('')
  const [bannerFilterType, setBannerFilterType] = useState('all')

  const [bannerFormData, setBannerFormData] = useState({
    title: '',
    subtitle: '',
    image: '',
    cta: '',
    type: 'hero',
    status: 'active',
    order: 1
  })

  // Hero Section Content
  const [heroContent, setHeroContent] = useState({
    mainTitle: 'Yamaha Warior Program',
    mainSubtitle: 'Platform campaign eksklusif untuk rider Yamaha Indonesia',
    badgeText: 'Yamaha Warior Challenge',
    ctaText: 'Mulai Sekarang',
    ctaSubtext: 'Masuk dengan Google untuk memulai perjalanan warior kamu'
  })

  // Stats Section Content
  const [statsContent, setStatsContent] = useState([
    { id: 1, number: '10K+', label: 'Warior Aktif', editable: true },
    { id: 2, number: '50K+', label: 'Challenge Selesai', editable: true },
    { id: 3, number: '500+', label: 'Hadiah Dibagikan', editable: true }
  ])

  // How It Works Section Content
  const [howItWorksContent, setHowItWorksContent] = useState({
    badgeText: 'Cara Kerjanya',
    title: 'Mudah & Simpel',
    subtitle: 'Tiga langkah mudah untuk menjadi Yamaha Warior',
    steps: [
      {
        id: 1,
        title: 'Upload Konten',
        description: 'Bagikan momen berkendara Yamaha kamu di social media',
        icon: 'Upload'
      },
      {
        id: 2,
        title: 'Dapatkan Poin',
        description: 'Raih poin untuk setiap submission yang valid',
        icon: 'Share2'
      },
      {
        id: 3,
        title: 'Menangkan Hadiah',
        description: 'Bersaing untuk mendapatkan hadiah eksklusif',
        icon: 'Award'
      }
    ]
  })

  // About Section Content
  const [aboutContent, setAboutContent] = useState({
    badgeText: 'About Program',
    title: 'Yamaha Warior Program',
    description: 'Yamaha Warior adalah program campaign eksklusif untuk pengguna motor matic Yamaha. Kami mengajak kamu untuk menjadi share of voice dengan membagikan pengalaman berkendara kamu di social media.',
    subDescription: 'Setiap konten yang kamu bagikan akan mendapatkan poin, dan kamu berkesempatan memenangkan berbagai hadiah menarik. Jadilah bagian dari komunitas Yamaha Warior dan tunjukkan kebanggaanmu sebagai rider Yamaha!',
    benefits: [
      {
        id: 1,
        title: 'Bangun Komunitas',
        description: 'Bergabung dengan ribuan rider Yamaha lainnya',
        icon: 'Users'
      },
      {
        id: 2,
        title: 'Raih Hadiah',
        description: 'Dapatkan hadiah menarik setiap bulannya',
        icon: 'Gift'
      },
      {
        id: 3,
        title: 'Berkembang Bersama',
        description: 'Tingkatkan skill konten kreator kamu',
        icon: 'TrendingUp'
      }
    ]
  })

  // Footer Content
  const [footerContent, setFooterContent] = useState({
    brandName: 'YAMAHA WARIOR',
    description: 'Platform campaign eksklusif untuk rider Yamaha Indonesia.',
    quickLinks: [
      { name: 'Challenge', path: '/public/challenges' },
      { name: 'Leaderboard', path: '/public/leaderboard' },
      { name: 'The Warior', path: '/members' }
    ],
    legalLinks: [
      { name: 'Syarat & Ketentuan', path: '#' },
      { name: 'Kebijakan Privasi', path: '#' },
      { name: 'Hubungi Kami', path: '#' }
    ],
    socialLinks: [
      { name: 'Instagram', url: 'https://instagram.com/yamahaindonesia', icon: 'Instagram' },
      { name: 'YouTube', url: '#', icon: 'Video' },
      { name: 'TikTok', url: '#', icon: 'Camera' }
    ],
    copyright: '© 2025 Yamaha Motor Indonesia. All rights reserved.'
  })

  const tabs = [
    { id: 'hero', label: 'Hero Section', icon: Trophy },
    { id: 'stats', label: 'Stats Section', icon: TrendingUp },
    { id: 'howitworks', label: 'How It Works', icon: Settings },
    { id: 'about', label: 'About Section', icon: Users },
    { id: 'footer', label: 'Footer', icon: FileText }
  ]

  const handleSave = () => {
    // In real implementation, save to backend
    console.log('Saving content...')
    setIsEditing(false)
    // Show success message
  }

  const handleCancel = () => {
    setIsEditing(false)
    // Reset to original values if needed
  }

  // Banner Management Functions
  const filteredBanners = banners.filter(banner => {
    const matchesSearch = banner.title.toLowerCase().includes(bannerSearchTerm.toLowerCase()) ||
                         banner.subtitle.toLowerCase().includes(bannerSearchTerm.toLowerCase())
    const matchesType = bannerFilterType === 'all' || banner.type === bannerFilterType
    return matchesSearch && matchesType
  })

  const getTypeBadge = (type) => {
    switch (type) {
      case 'hero':
        return <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">Hero Banner</span>
      case 'promo':
        return <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Promotional</span>
      case 'challenge':
        return <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">Challenge</span>
      default:
        return <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">Other</span>
    }
  }

  const getStatusBadge = (status) => {
    return status === 'active' ? (
      <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Active</span>
    ) : (
      <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">Inactive</span>
    )
  }

  const handleAddBanner = () => {
    const newBanner = {
      id: banners.length + 1,
      ...bannerFormData,
      createdAt: new Date().toISOString().split('T')[0]
    }
    setBanners([...banners, newBanner])
    setShowBannerModal(false)
    resetBannerForm()
  }

  const handleEditBanner = () => {
    setBanners(banners.map(banner => 
      banner.id === selectedBanner.id 
        ? { ...banner, ...bannerFormData }
        : banner
    ))
    setShowBannerEditModal(false)
    setSelectedBanner(null)
    resetBannerForm()
  }

  const handleDeleteBanner = (bannerId) => {
    setBannerToDelete(bannerId)
    setShowBannerDeleteConfirm(true)
  }

  const handleDeleteConfirm = () => {
    if (bannerToDelete) {
      setBanners(banners.filter(banner => banner.id !== bannerToDelete))
      setBannerToDelete(null)
    }
    setShowBannerDeleteConfirm(false)
  }

  const openEditBannerModal = (banner) => {
    setSelectedBanner(banner)
    setBannerFormData({
      title: banner.title,
      subtitle: banner.subtitle,
      image: banner.image,
      cta: banner.cta,
      type: banner.type,
      status: banner.status,
      order: banner.order
    })
    setShowBannerEditModal(true)
  }

  const resetBannerForm = () => {
    setBannerFormData({
      title: '',
      subtitle: '',
      image: '',
      cta: '',
      type: 'hero',
      status: 'active',
      order: 1
    })
  }

  const handleBannerImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setBannerFormData({...bannerFormData, image: e.target.result})
      }
      reader.readAsDataURL(file)
    }
  }

  const updateStat = (id, field, value) => {
    setStatsContent(statsContent.map(stat => 
      stat.id === id ? { ...stat, [field]: value } : stat
    ))
  }

  const updateHowItWorksStep = (id, field, value) => {
    setHowItWorksContent({
      ...howItWorksContent,
      steps: howItWorksContent.steps.map(step => 
        step.id === id ? { ...step, [field]: value } : step
      )
    })
  }

  const updateAboutBenefit = (id, field, value) => {
    setAboutContent({
      ...aboutContent,
      benefits: aboutContent.benefits.map(benefit => 
        benefit.id === id ? { ...benefit, [field]: value } : benefit
      )
    })
  }


  const renderHeroSection = () => (
    <div className="space-y-6">
      {/* Hero Content */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-yamaha-dark mb-4">Hero Section Content</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Main Title</label>
            <input
              type="text"
              value={heroContent.mainTitle}
              onChange={(e) => setHeroContent({...heroContent, mainTitle: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Main Subtitle</label>
            <textarea
              value={heroContent.mainSubtitle}
              onChange={(e) => setHeroContent({...heroContent, mainSubtitle: e.target.value})}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Badge Text</label>
            <input
              type="text"
              value={heroContent.badgeText}
              onChange={(e) => setHeroContent({...heroContent, badgeText: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">CTA Text</label>
            <input
              type="text"
              value={heroContent.ctaText}
              onChange={(e) => setHeroContent({...heroContent, ctaText: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">CTA Subtext</label>
            <input
              type="text"
              value={heroContent.ctaSubtext}
              onChange={(e) => setHeroContent({...heroContent, ctaSubtext: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
              disabled={!isEditing}
            />
          </div>
        </div>
      </div>

      {/* Hero Slides Management */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-yamaha-dark">Hero Slides Management</h3>
          <button
            onClick={() => setShowBannerModal(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-yamaha-blue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yamaha-blue"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Hero Slide
          </button>
        </div>

        {/* Banner Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <ImageIcon className="w-5 h-5 text-yamaha-blue" />
              </div>
              <div className="ml-3">
                <p className="text-xs font-medium text-gray-600">Total Slides</p>
                <p className="text-xl font-bold text-yamaha-dark">{banners.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Eye className="w-5 h-5 text-green-600" />
              </div>
              <div className="ml-3">
                <p className="text-xs font-medium text-gray-600">Active Slides</p>
                <p className="text-xl font-bold text-yamaha-dark">
                  {banners.filter(b => b.status === 'active').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <ImageIcon className="w-5 h-5 text-purple-600" />
              </div>
              <div className="ml-3">
                <p className="text-xs font-medium text-gray-600">Hero Slides</p>
                <p className="text-xl font-bold text-yamaha-dark">
                  {banners.filter(b => b.type === 'hero').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <ImageIcon className="w-5 h-5 text-orange-600" />
              </div>
              <div className="ml-3">
                <p className="text-xs font-medium text-gray-600">Promo Slides</p>
                <p className="text-xl font-bold text-yamaha-dark">
                  {banners.filter(b => b.type === 'promo').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search hero slides..."
              value={bannerSearchTerm}
              onChange={(e) => setBannerSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
            />
          </div>
          <div className="sm:w-48">
            <select
              value={bannerFilterType}
              onChange={(e) => setBannerFilterType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
            >
              <option value="all">All Types</option>
              <option value="hero">Hero Slide</option>
              <option value="promo">Promotional</option>
              <option value="challenge">Challenge</option>
            </select>
          </div>
        </div>

        {/* Hero Slides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBanners.map((banner) => (
            <div key={banner.id} className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
              {/* Banner Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2">
                  {getTypeBadge(banner.type)}
                </div>
                <div className="absolute top-2 right-2">
                  {getStatusBadge(banner.status)}
                </div>
              </div>

              {/* Banner Content */}
              <div className="p-4">
                <h3 className="font-bold text-lg text-yamaha-dark mb-2">{banner.title}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{banner.subtitle}</p>
                
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <span>Order: {banner.order}</span>
                  <span>{new Date(banner.createdAt).toLocaleDateString()}</span>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => openEditBannerModal(banner)}
                    className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteBanner(banner.id)}
                    className="inline-flex items-center justify-center px-3 py-2 border border-red-300 text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderStatsSection = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-yamaha-dark mb-4">Stats Section Content</h3>
        <div className="space-y-4">
          {statsContent.map((stat) => (
            <div key={stat.id} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-gray-200 rounded-lg">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Number</label>
                <input
                  type="text"
                  value={stat.number}
                  onChange={(e) => updateStat(stat.id, 'number', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
                  disabled={!isEditing}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Label</label>
                <input
                  type="text"
                  value={stat.label}
                  onChange={(e) => updateStat(stat.id, 'label', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
                  disabled={!isEditing}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderHowItWorksSection = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-yamaha-dark mb-4">How It Works Section</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Badge Text</label>
            <input
              type="text"
              value={howItWorksContent.badgeText}
              onChange={(e) => setHowItWorksContent({...howItWorksContent, badgeText: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              value={howItWorksContent.title}
              onChange={(e) => setHowItWorksContent({...howItWorksContent, title: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
            <input
              type="text"
              value={howItWorksContent.subtitle}
              onChange={(e) => setHowItWorksContent({...howItWorksContent, subtitle: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
              disabled={!isEditing}
            />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-yamaha-dark mb-4">Steps</h3>
        <div className="space-y-4">
          {howItWorksContent.steps.map((step) => (
            <div key={step.id} className="p-4 border border-gray-200 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Step Title</label>
                  <input
                    type="text"
                    value={step.title}
                    onChange={(e) => updateHowItWorksStep(step.id, 'title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                  <select
                    value={step.icon}
                    onChange={(e) => updateHowItWorksStep(step.id, 'icon', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
                    disabled={!isEditing}
                  >
                    <option value="Upload">Upload</option>
                    <option value="Share2">Share2</option>
                    <option value="Award">Award</option>
                    <option value="Trophy">Trophy</option>
                    <option value="Users">Users</option>
                  </select>
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={step.description}
                  onChange={(e) => updateHowItWorksStep(step.id, 'description', e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
                  disabled={!isEditing}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderAboutSection = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-yamaha-dark mb-4">About Section Content</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Badge Text</label>
            <input
              type="text"
              value={aboutContent.badgeText}
              onChange={(e) => setAboutContent({...aboutContent, badgeText: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              value={aboutContent.title}
              onChange={(e) => setAboutContent({...aboutContent, title: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={aboutContent.description}
              onChange={(e) => setAboutContent({...aboutContent, description: e.target.value})}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sub Description</label>
            <textarea
              value={aboutContent.subDescription}
              onChange={(e) => setAboutContent({...aboutContent, subDescription: e.target.value})}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
              disabled={!isEditing}
            />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-yamaha-dark mb-4">Benefits</h3>
        <div className="space-y-4">
          {aboutContent.benefits.map((benefit) => (
            <div key={benefit.id} className="p-4 border border-gray-200 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Benefit Title</label>
                  <input
                    type="text"
                    value={benefit.title}
                    onChange={(e) => updateAboutBenefit(benefit.id, 'title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                  <select
                    value={benefit.icon}
                    onChange={(e) => updateAboutBenefit(benefit.id, 'icon', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
                    disabled={!isEditing}
                  >
                    <option value="Users">Users</option>
                    <option value="Gift">Gift</option>
                    <option value="TrendingUp">TrendingUp</option>
                    <option value="Trophy">Trophy</option>
                    <option value="Award">Award</option>
                  </select>
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={benefit.description}
                  onChange={(e) => updateAboutBenefit(benefit.id, 'description', e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
                  disabled={!isEditing}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderFooterSection = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-yamaha-dark mb-4">Footer Content</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Brand Name</label>
            <input
              type="text"
              value={footerContent.brandName}
              onChange={(e) => setFooterContent({...footerContent, brandName: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={footerContent.description}
              onChange={(e) => setFooterContent({...footerContent, description: e.target.value})}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Copyright</label>
            <input
              type="text"
              value={footerContent.copyright}
              onChange={(e) => setFooterContent({...footerContent, copyright: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
              disabled={!isEditing}
            />
          </div>
        </div>
      </div>
    </div>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case 'hero':
        return renderHeroSection()
      case 'stats':
        return renderStatsSection()
      case 'howitworks':
        return renderHowItWorksSection()
      case 'about':
        return renderAboutSection()
      case 'footer':
        return renderFooterSection()
      default:
        return renderHeroSection()
    }
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-yamaha-dark">Landing Content Management</h1>
          <p className="mt-1 text-sm text-gray-600">Kelola konten dan teks untuk halaman landing page</p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-2">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-yamaha-blue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yamaha-blue"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Content
            </button>
          ) : (
            <>
              <button
                onClick={handleSave}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </button>
              <button
                onClick={handleCancel}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yamaha-blue"
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`${
                    activeTab === tab.id
                      ? 'border-yamaha-blue text-yamaha-blue'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </button>
              )
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>

      {/* Preview Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-yamaha-dark">Preview</h3>
          <button className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            <Eye className="w-4 h-4 mr-2" />
            View Live Site
          </button>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="text-gray-600 text-sm">
            Preview akan menampilkan perubahan konten secara real-time. 
            Klik "View Live Site" untuk melihat halaman landing page yang sebenarnya.
          </p>
        </div>
      </div>

      {/* Add Banner Modal */}
      {showBannerModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" onClick={() => setShowBannerModal(false)}>
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-yamaha-blue sm:mx-0 sm:h-10 sm:w-10">
                    <ImageIcon className="h-6 w-6 text-white" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Add New Hero Slide
                    </h3>
                    <div className="mt-4 space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                          <input
                            type="text"
                            value={bannerFormData.title}
                            onChange={(e) => setBannerFormData({...bannerFormData, title: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
                            placeholder="Enter title"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">CTA Text</label>
                          <input
                            type="text"
                            value={bannerFormData.cta}
                            onChange={(e) => setBannerFormData({...bannerFormData, cta: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
                            placeholder="Enter CTA text"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
                        <textarea
                          value={bannerFormData.subtitle}
                          onChange={(e) => setBannerFormData({...bannerFormData, subtitle: e.target.value})}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
                          placeholder="Enter subtitle"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                        <div className="flex items-center space-x-4">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleBannerImageUpload}
                            className="hidden"
                            id="banner-image-upload"
                          />
                          <label
                            htmlFor="banner-image-upload"
                            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
                          >
                            <Upload className="w-4 h-4 mr-2" />
                            Upload Image
                          </label>
                          {bannerFormData.image && (
                            <div className="flex-1">
                              <input
                                type="text"
                                value={bannerFormData.image}
                                onChange={(e) => setBannerFormData({...bannerFormData, image: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue text-sm"
                                placeholder="Or enter image URL"
                              />
                            </div>
                          )}
                        </div>
                        {bannerFormData.image && (
                          <div className="mt-2">
                            <img src={bannerFormData.image} alt="Preview" className="w-32 h-20 object-cover rounded border" />
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                          <select
                            value={bannerFormData.type}
                            onChange={(e) => setBannerFormData({...bannerFormData, type: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
                          >
                            <option value="hero">Hero Banner</option>
                            <option value="promo">Promotional</option>
                            <option value="challenge">Challenge</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                          <select
                            value={bannerFormData.status}
                            onChange={(e) => setBannerFormData({...bannerFormData, status: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
                          >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
                          <input
                            type="number"
                            value={bannerFormData.order}
                            onChange={(e) => setBannerFormData({...bannerFormData, order: parseInt(e.target.value)})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
                            min="1"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleAddBanner}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-yamaha-blue text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yamaha-blue sm:ml-3 sm:w-auto sm:text-sm"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Add Hero Slide
                </button>
                <button
                  type="button"
                  onClick={() => setShowBannerModal(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yamaha-blue sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Banner Modal */}
      {showBannerEditModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" onClick={() => setShowBannerEditModal(false)}>
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-yamaha-blue sm:mx-0 sm:h-10 sm:w-10">
                    <Edit className="h-6 w-6 text-white" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Edit Hero Slide
                    </h3>
                    <div className="mt-4 space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                          <input
                            type="text"
                            value={bannerFormData.title}
                            onChange={(e) => setBannerFormData({...bannerFormData, title: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">CTA Text</label>
                          <input
                            type="text"
                            value={bannerFormData.cta}
                            onChange={(e) => setBannerFormData({...bannerFormData, cta: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
                        <textarea
                          value={bannerFormData.subtitle}
                          onChange={(e) => setBannerFormData({...bannerFormData, subtitle: e.target.value})}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                        <div className="flex items-center space-x-4">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleBannerImageUpload}
                            className="hidden"
                            id="edit-banner-image-upload"
                          />
                          <label
                            htmlFor="edit-banner-image-upload"
                            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
                          >
                            <Upload className="w-4 h-4 mr-2" />
                            Upload Image
                          </label>
                          <div className="flex-1">
                            <input
                              type="text"
                              value={bannerFormData.image}
                              onChange={(e) => setBannerFormData({...bannerFormData, image: e.target.value})}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue text-sm"
                              placeholder="Enter image URL"
                            />
                          </div>
                        </div>
                        {bannerFormData.image && (
                          <div className="mt-2">
                            <img src={bannerFormData.image} alt="Preview" className="w-32 h-20 object-cover rounded border" />
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                          <select
                            value={bannerFormData.type}
                            onChange={(e) => setBannerFormData({...bannerFormData, type: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
                          >
                            <option value="hero">Hero Banner</option>
                            <option value="promo">Promotional</option>
                            <option value="challenge">Challenge</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                          <select
                            value={bannerFormData.status}
                            onChange={(e) => setBannerFormData({...bannerFormData, status: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
                          >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
                          <input
                            type="number"
                            value={bannerFormData.order}
                            onChange={(e) => setBannerFormData({...bannerFormData, order: parseInt(e.target.value)})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-yamaha-blue focus:border-yamaha-blue"
                            min="1"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleEditBanner}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-yamaha-blue text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yamaha-blue sm:ml-3 sm:w-auto sm:text-sm"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Update Hero Slide
                </button>
                <button
                  type="button"
                  onClick={() => setShowBannerEditModal(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yamaha-blue sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        show={showBannerDeleteConfirm}
        onClose={() => setShowBannerDeleteConfirm(false)}
        onConfirm={handleDeleteConfirm}
        title="Konfirmasi Hapus Hero Slide"
        message="Apakah Anda yakin ingin menghapus hero slide ini? Tindakan ini tidak dapat dibatalkan."
        confirmText="Ya, Hapus"
        cancelText="Batal"
        type="warning"
      />
    </div>
  )
}

export default LandingContentManagement
