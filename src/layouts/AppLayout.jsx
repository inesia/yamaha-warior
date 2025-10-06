import { Outlet, useLocation } from 'react-router-dom'
import BottomNav from '../components/BottomNav'
import ChatWidget from '../components/ChatWidget'

const AppLayout = () => {
  const location = useLocation()
  
  // Hide bottom nav for specific pages and detail pages
  const hideBottomNav = [
    '/rewards', 
    '/gallery',
    '/challenges/',
    '/admin/',
    '/settings',
    '/history',
    '/notifications',
    '/chat'
  ].some(path => location.pathname.startsWith(path))
  
  return (
    <div className={`min-h-screen bg-gray-50 ${hideBottomNav ? 'pb-0' : 'pb-16'}`}>
      {/* Main Content */}
      <main className="w-full max-w-lg mx-auto min-h-screen">
        <Outlet />
      </main>

      {/* Bottom Navigation - Conditional */}
      {!hideBottomNav && <BottomNav />}
      
      {/* Chat Widget - Show on all pages except chat page */}
      {!location.pathname.startsWith('/chat') && <ChatWidget />}
    </div>
  )
}

export default AppLayout
