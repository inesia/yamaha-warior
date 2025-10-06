import { Outlet } from 'react-router-dom'
import PublicBottomNav from '../components/PublicBottomNav'
import WhatsAppChatWidget from '../components/WhatsAppChatWidget'

const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 md:bg-gradient-to-br md:from-blue-900 md:via-blue-800 md:to-blue-900 pb-20">
      {/* Desktop Background Pattern */}
      <div className="hidden md:block fixed inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
        {/* Geometric Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-32 h-32 border-4 border-white/10 rotate-45"></div>
          <div className="absolute top-40 right-32 w-24 h-24 border-4 border-white/10 rotate-12"></div>
          <div className="absolute bottom-32 left-32 w-40 h-40 border-4 border-white/10 rotate-45"></div>
          <div className="absolute bottom-20 right-20 w-28 h-28 border-4 border-white/10 rotate-12"></div>
          <div className="absolute top-1/2 left-1/4 w-20 h-20 border-4 border-white/10 rotate-45"></div>
          <div className="absolute top-1/3 right-1/4 w-36 h-36 border-4 border-white/10 rotate-12"></div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute inset-0 opacity-3">
          <div className="absolute top-1/4 left-1/3 w-16 h-16 bg-white/20 rounded-full blur-sm animate-pulse"></div>
          <div className="absolute top-3/4 right-1/3 w-12 h-12 bg-white/20 rounded-full blur-sm animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/6 w-8 h-8 bg-white/20 rounded-full blur-sm animate-pulse delay-2000"></div>
          <div className="absolute bottom-1/4 right-1/6 w-14 h-14 bg-white/20 rounded-full blur-sm animate-pulse delay-500"></div>
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent"></div>
        
        {/* Dark Overlay for Eye Comfort */}
        <div className="absolute inset-0 bg-black/10"></div>
        
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-3">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.2) 1px, transparent 0)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>
      </div>

      {/* Main Content */}
      <main className="w-full max-w-[425px] mx-auto min-h-screen relative z-10 md:shadow-2xl md:bg-white/95 md:backdrop-blur-sm md:border md:border-white/20">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <PublicBottomNav />
      
      {/* WhatsApp Chat Widget */}
      <WhatsAppChatWidget />
    </div>
  )
}

export default PublicLayout
