# Yamaha Warior

Campaign platform untuk pengguna motor matic Yamaha dengan konsep mobile-first app interface.

## Tech Stack

- **React 18.3** - UI Library
- **Vite 5.4** - Build Tool & Dev Server
- **Tailwind CSS 3.4** - Utility-first CSS Framework
- **React Router DOM 6.26** - Routing
- **Swiper 11** - Touch Slider
- **Framer Motion 11** - Animation Library
- **Lucide React** - Modern Icon Library
- **React Hook Form 7** - Form Management
- **Zustand 4** - State Management
- **@react-oauth/google** - Google One Tap Authentication

## Requirements

- Node.js >= 22.0.0
- npm atau yarn

## Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Features

### Public Pages (Before Login)
- 🏠 Landing page dengan hero banner swipe
- 🎯 Challenge section
- ℹ️ About Yamaha Warior
- 📢 Call to Action section

### Authentication
- 🔐 Google One Tap Login
- 🔒 Protected routes untuk authenticated users

### Dashboard (After Login)
- 📊 Participant dashboard
- 🎮 Challenge flow & submission
- 👤 User profile
- 🏆 Leaderboard
- 📜 Activity history
- 🔔 Notifications
- ⚙️ Settings

## Color Palette

- **Yamaha Blue** (#075EAF) - Primary color
- **Yamaha Red** (#F0141D) - Accent color
- **Yamaha Dark** (#1D1819) - Text & dark elements

## Project Structure

```
yamaha-warior/
├── src/
│   ├── components/       # Reusable components
│   ├── layouts/          # Layout components
│   ├── pages/            # Page components
│   ├── store/            # Zustand stores
│   ├── utils/            # Utility functions
│   ├── assets/           # Images, icons, etc
│   ├── App.jsx           # Main app component
│   └── main.jsx          # Entry point
├── public/               # Static assets
└── ...config files
```

## Development

Aplikasi ini didesain dengan mobile-first approach dengan bottom navigation seperti native app.
