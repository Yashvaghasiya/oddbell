## Design System: Oddball Advertising

### Pattern
- **Name:** Portfolio Grid
- **Conversion Focus:**  hover overlay info
- **CTA Placement:** Project Card Hover + Footer Contact
- **Color Strategy:** Neutral background (let work shine). Text: Black/White. Accent: Minimal.
- **Sections:** 1. Hero (Name/Role), 2. Project Grid (Masonry), 3. About/Philosophy, 4. Contact

### Style
- **Name:** Neubrutalism
- **Keywords:** Bold, ugly-cute, raw, high contrast, flat, hard shadows, distinct, playful, loud
- **Best For:** Design tools, creative agencies, Gen Z brands, personal blogs, gumroad-style
- **Performance:** ΓÜí Excellent | **Accessibility:** Γ£ô WCAG AAA

### Colors
| Role | Hex |
|------|-----|
| Primary | #EC4899 |
| Secondary | #F472B6 |
| CTA | #06B6D4 |
| Background | #FDF2F8 |
| Text | #831843 |

*Notes: Bold primaries + artistic freedom*

### Typography
- **Heading:** Archivo
- **Body:** Space Grotesk
- **Mood:** minimal, portfolio, designer, creative, clean, artistic
- **Best For:** Design portfolios, creative professionals, minimalist brands
- **Google Fonts:** https://fonts.google.com/share?selection.family=Archivo:wght@300;400;500;600;700|Space+Grotesk:wght@300;400;500;600;700
- **CSS Import:**
```css
@import url('https://fonts.googleapis.com/css2?family=Archivo:wght@300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
```

### Key Effects
Hard hover shifts (4px), marquee scrolling, jitter animations, bold borders

### Avoid (Anti-patterns)
- Boring design
- Hidden work

### Pre-Delivery Checklist
- [ ] No emojis as icons (use SVG: Heroicons/Lucide)
- [ ] cursor-pointer on all clickable elements
- [ ] Hover states with smooth transitions (150-300ms)
- [ ] Light mode: text contrast 4.5:1 minimum
- [ ] Focus states visible for keyboard nav
- [ ] prefers-reduced-motion respected
- [ ] Responsive: 375px, 768px, 1024px, 1440px

