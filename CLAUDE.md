# Project: Skooledin AI - Nuxt 3 Educational Platform

## Build and Development Commands

### Essential Commands
- **Build**: `npm run build`
- **Dev**: `npm run dev`
- **Type Check**: `npm run typecheck`
- **Generate Static**: `npm run generate`
- **Preview**: `npm run preview`

### Code Quality
- **Lint**: `npm run lint`
- **Lint Fix**: `npm run lint:fix`

## Recent Fixes Applied

1. **TypeScript Import Errors**: Created `types/nuxt-imports.d.ts` to resolve `#imports` and `#app/nuxt` module declarations
2. **Carousel SSR Issue**: Fixed `lazyLoadOnVisible` function in `utils/lazyComponent.ts` to handle SSR properly
3. **Build Scripts**: Added typecheck and lint scripts to package.json
4. **ESLint Configuration**: Migrated from v8 config format to v9 flat config format (eslint.config.js)
   - Added comprehensive Nuxt and Vue auto-imports as globals
   - Configured for TypeScript and Vue support
   - Disabled `@typescript-eslint/no-explicit-any` warnings
   - Disabled `vue/require-default-prop` warnings
   - Set unused vars to warnings with proper ignore patterns
5. **Tailwind CSS Removal**: Removed Tailwind CSS from the project
   - Converted all @apply directives to regular CSS in login.vue, signup.vue, and dashboard.vue
   - Removed @nuxtjs/tailwindcss module from nuxt.config.ts
   - Removed tailwind.config.js and Tailwind directives from base.css
   - Added gray color scale to support existing color usage
6. **Store Implementations**: Created missing Pinia stores
   - teacher.ts: Teacher-specific data management
   - course.ts: Course enrollment and progress tracking
   - parent.ts: Parent dashboard and child monitoring
   - notebook.ts: Note management with search/filter
   - ai-chat.ts: AI conversation state management
7. **Server Middleware**: Fixed auth.ts middleware export

## Project Structure Updates

- **Components**: UI components in `components/` directory
  - `ui/`: Core UI components (Button, Card, Modal, etc.)
  - `overlay/`: Overlay components (Modal, Drawer, BottomSheet, etc.)
  - `form/`: Form components (Input, Select, etc.)
  - `layout/`: Layout components (Container, Grid, Row, etc.)
  - `content/`: Content components (MasonryGrid, etc.)
  - `study/`: Study-related components (CourseCard, FlashcardDeck, etc.)
  - `teacher/`: Teacher dashboard components
  - `parent/`: Parent dashboard components
  - `chat/`: AI chat components
  - `notebook/`: Note-taking components

- **Pages**: Application pages in `pages/` directory
  - `/auth/`: Authentication pages (login, signup)
  - `/app/student/`: Student dashboard and features
  - `/app/teacher/`: Teacher dashboard and features
  - `/app/parent/`: Parent dashboard and features
  - `/demo/`: Component demonstration pages

- **Stores**: Pinia state management in `stores/` directory
  - `auth.ts`: Authentication state
  - `teacher.ts`: Teacher-specific state
  - `course.ts`: Course management
  - `parent.ts`: Parent dashboard state
  - `notebook.ts`: Note management
  - `ai-chat.ts`: AI chat sessions

## Build Status

✅ **Build successful** - The project now builds without errors on Netlify.

## Known Issues

1. **Sourcemap Warnings**: Some CSS warnings during build (non-critical)
2. **Placeholder Files**: Many components and services are placeholders awaiting implementation

## Project Structure

- **Components**: UI components in `components/` directory
  - `ui/`: Core UI components (Button, Card, Modal, etc.)
  - `overlay/`: Overlay components (Modal, Drawer, BottomSheet, etc.)
  - `form/`: Form components (Input, Select, etc.)
  - `layout/`: Layout components (Container, Grid, Row, etc.)
  - `content/`: Content components (MasonryGrid, etc.)

- **Demo Pages**: Located in `pages/demo/`
  - `/demo`: Main demo index
  - `/demo/navigation`: Navigation components demo
  - `/demo/overlays`: Overlay components demo
  - `/demo/layouts`: Layout components demo
  - `/demo/content`: Content components demo
  - `/demo/carousel`: Carousel and swipe components demo
  - `/demo/forms`: Form components demo
  - `/demo/images`: Image optimization demo
  - `/demo/accessible-forms`: Accessible form patterns demo
  - `/demo/lazy-loading`: Lazy loading demo

## Testing

### Test Suite
Comprehensive test coverage for authentication and core features:
- **Unit Tests**: Component and store testing in isolation
- **Integration Tests**: Complete user workflow testing
- **E2E Tests**: Full page and user journey testing

### Test Commands
```bash
# Run all tests
npm test

# Run specific test types
npm run test:unit          # Unit tests only
npm run test:integration   # Integration tests only
npm run test:e2e          # E2E tests only
npm run test:auth         # Auth-specific tests

# Development
npm run test:watch        # Watch mode
npm run test:coverage     # Coverage report
```

### Manual Testing
Always run these commands after making changes:
1. `npm run typecheck` - Ensures TypeScript types are correct
2. `npm run lint` - Check code style
3. `npm run test:unit` - Run unit tests
4. `npm run build` - Ensures the project builds successfully
5. `npm run dev` - Test the application in development mode