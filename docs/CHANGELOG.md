# Changelog

All notable changes to the Skooledin AI project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Initial project setup with Nuxt 3 framework
- PWA configuration with @vite-pwa/nuxt for offline support
- Skooledin brand identity with purple (#7c3aed) as primary color
- Comprehensive design system with educational-focused patterns
- TypeScript strict mode configuration
- ESLint v9 flat config with Vue and TypeScript support
- Tailwind CSS with custom design tokens
- Subject-specific color system for all learning areas
- AI-specific colors for thinking states and responses
- Mobile-first spacing system with 44px minimum touch targets
- Educational typography scale for questions, answers, and study materials
- WhatsApp-style chat interface patterns documentation
- Component style guide with Vue code examples
- Design patterns for progressive disclosure and spaced repetition
- Pinia state management with persistence plugin
- Dexie.js for IndexedDB offline storage
- Anthropic Claude SDK for AI integration
- Safe area handling for modern mobile devices
- Documentation structure (vision, features, tasks, decisions, context)

### Changed
- Migrated from ESLint v8 to v9 flat config format
- Updated primary color from default blue to Skooledin purple
- Enhanced typography system with educational-specific styles
- Improved spacing tokens with mobile and educational UI considerations

### Fixed
- TypeScript module resolution errors with ERR_MODULE_NOT_FOUND
- ESLint auto-import errors for Nuxt/Vue composables
- Popover component duplicate key and expression issues
- Reduced ESLint errors from 194 to 0 (38 warnings remain)

### Security
- Configured TypeScript strict mode for better type safety
- Added ESLint rules for code quality and consistency

## [0.0.1] - 2024-01-04

### Added
- Project initialization from Nuxtplate template
- Basic project structure and configuration files
- GitHub repository creation (skooledin-ai)
- Initial README with project overview
- CLAUDE.md with build commands and recent fixes

### Infrastructure
- Git repository initialized
- GitHub repository: https://github.com/flexpertsdev/skooledin-ai
- Netlify deployment ready configuration
- PWA manifest and service worker setup

---

## Version History

- **0.0.1** (2024-01-04): Project initialization and setup
- **Unreleased**: Design system integration and documentation

## Semantic Versioning

This project follows semantic versioning:
- **MAJOR** version for incompatible API changes
- **MINOR** version for backwards-compatible functionality additions  
- **PATCH** version for backwards-compatible bug fixes

## Release Process

1. Update version in `package.json`
2. Update CHANGELOG.md with release notes
3. Create git tag: `git tag -a v0.1.0 -m "Release version 0.1.0"`
4. Push tag: `git push origin v0.1.0`
5. Create GitHub release with changelog excerpt