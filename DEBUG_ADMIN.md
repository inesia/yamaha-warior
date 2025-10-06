# 🔧 Admin Debug Guide

## 🚀 Cara Test Admin Dashboard

### 1. **Start Development Server**
```bash
npm run dev
```

### 2. **Akses Admin Login**
- Buka browser: `http://localhost:3000/admin/login`
- Login dengan credentials:
  - **Email**: `admin@yamaha.com`
  - **Password**: `admin123`

### 3. **Test Routes**
Setelah login, coba akses:
- `/admin/test` - Test page untuk debug
- `/admin/members` - Members management
- `/admin/activity-members` - Activity members
- `/admin/challenges` - Challenge management

### 4. **Debug Steps**

#### **Jika Admin Login Tidak Muncul:**
1. Check console untuk error
2. Pastikan route `/admin/login` bisa diakses
3. Check apakah ada error di browser console

#### **Jika Login Berhasil Tapi Redirect Error:**
1. Check apakah ada error di AdminLayout
2. Pastikan semua import component sudah benar
3. Check apakah ada error di adminStore

#### **Jika Members Page Tidak Muncul:**
1. Check apakah ada error di Members.jsx
2. Pastikan mockData import sudah benar
3. Check apakah ada error di console

### 5. **Common Issues & Solutions**

#### **React Router Warnings:**
- ✅ **Fixed**: Added future flags to BrowserRouter
- Warning sudah diperbaiki dengan menambahkan `v7_startTransition` dan `v7_relativeSplatPath`

#### **Import Errors:**
- Pastikan semua file sudah dibuat
- Check apakah ada typo di import path
- Pastikan export/import sudah benar

#### **Authentication Issues:**
- Check adminStore.js
- Pastikan login credentials benar
- Check apakah ada error di console

### 6. **Test Credentials**

```
Super Admin:
- Email: admin@yamaha.com
- Password: admin123

Moderator:
- Email: moderator@yamaha.com  
- Password: mod123

Content Manager:
- Email: content@yamaha.com
- Password: content123
```

### 7. **Expected Behavior**

1. **Login Page**: Form dengan email/password fields
2. **After Login**: Redirect ke `/admin/members`
3. **Sidebar**: 6 menu items (Member, Activity Members, Challenge, dll)
4. **Members Page**: Tabel dengan data members
5. **Navigation**: Semua menu bisa diklik dan berfungsi

### 8. **Debug Commands**

```bash
# Check build
npm run build

# Check linting
npm run lint

# Start dev server
npm run dev
```

### 9. **File Structure Check**

Pastikan file-file ini ada:
- ✅ `src/layouts/AdminLayout.jsx`
- ✅ `src/pages/admin/AdminLogin.jsx`
- ✅ `src/pages/admin/Members.jsx`
- ✅ `src/pages/admin/MemberDetail.jsx`
- ✅ `src/pages/admin/MemberForm.jsx`
- ✅ `src/pages/admin/ActivityMembers.jsx`
- ✅ `src/store/adminStore.js`
- ✅ `src/data/mockData.js`

### 10. **Browser Console Check**

Buka Developer Tools (F12) dan check:
- **Console**: Apakah ada error JavaScript?
- **Network**: Apakah ada failed requests?
- **Elements**: Apakah HTML structure benar?

---

**Jika masih ada masalah, check console error dan pastikan semua file sudah dibuat dengan benar!** 🚀
