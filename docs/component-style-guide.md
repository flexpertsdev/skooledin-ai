# Skooledin AI Component Style Guide

## 🎨 Design Philosophy

Skooledin AI follows a mobile-first, educational-focused design approach inspired by WhatsApp's familiar chat interface. Our components prioritize:

- **Accessibility**: WCAG 2.1 AA compliance with 44px minimum touch targets
- **Performance**: Lightweight components optimized for PWA usage
- **Familiarity**: UI patterns users already know from messaging apps
- **Educational Focus**: Specialized components for learning activities

## 🎯 Core Design Tokens

### Colors

#### Primary Palette
- **Skooledin Purple**: `#7c3aed` (primary-600)
- Light variations: `#faf5ff` to `#c084fc` (50-400)
- Dark variations: `#6d28d9` to `#2e1065` (700-950)

#### Subject Colors
- **Math**: `#3b82f6` (Blue)
- **Science**: `#10b981` (Green)
- **Language**: `#f59e0b` (Amber)
- **History**: `#a78bfa` (Light Purple)
- **Arts**: `#ec4899` (Pink)
- **Sports**: `#14b8a6` (Teal)

#### AI States
- **Thinking**: `#6366f1` (Indigo)
- **Response**: `#a5b4fc` (Light Indigo)
- **Context**: `#c4b5fd` (Light Purple)

### Typography

#### Mobile Scale
```css
--h1: 32px/40px, bold
--h2: 28px/36px, semibold
--h3: 24px/32px, semibold
--body: 16px/24px, normal
--small: 14px/20px, normal
--caption: 12px/16px, normal
```

#### Educational Text
```css
--question: 18px/1.625, medium
--answer: 16px/1.625, normal
--code: 14px/1.5, monospace
--note: 14px/1.625, normal
--label: 12px/1.2, medium, 0.025em
```

### Spacing

#### 8pt Grid System
- xs: 8px
- sm: 12px  
- md: 16px
- lg: 24px
- xl: 32px

#### Mobile-Specific
- Touch target: 44px (min), 48px (optimal)
- Page padding: 16px
- Section gap: 24px
- Message padding: 12px horizontal, 8px vertical

## 📱 Component Patterns

### 1. Chat Message Component

```vue
<template>
  <div class="message" :class="{ 'message--user': isUser, 'message--ai': !isUser }">
    <div class="message__bubble">
      <div class="message__content">{{ content }}</div>
      <div class="message__time">{{ formattedTime }}</div>
    </div>
  </div>
</template>

<style>
.message {
  margin-bottom: var(--spacing-2);
  max-width: 85%;
}

.message--user {
  margin-left: auto;
}

.message__bubble {
  padding: var(--spacing-2) var(--spacing-3);
  border-radius: var(--radius-lg);
  background: var(--surface-chat);
}

.message--user .message__bubble {
  background: var(--color-primary-600);
  color: white;
}
</style>
```

### 2. Subject Card Component

```vue
<template>
  <button class="subject-card" :class="`subject-card--${subject}`">
    <Icon :name="subjectIcon" class="subject-card__icon" />
    <h3 class="subject-card__title">{{ title }}</h3>
    <p class="subject-card__description">{{ description }}</p>
  </button>
</template>

<style>
.subject-card {
  padding: var(--spacing-4);
  border-radius: var(--radius-lg);
  min-height: var(--spacing-touch);
  transition: all var(--transition-fast);
}

.subject-card--math {
  background: var(--color-subject-math);
  color: white;
}
</style>
```

### 3. AI Thinking Indicator

```vue
<template>
  <div class="thinking">
    <span class="thinking__dot"></span>
    <span class="thinking__dot"></span>
    <span class="thinking__dot"></span>
  </div>
</template>

<style>
.thinking {
  display: flex;
  gap: var(--spacing-1);
}

.thinking__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-ai-thinking);
  animation: thinking-pulse 1.5s infinite;
}

@keyframes thinking-pulse {
  0%, 60%, 100% { opacity: 0.3; transform: scale(0.8); }
  30% { opacity: 1; transform: scale(1); }
}
</style>
```

### 4. Touch-Friendly Button

```vue
<template>
  <button 
    class="btn" 
    :class="[`btn--${variant}`, `btn--${size}`]"
    :disabled="disabled"
  >
    <Icon v-if="icon" :name="icon" class="btn__icon" />
    <span class="btn__label">{{ label }}</span>
  </button>
</template>

<style>
.btn {
  min-height: var(--spacing-touch);
  padding: var(--spacing-3) var(--spacing-4);
  border-radius: var(--radius-md);
  font-weight: var(--font-weight-medium);
  transition: all var(--transition-fast);
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-2);
}

.btn--primary {
  background: var(--color-primary-600);
  color: white;
}

.btn--primary:active {
  background: var(--color-primary-700);
}
</style>
```

### 5. Study Card Component

```vue
<template>
  <article class="study-card">
    <header class="study-card__header">
      <Badge :color="subjectColor">{{ subject }}</Badge>
      <time class="study-card__date">{{ formattedDate }}</time>
    </header>
    <h3 class="study-card__title">{{ title }}</h3>
    <p class="study-card__summary">{{ summary }}</p>
    <footer class="study-card__actions">
      <Button size="sm" variant="ghost">Review</Button>
      <Button size="sm" variant="ghost">Share</Button>
    </footer>
  </article>
</template>

<style>
.study-card {
  background: var(--surface-card);
  border-radius: var(--radius-lg);
  padding: var(--spacing-4);
  border: 1px solid var(--border-default);
}
</style>
```

## 🎯 Interaction States

### Touch Feedback
```css
.touchable {
  transition: transform var(--transition-fast);
  -webkit-tap-highlight-color: transparent;
}

.touchable:active {
  transform: scale(0.98);
}
```

### Focus States
```css
.focusable:focus-visible {
  outline: 2px solid var(--color-primary-600);
  outline-offset: 2px;
}
```

### Loading States
```css
.skeleton {
  background: linear-gradient(
    90deg,
    var(--surface-default) 25%,
    var(--surface-card) 50%,
    var(--surface-default) 75%
  );
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
}
```

## 📏 Layout Patterns

### Safe Area Handling
```css
.layout {
  padding-top: calc(var(--spacing-4) + var(--safe-area-inset-top));
  padding-bottom: calc(var(--spacing-4) + var(--safe-area-inset-bottom));
}
```

### WhatsApp-Style Layout
```vue
<template>
  <div class="app-layout">
    <header class="app-header">
      <!-- Fixed header with safe area -->
    </header>
    
    <main class="app-content">
      <!-- Scrollable content -->
    </main>
    
    <footer class="app-input">
      <!-- Fixed input area with safe area -->
    </footer>
  </div>
</template>
```

### Responsive Grid
```css
.content-grid {
  display: grid;
  gap: var(--spacing-4);
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}
```

## 🚀 Performance Guidelines

1. **Lazy Loading**: Use `v-lazy` for images and heavy components
2. **Virtual Scrolling**: Implement for long lists (>50 items)
3. **Skeleton Loading**: Show placeholders during data fetch
4. **Optimistic UI**: Update UI before server confirmation
5. **Debounced Inputs**: 300ms debounce for search/filter

## ♿ Accessibility Checklist

- [ ] 44px minimum touch targets
- [ ] 4.5:1 contrast ratio for normal text
- [ ] 3:1 contrast ratio for large text
- [ ] Keyboard navigation support
- [ ] Screen reader labels
- [ ] Focus indicators
- [ ] Reduced motion alternatives
- [ ] Error messages linked to inputs

## 🎭 Animation Principles

1. **Purpose**: Every animation should have a clear purpose
2. **Performance**: Use CSS transforms and opacity only
3. **Duration**: 200-300ms for micro-interactions
4. **Easing**: Use system easing curves
5. **Reduced Motion**: Respect `prefers-reduced-motion`

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```