# Flexperts Design System

## Overview
A modern, mobile-first design system built with Tailwind CSS. Font family: Quicksand (300-700 weights).

## Design Tokens

### Colors
```css
/* Primary (Green) */
--primary-50: #DCFCE7
--primary-100: #BBF7D0
--primary-400: #22C55E (main)
--primary-500: #22C55E
--primary-600: #16A34A
--primary-700: #15803D

/* Neutral (Gray) */
--neutral-50: #F9FAFB
--neutral-100: #F3F4F6
--neutral-300: #D1D5DB
--neutral-500: #6B7280
--neutral-600: #4B5563
--neutral-700: #374151
--neutral-800: #1F2937
--neutral-900: #111827

/* Semantic */
--success: #10B981
--error: #EF4444
--warning: #F59E0B
--info: #3B82F6
```

### Typography Scale
```
Display: 72px/80px bold (desktop) → 48px/56px (mobile)
H1: 48px/56px bold → 32px/40px
H2: 36px/44px bold → 28px/36px
H3: 24px/32px semibold → 20px/28px
Body Large: 20px/28px regular
Body: 16px/24px regular
Caption: 14px/20px regular
```

### Spacing
Base unit: 4px (0.25rem)
- space-1: 4px
- space-2: 8px
- space-4: 16px
- space-6: 24px
- space-8: 32px
- space-12: 48px
- space-16: 64px

### Border Radius
- Rounded: 8px (rounded-lg)
- Pills: 20px (rounded-full)
- Cards: 12px (rounded-xl)
- Inputs: 8px (rounded-lg)

## Components

### Buttons

#### Primary Button
```html
<button class="px-8 py-3 rounded-lg font-semibold text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-500/20 disabled:opacity-50">
  Button Text
</button>
```
Mobile: `px-6 py-4 text-lg w-full`

#### Secondary Button
```html
<button class="px-8 py-3 rounded-lg font-semibold text-green-600 border-2 border-green-500 hover:bg-green-50">
  Button Text
</button>
```

#### Icon Button
```html
<button class="p-3 rounded-lg bg-green-500 text-white">
  <svg class="w-5 h-5">...</svg>
</button>
```

### Form Elements

#### Text Input
```html
<input type="text" class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-4 focus:ring-green-500/10">
```
Error state: `border-red-500`

#### Checkbox/Radio
```html
<input type="checkbox" class="w-5 h-5 rounded accent-green-500">
```

#### Toggle Switch
```html
<label class="relative inline-block w-11 h-6">
  <input type="checkbox" class="sr-only peer">
  <span class="absolute inset-0 bg-gray-300 rounded-full peer-checked:bg-green-500 transition"></span>
  <span class="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full transition peer-checked:translate-x-5"></span>
</label>
```

### Cards

#### Basic Card
```html
<div class="bg-white rounded-xl p-6 border border-gray-200">
  <!-- Content -->
</div>
```

#### Interactive Card
```html
<div class="bg-white rounded-xl p-6 border border-gray-200 hover:border-green-500 hover:shadow-lg transition-all cursor-pointer">
  <!-- Content -->
</div>
```

#### Glass Card
```html
<div class="backdrop-blur-md bg-white/10 rounded-xl p-6 border border-white/20">
  <!-- Content -->
</div>
```

### Navigation

#### Desktop Nav
```html
<nav class="bg-white border-b border-gray-200">
  <div class="px-6 py-4 flex items-center justify-between">
    <div class="flex items-center space-x-8">
      <h1 class="text-xl font-bold">Flexperts<span class="text-gradient">.dev</span></h1>
      <a href="#" class="font-medium text-green-600">Active</a>
      <a href="#" class="font-medium text-gray-600 hover:text-green-600">Link</a>
    </div>
  </div>
</nav>
```

#### Mobile Bottom Nav
```html
<div class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
  <div class="flex justify-around py-2">
    <button class="flex flex-col items-center py-2 px-3 flex-1">
      <svg class="w-6 h-6 mb-1 text-green-600">...</svg>
      <span class="text-xs text-green-600">Active</span>
    </button>
  </div>
</div>
```

### Mobile Components

#### Bottom Sheet
```html
<div class="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-xl transform translate-y-full transition-transform data-[open]:translate-y-0">
  <div class="w-12 h-1 bg-gray-300 rounded-full mx-auto my-3"></div>
  <!-- Content -->
</div>
```

#### Floating Action Button (FAB)
```html
<button class="fixed bottom-20 right-4 w-14 h-14 bg-green-500 text-white rounded-full shadow-lg flex items-center justify-center">
  <svg class="w-6 h-6">...</svg>
</button>
```

#### Chat Bubble
```html
<!-- Sent -->
<div class="max-w-[75%] ml-auto p-3 bg-green-500 text-white rounded-[18px_18px_4px_18px]">
  Message
</div>
<!-- Received -->
<div class="max-w-[75%] p-3 bg-gray-100 text-gray-900 rounded-[18px_18px_18px_4px]">
  Message
</div>
```

### Utility Classes

#### Text Gradient
```css
.text-gradient {
  background: linear-gradient(to right, #16A34A, #22C55E);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

#### Chips/Pills
```html
<span class="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-green-100 text-green-700">
  Label
</span>
```

#### Focus States
All interactive elements use: `focus:ring-4 focus:ring-green-500/20`

## Implementation Notes

1. **Mobile First**: Start with mobile styles, enhance for desktop
2. **Touch Targets**: Minimum 44x44px for mobile
3. **Transitions**: Use `transition-all` for smooth interactions
4. **States**: Always include hover, focus, active, and disabled states
5. **Accessibility**: Use proper ARIA labels and semantic HTML

## Example Usage

```html
<!-- Page Layout -->
<div class="min-h-screen bg-gray-50">
  <!-- Navigation -->
  <nav class="bg-white border-b border-gray-200 sticky top-0 z-50">...</nav>
  
  <!-- Main Content -->
  <main class="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
    <!-- Card Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Cards -->
    </div>
  </main>
  
  <!-- Mobile Bottom Nav -->
  <nav class="md:hidden fixed bottom-0...">...</nav>
</div>
```

## Quick Reference

- Primary action: Green-500 (#22C55E)
- Text on dark: White
- Text primary: Neutral-900 (#111827)
- Text secondary: Neutral-600 (#4B5563)
- Borders: Neutral-200/300
- Card shadows: `shadow-lg` on hover
- Standard padding: p-4 (mobile), p-6 (tablet), p-8 (desktop)