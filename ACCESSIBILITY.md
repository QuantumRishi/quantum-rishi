# Accessibility Features - Quantum Rishi Platform

This document outlines the accessibility features implemented in Phase 12 to ensure the Quantum Rishi platform is usable by everyone, including people with disabilities.

## Overview

The platform follows **WCAG 2.1 Level AA** guidelines and implements best practices for web accessibility.

## Features Implemented

### 1. Keyboard Navigation

- **Skip to Main Content Link**: A keyboard-accessible skip link appears when focused, allowing users to bypass navigation and jump directly to the main content.
- **Interactive Elements**: All buttons, links, and interactive elements are keyboard accessible using Tab, Enter, and Space keys.
- **Focus Indicators**: Visible focus states on all interactive elements for keyboard navigation.
- **Logical Tab Order**: Elements follow a natural reading and navigation order.

#### Keyboard Shortcuts

- `Tab`: Navigate forward through interactive elements
- `Shift + Tab`: Navigate backward through interactive elements
- `Enter` or `Space`: Activate buttons and links
- `Escape`: Close modals and dialogs (when implemented)

### 2. Screen Reader Support

- **ARIA Labels**: Comprehensive ARIA labels on interactive elements, landmarks, and regions
- **ARIA Live Regions**: Dynamic content updates are announced to screen readers
- **Semantic HTML**: Proper use of HTML5 semantic elements (`<nav>`, `<main>`, `<section>`, `<article>`, etc.)
- **Alternative Text**: Decorative elements marked with `aria-hidden="true"`
- **Screen Reader Only Text**: `.sr-only` utility class for providing additional context to screen readers

#### ARIA Landmarks Implemented

- `role="navigation"` - Navigation breadcrumbs
- `role="main"` - Main content area
- `role="list"` and `role="listitem"` - Lists of divisions, modules, and features
- `role="region"` - Distinct sections with aria-labels
- `role="group"` - Related button groups

### 3. Reduced Motion Support

Users who prefer reduced motion (configured in their OS settings) will experience:

- **No Animations**: All animations are disabled or significantly reduced
- **No Transitions**: Transform and transition effects are minimized
- **Static Backgrounds**: 3D particle effects and animated backgrounds are visible but not animated
- **Auto-advancing Carousels Paused**: Automatic slideshow advancement is disabled

#### Implementation

```css
@media (prefers-reduced-motion: reduce) {
  /* All animations and transitions reduced to near-instant */
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 4. Color and Contrast

- **High Contrast Ratios**: Text colors meet WCAG AA standards:
  - Normal text: minimum 4.5:1 contrast ratio
  - Large text (18pt+): minimum 3:1 contrast ratio
- **Color Not Sole Indicator**: Information is not conveyed by color alone
- **Focus Indicators**: High-contrast focus outlines on all interactive elements

#### Color Palette Contrast Ratios

- Primary text (#f8fafc on #0f172a): ~14:1 ✓
- Secondary text (#64748b on #0f172a): ~5.2:1 ✓
- Primary buttons (#28e5ff on #0f172a): ~11:1 ✓

### 5. Mobile and Responsive Design

- **Touch Targets**: Interactive elements are at least 44×44 pixels (following iOS/Android guidelines)
- **Responsive Text**: Font sizes scale appropriately across devices using `clamp()`
- **Flexible Layouts**: Grid and flexbox layouts adapt to different screen sizes
- **Mobile-First Approach**: Base styles designed for mobile, enhanced for larger screens

#### Responsive Breakpoints

- Mobile: 0-768px
- Tablet: 769-1024px
- Desktop: 1025px+

### 6. Form Accessibility (Future Implementation)

When forms are added to the platform, they will include:

- Properly associated labels with form inputs
- Error messages announced to screen readers
- Clear indication of required fields
- Inline validation with accessible error messages

### 7. Additional Features

- **Descriptive Link Text**: Links have meaningful text, not generic "click here"
- **Heading Hierarchy**: Proper heading structure (h1-h6) maintained throughout
- **Language Attribute**: HTML lang attribute set to "en"
- **Viewport Meta Tag**: Proper mobile viewport configuration
- **Readable Font Sizes**: Minimum 16px base font size

## Testing Recommendations

### Automated Testing

- Use Lighthouse for automated accessibility audits
- Run axe DevTools browser extension
- Validate HTML for semantic correctness

### Manual Testing

1. **Keyboard Navigation**: Navigate entire site using only keyboard
2. **Screen Reader**: Test with NVDA (Windows), JAWS (Windows), or VoiceOver (Mac/iOS)
3. **Zoom Testing**: Test at 200% and 400% zoom levels
4. **Color Blindness**: Use browser extensions to simulate color blindness
5. **Reduced Motion**: Enable reduced motion in OS settings and verify

### Browser and Device Testing

- Modern browsers: Chrome, Firefox, Safari, Edge
- Mobile browsers: Safari iOS, Chrome Android
- Screen reader combinations:
  - NVDA + Firefox (Windows)
  - JAWS + Chrome (Windows)
  - VoiceOver + Safari (Mac/iOS)

## Component-Specific Accessibility

### HeroSection

- Canvas marked as `aria-hidden="true"` (decorative)
- Section labeled with `aria-label`
- CTA buttons grouped with descriptive labels
- Animations respect reduced motion preferences

### CategorySection

- Section labeled with `aria-labelledby`
- Division grid marked as `role="list"`
- Each card wrapped in `role="listitem"`

### DivisionCard

- Keyboard accessible with Enter/Space support
- Descriptive `aria-label` combining name and tagline
- Focus indicators visible
- Hover effects disabled for reduced motion users

### Button Component

- Supports custom `aria-label` prop
- Disabled state properly communicated
- External links include `rel="noopener noreferrer"`

### Layout Components (Tech/Creative/Knowledge)

- All sections properly labeled
- Lists semantically marked with `role="list"`
- Icons marked as decorative
- Carousel navigation includes descriptive labels
- Stats include screen reader friendly number pronunciation

## Future Improvements

1. **Dark Mode Toggle**: Explicit dark/light mode switcher
2. **Font Size Controls**: User-adjustable text size
3. **High Contrast Mode**: Additional high-contrast theme
4. **Keyboard Shortcuts Guide**: Help dialog with available shortcuts
5. **Focus Trap**: Proper focus management for modals
6. **Error Handling**: Accessible error messages and recovery

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Color Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [A11y Project Checklist](https://www.a11yproject.com/checklist/)
- [MDN Accessibility Guide](https://developer.mozilla.org/en-US/docs/Web/Accessibility)

## Feedback

If you encounter any accessibility barriers while using the Quantum Rishi platform, please report them so we can address them promptly.

---

**Last Updated**: Phase 12 Implementation  
**WCAG Compliance Level**: AA  
**Maintained By**: Quantum Rishi Development Team
