import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useContentStore = create(
  persist(
    (set, get) => ({
      // Banner Management State
      banners: [
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
      ],

      // Announcement Management State
      announcements: [
        {
          id: 1,
          title: 'Maintenance System',
          content: 'Sistem akan melakukan maintenance pada tanggal 25 Januari 2025 pukul 02:00 - 04:00 WIB. Mohon maaf atas ketidaknyamanan ini.',
          type: 'maintenance',
          priority: 'high',
          status: 'active',
          startDate: '2025-01-20',
          endDate: '2025-01-25',
          createdAt: '2025-01-15',
          createdBy: 'Admin'
        },
        {
          id: 2,
          title: 'Challenge Baru Tersedia',
          content: 'Challenge #NMAXSMARTJOURNEY telah dibuka! Ikuti challenge ini untuk mendapatkan hadiah menarik.',
          type: 'info',
          priority: 'medium',
          status: 'active',
          startDate: '2025-01-18',
          endDate: '2025-02-18',
          createdAt: '2025-01-18',
          createdBy: 'Content Manager'
        },
        {
          id: 3,
          title: 'Update Fitur Baru',
          content: 'Fitur leaderboard real-time telah ditambahkan! Sekarang kamu bisa melihat peringkat secara langsung.',
          type: 'feature',
          priority: 'low',
          status: 'active',
          startDate: '2025-01-15',
          endDate: '2025-01-30',
          createdAt: '2025-01-15',
          createdBy: 'Admin'
        }
      ],

      // Landing Content State
      landingContent: {
        hero: {
          mainTitle: 'Yamaha Warior Program',
          mainSubtitle: 'Platform campaign eksklusif untuk rider Yamaha Indonesia',
          badgeText: 'Yamaha Warior Challenge',
          ctaText: 'Mulai Sekarang',
          ctaSubtext: 'Masuk dengan Google untuk memulai perjalanan warior kamu'
        },
        stats: [
          { id: 1, number: '10K+', label: 'Warior Aktif' },
          { id: 2, number: '50K+', label: 'Challenge Selesai' },
          { id: 3, number: '500+', label: 'Hadiah Dibagikan' }
        ],
        howItWorks: {
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
        },
        about: {
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
        },
        footer: {
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
        }
      },

      // Banner Management Actions
      addBanner: (banner) => {
        const newBanner = {
          ...banner,
          id: Date.now(),
          createdAt: new Date().toISOString().split('T')[0]
        }
        set((state) => ({
          banners: [...state.banners, newBanner]
        }))
      },

      updateBanner: (id, updatedBanner) => {
        set((state) => ({
          banners: state.banners.map(banner =>
            banner.id === id ? { ...banner, ...updatedBanner } : banner
          )
        }))
      },

      deleteBanner: (id) => {
        set((state) => ({
          banners: state.banners.filter(banner => banner.id !== id)
        }))
      },

      getBannerById: (id) => {
        return get().banners.find(banner => banner.id === id)
      },

      getActiveBanners: () => {
        return get().banners
          .filter(banner => banner.status === 'active')
          .sort((a, b) => a.order - b.order)
      },

      // Announcement Management Actions
      addAnnouncement: (announcement) => {
        const newAnnouncement = {
          ...announcement,
          id: Date.now(),
          createdAt: new Date().toISOString().split('T')[0],
          createdBy: 'Admin' // In real app, get from auth context
        }
        set((state) => ({
          announcements: [...state.announcements, newAnnouncement]
        }))
      },

      updateAnnouncement: (id, updatedAnnouncement) => {
        set((state) => ({
          announcements: state.announcements.map(announcement =>
            announcement.id === id ? { ...announcement, ...updatedAnnouncement } : announcement
          )
        }))
      },

      deleteAnnouncement: (id) => {
        set((state) => ({
          announcements: state.announcements.filter(announcement => announcement.id !== id)
        }))
      },

      getAnnouncementById: (id) => {
        return get().announcements.find(announcement => announcement.id === id)
      },

      getActiveAnnouncements: () => {
        const now = new Date()
        return get().announcements.filter(announcement => {
          const startDate = new Date(announcement.startDate)
          const endDate = new Date(announcement.endDate)
          return announcement.status === 'active' && now >= startDate && now <= endDate
        }).sort((a, b) => {
          // Sort by priority: high > medium > low
          const priorityOrder = { high: 3, medium: 2, low: 1 }
          return priorityOrder[b.priority] - priorityOrder[a.priority]
        })
      },

      // Landing Content Management Actions
      updateLandingContent: (section, content) => {
        set((state) => ({
          landingContent: {
            ...state.landingContent,
            [section]: content
          }
        }))
      },

      updateHeroContent: (content) => {
        set((state) => ({
          landingContent: {
            ...state.landingContent,
            hero: { ...state.landingContent.hero, ...content }
          }
        }))
      },

      updateStatsContent: (stats) => {
        set((state) => ({
          landingContent: {
            ...state.landingContent,
            stats: stats
          }
        }))
      },

      updateHowItWorksContent: (content) => {
        set((state) => ({
          landingContent: {
            ...state.landingContent,
            howItWorks: { ...state.landingContent.howItWorks, ...content }
          }
        }))
      },

      updateAboutContent: (content) => {
        set((state) => ({
          landingContent: {
            ...state.landingContent,
            about: { ...state.landingContent.about, ...content }
          }
        }))
      },

      updateFooterContent: (content) => {
        set((state) => ({
          landingContent: {
            ...state.landingContent,
            footer: { ...state.landingContent.footer, ...content }
          }
        }))
      },

      // Utility Actions
      resetContent: () => {
        set({
          banners: [],
          announcements: [],
          landingContent: {
            hero: {
              mainTitle: '',
              mainSubtitle: '',
              badgeText: '',
              ctaText: '',
              ctaSubtext: ''
            },
            stats: [],
            howItWorks: {
              badgeText: '',
              title: '',
              subtitle: '',
              steps: []
            },
            about: {
              badgeText: '',
              title: '',
              description: '',
              subDescription: '',
              benefits: []
            },
            footer: {
              brandName: '',
              description: '',
              quickLinks: [],
              legalLinks: [],
              socialLinks: [],
              copyright: ''
            }
          }
        })
      },

      // Sync with backend (placeholder for future implementation)
      syncWithBackend: async () => {
        try {
          // In real implementation, sync with backend API
          console.log('Syncing content with backend...')
          return true
        } catch (error) {
          console.error('Failed to sync with backend:', error)
          return false
        }
      }
    }),
    {
      name: 'content-store',
      partialize: (state) => ({
        banners: state.banners,
        announcements: state.announcements,
        landingContent: state.landingContent
      })
    }
  )
)

export default useContentStore
