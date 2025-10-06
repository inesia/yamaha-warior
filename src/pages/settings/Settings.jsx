import { useState } from 'react'
import { motion } from 'framer-motion'
import Header from '../../components/Header'
import {
  Bell,
  Lock,
  Globe,
  HelpCircle,
  FileText,
  Shield,
  ChevronRight,
  Instagram,
  Facebook,
  Twitter,
} from 'lucide-react'

const Settings = () => {
  const [notifications, setNotifications] = useState({
    email: false,
    challenges: true,
    leaderboard: true,
  })


  const settingSections = [
    {
      title: 'Notifications',
      items: [
        {
          icon: Bell,
          label: 'Email Notifications',
          type: 'toggle',
          value: notifications.email,
          onChange: (val) => setNotifications({ ...notifications, email: val }),
        },
        {
          icon: Bell,
          label: 'Challenge Updates',
          type: 'toggle',
          value: notifications.challenges,
          onChange: (val) => setNotifications({ ...notifications, challenges: val }),
        },
        {
          icon: Bell,
          label: 'Leaderboard Updates',
          type: 'toggle',
          value: notifications.leaderboard,
          onChange: (val) => setNotifications({ ...notifications, leaderboard: val }),
        },
      ],
    },
    {
      title: 'Connected Accounts',
      items: [
        {
          icon: Instagram,
          label: 'Instagram',
          type: 'link',
          value: 'Connected',
          color: 'text-pink-500',
        },
        {
          icon: Facebook,
          label: 'Facebook',
          type: 'link',
          value: 'Not Connected',
          color: 'text-blue-600',
        },
        {
          icon: Twitter,
          label: 'Twitter',
          type: 'link',
          value: 'Not Connected',
          color: 'text-blue-400',
        },
      ],
    },
    {
      title: 'Privacy & Security',
      items: [
        {
          icon: Lock,
          label: 'Privacy Settings',
          type: 'link',
        },
        {
          icon: Shield,
          label: 'Account Security',
          type: 'link',
        },
      ],
    },
    {
      title: 'About',
      items: [
        {
          icon: HelpCircle,
          label: 'Help & Support',
          type: 'link',
        },
        {
          icon: FileText,
          label: 'Terms & Conditions',
          type: 'link',
        },
        {
          icon: FileText,
          label: 'Privacy Policy',
          type: 'link',
        },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Pengaturan" showBack={true} />

      <div className="max-w-lg mx-auto px-6 py-6">
        {/* App Version */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-yamaha text-white p-6 mb-6 text-center clip-corner"
        >
          <h2 className="text-2xl font-black mb-2">YAMAHA WARIOR</h2>
          <p className="text-white/80 text-sm">Version 1.0.0</p>
        </motion.div>

        {/* Settings Sections */}
        <div className="space-y-6">
          {settingSections.map((section, sectionIndex) => (
            <motion.div
              key={sectionIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: sectionIndex * 0.1 }}
            >
              <h3 className="text-sm font-semibold text-gray-500 mb-3 px-2">{section.title}</h3>
              <div className="bg-white overflow-hidden shadow-sm clip-corner">
                {section.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="flex items-center justify-between p-4 border-b border-gray-100 last:border-0"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className={`${item.color || 'text-yamaha-dark'}`}>
                        <item.icon size={20} />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-yamaha-dark">{item.label}</p>
                        {item.description && (
                          <p className="text-xs text-gray-500">{item.description}</p>
                        )}
                      </div>
                    </div>

                    {item.type === 'toggle' ? (
                      <button
                        onClick={() => item.onChange(!item.value)}
                        className={`relative w-12 h-6 rounded-full transition-colors ${
                          item.value ? 'bg-yamaha-blue' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                            item.value ? 'translate-x-6' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    ) : (
                      <div className="flex items-center gap-2">
                        {item.value && (
                          <span className="text-sm text-gray-500">{item.value}</span>
                        )}
                        <ChevronRight size={20} className="text-gray-400" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8 mb-4"
        >
          <p className="text-xs text-gray-500 mb-2">
            © 2025 Yamaha Motor Indonesia
          </p>
          <p className="text-xs text-gray-400">
            Made with ❤️ for Yamaha Wariors
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default Settings
