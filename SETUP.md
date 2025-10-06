# Setup Guide - Yamaha Warior

## Prerequisites

- Node.js >= 22.0.0
- npm atau yarn package manager
- Google Cloud Console account (untuk Google OAuth)

## Installation Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Google OAuth

1. Buka [Google Cloud Console](https://console.cloud.google.com/)
2. Buat project baru atau pilih existing project
3. Enable **Google+ API**
4. Buat **OAuth 2.0 Client ID** credentials:
   - Application type: Web application
   - Authorized JavaScript origins: `http://localhost:3000`
   - Authorized redirect URIs: `http://localhost:3000`
5. Copy **Client ID** yang didapat

### 3. Configure Environment Variables

1. Buka file `.env` di root directory
2. Ganti `YOUR_GOOGLE_CLIENT_ID_HERE` dengan Client ID yang didapat dari step 2:
   ```
   VITE_GOOGLE_CLIENT_ID=your-actual-client-id-here.apps.googleusercontent.com
   ```

### 4. Run Development Server

```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:3000`

## Build for Production

```bash
npm run build
```

Output akan ada di folder `dist/`

## Preview Production Build

```bash
npm run preview
```

## Project Structure

```
yamaha-warior/
├── src/
│   ├── components/          # Reusable components
│   │   ├── BottomNav.jsx   # Bottom navigation
│   │   └── Header.jsx      # Page header
│   ├── layouts/            # Layout wrappers
│   │   ├── AppLayout.jsx   # Authenticated layout
│   │   └── PublicLayout.jsx # Public layout
│   ├── pages/              # Page components
│   │   ├── public/         # Public pages
│   │   │   └── Landing.jsx
│   │   ├── auth/           # Auth pages
│   │   │   └── Login.jsx
│   │   ├── dashboard/      # Dashboard
│   │   ├── challenges/     # Challenge pages
│   │   ├── leaderboard/    # Leaderboard
│   │   ├── profile/        # User profile
│   │   ├── history/        # Activity history
│   │   ├── notifications/  # Notifications
│   │   └── settings/       # Settings
│   ├── store/              # State management
│   │   └── authStore.js    # Auth state (Zustand)
│   ├── App.jsx             # Main app + routing
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
├── public/                 # Static assets
├── index.html             # HTML template
├── package.json           # Dependencies
├── vite.config.js         # Vite configuration
├── tailwind.config.js     # Tailwind configuration
└── .env                   # Environment variables
```

## Features Checklist

### ✅ Completed Features

- [x] Landing page dengan hero swiper, challenge section, about, CTA
- [x] Google One Tap Authentication
- [x] Dashboard dengan stats dan active challenges
- [x] Challenges list dengan filter
- [x] Challenge detail page
- [x] Challenge submission flow dengan file upload
- [x] Leaderboard dengan ranking system
- [x] User profile dengan achievements
- [x] Activity history timeline
- [x] Notifications center
- [x] Settings page
- [x] Bottom navigation (app-like)
- [x] Responsive mobile-first design
- [x] Smooth animations dengan Framer Motion

### 🚧 To Be Implemented (Backend Integration)

- [ ] Connect to real backend API
- [ ] Actual file upload to server/cloud storage
- [ ] Real-time leaderboard updates
- [ ] Push notifications
- [ ] Social media API integration (Instagram, Facebook)
- [ ] Admin dashboard untuk review submissions
- [ ] Analytics tracking

## Tech Stack Details

- **React 18.3** - UI Library dengan Hooks
- **Vite 5.4** - Lightning fast build tool
- **Tailwind CSS 3.4** - Utility-first CSS
- **React Router DOM 6.26** - Client-side routing
- **Zustand 4.5** - Lightweight state management
- **Framer Motion 11** - Production-ready animations
- **Swiper 11** - Modern touch slider
- **Lucide React** - Beautiful icon library
- **React Hook Form 7** - Performant form handling
- **@react-oauth/google** - Google authentication

## Customization

### Colors

Edit warna di `tailwind.config.js`:

```js
colors: {
  'yamaha-blue': '#075EAF',
  'yamaha-red': '#F0141D',
  'yamaha-dark': '#1D1819',
}
```

### Images

Ganti placeholder images di setiap page dengan images asli dari:
- Hero banners: Motor Yamaha lifestyle photos
- Challenge thumbnails: Challenge-specific images
- User avatars: Actual user profile pictures

## Deployment

### Vercel (Recommended)

1. Push code ke GitHub repository
2. Import project di [Vercel](https://vercel.com)
3. Set environment variables di Vercel dashboard
4. Deploy!

### Netlify

1. Build project: `npm run build`
2. Drag & drop folder `dist/` ke [Netlify Drop](https://app.netlify.com/drop)

## Troubleshooting

### Google Login tidak bekerja

- Pastikan `VITE_GOOGLE_CLIENT_ID` sudah diset dengan benar
- Check console untuk error messages
- Pastikan origin URL match dengan yang di Google Console

### Build error

- Delete `node_modules` dan `package-lock.json`
- Run `npm install` lagi
- Check Node.js version >= 22.0.0

### Images tidak muncul

- Check internet connection (images pakai Unsplash placeholder)
- Ganti dengan local images di production

## Support

Untuk pertanyaan dan support, hubungi development team.

---

**Happy Coding! 🏍️**
