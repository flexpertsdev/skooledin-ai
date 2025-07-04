# Skooledin AI - Design System

## 🎨 Design Principles

### 1. **WhatsApp Familiarity**
- Leverage existing mental models
- Message bubbles for conversations
- Bottom input bar with attachments
- Familiar iconography and patterns

### 2. **Mobile-First Excellence**
- 44px minimum touch targets
- Thumb-friendly navigation
- Single-handed operation
- Native app feel

### 3. **Educational Clarity**
- Clear visual hierarchy
- Scannable content
- Focus on readability
- Distraction-free learning

### 4. **Delightful Polish**
- Smooth animations
- Haptic feedback
- Micro-interactions
- Thoughtful transitions

### 5. **Accessible Always**
- High contrast ratios
- Clear focus indicators
- Screen reader support
- Keyboard navigation

## 🎨 Color System

### Brand Colors
```css
/* Primary - Skooledin Purple */
--color-brand-50: #f5f3ff;
--color-brand-100: #ede9fe;
--color-brand-200: #ddd6fe;
--color-brand-300: #c4b5fd;
--color-brand-400: #a78bfa;
--color-brand-500: #8b5cf6;
--color-brand-600: #7c3aed; /* Primary */
--color-brand-700: #6d28d9;
--color-brand-800: #5b21b6;
--color-brand-900: #4c1d95;

/* Semantic Colors */
--color-success: #10b981;
--color-warning: #f59e0b;
--color-error: #ef4444;
--color-info: #3b82f6;
```

### Subject Colors
```css
/* Educational Context */
--color-math: #3b82f6;      /* Blue */
--color-science: #10b981;   /* Green */
--color-language: #f59e0b;  /* Orange */
--color-history: #a78bfa;   /* Light Purple */
--color-arts: #ec4899;      /* Pink */
--color-sports: #14b8a6;    /* Teal */
```

### AI-Specific Colors
```css
/* AI States */
--color-ai-thinking: #8b5cf6;
--color-ai-confident: #10b981;
--color-ai-uncertain: #f59e0b;
--color-ai-error: #ef4444;
```

### Surface Colors
```css
/* Backgrounds */
--color-surface-primary: #ffffff;
--color-surface-secondary: #f9fafb;
--color-surface-tertiary: #f3f4f6;
--color-surface-elevated: #ffffff;
--color-surface-chat: #faf5ff;     /* Light purple tint */
--color-surface-modal: rgba(0, 0, 0, 0.5);
```

## 📐 Typography

### Font Stack
```css
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
--font-mono: 'JetBrains Mono', 'SF Mono', Consolas, monospace;
```

### Type Scale
```css
/* Mobile-First Sizes */
--text-xs: 0.75rem;      /* 12px */
--text-sm: 0.875rem;     /* 14px */
--text-base: 1rem;       /* 16px */
--text-lg: 1.125rem;     /* 18px */
--text-xl: 1.25rem;      /* 20px */
--text-2xl: 1.5rem;      /* 24px */
--text-3xl: 1.875rem;    /* 30px */
--text-4xl: 2.25rem;     /* 36px */

/* Line Heights */
--leading-none: 1;
--leading-tight: 1.25;
--leading-snug: 1.375;
--leading-normal: 1.5;
--leading-relaxed: 1.625;
--leading-loose: 2;
```

### Font Weights
```css
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

## 📏 Spacing System

### Base Scale
```css
--spacing-0: 0;
--spacing-px: 1px;
--spacing-0.5: 0.125rem;   /* 2px */
--spacing-1: 0.25rem;      /* 4px */
--spacing-2: 0.5rem;       /* 8px */
--spacing-3: 0.75rem;      /* 12px */
--spacing-4: 1rem;         /* 16px */
--spacing-5: 1.25rem;      /* 20px */
--spacing-6: 1.5rem;       /* 24px */
--spacing-8: 2rem;         /* 32px */
--spacing-10: 2.5rem;      /* 40px */
--spacing-12: 3rem;        /* 48px */
--spacing-16: 4rem;        /* 64px */
```

### Component Spacing
```css
--spacing-touch: 44px;          /* Minimum touch target */
--spacing-message: 12px;        /* Message bubble padding */
--spacing-card: 16px;           /* Card padding */
--spacing-section: 24px;        /* Section spacing */
--spacing-page: 16px;           /* Page margins */
```

## 🔲 Layout System

### Container Widths
```css
--container-xs: 475px;
--container-sm: 640px;
--container-md: 768px;
--container-lg: 1024px;
--container-xl: 1280px;
```

### Breakpoints
```css
--breakpoint-xs: 375px;
--breakpoint-sm: 640px;
--breakpoint-md: 768px;
--breakpoint-lg: 1024px;
--breakpoint-xl: 1280px;
```

### Grid System
```css
/* Mobile: 4 columns */
/* Tablet: 8 columns */
/* Desktop: 12 columns */
--grid-gap: 16px;
--grid-margin: 16px;
```

## 🎭 Component Styles

### Buttons
```css
/* Primary Button */
.btn-primary {
  background: var(--color-brand-600);
  color: white;
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 600;
  min-height: 44px;
}

/* Secondary Button */
.btn-secondary {
  background: white;
  color: var(--color-gray-700);
  border: 1px solid var(--color-gray-200);
  padding: 12px 24px;
  border-radius: 12px;
}

/* Ghost Button */
.btn-ghost {
  background: transparent;
  color: var(--color-gray-600);
  padding: 8px 16px;
  border-radius: 8px;
}
```

### Message Bubbles
```css
/* User Message */
.message-user {
  background: var(--color-brand-600);
  color: white;
  border-radius: 18px 18px 4px 18px;
  padding: 12px 16px;
  max-width: 85%;
  margin-left: auto;
}

/* AI Message */
.message-ai {
  background: var(--color-gray-100);
  color: var(--color-gray-900);
  border-radius: 18px 18px 18px 4px;
  padding: 12px 16px;
  max-width: 85%;
  margin-right: auto;
}
```

### Cards
```css
.card {
  background: white;
  border-radius: 16px;
  padding: 16px;
  border: 1px solid var(--color-gray-100);
  box-shadow: var(--shadow-sm);
}

.card-interactive {
  transition: all 200ms ease;
  cursor: pointer;
}

.card-interactive:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}
```

### Input Fields
```css
.input {
  width: 100%;
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid var(--color-gray-200);
  font-size: 16px; /* Prevents zoom on iOS */
  min-height: 44px;
}

.input:focus {
  border-color: var(--color-brand-600);
  box-shadow: 0 0 0 3px var(--color-brand-100);
}
```

## 🎬 Animations

### Timing Functions
```css
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
```

### Common Animations
```css
/* Fade In */
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Slide Up */
@keyframes slide-up {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

/* Pulse */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

/* Thinking Dots */
@keyframes thinking-dot {
  0%, 80%, 100% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}
```

## 🌗 Dark Mode (Future)

### Dark Palette
```css
/* Dark mode colors - prepared for future */
@media (prefers-color-scheme: dark) {
  :root {
    --color-surface-primary: #0f0f0f;
    --color-surface-secondary: #1a1a1a;
    --color-surface-tertiary: #262626;
    --color-text-primary: #ffffff;
    --color-text-secondary: #a3a3a3;
  }
}
```

## 📱 Mobile Patterns

### Touch Targets
- Minimum 44x44px
- 8px minimum spacing between targets
- Clear active states
- Haptic feedback on interaction

### Gestures
- Swipe left: Archive/Delete
- Swipe right: Save/Favorite
- Pull to refresh
- Pinch to zoom
- Long press for options

### Safe Areas
```css
.safe-top {
  padding-top: env(safe-area-inset-top);
}

.safe-bottom {
  padding-bottom: env(safe-area-inset-bottom);
}

.safe-x {
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
}
```

## 🎯 Accessibility

### Color Contrast
- Normal text: 4.5:1 minimum
- Large text: 3:1 minimum
- Interactive elements: 3:1 minimum
- Focus indicators: 3:1 minimum

### Focus States
```css
:focus-visible {
  outline: 2px solid var(--color-brand-600);
  outline-offset: 2px;
}
```

### Screen Reader Support
- Semantic HTML
- ARIA labels where needed
- Skip navigation links
- Landmark regions

## 📏 Component Guidelines

### Message Bubbles
- Max width: 85% of container
- Padding: 12px horizontal, 8px vertical
- Font size: 16px on mobile
- Timestamp: 12px, 70% opacity

### Bottom Navigation
- Height: 56px + safe area
- Icon size: 24px
- Label font: 12px
- Active indicator: 2px line

### Cards
- Border radius: 16px
- Padding: 16px (mobile), 24px (desktop)
- Shadow: Subtle for hierarchy
- Hover: Lift animation

### Modals/Sheets
- Backdrop: 50% black opacity
- Border radius: 20px top corners
- Drag handle: 4x32px, centered
- Close button: Top right, 44px target

## 🎨 Usage Examples

### Chat Interface
```vue
<div class="chat-container">
  <div class="message message-ai">
    <p>How can I help you today?</p>
    <span class="timestamp">2:30 PM</span>
  </div>
  <div class="message message-user">
    <p>I need help with algebra</p>
    <span class="timestamp">2:31 PM</span>
  </div>
</div>
```

### Card Component
```vue
<div class="card card-interactive">
  <div class="card-header">
    <h3 class="text-lg font-semibold">Pythagorean Theorem</h3>
    <Badge color="math">Mathematics</Badge>
  </div>
  <p class="text-gray-600 mt-2">
    In a right triangle, a² + b² = c²
  </p>
</div>
```

This design system ensures consistency, accessibility, and delightful user experiences across all platforms while maintaining the familiar WhatsApp-style interface that users love.