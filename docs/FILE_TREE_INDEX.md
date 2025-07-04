# Skooledin AI - File Tree Index

*Last Updated: January 4, 2024*

```
skooledin-ai/
├── 📄 app.vue                          # Root Vue component
├── 📄 nuxt.config.ts                   # Nuxt configuration with Firebase, PWA settings
├── 📄 tailwind.config.js               # Tailwind CSS configuration
├── 📄 eslint.config.js                 # ESLint v9 flat config
├── 📄 package.json                     # Project dependencies and scripts
├── 📄 .env.example                     # Environment variables template
├── 📄 .gitignore                       # Git ignore rules
├── 📄 CLAUDE.md                        # Project context for Claude
│
├── 📁 assets/                          # Static assets and design tokens
│   ├── 📁 styles/
│   │   ├── base.css                    # Base styles and resets
│   │   └── tokens.css                  # CSS custom properties
│   └── 📁 tokens/                      # Design token TypeScript files
│       ├── index.ts                    # Token exports
│       ├── colors.ts                   # Skooledin purple, subjects, AI states
│       ├── spacing.ts                  # Mobile-first spacing, educational spacing
│       ├── typography.ts               # Font scales, educational text styles
│       ├── radius.ts                   # Border radius tokens
│       └── shadows.ts                  # Shadow elevation system
│
├── 📁 components/                      # Vue components (existing mobile-first system)
│   ├── 📁 ui/                         # Core UI components
│   │   ├── Button.vue                  # Primary button component (exists)
│   │   ├── Card.vue                    # Card container
│   │   ├── ErrorBoundary.vue           # Error handling wrapper
│   │   ├── LoadingSpinner.vue          # Loading states
│   │   ├── Toast.vue                   # Toast notifications
│   │   ├── ToastContainer.vue          # Toast manager
│   │   ├── Tooltip.vue                 # Hover tooltips
│   │   ├── Popover.vue                 # Click popovers
│   │   ├── ResponsiveImage.vue         # Optimized images
│   │   ├── ImageGallery.vue            # Image viewer
│   │   ├── Carousel.vue                # Swipeable carousel
│   │   └── PageView.vue                # Page wrapper
│   │
│   ├── 📁 form/                        # Form components
│   │   ├── Input.vue                   # Text input (exists)
│   │   ├── Select.vue                  # Dropdown select (exists)
│   │   ├── ChatInput.vue               # Chat message input
│   │   ├── ChoiceButtons.vue           # Radio/checkbox groups
│   │   ├── AccessibleForm.vue          # Form wrapper
│   │   └── BottomSheetSelect.vue      # Mobile select
│   │
│   ├── 📁 layout/                      # Layout primitives (Flutter-inspired)
│   │   ├── LayoutContainer.vue         # Max-width container
│   │   ├── LayoutRow.vue               # Horizontal flex
│   │   ├── LayoutColumn.vue            # Vertical flex
│   │   ├── LayoutStack.vue             # Vertical spacing
│   │   ├── LayoutGrid.vue              # Responsive grid
│   │   ├── LayoutWrap.vue              # Flex wrap
│   │   ├── LayoutAligned.vue           # Alignment wrapper
│   │   ├── LayoutExpanded.vue          # Flex expand
│   │   └── LayoutSafeArea.vue          # Mobile safe areas
│   │
│   ├── 📁 navigation/                  # Navigation components
│   │   ├── NavBar.vue                  # Top navigation
│   │   ├── BottomNav.vue               # Mobile bottom tabs
│   │   ├── SideBar.vue                 # Desktop sidebar
│   │   └── TabBar.vue                  # Tab navigation
│   │
│   ├── 📁 overlay/                     # Modal/overlay components
│   │   ├── Modal.vue                   # Standard modal
│   │   ├── Drawer.vue                  # Slide-out drawer
│   │   ├── BottomSheet.vue             # Mobile bottom sheet
│   │   └── ActionSheet.vue             # Action menu
│   │
│   ├── 📁 content/                     # Content display
│   │   ├── CardGrid.vue                # Card layout grid
│   │   └── MasonryGrid.vue             # Pinterest-style grid
│   │
│   ├── 📁 chat/                        # AI chat components (placeholders)
│   │   ├── ChatInterface.vue           # Main chat UI
│   │   ├── MessageBubble.vue           # Message display
│   │   └── ContextBar.vue              # Subject switcher
│   │
│   ├── 📁 notebook/                    # Notebook components (placeholders)
│   │   ├── NoteCard.vue                # Note preview card
│   │   └── NoteEditor.vue              # Rich text editor
│   │
│   └── 📁 study/                       # Study tool components (placeholders)
│       ├── FlashcardDeck.vue           # Flashcard interface
│       └── QuizInterface.vue           # Quiz component
│
├── 📁 composables/                     # Vue composables
│   ├── useTheme.ts                     # Theme management
│   ├── useResponsive.ts                # Breakpoint detection
│   ├── useLayout.ts                    # Layout utilities
│   ├── useSafeArea.ts                  # Safe area insets
│   ├── useGesture.ts                   # Touch gestures
│   ├── useToast.ts                     # Toast notifications
│   ├── useFocusTrap.ts                 # Focus management
│   ├── useFormValidation.ts            # Form validation
│   ├── useFormNavigation.ts            # Form keyboard nav
│   ├── useAI.ts                        # AI interaction (placeholder)
│   ├── useOffline.ts                   # Offline status (placeholder)
│   └── useStudySession.ts              # Study tracking (placeholder)
│
├── 📁 layouts/                         # Nuxt layouts
│   ├── default.vue                     # Default layout
│   ├── app.vue                         # App layout (placeholder)
│   └── auth.vue                        # Auth layout (placeholder)
│
├── 📁 pages/                           # Nuxt pages
│   ├── index.vue                       # Landing page (updated)
│   ├── about.vue                       # About page (placeholder)
│   ├── features.vue                    # Features page (placeholder)
│   │
│   ├── 📁 auth/                        # Authentication pages
│   │   ├── login.vue                   # Login (placeholder)
│   │   └── signup.vue                  # Sign up (placeholder)
│   │
│   ├── 📁 onboarding/                  # Onboarding flow
│   │   └── index.vue                   # Onboarding (placeholder)
│   │
│   ├── 📁 app/                         # App pages (all placeholders)
│   │   ├── index.vue                   # Dashboard
│   │   ├── chat.vue                    # AI Chat
│   │   ├── notebook.vue                # Notebook
│   │   ├── study.vue                   # Study tools
│   │   ├── settings.vue                # Settings
│   │   ├── feed.vue                    # Activity feed
│   │   ├── classes.vue                 # Classes
│   │   ├── tutor.vue                   # Book tutor
│   │   └── progress.vue                # Progress tracking
│   │
│   └── 📁 demo/                        # Component demos
│       ├── index.vue                   # Demo index
│       ├── navigation.vue              # Nav components
│       ├── overlays.vue                # Modals/sheets
│       ├── layouts.vue                 # Layout system
│       ├── content.vue                 # Content displays
│       ├── carousel.vue                # Carousel demo
│       ├── forms.vue                   # Form components
│       ├── images.vue                  # Image optimization
│       ├── accessible-forms.vue        # A11y patterns
│       └── lazy-loading.vue            # Lazy loading
│
├── 📁 middleware/                      # Route middleware
│   ├── auth.ts                         # Authentication guard
│   ├── onboarding.ts                   # Onboarding check
│   └── role.ts                         # Role-based access
│
├── 📁 plugins/                         # Nuxt plugins
│   ├── firebase.client.ts              # Firebase initialization
│   ├── auth.client.ts                  # Auth state listener
│   └── responsive.client.ts            # Responsive helpers
│
├── 📁 services/                        # External services
│   ├── firebase.ts                     # Firebase helpers
│   ├── ai.ts                           # AI service (placeholder)
│   └── offline.ts                      # Offline service (placeholder)
│
├── 📁 stores/                          # Pinia stores
│   ├── auth.ts                         # User authentication
│   ├── chat.ts                         # Chat state (placeholder)
│   ├── notebook.ts                     # Notebook state (placeholder)
│   ├── study.ts                        # Study state (placeholder)
│   └── context.ts                      # Learning context (placeholder)
│
├── 📁 types/                           # TypeScript types
│   ├── nuxt-imports.d.ts               # Nuxt type declarations
│   ├── models.ts                       # Data models (placeholder)
│   └── api.ts                          # API types (placeholder)
│
├── 📁 utils/                           # Utility functions
│   ├── lazyComponent.ts                # Lazy loading helper
│   ├── imageOptimization.ts            # Image utilities
│   ├── spacedRepetition.ts             # Spaced rep algorithm (placeholder)
│   ├── pdfProcessor.ts                 # PDF utilities (placeholder)
│   └── voiceRecorder.ts                # Voice recording (placeholder)
│
├── 📁 public/                          # Static files
│   └── icons/                          # PWA icons (to be added)
│
└── 📁 docs/                            # Documentation
    ├── features.md                     # Feature requirements
    ├── tasks.md                        # Current tasks
    ├── CHANGELOG.md                    # Version history
    ├── component-style-guide.md        # Component patterns
    ├── design-patterns.md              # Design patterns
    ├── component-inventory.md          # Complete component list
    └── FILE_TREE_INDEX.md              # This file
```

## Key Directories Explained

### `/assets/`
Contains uncompiled assets that will be processed by build tools:
- **styles/**: Global CSS files with design tokens
- **tokens/**: TypeScript design system tokens for type-safe styling

### `/components/`
Reusable Vue components organized by category:
- **ui/**: Core UI components (buttons, cards, etc.)
- **overlay/**: Modal-like components
- **form/**: Form input components
- **layout/**: Layout structure components
- **content/**: Content display components

### `/composables/`
Vue 3 composition API utilities for:
- Authentication flows
- Responsive design
- Touch gestures
- Theme management
- Safe area handling

### `/docs/`
Comprehensive project documentation:
- Design decisions and rationale
- Feature specifications
- Sprint planning
- User research
- Component guidelines

### `/pages/`
Nuxt file-based routing:
- **demo/**: Component demonstration pages
- Future: chat/, notebook/, profile/ pages

## Configuration Files

- **nuxt.config.ts**: Main Nuxt configuration with PWA setup
- **tailwind.config.js**: Tailwind with Skooledin design tokens  
- **eslint.config.js**: ESLint v9 configuration
- **tsconfig.json**: TypeScript strict mode settings
- **package.json**: Dependencies and scripts

## Design System Integration

The design system is fully integrated with:
- Skooledin purple (#7c3aed) as primary color
- Subject-specific colors for educational content
- Mobile-first spacing with 44px touch targets
- Educational typography scales
- WhatsApp-style UI patterns

## Next Steps (Per tasks.md)

1. **Authentication Setup** (Task 3)
2. **Layout Components** (Task 4)  
3. **Database Layer** (Task 5)
4. **AI Service Integration** (Task 6)

## Notes

- Using Nuxt 3 with Vue 3 Composition API
- PWA-ready with offline support
- TypeScript strict mode enabled
- Mobile-first responsive design
- Accessibility-focused components