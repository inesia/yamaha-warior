# Content Management System - Yamaha Warior Admin Panel

## Overview
Sistem Content Management telah ditambahkan ke admin panel Yamaha Warior untuk memungkinkan admin mengelola konten website secara dinamis tanpa perlu mengubah kode.

## Fitur yang Tersedia

### 1. Banner Management (dalam Landing Content Management)
**Akses:** Super Admin, Content Manager

**Fitur:**
- ✅ Kelola hero slides untuk landing page
- ✅ Upload dan edit gambar banner
- ✅ Atur urutan tampilan banner
- ✅ Status aktif/nonaktif banner
- ✅ Kategori banner (Hero, Promotional, Challenge)
- ✅ Preview banner sebelum publish

**Data yang Dikelola:**
- Title dan subtitle banner
- Gambar banner
- CTA (Call-to-Action) text
- Urutan tampilan
- Status aktif/nonaktif

**Catatan:** Banner Management telah digabungkan ke dalam Landing Content Management sebagai tab terpisah untuk menyederhanakan navigasi admin.

### 2. Announcement Management (`/admin/announcement-management`)
**Akses:** Super Admin, Content Manager

**Fitur:**
- ✅ Buat pengumuman untuk user
- ✅ Atur prioritas pengumuman (High, Medium, Low)
- ✅ Jadwalkan pengumuman (start date - end date)
- ✅ Kategori pengumuman (Maintenance, Info, Feature, Warning)
- ✅ Status aktif/nonaktif
- ✅ Tracking pembuat pengumuman

**Data yang Dikelola:**
- Judul dan konten pengumuman
- Tipe pengumuman
- Prioritas
- Periode aktif
- Status

### 3. Landing Content Management (`/admin/landing-content-management`)
**Akses:** Super Admin, Content Manager

**Fitur:**
- ✅ **Banner Management:** Kelola hero slides dan banner
- ✅ Edit konten Hero Section
- ✅ Kelola Stats Section (angka dan label)
- ✅ Edit How It Works section
- ✅ Kelola About Section
- ✅ Edit Footer content
- ✅ Preview perubahan secara real-time

**Sections yang Dapat Diedit:**
- **Banner Management:** Hero slides, promotional banners, challenge banners
- **Hero Section:** Title, subtitle, badge text, CTA
- **Stats Section:** Angka dan label statistik
- **How It Works:** Steps dengan icon dan deskripsi
- **About Section:** Deskripsi program dan benefits
- **Footer:** Brand name, links, copyright

## Struktur Data

### Banner Data Structure
```javascript
{
  id: number,
  title: string,
  subtitle: string,
  image: string (URL),
  cta: string,
  type: 'hero' | 'promo' | 'challenge',
  status: 'active' | 'inactive',
  order: number,
  createdAt: string (date)
}
```

### Announcement Data Structure
```javascript
{
  id: number,
  title: string,
  content: string,
  type: 'maintenance' | 'info' | 'feature' | 'warning',
  priority: 'high' | 'medium' | 'low',
  status: 'active' | 'inactive',
  startDate: string (date),
  endDate: string (date),
  createdAt: string (date),
  createdBy: string
}
```

### Landing Content Structure
```javascript
{
  hero: {
    mainTitle: string,
    mainSubtitle: string,
    badgeText: string,
    ctaText: string,
    ctaSubtext: string
  },
  stats: [
    { id: number, number: string, label: string }
  ],
  howItWorks: {
    badgeText: string,
    title: string,
    subtitle: string,
    steps: [
      { id: number, title: string, description: string, icon: string }
    ]
  },
  about: {
    badgeText: string,
    title: string,
    description: string,
    subDescription: string,
    benefits: [
      { id: number, title: string, description: string, icon: string }
    ]
  },
  footer: {
    brandName: string,
    description: string,
    quickLinks: [{ name: string, path: string }],
    legalLinks: [{ name: string, path: string }],
    socialLinks: [{ name: string, url: string, icon: string }],
    copyright: string
  }
}
```

## State Management

### Content Store (`src/store/contentStore.js`)
Menggunakan Zustand dengan persist middleware untuk menyimpan data content management.

**Actions yang Tersedia:**
- `addBanner(banner)` - Tambah banner baru
- `updateBanner(id, updatedBanner)` - Update banner
- `deleteBanner(id)` - Hapus banner
- `getActiveBanners()` - Ambil banner aktif
- `addAnnouncement(announcement)` - Tambah pengumuman
- `updateAnnouncement(id, updatedAnnouncement)` - Update pengumuman
- `deleteAnnouncement(id)` - Hapus pengumuman
- `getActiveAnnouncements()` - Ambil pengumuman aktif
- `updateLandingContent(section, content)` - Update konten landing page
- `updateHeroContent(content)` - Update hero section
- `updateStatsContent(stats)` - Update stats section
- `updateHowItWorksContent(content)` - Update how it works section
- `updateAboutContent(content)` - Update about section
- `updateFooterContent(content)` - Update footer section

## Routing

### Admin Routes
```javascript
/admin/announcement-management - Announcement Management  
/admin/landing-content-management - Landing Content Management (termasuk Banner Management)
```

### Menu Navigation
Menu content management ditambahkan ke AdminLayout dengan role-based access:
- **Announcement Management:** Super Admin, Content Manager
- **Landing Content Management:** Super Admin, Content Manager (termasuk Banner Management)

## Integrasi dengan Frontend

### Menggunakan Content Store di Komponen
```javascript
import useContentStore from '../store/contentStore'

const MyComponent = () => {
  const { 
    banners, 
    announcements, 
    landingContent,
    getActiveBanners,
    getActiveAnnouncements 
  } = useContentStore()

  const activeBanners = getActiveBanners()
  const activeAnnouncements = getActiveAnnouncements()

  return (
    // Render content
  )
}
```

### Update Landing Page untuk Menggunakan Dynamic Content
Landing page dapat diupdate untuk menggunakan data dari content store:

```javascript
// Di src/pages/public/Landing.jsx
import useContentStore from '../../store/contentStore'

const Landing = () => {
  const { 
    getActiveBanners,
    getActiveAnnouncements,
    landingContent 
  } = useContentStore()

  const heroSlides = getActiveBanners()
  const announcements = getActiveAnnouncements()
  
  // Gunakan landingContent.hero, landingContent.stats, dll
}
```

## Best Practices

### 1. Content Management
- Selalu preview perubahan sebelum save
- Gunakan gambar dengan ukuran optimal (1920x1080 untuk hero banners)
- Test konten di berbagai device
- Backup konten sebelum perubahan besar

### 2. Announcement Management
- Gunakan prioritas yang sesuai (High untuk maintenance, Low untuk info)
- Set periode yang jelas untuk pengumuman
- Buat konten yang informatif dan mudah dipahami

### 3. Banner Management
- Atur urutan banner yang logis
- Gunakan CTA yang jelas dan actionable
- Test banner di berbagai resolusi layar

## Future Enhancements

### Planned Features
- [ ] Image optimization dan compression
- [ ] A/B testing untuk banner
- [ ] Analytics untuk content performance
- [ ] Content scheduling
- [ ] Multi-language support
- [ ] Content versioning
- [ ] Bulk operations
- [ ] Content templates

### Technical Improvements
- [ ] Backend API integration
- [ ] Real-time content updates
- [ ] Content caching
- [ ] CDN integration untuk images
- [ ] Content validation
- [ ] Audit trail untuk perubahan

## Troubleshooting

### Common Issues
1. **Banner tidak tampil:** Cek status banner dan urutan
2. **Announcement tidak muncul:** Cek periode aktif dan status
3. **Content tidak tersimpan:** Cek browser storage dan network

### Debug Mode
Gunakan browser dev tools untuk inspect content store state:
```javascript
// Di browser console
console.log(useContentStore.getState())
```

## Support
Untuk pertanyaan atau masalah terkait Content Management System, hubungi tim development atau buat issue di repository.
