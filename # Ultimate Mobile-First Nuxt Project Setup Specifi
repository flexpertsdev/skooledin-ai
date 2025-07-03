# Ultimate Mobile-First Nuxt Project Setup Specification

Create a production-ready Nuxt 3 project with comprehensive mobile-first UX optimization, design tokens, and flexible layout system.

## Core Requirements

### 1. Project Foundation
- **Nuxt 3** latest stable version
- **TypeScript** enabled by default
- **Pinia** for state management
- **VueUse** for composables
- **ESLint + Prettier** configured

### 2. Responsive & Layout System
- **vue-mq** for smooth responsive behavior (no jumpy breakpoints)
- **CSS Container Queries** for component-level responsiveness
- **BootstrapVue Next** or custom grid system (b-container, b-row, b-col equivalents)
- **CSS Grid + Flexbox** hybrid approach
- **Mobile-first breakpoints**: 320px, 768px, 1024px, 1440px, 1920px

### 3. Design Token System
Create comprehensive design tokens for:

#### Colors
- **Light/Dark theme** with CSS custom properties
- **Semantic colors**: primary, secondary, success, warning, error, info
- **Surface colors**: background, surface, card, overlay
- **Text colors**: primary, secondary, muted, inverse
- **Border colors**: subtle, default, emphasis

#### Spacing Scale
- **8pt grid system**: 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px, 80px, 128px
- **Token names**: xs, sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl, 6xl

#### Typography
- **Font scales**: 12px, 14px, 16px, 18px, 20px, 24px, 28px, 32px, 40px, 48px, 64px
- **Line heights**: tight (1.2), normal (1.5), relaxed (1.75)
- **Font weights**: 300, 400, 500, 600, 700
- **Letter spacing**: tight, normal, wide

#### Radius & Shadows
- **Border radius**: none, sm (4px), md (8px), lg (12px), xl (16px), 2xl (24px), full
- **Shadows**: none, sm, md, lg, xl, 2xl with light/dark variants

#### Viewport Units
- **dvh support** for mobile browsers
- **Safe area insets** for notched devices
- **Container query units** (cqw, cqh, cqi, cqb)

### 4. Layout Component System

#### Core Layout Primitives
```vue
<!-- Flutter-like layout components -->
<LayoutContainer>
<LayoutColumn>
<LayoutRow>
<LayoutGrid>
<LayoutStack>
<LayoutWrap>
<LayoutExpanded>
<LayoutAligned>
<LayoutSafeArea>
```

#### Navigation Components
```vue
<!-- Responsive navigation -->
<NavBar> <!-- Desktop horizontal -->
<SideBar> <!-- Desktop sidebar -->
<BottomNav> <!-- Mobile bottom navigation -->
<TabBar> <!-- Mobile/desktop tabs -->
<BreadcrumbNav> <!-- Hierarchical navigation -->
```

#### Modal & Overlay System
```vue
<!-- Responsive overlays -->
<Modal> <!-- Desktop modal -->
<BottomSheet> <!-- Mobile bottom sheet -->
<ActionSheet> <!-- Mobile action selection -->
<Drawer> <!-- Slide-out panels -->
<Popover> <!-- Context menus -->
<Toast> <!-- Notifications -->
<FullscreenOverlay> <!-- Loading, splash -->
```

#### Content Layout Components
```vue
<!-- Content organization -->
<CardGrid> <!-- Responsive card layouts -->
<Carousel> <!-- Horizontal scrolling -->
<PageView> <!-- Full-screen pages -->
<MasonryGrid> <!-- Pinterest-style -->
<Timeline> <!-- Vertical flow -->
<Accordion> <!-- Collapsible sections -->
<Tabs> <!-- Content switching -->
```

### 5. Responsive Behavior System

#### Container Query Integration
- All layout components support `@container` queries
- Components respond to their container size, not viewport
- Smooth transitions between layout states

#### Vue-MQ Integration
```javascript
// Breakpoint configuration
{
  mobile: 320,
  tablet: 768, 
  laptop: 1024,
  desktop: 1440,
  ultrawide: 1920
}
```

#### Responsive Props Pattern
```vue
<LayoutGrid 
  :cols="$mq | mq({ mobile: 1, tablet: 2, laptop: 3, desktop: 4 })"
  :gap="$mq | mq({ mobile: 'sm', desktop: 'lg' })"
/>
```

### 6. Performance Optimizations

#### Bundle Optimization
- **Auto-import** for components and composables
- **Tree-shaking** enabled
- **Component lazy loading** for large layouts
- **Image optimization** with @nuxt/image

#### CSS Optimization
- **Critical CSS** inlined
- **Unused CSS** removal
- **CSS custom properties** for theming
- **CSS containment** for layout isolation

### 7. Developer Experience

#### Storybook Integration
- Component playground for all layout primitives
- Responsive testing viewport
- Theme switching capability
- Design token documentation

#### DevTools & Testing
- **Vue DevTools** integration
- **Lighthouse** performance monitoring
- **Accessibility** testing setup
- **Visual regression** testing

### 8. File Structure

```
/
├── assets/
│   ├── tokens/
│   │   ├── colors.ts
│   │   ├── spacing.ts
│   │   ├── typography.ts
│   │   ├── shadows.ts
│   │   └── radius.ts
│   └── styles/
│       ├── base.css
│       ├── tokens.css
│       └── utilities.css
├── components/
│   ├── layout/
│   │   ├── LayoutContainer.vue
│   │   ├── LayoutColumn.vue
│   │   ├── LayoutRow.vue
│   │   ├── LayoutGrid.vue
│   │   ├── LayoutStack.vue
│   │   └── ...
│   ├── navigation/
│   │   ├── NavBar.vue
│   │   ├── SideBar.vue
│   │   ├── BottomNav.vue
│   │   └── ...
│   ├── overlay/
│   │   ├── Modal.vue
│   │   ├── BottomSheet.vue
│   │   ├── ActionSheet.vue
│   │   └── ...
│   └── ui/
│       ├── Button.vue
│       ├── Card.vue
│       └── ...
├── composables/
│   ├── useBreakpoints.ts
│   ├── useTheme.ts
│   ├── useLayout.ts
│   └── useSafeArea.ts
├── layouts/
│   ├── default.vue
│   ├── mobile.vue
│   └── desktop.vue
└── pages/
    └── index.vue
```

### 9. Configuration Files

#### nuxt.config.ts
```typescript
export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxt/image',
    'nuxt-viewport',
    '@nuxtjs/color-mode'
  ],
  css: [
    '~/assets/styles/base.css',
    '~/assets/styles/tokens.css'
  ],
  colorMode: {
    preference: 'system',
    fallback: 'light',
    classPrefix: '',
    classSuffix: '',
    storageKey: 'theme'
  }
})
```

### 10. Expected Deliverables

1. **Fully configured Nuxt 3 project** with all dependencies
2. **Complete design token system** with light/dark themes
3. **Full layout component library** with TypeScript definitions
4. **Responsive navigation patterns** for mobile/desktop
5. **Modal & overlay system** with mobile-optimized variants
6. **Storybook documentation** with component examples
7. **Sample pages** demonstrating layout combinations
8. **Performance-optimized** bundle with <100kb initial load
9. **Accessibility compliant** with WCAG 2.1 AA standards
10. **Mobile-first responsive** with smooth transitions

### 11. Success Criteria

- **Perfect Lighthouse scores** (95+ in all categories)
- **Smooth 60fps animations** on mobile devices
- **Sub-second page loads** on 3G connections
- **Zero layout shift** during responsive transitions
- **Flutter-like predictable** layout behavior
- **Production-ready** code quality and documentation

This specification should result in the most advanced, mobile-optimized Vue.js layout system available, combining the best practices from Flutter's widget system with modern web technologies.

# Enhanced Mobile-First UX Design Principles & Implementation Guide

## Core UX Philosophy & First Principles

### 1. Layout Pattern Discovery Framework

#### Spatial Hierarchy Principles
- **Thumb-first design**: All interactive elements within 75% of screen height on mobile
- **Progressive disclosure**: Show essential content first, reveal complexity on demand
- **Contextual density**: Increase information density as screen real estate grows
- **Gesture affordances**: Visual cues that suggest swipe, pinch, or tap interactions

#### Novel Layout Pattern Generation
```typescript
// Layout decision tree for new patterns
interface LayoutDecision {
  contentType: 'navigation' | 'data' | 'media' | 'action'
  priority: 'primary' | 'secondary' | 'tertiary'
  frequency: 'constant' | 'frequent' | 'occasional' | 'rare'
  context: 'focused' | 'scanning' | 'browsing' | 'searching'
}

// Auto-generate layout based on content analysis
function generateOptimalLayout(decisions: LayoutDecision[]) {
  // Mobile: Stack by priority, hide tertiary
  // Tablet: Group related, show secondary in sidebar  
  // Desktop: Expose all, use peripheral vision areas
}
```

### 2. Scaling Behavior Guidelines

#### What Should Scale
- **Text**: Fluidly with `clamp()` between mobile/desktop optimal sizes
- **Touch targets**: Minimum 44px on mobile, can shrink to 32px on desktop
- **Whitespace**: Proportionally increase with screen size for visual breathing room
- **Grid gaps**: Scale from 8px mobile to 24px+ desktop
- **Container max-width**: Prevent line lengths exceeding 75 characters

#### What Should NOT Scale
- **Icons**: Stay consistent 16px/20px/24px regardless of screen
- **Avatars**: Fixed sizes (32px, 40px, 48px) for recognition consistency
- **Buttons**: Height stays 44px mobile, 40px desktop for muscle memory
- **Form elements**: Consistent sizing for predictable interaction
- **Logo/branding**: Maintain proportions and recognition

#### Responsive Scaling Implementation
```vue
<template>
  <div class="responsive-container">
    <!-- Scales fluidly -->
    <h1 class="responsive-heading">{{ title }}</h1>
    
    <!-- Fixed optimal size -->
    <button class="fixed-button">
      <Icon size="20" /> <!-- Never scales -->
      <span class="button-text">Action</span> <!-- Scales -->
    </button>
  </div>
</template>

<style>
.responsive-heading {
  font-size: clamp(1.5rem, 4vw, 3rem);
  line-height: clamp(1.2, 1.4, 1.6);
}

.fixed-button {
  height: 44px; /* Fixed for muscle memory */
  padding: 0 clamp(12px, 2vw, 24px); /* Scales for comfort */
}
</style>
```

### 3. Scrolling & Gesture Behavior System

#### Mobile Scrolling Principles
- **Momentum scrolling**: `-webkit-overflow-scrolling: touch` for iOS
- **Overscroll behavior**: `overscroll-behavior: contain` to prevent parent scroll
- **Scroll snap**: Use for carousels, page views, card stacks
- **Pull-to-refresh**: Native implementation where appropriate
- **Infinite scroll**: With skeleton loading and error states

#### Gesture Recognition Patterns
```typescript
interface GestureHandler {
  // Swipe gestures
  onSwipeLeft: () => void   // Navigate forward, dismiss, archive
  onSwipeRight: () => void  // Navigate back, reveal actions
  onSwipeUp: () => void     // Show more, expand bottomsheet
  onSwipeDown: () => void   // Refresh, minimize, close
  
  // Long press
  onLongPress: () => void   // Context menu, selection mode
  
  // Pinch
  onPinchZoom: (scale: number) => void // Image zoom, map scale
}

// Implementation with VueUse
const { lengthX, lengthY, direction } = useSwipe(target, {
  threshold: 50,
  onSwipeEnd(e, direction) {
    if (direction === 'left') handleSwipeLeft()
    if (direction === 'right') handleSwipeRight()
  }
})
```

#### Scroll-Linked Animations
```vue
<script setup>
import { useScroll, useTransition } from '@vueuse/core'

const { y: scrollY } = useScroll(window)

// Header that shrinks on scroll
const headerHeight = computed(() => 
  Math.max(56, 80 - scrollY.value * 0.1)
)

// Parallax background
const backgroundY = computed(() => 
  scrollY.value * 0.5
)
</script>

<template>
  <header 
    :style="{ 
      height: `${headerHeight}px`,
      transform: `translateY(-${Math.min(scrollY, 24)}px)`
    }"
    class="sticky-header"
  >
    <!-- Header content that scales down -->
  </header>
</template>
```

### 4. Animation & Transition Framework

#### Performance-First Animation Principles
- **Use `transform` and `opacity`** only for 60fps performance
- **Prefer CSS transitions** over JavaScript for simple animations
- **Respect `prefers-reduced-motion`** accessibility setting
- **Use `will-change`** sparingly and remove after animation

#### Easing & Duration Standards
```typescript
const easingTokens = {
  // Material Design inspired
  standard: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
  decelerate: 'cubic-bezier(0.0, 0.0, 0.2, 1)', // Elements entering
  accelerate: 'cubic-bezier(0.4, 0.0, 1, 1)',   // Elements exiting
  sharp: 'cubic-bezier(0.4, 0.0, 0.6, 1)',      // Attention-grabbing
}

const durationTokens = {
  fastest: '150ms',  // Hover states, button feedback
  fast: '200ms',     // Simple transitions
  normal: '300ms',   // Standard transitions
  slow: '400ms',     // Complex layout changes
  slowest: '500ms',  // Page transitions
}
```

#### Micro-Interaction Patterns
```vue
<template>
  <button 
    class="interactive-button"
    @mousedown="handlePress"
    @mouseup="handleRelease"
    @touchstart="handlePress"
    @touchend="handleRelease"
  >
    <span class="button-content">{{ label }}</span>
    <div class="ripple-effect" ref="ripple"></div>
  </button>
</template>

<style>
.interactive-button {
  position: relative;
  overflow: hidden;
  transition: 
    transform 150ms cubic-bezier(0.4, 0.0, 0.2, 1),
    box-shadow 150ms cubic-bezier(0.4, 0.0, 0.2, 1);
}

.interactive-button:active {
  transform: scale(0.98);
}

.ripple-effect {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transform: scale(0);
  animation: ripple 300ms ease-out;
}

@keyframes ripple {
  to {
    transform: scale(2);
    opacity: 0;
  }
}
</style>
```

### 5. Adaptive Space Utilization

#### Progressive Space Enhancement
```typescript
// Space allocation based on screen size
const spaceAllocation = {
  mobile: {
    primary: '100%',    // Full width content
    secondary: '0%',    // Hidden or bottom sheet
    tertiary: '0%',     // Hidden completely
  },
  tablet: {
    primary: '70%',     // Main content
    secondary: '30%',   // Sidebar or split view
    tertiary: '0%',     // Still hidden
  },
  desktop: {
    primary: '60%',     // Main content
    secondary: '25%',   // Sidebar
    tertiary: '15%',    // Tools, metadata, actions
  }
}
```

#### Peripheral Vision Utilization
```vue
<template>
  <div class="adaptive-layout">
    <!-- Core content (always visible) -->
    <main class="primary-content">
      <slot name="main" />
    </main>
    
    <!-- Secondary content (tablet+) -->
    <aside 
      v-if="$mq !== 'mobile'" 
      class="secondary-content"
      :class="secondaryClasses"
    >
      <slot name="secondary" />
    </aside>
    
    <!-- Tertiary content (desktop only) -->
    <aside 
      v-if="$mq === 'desktop' || $mq === 'ultrawide'" 
      class="tertiary-content"
    >
      <slot name="tertiary" />
    </aside>
  </div>
</template>
```

### 6. Navigation Bar Adaptive Behavior

#### Collapsing Navigation Patterns
```vue
<template>
  <nav 
    class="adaptive-navbar"
    :class="navbarState"
    :style="navbarStyles"
  >
    <!-- Logo (always visible) -->
    <div class="navbar-brand">
      <Logo :size="logoSize" />
    </div>
    
    <!-- Navigation items -->
    <div class="navbar-items" v-if="!isCollapsed">
      <NavItem 
        v-for="item in navigationItems" 
        :key="item.id"
        :item="item"
      />
    </div>
    
    <!-- Collapsed vertical icons -->
    <div class="navbar-icons" v-else>
      <IconButton 
        v-for="item in primaryItems" 
        :key="item.id"
        :icon="item.icon"
        @click="item.action"
      />
    </div>
    
    <!-- Hamburger menu (mobile) -->
    <MenuButton 
      v-if="$mq === 'mobile'"
      @click="toggleMobileMenu"
    />
  </nav>
</template>

<script setup>
const { y: scrollY } = useScroll(window)
const { width: windowWidth } = useWindowSize()

// Adaptive navbar behavior
const isCollapsed = computed(() => {
  if (windowWidth.value < 768) return false // Mobile uses hamburger
  if (windowWidth.value < 1024) return scrollY.value > 100 // Tablet collapses on scroll
  return windowWidth.value < 1200 && scrollY.value > 200 // Desktop collapses later
})

const logoSize = computed(() => 
  isCollapsed.value ? 32 : 40
)

const navbarStyles = computed(() => ({
  width: isCollapsed.value ? '64px' : 'auto',
  transition: 'width 300ms cubic-bezier(0.4, 0.0, 0.2, 1)'
}))
</script>
```

### 7. App Bar & Header Structure

#### Mobile App Bar Anatomy
```vue
<template>
  <header class="app-bar" :class="appBarVariant">
    <!-- Left action (back/menu) -->
    <div class="app-bar-leading">
      <IconButton 
        :icon="leadingIcon" 
        @click="leadingAction"
        class="leading-action"
      />
    </div>
    
    <!-- Title area -->
    <div class="app-bar-title">
      <h1 class="title-text">{{ title }}</h1>
      <p v-if="subtitle" class="subtitle-text">{{ subtitle }}</p>
    </div>
    
    <!-- Trailing actions -->
    <div class="app-bar-trailing">
      <IconButton 
        v-for="action in trailingActions" 
        :key="action.id"
        :icon="action.icon"
        @click="action.handler"
      />
      <MenuButton v-if="hasOverflow" />
    </div>
  </header>
</template>

<style>
.app-bar {
  height: 56px; /* Standard mobile app bar height */
  display: flex;
  align-items: center;
  padding: 0 4px;
  background: var(--surface-color);
  box-shadow: var(--elevation-1);
}

.app-bar-leading,
.app-bar-trailing {
  min-width: 48px; /* Minimum touch target */
  display: flex;
  align-items: center;
  justify-content: center;
}

.app-bar-title {
  flex: 1;
  min-width: 0; /* Allow text truncation */
  padding: 0 16px;
}

.title-text {
  font-size: 20px;
  font-weight: 500;
  line-height: 24px;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
```

### 8. Breadcrumb & Content Layout System

#### Hierarchical Navigation Patterns
```vue
<template>
  <div class="page-container">
    <!-- Breadcrumb navigation -->
    <nav class="breadcrumb-nav" v-if="$mq !== 'mobile'">
      <BreadcrumbItem 
        v-for="(crumb, index) in breadcrumbs"
        :key="crumb.id"
        :item="crumb"
        :is-last="index === breadcrumbs.length - 1"
      />
    </nav>
    
    <!-- Mobile: Show parent in app bar instead -->
    <AppBar v-if="$mq === 'mobile'">
      <template #leading>
        <BackButton @click="navigateToParent" />
      </template>
      <template #title>{{ currentPage.title }}</template>
    </AppBar>
    
    <!-- Page content with consistent padding -->
    <main class="page-content">
      <div class="content-container">
        <!-- Page header -->
        <header class="page-header">
          <h1 class="page-title">{{ pageTitle }}</h1>
          <p v-if="pageDescription" class="page-description">
            {{ pageDescription }}
          </p>
        </header>
        
        <!-- Main content area -->
        <div class="content-body">
          <slot />
        </div>
      </div>
    </main>
  </div>
</template>

<style>
.page-container {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
}

.page-content {
  flex: 1;
  padding: var(--safe-area-inset-top) var(--safe-area-inset-right) 
           var(--safe-area-inset-bottom) var(--safe-area-inset-left);
}

.content-container {
  max-width: min(100%, 1200px);
  margin: 0 auto;
  padding: clamp(16px, 4vw, 32px);
}

.page-header {
  margin-bottom: clamp(24px, 6vw, 48px);
}

.page-title {
  font-size: clamp(24px, 5vw, 32px);
  font-weight: 600;
  line-height: 1.2;
  margin: 0 0 8px 0;
}

.page-description {
  font-size: clamp(14px, 3vw, 16px);
  color: var(--text-secondary);
  line-height: 1.5;
  margin: 0;
}
</style>
```

### 9. Safe Area & Notch Handling

#### Device-Aware Layout
```css
:root {
  /* Safe area fallbacks */
  --safe-area-inset-top: env(safe-area-inset-top, 0px);
  --safe-area-inset-right: env(safe-area-inset-right, 0px);
  --safe-area-inset-bottom: env(safe-area-inset-bottom, 0px);
  --safe-area-inset-left: env(safe-area-inset-left, 0px);
  
  /* Dynamic viewport height */
  --viewport-height: 100dvh;
  --header-height: max(56px, calc(56px + var(--safe-area-inset-top)));
}

/* Full-height layouts */
.full-height-container {
  height: var(--viewport-height);
  padding-top: var(--safe-area-inset-top);
  padding-bottom: var(--safe-area-inset-bottom);
}

/* Bottom navigation safe area */
.bottom-navigation {
  padding-bottom: max(8px, var(--safe-area-inset-bottom));
}
```

### 10. Content Density & Information Architecture

#### Adaptive Information Density
```typescript
interface ContentDensity {
  mobile: {
    cardsPerRow: 1,
    showMetadata: false,
    showSecondaryActions: false,
    textSize: 'comfortable',
  },
  tablet: {
    cardsPerRow: 2,
    showMetadata: 'essential',
    showSecondaryActions: true,
    textSize: 'comfortable',
  },
  desktop: {
    cardsPerRow: 3,
    showMetadata: 'detailed',
    showSecondaryActions: true,
    textSize: 'compact',
  }
}
```

This comprehensive guide ensures that any AI implementation will create layouts that feel native and intuitive across all device types, with smooth transitions and predictable behavior patterns that users expect from high-quality mobile applications.

# Enhanced Form Design & Implementation Guide

## Form Architecture & Philosophy

### 1. Progressive Form Disclosure Principles

#### "One Question Per Page" Implementation
```vue
<template>
  <div class="form-container">
    <!-- Progress indicator -->
    <ProgressBar 
      :current="currentStep" 
      :total="totalSteps" 
      class="form-progress"
    />
    
    <!-- Single question focus -->
    <Transition 
      :name="transitionDirection" 
      mode="out-in"
    >
      <QuestionStep 
        :key="currentStep"
        :question="currentQuestion"
        :value="currentValue"
        @update="handleAnswer"
        @next="nextStep"
        @previous="previousStep"
      />
    </Transition>
    
    <!-- Navigation (mobile: gestures + buttons) -->
    <FormNavigation 
      :can-go-back="currentStep > 0"
      :can-go-forward="isCurrentStepValid"
      :is-final-step="currentStep === totalSteps - 1"
      @back="previousStep"
      @forward="nextStep"
      @submit="submitForm"
    />
  </div>
</template>

<script setup>
import { useFormWizard } from '~/composables/useFormWizard'
import { useSwipe } from '@vueuse/core'

const {
  currentStep,
  totalSteps,
  currentQuestion,
  currentValue,
  isCurrentStepValid,
  nextStep,
  previousStep,
  submitForm
} = useFormWizard(formConfig)

// Gesture navigation
const { direction } = useSwipe(formContainer, {
  onSwipeEnd(e, direction) {
    if (direction === 'left' && isCurrentStepValid.value) nextStep()
    if (direction === 'right' && currentStep.value > 0) previousStep()
  }
})

const transitionDirection = computed(() => 
  direction.value === 'left' ? 'slide-left' : 'slide-right'
)
</script>
```

#### Dynamic Form Schema
```typescript
interface FormQuestion {
  id: string
  type: 'text' | 'email' | 'number' | 'select' | 'multiselect' | 'boolean' | 'date' | 'file'
  title: string
  subtitle?: string
  placeholder?: string
  required: boolean
  validation?: ValidationRule[]
  options?: SelectOption[] // For select types
  conditional?: ConditionalLogic
  inputMode?: 'text' | 'email' | 'tel' | 'numeric' | 'decimal'
}

interface ConditionalLogic {
  dependsOn: string // Question ID
  showWhen: (value: any) => boolean
  skipWhen?: (value: any) => boolean
}

// Example form configuration
const formConfig: FormQuestion[] = [
  {
    id: 'user_type',
    type: 'select',
    title: 'What best describes you?',
    subtitle: 'This helps us personalize your experience',
    required: true,
    options: [
      { value: 'student', label: '🎓 Student', description: 'Currently studying' },
      { value: 'professional', label: '💼 Professional', description: 'Working full-time' },
      { value: 'freelancer', label: '🎨 Freelancer', description: 'Self-employed' }
    ]
  },
  {
    id: 'company_name',
    type: 'text',
    title: 'What company do you work for?',
    placeholder: 'Enter company name...',
    required: true,
    conditional: {
      dependsOn: 'user_type',
      showWhen: (value) => value === 'professional'
    }
  }
]
```

### 2. Conversational Form Components

#### Chat-Based Form Interface
```vue
<template>
  <div class="chat-form">
    <!-- Conversation history -->
    <div class="chat-messages" ref="messagesContainer">
      <ChatMessage 
        v-for="message in conversationHistory"
        :key="message.id"
        :message="message"
        :is-bot="message.sender === 'bot'"
      />
      
      <!-- Current question -->
      <ChatMessage 
        :message="currentQuestion"
        :is-bot="true"
        :is-typing="isThinking"
      />
    </div>
    
    <!-- Interactive input area -->
    <div class="chat-input-area">
      <component 
        :is="currentInputComponent"
        v-model="currentAnswer"
        :question="currentQuestion"
        :disabled="isProcessing"
        @submit="handleAnswer"
        @typing="handleTyping"
      />
    </div>
  </div>
</template>

<script setup>
const currentInputComponent = computed(() => {
  const componentMap = {
    text: 'ChatTextInput',
    email: 'ChatEmailInput', 
    select: 'ChatSelectInput',
    multiselect: 'ChatMultiSelectInput',
    boolean: 'ChatBooleanInput',
    number: 'ChatNumberInput',
    date: 'ChatDateInput'
  }
  return componentMap[currentQuestion.value.type] || 'ChatTextInput'
})

// Auto-scroll to bottom when new messages appear
watch(conversationHistory, () => {
  nextTick(() => {
    messagesContainer.value?.scrollTo({
      top: messagesContainer.value.scrollHeight,
      behavior: 'smooth'
    })
  })
})
</script>
```

#### Chat Input Components
```vue
<!-- ChatTextInput.vue -->
<template>
  <div class="chat-text-input">
    <div class="input-container">
      <textarea
        ref="textareaRef"
        v-model="localValue"
        :placeholder="question.placeholder"
        :inputmode="question.inputMode || 'text'"
        class="chat-textarea"
        rows="1"
        @keydown.enter.exact.prevent="handleSubmit"
        @input="handleInput"
      />
      <button 
        :disabled="!canSubmit"
        @click="handleSubmit"
        class="send-button"
      >
        <SendIcon />
      </button>
    </div>
    
    <!-- Smart suggestions -->
    <div v-if="suggestions.length" class="suggestions">
      <button 
        v-for="suggestion in suggestions"
        :key="suggestion"
        @click="selectSuggestion(suggestion)"
        class="suggestion-chip"
      >
        {{ suggestion }}
      </button>
    </div>
  </div>
</template>

<!-- ChatSelectInput.vue -->
<template>
  <div class="chat-select-input">
    <!-- Option cards for mobile -->
    <div class="option-cards" v-if="$mq === 'mobile'">
      <button
        v-for="option in question.options"
        :key="option.value"
        @click="selectOption(option.value)"
        class="option-card"
        :class="{ active: localValue === option.value }"
      >
        <div class="option-content">
          <span class="option-emoji" v-if="option.emoji">{{ option.emoji }}</span>
          <div class="option-text">
            <span class="option-label">{{ option.label }}</span>
            <span v-if="option.description" class="option-description">
              {{ option.description }}
            </span>
          </div>
        </div>
      </button>
    </div>
    
    <!-- Traditional select for desktop -->
    <select 
      v-else
      v-model="localValue"
      class="chat-select"
      @change="handleSubmit"
    >
      <option value="">{{ question.placeholder || 'Choose an option...' }}</option>
      <option 
        v-for="option in question.options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>
```

### 3. Mobile-First Input Patterns

#### Bottom Sheet Selection (Mobile Alternative to Dropdowns)
```vue
<template>
  <div class="mobile-select-input">
    <!-- Trigger button -->
    <button 
      @click="openBottomSheet"
      class="select-trigger"
      :class="{ 'has-value': modelValue }"
    >
      <span class="trigger-content">
        {{ selectedLabel || placeholder }}
      </span>
      <ChevronDownIcon class="trigger-icon" />
    </button>
    
    <!-- Bottom sheet overlay -->
    <BottomSheet 
      v-model:open="isBottomSheetOpen"
      :title="question.title"
    >
      <div class="bottom-sheet-content">
        <!-- Search (for long lists) -->
        <SearchInput 
          v-if="options.length > 8"
          v-model="searchQuery"
          placeholder="Search options..."
          class="option-search"
        />
        
        <!-- Option list -->
        <div class="option-list">
          <button
            v-for="option in filteredOptions"
            :key="option.value"
            @click="selectOption(option)"
            class="option-item"
            :class="{ 
              selected: modelValue === option.value,
              disabled: option.disabled 
            }"
          >
            <div class="option-content">
              <div class="option-main">
                <span class="option-label">{{ option.label }}</span>
                <CheckIcon v-if="modelValue === option.value" class="check-icon" />
              </div>
              <p v-if="option.description" class="option-description">
                {{ option.description }}
              </p>
            </div>
          </button>
        </div>
        
        <!-- Actions -->
        <div class="bottom-sheet-actions">
          <Button 
            variant="secondary" 
            @click="closeBottomSheet"
            class="cancel-button"
          >
            Cancel
          </Button>
          <Button 
            variant="primary"
            :disabled="!modelValue"
            @click="confirmSelection"
            class="confirm-button"
          >
            Confirm
          </Button>
        </div>
      </div>
    </BottomSheet>
  </div>
</template>

<script setup>
const filteredOptions = computed(() => {
  if (!searchQuery.value) return options.value
  return options.value.filter(option => 
    option.label.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    option.description?.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

function selectOption(option) {
  emit('update:modelValue', option.value)
  if (isSingleSelect.value) {
    closeBottomSheet()
  }
}
</script>
```

#### Multi-Select with Chips
```vue
<template>
  <div class="multi-select-input">
    <!-- Selected items display -->
    <div v-if="selectedItems.length" class="selected-chips">
      <Chip
        v-for="item in selectedItems"
        :key="item.value"
        :label="item.label"
        removable
        @remove="removeItem(item.value)"
      />
    </div>
    
    <!-- Add more button -->
    <button 
      @click="openBottomSheet"
      class="add-more-button"
    >
      <PlusIcon />
      <span>{{ selectedItems.length ? 'Add more' : 'Select options' }}</span>
    </button>
    
    <!-- Multi-select bottom sheet -->
    <BottomSheet 
      v-model:open="isBottomSheetOpen"
      :title="question.title"
    >
      <div class="multi-select-content">
        <!-- Selected count -->
        <div class="selection-summary">
          {{ selectedItems.length }} of {{ options.length }} selected
        </div>
        
        <!-- Options with checkboxes -->
        <div class="checkbox-list">
          <label
            v-for="option in options"
            :key="option.value"
            class="checkbox-option"
          >
            <input
              type="checkbox"
              :value="option.value"
              v-model="localSelected"
              class="checkbox-input"
            />
            <div class="checkbox-content">
              <span class="option-label">{{ option.label }}</span>
              <p v-if="option.description" class="option-description">
                {{ option.description }}
              </p>
            </div>
            <CheckboxIcon class="checkbox-icon" />
          </label>
        </div>
        
        <!-- Quick actions -->
        <div class="quick-actions">
          <Button 
            variant="ghost" 
            @click="selectAll"
            :disabled="localSelected.length === options.length"
          >
            Select All
          </Button>
          <Button 
            variant="ghost" 
            @click="clearAll"
            :disabled="localSelected.length === 0"
          >
            Clear All
          </Button>
        </div>
      </div>
    </BottomSheet>
  </div>
</template>
```

### 4. Button-Based Choice Selection

#### Full-Width Choice Buttons (Alternative to Radio Buttons)
```vue
<template>
  <div class="choice-buttons">
    <button
      v-for="option in options"
      :key="option.value"
      @click="selectChoice(option.value)"
      class="choice-button"
      :class="{ 
        active: modelValue === option.value,
        'single-line': !option.description 
      }"
    >
      <div class="choice-content">
        <!-- Icon or emoji -->
        <div v-if="option.icon || option.emoji" class="choice-icon">
          <component v-if="option.icon" :is="option.icon" />
          <span v-else>{{ option.emoji }}</span>
        </div>
        
        <!-- Text content -->
        <div class="choice-text">
          <span class="choice-label">{{ option.label }}</span>
          <p v-if="option.description" class="choice-description">
            {{ option.description }}
          </p>
        </div>
        
        <!-- Selection indicator -->
        <div class="choice-indicator">
          <CheckCircleIcon 
            v-if="modelValue === option.value"
            class="selected-icon"
          />
          <div v-else class="unselected-circle"></div>
        </div>
      </div>
    </button>
  </div>
</template>

<style>
.choice-button {
  width: 100%;
  padding: 16px;
  margin-bottom: 8px;
  background: var(--surface-color);
  border: 2px solid var(--border-color);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 200ms ease;
  text-align: left;
}

.choice-button:hover {
  border-color: var(--primary-color);
  background: var(--surface-hover);
}

.choice-button.active {
  border-color: var(--primary-color);
  background: var(--primary-50);
  box-shadow: 0 0 0 1px var(--primary-color);
}

.choice-content {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.choice-icon {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}

.choice-text {
  flex: 1;
  min-width: 0;
}

.choice-label {
  display: block;
  font-weight: 500;
  font-size: 16px;
  line-height: 1.4;
  color: var(--text-primary);
}

.choice-description {
  margin: 4px 0 0 0;
  font-size: 14px;
  line-height: 1.4;
  color: var(--text-secondary);
}

.choice-indicator {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
}

.selected-icon {
  color: var(--primary-color);
}

.unselected-circle {
  width: 20px;
  height: 20px;
  border: 2px solid var(--border-color);
  border-radius: 50%;
}
</style>
```

#### Multi-Choice Toggle Buttons
```vue
<template>
  <div class="multi-choice-toggles">
    <div class="choice-grid" :class="gridClasses">
      <button
        v-for="option in options"
        :key="option.value"
        @click="toggleChoice(option.value)"
        class="toggle-choice"
        :class="{ active: isSelected(option.value) }"
      >
        <div class="toggle-content">
          <component 
            v-if="option.icon" 
            :is="option.icon" 
            class="toggle-icon"
          />
          <span v-else-if="option.emoji" class="toggle-emoji">
            {{ option.emoji }}
          </span>
          <span class="toggle-label">{{ option.label }}</span>
        </div>
        
        <!-- Badge for selection count if limited -->
        <div 
          v-if="maxSelections && isSelected(option.value)"
          class="selection-badge"
        >
          {{ getSelectionOrder(option.value) }}
        </div>
      </button>
    </div>
    
    <!-- Selection feedback -->
    <div v-if="maxSelections" class="selection-feedback">
      {{ selectedValues.length }} of {{ maxSelections }} selected
    </div>
  </div>
</template>

<script setup>
const gridClasses = computed(() => ({
  'grid-2': options.value.length <= 4,
  'grid-3': options.value.length > 4 && options.value.length <= 9,
  'grid-1': options.value.length > 9 // Fall back to single column for many options
}))

function toggleChoice(value) {
  if (isSelected(value)) {
    removeChoice(value)
  } else if (!maxSelections.value || selectedValues.value.length < maxSelections.value) {
    addChoice(value)
  }
}
</script>

<style>
.choice-grid {
  display: grid;
  gap: 12px;
}

.grid-1 { grid-template-columns: 1fr; }
.grid-2 { grid-template-columns: repeat(2, 1fr); }
.grid-3 { grid-template-columns: repeat(3, 1fr); }

@media (max-width: 480px) {
  .grid-3 { grid-template-columns: repeat(2, 1fr); }
}

.toggle-choice {
  position: relative;
  padding: 16px 12px;
  background: var(--surface-color);
  border: 2px solid var(--border-color);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 200ms ease;
  min-height: 80px;
}

.toggle-choice.active {
  border-color: var(--primary-color);
  background: var(--primary-50);
  transform: scale(0.98);
}

.toggle-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-align: center;
}

.toggle-icon,
.toggle-emoji {
  font-size: 24px;
}

.toggle-label {
  font-size: 14px;
  font-weight: 500;
  line-height: 1.2;
}

.selection-badge {
  position: absolute;
  top: -6px;
  right: -6px;
  width: 20px;
  height: 20px;
  background: var(--primary-color);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
}
</style>
```

### 5. Smart Form Validation & UX

#### Real-Time Validation with Helpful Feedback
```vue
<script setup>
import { useFormValidation } from '~/composables/useFormValidation'

const {
  errors,
  warnings,
  suggestions,
  isValid,
  validate,
  validateField
} = useFormValidation(formSchema)

// Progressive validation - don't show errors until user interaction
const showErrors = ref(false)
const hasInteracted = ref(false)

watch(modelValue, () => {
  if (hasInteracted.value) {
    validateField(fieldName.value, modelValue.value)
  }
})

function handleBlur() {
  hasInteracted.value = true
  showErrors.value = true
  validateField(fieldName.value, modelValue.value)
}
</script>

<template>
  <div class="form-field" :class="fieldState">
    <label class="field-label">
      {{ question.title }}
      <span v-if="question.required" class="required-indicator">*</span>
    </label>
    
    <div class="field-input-container">
      <input
        v-model="modelValue"
        :type="inputType"
        :placeholder="question.placeholder"
        :inputmode="question.inputMode"
        class="field-input"
        @blur="handleBlur"
        @focus="handleFocus"
      />
      
      <!-- Input state icons -->
      <div class="input-state-icon">
        <CheckIcon v-if="isValid && hasInteracted" class="success-icon" />
        <AlertIcon v-else-if="errors.length && showErrors" class="error-icon" />
        <InfoIcon v-else-if="warnings.length" class="warning-icon" />
      </div>
    </div>
    
    <!-- Validation feedback -->
    <div v-if="showErrors && errors.length" class="field-errors">
      <p v-for="error in errors" :key="error" class="error-message">
        {{ error }}
      </p>
    </div>
    
    <!-- Helpful suggestions -->
    <div v-else-if="suggestions.length" class="field-suggestions">
      <p class="suggestion-text">{{ suggestions[0] }}</p>
    </div>
    
    <!-- Character count for text inputs -->
    <div 
      v-if="question.maxLength" 
      class="character-count"
      :class="{ 'near-limit': isNearLimit }"
    >
      {{ modelValue.length }} / {{ question.maxLength }}
    </div>
  </div>
</template>
```

### 6. Form Accessibility & Inclusive Design

#### Screen Reader & Keyboard Navigation
```vue
<template>
  <div 
    class="accessible-form"
    role="form"
    :aria-label="formTitle"
  >
    <!-- Skip link for keyboard users -->
    <a href="#form-submit" class="skip-link">
      Skip to submit button
    </a>
    
    <!-- Progress for screen readers -->
    <div 
      role="progressbar"
      :aria-valuenow="currentStep"
      :aria-valuemin="0"
      :aria-valuemax="totalSteps"
      :aria-label="`Step ${currentStep + 1} of ${totalSteps}`"
      class="sr-only"
    >
    </div>
    
    <!-- Current question with proper labeling -->
    <fieldset class="question-fieldset">
      <legend class="question-legend">
        {{ currentQuestion.title }}
        <span v-if="currentQuestion.required" aria-label="required">*</span>
      </legend>
      
      <!-- Input with proper associations -->
      <div class="input-group">
        <input
          :id="questionId"
          v-model="currentValue"
          :aria-describedby="hasHelp ? `${questionId}-help` : undefined"
          :aria-invalid="hasError ? 'true' : 'false'"
          :aria-errormessage="hasError ? `${questionId}-error` : undefined"
        />
        
        <!-- Help text -->
        <div 
          v-if="currentQuestion.subtitle"
          :id="`${questionId}-help`"
          class="help-text"
        >
          {{ currentQuestion.subtitle }}
        </div>
        
        <!-- Error messages -->
        <div 
          v-if="hasError"
          :id="`${questionId}-error`"
          role="alert"
          class="error-message"
        >
          {{ errorMessage }}
        </div>
      </div>
    </fieldset>
    
    <!-- Keyboard accessible navigation -->
    <div class="form-navigation" role="group" aria-label="Form navigation">
      <button
        v-if="canGoBack"
        type="button"
        @click="previousStep"
        class="nav-button secondary"
        :aria-label="`Go back to step ${currentStep}`"
      >
        <ArrowLeftIcon aria-hidden="true" />
        Back
      </button>
      
      <button
        type="button"
        @click="nextStep"
        :disabled="!isCurrentStepValid"
        class="nav-button primary"
        :aria-label="isLastStep ? 'Submit form' : `Continue to step ${currentStep + 2}`"
        id="form-submit"
      >
        {{ isLastStep ? 'Submit' : 'Continue' }}
        <ArrowRightIcon v-if="!isLastStep" aria-hidden="true" />
      </button>
    </div>
  </div>
</template>

<style>
/* Screen reader only content */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Skip link for keyboard navigation */
.skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: var(--primary-color);
  color: white;
  padding: 8px;
  text-decoration: none;
  border-radius: 4px;
  z-index: 1000;
}

.skip-link:focus {
  top: 6px;
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .field-input {
    border: 2px solid;
  }
  
  .choice-button.active {
    outline: 3px solid;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .form-container * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
</style>
```

This comprehensive form system creates a modern, accessible, and mobile-first form experience that rivals the best native mobile apps while maintaining web accessibility standards and progressive enhancement principles.