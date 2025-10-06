# 🏍️ Yamaha Warior - Quick Start Guide

## 📋 Ringkasan Project

Mobile-first web application dengan konsep native app untuk campaign Yamaha Motor Indonesia. User bisa mengikuti challenges dengan upload konten social media dan mendapat rewards.

## 🎨 Features yang Sudah Diimplementasi

### Public Pages (Sebelum Login)
- ✅ **Landing Page** - Hero banner swiper portrait, section challenge, about, CTA
- ✅ **Login Page** - Google One Tap authentication

### Protected Pages (Setelah Login)  
- ✅ **Dashboard** - Stats, active challenges, community activity
- ✅ **Challenges** - List semua challenges dengan filter
- ✅ **Challenge Detail** - Detail lengkap challenge dengan requirements
- ✅ **Challenge Submit** - Form upload screenshot dengan validation
- ✅ **Leaderboard** - Top wariors dengan podium animation
- ✅ **Profile** - User info, stats, achievements
- ✅ **History** - Activity timeline
- ✅ **Notifications** - Update & alerts
- ✅ **Settings** - Preferences & account settings

### Komponen & Layout
- ✅ **Bottom Navigation** - App-style navigation di bawah
- ✅ **Header Component** - Reusable header dengan back button
- ✅ **Protected Routes** - Route guard untuk authenticated pages
- ✅ **State Management** - Zustand untuk auth & global state

## 🚀 Cara Menjalankan

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Google OAuth (PENTING!)

Sebelum run aplikasi, Anda harus setup Google OAuth:

1. Buka https://console.cloud.google.com/
2. Buat project baru
3. Enable "Google+ API"
4. Buat OAuth 2.0 Client ID (Web application)
5. Tambahkan authorized origin: `http://localhost:3000`
6. Copy Client ID yang didapat

### 3. Edit File .env

Buka file `.env` dan ganti dengan Client ID Anda:

```env
VITE_GOOGLE_CLIENT_ID=your-client-id-here.apps.googleusercontent.com
```

### 4. Run Development Server

```bash
npm run dev
```

Buka browser: http://localhost:3000

## 🎯 User Flow

1. **Landing Page** → User lihat hero, challenges, about
2. **Login** → Klik "Get Started" → Google One Tap
3. **Dashboard** → Setelah login, lihat stats & active challenges
4. **Challenge Flow**:
   - Browse challenges di tab Challenges
   - Klik challenge → Lihat detail
   - Klik "Join & Submit" → Upload screenshot
   - Submit → Tunggu review
5. **Leaderboard** → Lihat ranking
6. **Profile** → Manage account & achievements

## 📱 Halaman Tambahan yang Disarankan

Saya sudah implementasi halaman-halaman ini:

1. ✅ **History** - Timeline aktivitas user
2. ✅ **Notifications** - Push notifications & updates
3. ✅ **Settings** - App preferences
4. ✅ **Profile** - User profile dengan achievements

Halaman tambahan yang bisa dikembangkan:

- **Rewards Store** - Redeem points untuk hadiah
- **Community Feed** - Social feed dari semua wariors
- **Tutorial/Onboarding** - First-time user guide
- **Help/FAQ** - Support center
- **Referral** - Invite friends program

## 🎨 Design System

### Color Palette
- **Primary Blue** (#075EAF) - Buttons, links, primary actions
- **Accent Red** (#F0141D) - Highlights, badges, important info
- **Dark** (#1D1819) - Text, headings

### Typography
- Font: Inter (Google Fonts)
- Heading: Font weight 800-900 (Black)
- Body: Font weight 400-500

### Components Style
- Rounded corners: 12-24px (xl, 2xl)
- Shadow: Soft shadows untuk depth
- Animation: Framer Motion untuk smooth transitions
- Icons: Lucide React (24px default)

## 🛠️ Tech Stack

```json
{
  "framework": "React 18.3 + Vite 5.4",
  "styling": "Tailwind CSS 3.4",
  "routing": "React Router DOM 6.26",
  "state": "Zustand 4.5",
  "animation": "Framer Motion 11",
  "forms": "React Hook Form 7",
  "slider": "Swiper 11",
  "icons": "Lucide React",
  "auth": "@react-oauth/google"
}
```

## 📂 Struktur Folder

```
src/
├── components/       # Reusable UI components
│   ├── BottomNav.jsx
│   └── Header.jsx
├── layouts/         # Page layouts
│   ├── AppLayout.jsx      (with bottom nav)
│   └── PublicLayout.jsx   (no nav)
├── pages/           # All pages
│   ├── public/Landing.jsx
│   ├── auth/Login.jsx
│   ├── dashboard/Dashboard.jsx
│   ├── challenges/*.jsx
│   ├── leaderboard/Leaderboard.jsx
│   ├── profile/Profile.jsx
│   ├── history/History.jsx
│   ├── notifications/Notifications.jsx
│   └── settings/Settings.jsx
├── store/
│   └── authStore.js       # Zustand state
├── App.jsx          # Routes & route guards
└── main.jsx         # Entry point
```

## 🔧 Next Steps (Backend Integration)

Untuk production, Anda perlu:

1. **Backend API**
   - User authentication & management
   - Challenge CRUD operations
   - Submission review system
   - Points & leaderboard calculation
   - File upload to cloud storage (S3/Cloudinary)

2. **Database Schema**
   - Users table
   - Challenges table
   - Submissions table
   - Points history table
   - Achievements table

3. **Social Media Integration**
   - Instagram API untuk verify posts
   - Facebook API
   - Twitter API

4. **Admin Dashboard**
   - Review submissions
   - Manage challenges
   - User management
   - Analytics

## 🐛 Known Issues / Todo

- [ ] Images pakai Unsplash placeholder, ganti dengan images asli
- [ ] Mock data di semua pages, perlu connect ke real API
- [ ] File upload belum connect ke server
- [ ] Notifications belum real-time (perlu WebSocket/Push)
- [ ] Dark mode belum fully implemented
- [ ] PWA features (service worker, offline mode)

## 📱 Mobile Testing

Test di berbagai devices:
- Chrome DevTools (Responsive mode)
- iPhone SE, 12, 13 Pro
- Samsung Galaxy S21, S22
- Tablet iPad

## 🚢 Deployment

### Vercel (Recommended)
```bash
# Push ke GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo>
git push -u origin main

# Import di Vercel dashboard
# Set environment variables
# Deploy!
```

### Build Manual
```bash
npm run build
# Upload folder dist/ ke hosting
```

## 📞 Support

Jika ada pertanyaan atau butuh bantuan:
- Check SETUP.md untuk setup details
- Review README.md untuk overview
- Check kode comments untuk penjelasan logic

---

**Built with ❤️ for Yamaha Warior Campaign**
