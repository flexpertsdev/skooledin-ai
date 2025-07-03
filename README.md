# Nuxtplate - Mobile-First Design System

A comprehensive mobile-first design system built with Nuxt 3, Vue 3, TypeScript, and modern CSS. This project provides a complete set of components, composables, and utilities for building responsive, accessible, and performant web applications.

## 🚀 Features

- **Mobile-First Design**: Built from the ground up with mobile UX as the priority
- **Comprehensive Component Library**: 30+ production-ready components
- **Design Token System**: Consistent colors, spacing, typography, and more
- **Dark Mode Support**: Built-in light/dark theme switching with persistence
- **Touch & Gesture Support**: Native-like interactions with swipe, pinch, and more
- **Accessibility**: WCAG 2.1 compliant with keyboard navigation and screen reader support
- **TypeScript**: Full type safety across components and composables
- **Performance Optimized**: Auto-imports, lazy loading, and code splitting

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/flexpertsdev/nuxtplate.git
cd nuxtplate

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🏗️ Project Structure

```
nuxtplate/
├── assets/
│   ├── styles/         # Global CSS and design tokens
│   └── tokens/         # TypeScript design tokens
├── components/
│   ├── layout/         # Layout primitives (Container, Row, Grid, etc.)
│   ├── navigation/     # Navigation components (NavBar, SideBar, etc.)
│   ├── overlay/        # Overlay components (Modal, BottomSheet, etc.)
│   ├── ui/            # UI components (Card, Toast, Popover, etc.)
│   └── content/       # Content components (CardGrid, MasonryGrid)
├── composables/        # Vue composables
├── pages/             # Application pages and demos
└── public/            # Static assets
```

## 🧩 Components

### Layout Primitives
- **LayoutContainer**: Responsive container with max-width constraints
- **LayoutRow/Column**: Flexbox-based layout components
- **LayoutGrid**: CSS Grid with responsive breakpoints
- **LayoutStack**: Vertical stack with consistent spacing
- **LayoutWrap**: Flex wrap container
- **LayoutExpanded**: Flex-grow wrapper
- **LayoutAligned**: Alignment container
- **LayoutSafeArea**: Device safe area handling

### Navigation
- **NavBar**: Responsive navigation bar with scroll behavior
- **SideBar**: Slide-out sidebar with backdrop
- **BottomNav**: Mobile bottom navigation
- **TabBar**: Swipeable tab views

### Overlays
- **Modal**: Accessible modal with focus trap
- **BottomSheet**: Drag-to-dismiss bottom sheet
- **Drawer**: Multi-directional sliding drawer
- **ActionSheet**: Mobile action menu
- **Toast**: Global notification system
- **Popover**: Floating UI-based popover
- **Tooltip**: Contextual tooltips

### Content
- **Card**: Flexible card component
- **CardGrid**: Responsive grid layouts
- **Carousel**: Touch-enabled carousel
- **PageView**: Full-screen page swiping
- **MasonryGrid**: Pinterest-style layouts

## 🎣 Composables

- **useResponsive**: Responsive breakpoint detection
- **useTheme**: Theme switching and persistence
- **useLayout**: Global layout state management
- **useSafeArea**: Device-specific safe area insets
- **useGesture**: Touch gesture detection
- **useToast**: Toast notification system
- **useFocusTrap**: Accessibility focus management

## 🎨 Design Tokens

The project uses a comprehensive design token system:

```typescript
// Example usage
import { colors, spacing, typography } from '~/assets/tokens'

// In components
const primaryColor = colors.primary[500]
const largePadding = spacing.lg
const headingFont = typography.fonts.heading
```

## 📱 Responsive System

Built-in breakpoints for all device sizes:

```typescript
const breakpoints = {
  mobile: 320,    // Mobile devices
  tablet: 768,    // Tablets
  laptop: 1024,   // Laptops
  desktop: 1440,  // Desktop
  wide: 1920      // Wide screens
}
```

## 🌓 Theme Customization

Dynamic theme switching with CSS custom properties:

```typescript
const { setMode, toggleMode, setPreset, setCustomColors } = useTheme()

// Switch themes
setMode('dark')
toggleMode()

// Use presets
setPreset('ocean')

// Custom colors
setCustomColors({
  primary: '#FF6B6B',
  primaryDark: '#FF8787'
})
```

## 🚀 Performance

- **Auto-imports**: Components and composables are auto-imported
- **Code Splitting**: Routes are automatically code-split
- **Image Optimization**: Automatic format conversion and lazy loading
- **CSS Optimization**: Minimal CSS with tree-shaking
- **Compression**: Automatic asset compression

## 📖 Development

```bash
# Development server
npm run dev

# Type checking
npm run typecheck

# Build for production
npm run build

# Preview production build
npm run preview

# Generate static site
npm run generate
```

## 🧪 Demo Pages

Explore the components at these demo routes:

- `/demo` - Component gallery
- `/demo/navigation` - Navigation components
- `/demo/overlays` - Overlay components
- `/demo/layouts` - Layout primitives
- `/demo/content` - Content components
- `/demo/carousel` - Carousel & swipe components

## 🛠️ Configuration

### Nuxt Config

The project is configured in `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt',       // State management
    '@vueuse/nuxt',      // Utilities
    '@nuxt/image',       // Image optimization
    'nuxt-viewport',     // Viewport detection
    '@nuxtjs/color-mode' // Dark mode
  ]
})
```

### TypeScript

Full TypeScript support with strict mode enabled:

```typescript
{
  "compilerOptions": {
    "strict": true,
    "moduleResolution": "bundler"
  }
}
```

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🙏 Acknowledgments

Built with:
- [Nuxt 3](https://nuxt.com)
- [Vue 3](https://vuejs.org)
- [VueUse](https://vueuse.org)
- [TypeScript](https://www.typescriptlang.org)
- [Pinia](https://pinia.vuejs.org)

---

Created with ❤️ by [flexpertsdev](https://github.com/flexpertsdev)