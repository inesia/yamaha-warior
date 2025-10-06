# 🎨 Yamaha Warior - Theme Guide

## Color Palette

Aplikasi menggunakan 3 warna utama sesuai brand Yamaha:

### Primary Color - Yamaha Blue
```
#075EAF (yamaha-blue)
```
**Usage:**
- Primary buttons & CTAs
- Active states
- Links & interactive elements
- Top rankings & achievements
- Navigation indicators
- Important badges & labels
- Borders untuk emphasis

### Secondary Color - Yamaha Dark
```
#1D1819 (yamaha-dark)
```
**Usage:**
- Text headings & content
- Secondary buttons & cards
- Dark backgrounds
- Footer sections
- Contrast elements
- Alternative badges

### Accent Color - Yamaha Red
```
#F0141D (yamaha-red)
```
**Usage:**
- Minimal usage sebagai accent saja
- Notifications badges (optional)
- Error states (jika diperlukan)
- Highlight elements yang perlu extra attention

### Supporting Colors

**Gray Scale:**
- `gray-50` to `gray-900` - Backgrounds, borders, text hierarchy
- `white` - Main background, cards

**Semantic Colors:**
- `blue-100` to `blue-700` - Blue variations untuk status completed
- `gray-100` to `gray-700` - Neutral status (pending, inactive)

## Color Distribution

### ✅ DO's (Primary Blue Dominance)
- **70% Blue** - Main actions, primary elements, highlights
- **25% Dark/Black** - Text, secondary elements, contrast
- **5% Red** - Minimal accent untuk special cases

### ❌ DON'T's
- Jangan pakai red sebagai primary color
- Jangan mix terlalu banyak warna
- Jangan pakai bright colors yang tidak match palette

## Component Examples

### Buttons
```jsx
// Primary Button
<button className="bg-yamaha-blue text-white">Primary</button>

// Secondary Button
<button className="bg-yamaha-dark text-white border border-yamaha-blue">Secondary</button>

// Outline Button
<button className="bg-white text-yamaha-blue border-2 border-yamaha-blue">Outline</button>
```

### Badges
```jsx
// Points Badge
<span className="bg-yamaha-blue text-white px-3 py-1 rounded-full">+100 pts</span>

// Status Badge - Completed
<span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Completed</span>

// Status Badge - Pending
<span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full">Pending</span>
```

### Cards
```jsx
// Primary Card
<div className="bg-gradient-yamaha text-white rounded-xl p-6">Content</div>

// Secondary Card
<div className="bg-yamaha-dark text-white border-2 border-yamaha-blue rounded-xl p-6">Content</div>

// Default Card
<div className="bg-white rounded-xl p-6 shadow-sm">Content</div>
```

### Leaderboard Rankings
```jsx
// 1st Place - Blue (Primary Winner)
<div className="border-4 border-yamaha-blue">Winner</div>

// 2nd Place - Dark Gray
<div className="border-4 border-gray-700">Second</div>

// 3rd Place - Light Gray
<div className="border-4 border-gray-500">Third</div>
```

## Gradients

### Primary Gradient (Blue)
```css
.gradient-yamaha {
  background: linear-gradient(135deg, #075EAF 0%, #0a4d8f 100%);
}
```

### Dark Gradient (Alternative)
```css
.gradient-dark {
  background: linear-gradient(135deg, #1D1819 0%, #000000 100%);
}
```

## Text Colors

### Headings
- Primary: `text-yamaha-dark`
- On Dark BG: `text-white`
- Highlighted: `text-yamaha-blue`

### Body Text
- Primary: `text-gray-600` or `text-gray-700`
- Secondary: `text-gray-500`
- Light: `text-gray-400`

### Links & Interactive
- Default: `text-yamaha-blue`
- Hover: `hover:text-yamaha-blue/80`

## Shadows

```css
/* Soft shadow untuk cards */
shadow-sm

/* Medium shadow untuk elevated elements */
shadow-md

/* Large shadow untuk modals/important elements */
shadow-lg

/* Colored shadow untuk blue elements */
shadow-lg shadow-blue-500/20
```

## States

### Hover States
- Blue elements: `hover:bg-yamaha-blue/90`
- Dark elements: `hover:bg-yamaha-dark/90`
- Cards: `hover:shadow-md`

### Active States
- Navigation: `text-yamaha-blue` + indicator
- Buttons: Slightly darker shade
- Tabs: `bg-yamaha-blue text-white`

### Focus States
- Inputs: `focus:ring-2 focus:ring-yamaha-blue`
- Buttons: `focus:outline-none focus:ring-2 focus:ring-yamaha-blue`

## Responsive Considerations

- Maintain color hierarchy across all screen sizes
- Ensure sufficient contrast for accessibility
- Use opacity untuk subtle variations
- Test on both light and dark backgrounds

## Accessibility

### Contrast Ratios
- Text on white: Use `yamaha-dark` (#1D1819) - AAA
- Text on blue: Use `white` - AA+
- Text on dark: Use `white` - AAA

### Color Blindness
- Don't rely on color alone
- Use icons + text labels
- Sufficient contrast between states

---

**Remember:** Konsistensi adalah kunci! Stick to the palette untuk unified brand experience. 🎨
