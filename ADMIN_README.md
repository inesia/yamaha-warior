# 🏍️ Yamaha Warior - Admin Dashboard

## 📋 Overview

Admin dashboard untuk mengelola data Yamaha Warior campaign dengan fitur CMS lengkap. Dashboard ini memungkinkan admin untuk mengelola members, challenges, submissions, dan analytics.

## 🎯 Features

### **1. Member Management**
- **Data**: email, nama, no telp, alamat, merk yamaha, info ikut challenge
- **Bentuk**: tabel dengan search & filter, form edit, halaman detail
- **Fitur**: 
  - View all members dengan stats
  - Search & filter members
  - Member detail page dengan challenge history
  - Bulk operations (delete, export)

### **2. Challenge Management**
- **Data**: nama challenge, periode, info challenge, syarat, hadiah
- **Bentuk**: card view dan table view, form create/edit
- **Fitur**:
  - Create new challenges
  - Edit existing challenges
  - View challenge stats (participants, submissions)
  - Toggle between card and table view

### **3. Posting Challenge Review**
- **Data**: nama peserta, nama challenge, url postingan, screenshot, status
- **Bentuk**: tab system dengan card view untuk setiap challenge
- **Fitur**:
  - Tab navigation per challenge
  - Review submissions dengan screenshot
  - Bulk approve/reject
  - Status tracking (pending, approved, rejected)

### **4. Leaderboard Challenge**
- **Data**: list data challenge dengan leaderboard peserta
- **Bentuk**: table view dengan ranking system
- **Fitur**:
  - View leaderboard per challenge
  - Ranking dengan points
  - Challenge statistics
  - Export functionality

### **5. Winner Periode**
- **Data**: info pemenang per challenge dan periode
- **Bentuk**: detail view dengan podium display
- **Fitur**:
  - Winner details per challenge
  - Podium display (1st, 2nd, 3rd)
  - Challenge statistics
  - Prize information

## 🔐 Authentication

### **Admin Roles**
- **Super Admin**: Full access semua fitur
- **Moderator**: Hanya bisa review submissions, view users (read-only)
- **Content Manager**: Manage challenges, view submissions (read-only)

### **Login Credentials**
```
Super Admin: admin@yamaha.com / admin123
Moderator: moderator@yamaha.com / mod123
Content Manager: content@yamaha.com / content123
```

## 🎨 Design System

### **Color Palette**
- **Primary Blue** (#075EAF) - Buttons, links, primary actions
- **Accent Red** (#F0141D) - Highlights, badges, important info
- **Dark** (#1D1819) - Text, headings

### **UI Components**
- **Cards**: Rounded corners dengan shadow
- **Tables**: Clean dengan hover effects
- **Forms**: Validation dengan error states
- **Badges**: Status indicators dengan colors
- **Icons**: Lucide React icons

## 🚀 Usage

### **Access Admin Dashboard**
1. Navigate to `/admin/login`
2. Login dengan credentials di atas
3. Dashboard akan redirect ke `/admin/members`

### **Navigation**
- **Member**: Manage users dan view details
- **Challenge**: Create dan manage challenges
- **Posting Challenge**: Review submissions
- **Leaderboard Challenge**: View rankings
- **Winner Periode**: View winners

### **Key Features**
- **Responsive Design**: Works di desktop dan mobile
- **Role-based Access**: Different permissions per role
- **Search & Filter**: Find data quickly
- **Bulk Operations**: Handle multiple items at once
- **Export Data**: Download data untuk analysis

## 📊 Data Structure

### **Mock Data Included**
- **Members**: 3 sample members dengan complete data
- **Challenges**: 3 active challenges
- **Submissions**: Sample submissions dengan different status
- **Leaderboard**: Ranking data per challenge
- **Winners**: Winner data dengan prizes

### **Data Fields**
```javascript
// Member
{
  id, email, name, phone, address, yamahaBrand,
  challenges: [], totalPoints, joinedAt, lastActive
}

// Challenge
{
  id, name, periode, description, requirements,
  reward, status, participants, submissions, createdAt
}

// Submission
{
  id, participantName, challengeName, challengeId,
  url, screenshot, status, submittedAt, reviewedAt, reviewer, notes
}
```

## 🛠️ Technical Stack

- **Framework**: React 18.3 + Vite 5.4
- **Styling**: Tailwind CSS 3.4
- **Routing**: React Router DOM 6.26
- **State**: Zustand 4.5
- **Icons**: Lucide React
- **Animation**: Framer Motion 11

## 📁 File Structure

```
src/
├── layouts/
│   └── AdminLayout.jsx          # Admin layout dengan sidebar
├── pages/admin/
│   ├── AdminLogin.jsx          # Admin login page
│   ├── Members.jsx             # Member management
│   ├── MemberDetail.jsx        # Member detail page
│   ├── Challenges.jsx          # Challenge management
│   ├── ChallengeForm.jsx       # Create/edit challenge
│   ├── PostingChallenge.jsx   # Review submissions
│   ├── LeaderboardChallenge.jsx # View leaderboard
│   └── WinnerPeriode.jsx       # View winners
├── store/
│   └── adminStore.js           # Admin state management
└── data/
    └── mockData.js             # Mock data untuk development
```

## 🔧 Development

### **Adding New Features**
1. Create new page di `src/pages/admin/`
2. Add route di `src/App.jsx`
3. Update sidebar navigation di `src/layouts/AdminLayout.jsx`
4. Add mock data di `src/data/mockData.js`

### **Styling Guidelines**
- Use Tailwind classes
- Follow color palette (yamaha-blue, yamaha-red, yamaha-dark)
- Use consistent spacing (p-4, p-6, space-y-4, etc.)
- Add hover effects untuk interactive elements

### **State Management**
- Use Zustand untuk global state
- Keep local state dengan useState untuk component-specific data
- Follow naming convention: `useAdminStore`, `useAuthStore`

## 🚀 Next Steps

### **Backend Integration**
- Replace mock data dengan real API calls
- Add error handling dan loading states
- Implement real authentication
- Add data validation

### **Additional Features**
- **Analytics Dashboard**: Charts dan metrics
- **Notification System**: Real-time updates
- **File Upload**: Handle image uploads
- **Email System**: Send notifications
- **Audit Log**: Track admin actions

### **Production Ready**
- Add error boundaries
- Implement proper logging
- Add security measures
- Performance optimization
- Testing coverage

---

**Built with ❤️ for Yamaha Warior Admin Dashboard**
