import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useAuthStore } from './store/authStore'
import useAdminStore from './store/adminStore'

// Layouts
import PublicLayout from './layouts/PublicLayout'
import AppLayout from './layouts/AppLayout'
import AdminLayout from './layouts/AdminLayout'

// Public Pages
import Landing from './pages/public/Landing'
import PublicMembers from './pages/public/Members'
import PublicChallenges from './pages/public/Challenges'
import PublicLeaderboard from './pages/public/Leaderboard'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import CompleteProfile from './pages/auth/CompleteProfile'
import TermsConditions from './pages/legal/TermsConditions'
import PrivacyPolicy from './pages/legal/PrivacyPolicy'

// Protected Pages
import Dashboard from './pages/dashboard/Dashboard'
import Challenges from './pages/challenges/Challenges'
import ChallengeDetail from './pages/challenges/ChallengeDetail'
import ChallengeSubmit from './pages/challenges/ChallengeSubmit'
import Leaderboard from './pages/leaderboard/Leaderboard'
import Profile from './pages/profile/Profile'
import History from './pages/history/History'
import Notifications from './pages/notifications/Notifications'
import Settings from './pages/settings/Settings'
import Rewards from './pages/rewards/Rewards'
import Gallery from './pages/gallery/Gallery'
import LiveChat from './pages/chat/LiveChat'
import GoogleOneTapDemo from './pages/demo/GoogleOneTapDemo'

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin'
import Members from './pages/admin/Members'
import MemberDetail from './pages/admin/MemberDetail'
import MemberForm from './pages/admin/MemberForm'
import ActivityMembers from './pages/admin/ActivityMembers'
import AdminTest from './pages/admin/AdminTest'
import AdminChallenges from './pages/admin/Challenges'
import ChallengeForm from './pages/admin/ChallengeForm'
import PostingChallenge from './pages/admin/PostingChallenge'
import LeaderboardChallenge from './pages/admin/LeaderboardChallenge'
import WinnerPeriode from './pages/admin/WinnerPeriode'
import ReportsAnalytics from './pages/admin/ReportsAnalytics'
import AdminManagement from './pages/admin/AdminManagement'

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }
  
  return children
}

// Profile Completion Gate (redirect to /complete-profile if profile not completed)
const ProfileGate = ({ children }) => {
  const user = useAuthStore((state) => state.user)
  const location = useLocation()
  
  if (user && user.profileCompleted === false && location.pathname !== '/complete-profile') {
    return <Navigate to="/complete-profile" replace />
  }
  
  return children
}

// Public Route Wrapper (redirect if authenticated)
const PublicRoute = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }
  
  return children
}

// Admin Route Wrapper
const AdminRoute = ({ children }) => {
  const isAdminAuthenticated = useAdminStore((state) => state.isAdminAuthenticated)
  
  if (!isAdminAuthenticated) {
    return <Navigate to="/admin/login" replace />
  }
  
  return children
}

// Admin Public Route (redirect if admin authenticated)
const AdminPublicRoute = ({ children }) => {
  const isAdminAuthenticated = useAdminStore((state) => state.isAdminAuthenticated)
  
  if (isAdminAuthenticated) {
    return <Navigate to="/admin/members" replace />
  }
  
  return children
}

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/public/challenges" element={<PublicChallenges />} />
        <Route path="/public/leaderboard" element={<PublicLeaderboard />} />
        <Route path="/members" element={<PublicMembers />} />
      </Route>

      {/* Auth Routes */}
      <Route path="/login" element={
        <PublicRoute>
          <Login />
        </PublicRoute>
      } />
      <Route path="/register" element={
        <PublicRoute>
          <Register />
        </PublicRoute>
      } />
      <Route path="/complete-profile" element={
        <ProtectedRoute>
          <CompleteProfile />
        </ProtectedRoute>
      } />
      <Route path="/terms-conditions" element={<TermsConditions />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />

      {/* Protected Routes with Bottom Navigation */}
      <Route element={
        <ProtectedRoute>
          <ProfileGate>
            <AppLayout />
          </ProfileGate>
        </ProtectedRoute>
      }>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/challenges" element={<Challenges />} />
        <Route path="/challenges/:id" element={<ChallengeDetail />} />
        <Route path="/challenges/:id/submit" element={<ChallengeSubmit />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/history" element={<History />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/rewards" element={<Rewards />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/chat" element={<LiveChat />} />
        <Route path="/demo/google-onetap" element={<GoogleOneTapDemo />} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin/login" element={
        <AdminPublicRoute>
          <AdminLogin />
        </AdminPublicRoute>
      } />

      <Route element={
        <AdminRoute>
          <AdminLayout />
        </AdminRoute>
      }>
        <Route path="/admin/test" element={<AdminTest />} />
        <Route path="/admin/members" element={<Members />} />
        <Route path="/admin/members/:id" element={<MemberDetail />} />
        <Route path="/admin/members/new" element={<MemberForm />} />
        <Route path="/admin/members/:id/edit" element={<MemberForm />} />
        <Route path="/admin/activity-members" element={<ActivityMembers />} />
        <Route path="/admin/challenges" element={<AdminChallenges />} />
        <Route path="/admin/challenges/new" element={<ChallengeForm />} />
        <Route path="/admin/posting-challenge" element={<PostingChallenge />} />
        <Route path="/admin/leaderboard-challenge" element={<LeaderboardChallenge />} />
        <Route path="/admin/winner-periode" element={<WinnerPeriode />} />
        <Route path="/admin/reports-analytics" element={<ReportsAnalytics />} />
        <Route path="/admin/admin-management" element={<AdminManagement />} />
      </Route>

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
