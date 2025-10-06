# 🔷 Yamaha Warior - Shape & Geometry Guide

## Design Philosophy
Yamaha Warior menggunakan **geometric/sharp design** untuk mencerminkan karakter sporty dan modern dari brand Yamaha. Konsistensi shape adalah kunci untuk unified visual experience.

---

## Shape System

### 1. **Primary Shapes - Geometric/Sharp**

#### Buttons & CTAs
```jsx
// Primary Action Buttons
<button className="clip-corner bg-gradient-yamaha text-white p-4">
  Button Text
</button>

// Secondary Buttons
<button className="border-4 border-yamaha-blue text-yamaha-blue p-4">
  Button Text
</button>
```
**Usage**: Semua action buttons, CTA utama
**Reason**: Sharp corners memberikan kesan decisive & action-oriented

---

#### Cards & Containers
```jsx
// Primary Card with Left Accent
<div className="bg-white shadow-lg border-l-4 border-yamaha-blue p-6">
  Card Content
</div>

// Alternative: Top Accent
<div className="bg-white shadow-lg border-t-4 border-yamaha-blue p-6">
  Card Content
</div>
```
**Usage**: Content cards, info boxes, challenge cards
**Reason**: Left border memberikan directional flow & emphasis

---

#### Icon Containers
```jsx
// Sharp Icon Box
<div className="bg-yamaha-blue p-3">
  <Icon size={24} />
</div>

// With clip-corner (for emphasis)
<div className="bg-yamaha-blue p-3 clip-corner">
  <Icon size={24} />
</div>
```
**Usage**: Icon backgrounds, stat boxes
**Reason**: Consistency dengan overall geometric theme

---

### 2. **Secondary Shapes - Rounded (Exceptions)**

#### Badges & Pills
```jsx
// Status Badge
<span className="bg-yamaha-blue text-white px-3 py-1 rounded-full text-xs">
  +100 pts
</span>

// Category Pill
<span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs">
  Easy
</span>
```
**Usage**: Points badges, status indicators, category tags
**Reason**: Rounded shape untuk badges adalah universal convention

---

#### Avatars & Profile Pictures
```jsx
// Profile Avatar (circular)
<div className="w-16 h-16 rounded-full overflow-hidden">
  <img src={avatar} alt="User" />
</div>

// Alternative: Sharp avatar dengan border
<div className="w-16 h-16 border-4 border-yamaha-blue overflow-hidden">
  <img src={avatar} alt="User" />
</div>
```
**Usage**: User avatars, profile pictures
**Reason**: Circular avatars adalah common UX pattern

---

#### Filter Buttons & Tabs
```jsx
// Tab Button
<button className="px-4 py-2 rounded-full bg-yamaha-blue text-white">
  Tab Label
</button>
```
**Usage**: Tab navigation, filter chips
**Reason**: Rounded pills untuk quick filters & navigation

---

## Border Accent System

### Left Border (Primary)
```css
border-l-4 border-yamaha-blue
```
**Usage**: Main content cards, info boxes
**Effect**: Creates left-to-right reading flow

### Top Border (Alternative)
```css
border-t-4 border-yamaha-blue
```
**Usage**: Bottom navigation active state, header dividers
**Effect**: Emphasizes horizontal sections

### Right Border (Rare)
```css
border-r-4 border-yamaha-blue
```
**Usage**: Special emphasis, right-aligned elements
**Effect**: Reverse directional emphasis

### Bottom Border (Dividers)
```css
border-b-2 border-gray-200
```
**Usage**: Section dividers, list separators
**Effect**: Visual separation

---

## Implementation Examples

### ✅ DO's

```jsx
// Good: Consistent geometric button
<button className="clip-corner bg-gradient-yamaha text-white py-4 px-6">
  Ikuti Challenge
</button>

// Good: Card with sharp edges + border accent
<div className="bg-white shadow-lg border-l-4 border-yamaha-blue p-6">
  Challenge Info
</div>

// Good: Sharp icon container
<div className="bg-yamaha-blue p-3">
  <Trophy size={24} />
</div>

// Good: Rounded badge (exception allowed)
<span className="bg-yamaha-blue text-white px-3 py-1 rounded-full">
  +100 pts
</span>
```

### ❌ DON'T's

```jsx
// Bad: Mixed rounded corners on cards
<div className="bg-white rounded-2xl p-6">  // ❌ Don't use rounded
  Challenge Info
</div>

// Bad: Rounded button without reason
<button className="rounded-xl bg-yamaha-blue">  // ❌ Use clip-corner
  Action Button
</button>

// Bad: Rounded icon container
<div className="bg-yamaha-blue rounded-lg p-3">  // ❌ Remove rounded
  <Icon />
</div>
```

---

## File-by-File Checklist

### Pages
- [x] Login.jsx - Geometric shapes applied
- [x] Landing.jsx - Uses clip-corner for buttons
- [x] Dashboard.jsx - Cards with border-l-4
- [x] Challenges.jsx - Updated to geometric
- [ ] ChallengeDetail.jsx - Need review
- [ ] ChallengeSubmit.jsx - Need review
- [ ] Profile.jsx - Need review
- [ ] Settings.jsx - Need review
- [ ] Leaderboard.jsx - Need review
- [ ] History.jsx - Need review
- [ ] Notifications.jsx - Need review

### Components
- [x] Header.jsx - Border accents applied
- [x] BottomNav.jsx - Top border for active state

---

## CSS Utilities Available

```css
/* Primary Geometric Shape */
.clip-corner { /* Sharp angled corners for buttons */ }

/* Border Accents */
border-l-4 border-yamaha-blue  /* Left accent */
border-t-4 border-yamaha-blue  /* Top accent */
border-r-4 border-yamaha-blue  /* Right accent */
border-b-4 border-yamaha-blue  /* Bottom accent */

/* Allowed Rounded (Exceptions) */
rounded-full  /* For badges, avatars, pills only */
```

---

## Quick Reference

| Element Type | Shape | Example Class |
|-------------|-------|---------------|
| Action Button | Clip Corner | `clip-corner` |
| Card/Container | Sharp + Border | `border-l-4 border-yamaha-blue` |
| Icon Box | Sharp | No rounded |
| Badge/Pill | Rounded | `rounded-full` |
| Avatar | Rounded (allowed) | `rounded-full` |
| Tab Button | Rounded | `rounded-full` |

---

**Remember**: When in doubt, use **geometric/sharp shapes**. Rounded shapes are exceptions, not the rule! 🔷
