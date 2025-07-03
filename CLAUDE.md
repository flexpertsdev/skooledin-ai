# Project: Nuxt 3 Component Library

## Build and Development Commands

### Essential Commands
- **Build**: `npm run build`
- **Dev**: `npm run dev`
- **Type Check**: `npm run typecheck`
- **Generate Static**: `npm run generate`
- **Preview**: `npm run preview`

### Code Quality
- **Lint**: `npm run lint` (Note: ESLint config needs updating to v9 format)
- **Lint Fix**: `npm run lint:fix`

## Recent Fixes Applied

1. **TypeScript Import Errors**: Created `types/nuxt-imports.d.ts` to resolve `#imports` and `#app/nuxt` module declarations
2. **Carousel SSR Issue**: Fixed `lazyLoadOnVisible` function in `utils/lazyComponent.ts` to handle SSR properly
3. **Build Scripts**: Added typecheck and lint scripts to package.json

## Known Issues

1. **ESLint Configuration**: Currently using v8 config format (.eslintrc.js), needs migration to v9 flat config format
2. **Sourcemap Warnings**: TailwindCSS plugin generates warnings about missing sourcemaps (non-critical)

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

Always run these commands after making changes:
1. `npm run typecheck` - Ensures TypeScript types are correct
2. `npm run build` - Ensures the project builds successfully
3. `npm run dev` - Test the application in development mode