<template>
  <nav 
    class="navbar"
    :class="navbarClasses"
    :style="navbarStyles"
    role="navigation"
    :aria-label="ariaLabel"
  >
    <LayoutContainer :fluid="fluid" :padding="false">
      <div class="navbar-content">
        <!-- Logo/Brand -->
        <div class="navbar-brand">
          <NuxtLink to="/" class="brand-link">
            <slot name="logo">
              <span class="brand-text">{{ brand }}</span>
            </slot>
          </NuxtLink>
        </div>

        <!-- Desktop Navigation -->
        <div v-if="!isMobile" class="navbar-nav">
          <div class="nav-items">
            <slot name="nav-items" :items="navItems">
              <NuxtLink
                v-for="item in navItems"
                :key="item.id"
                :to="item.to"
                class="nav-item"
                :class="{ active: isActive(item.to) }"
              >
                {{ item.label }}
              </NuxtLink>
            </slot>
          </div>
        </div>

        <!-- Actions -->
        <div class="navbar-actions">
          <slot name="actions" />
          
          <!-- Mobile Menu Toggle -->
          <button
            v-if="isMobile"
            @click="toggleMobileMenu"
            class="mobile-menu-toggle"
            :aria-expanded="isMobileMenuOpen"
            aria-label="Toggle navigation menu"
          >
            <span class="hamburger" :class="{ active: isMobileMenuOpen }">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>
      </div>
    </LayoutContainer>

    <!-- Mobile Menu -->
    <Transition name="mobile-menu">
      <div v-if="isMobile && isMobileMenuOpen" class="mobile-menu">
        <div class="mobile-menu-content">
          <slot name="mobile-nav" :items="navItems">
            <NuxtLink
              v-for="item in navItems"
              :key="item.id"
              :to="item.to"
              class="mobile-nav-item"
              :class="{ active: isActive(item.to) }"
              @click="closeMobileMenu"
            >
              {{ item.label }}
            </NuxtLink>
          </slot>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup lang="ts">
import { useScroll } from '@vueuse/core'

interface NavItem {
  id: string
  label: string
  to: string
}

interface Props {
  brand?: string
  navItems?: NavItem[]
  fluid?: boolean
  sticky?: boolean
  transparent?: boolean
  hideOnScroll?: boolean
  collapseOnScroll?: boolean
  ariaLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  brand: 'Brand',
  navItems: () => [],
  fluid: false,
  sticky: true,
  transparent: false,
  hideOnScroll: false,
  collapseOnScroll: true,
  ariaLabel: 'Main navigation'
})

const route = useRoute()
const { isMobile } = useResponsive()
const { y: scrollY, directions } = useScroll(window)

const isMobileMenuOpen = ref(false)
const lastScrollY = ref(0)
const isScrollingDown = ref(false)

// Track scroll direction
watch(scrollY, (newY) => {
  isScrollingDown.value = newY > lastScrollY.value && newY > 100
  lastScrollY.value = newY
})

const navbarClasses = computed(() => ({
  'navbar-sticky': props.sticky,
  'navbar-transparent': props.transparent && scrollY.value < 50,
  'navbar-scrolled': scrollY.value > 50,
  'navbar-hidden': props.hideOnScroll && isScrollingDown.value,
  'navbar-collapsed': props.collapseOnScroll && scrollY.value > 100
}))

const navbarStyles = computed(() => ({
  '--navbar-height': props.collapseOnScroll && scrollY.value > 100 ? '56px' : '80px'
}))

const isActive = (path: string) => {
  return route.path === path || route.path.startsWith(path + '/')
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
  // Prevent body scroll when menu is open
  if (isMobileMenuOpen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
  document.body.style.overflow = ''
}

// Close mobile menu on route change
watch(() => route.path, () => {
  closeMobileMenu()
})

// Close mobile menu on escape
onMounted(() => {
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && isMobileMenuOpen.value) {
      closeMobileMenu()
    }
  }
  window.addEventListener('keydown', handleEscape)
  
  onUnmounted(() => {
    window.removeEventListener('keydown', handleEscape)
    document.body.style.overflow = ''
  })
})
</script>

<style scoped>
.navbar {
  position: relative;
  width: 100%;
  height: var(--navbar-height, 80px);
  background-color: var(--surface-background);
  border-bottom: 1px solid var(--border-default);
  transition: all var(--transition-normal) var(--easing-standard);
  z-index: var(--z-index-sticky);
}

.navbar-sticky {
  position: sticky;
  top: 0;
}

.navbar-transparent {
  background-color: transparent;
  border-bottom-color: transparent;
}

.navbar-scrolled {
  background-color: var(--surface-background);
  box-shadow: var(--shadow-sm);
}

.navbar-hidden {
  transform: translateY(-100%);
}

.navbar-collapsed {
  height: 56px;
}

.navbar-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 var(--spacing-md);
}

/* Brand */
.navbar-brand {
  flex-shrink: 0;
}

.brand-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: var(--text-primary);
  font-weight: var(--font-weight-semibold);
  font-size: var(--font-size-xl);
  transition: opacity var(--transition-fast) var(--easing-standard);
}

.brand-link:hover {
  opacity: 0.8;
}

/* Desktop Navigation */
.navbar-nav {
  flex: 1;
  display: flex;
  justify-content: center;
  margin: 0 var(--spacing-lg);
}

.nav-items {
  display: flex;
  gap: var(--spacing-lg);
}

.nav-item {
  position: relative;
  padding: var(--spacing-sm) var(--spacing-md);
  color: var(--text-secondary);
  text-decoration: none;
  font-weight: var(--font-weight-medium);
  transition: color var(--transition-fast) var(--easing-standard);
}

.nav-item:hover {
  color: var(--text-primary);
}

.nav-item.active {
  color: var(--primary-color);
}

.nav-item.active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 2px;
  background-color: var(--primary-color);
}

/* Actions */
.navbar-actions {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

/* Mobile Menu Toggle */
.mobile-menu-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
}

.hamburger {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 24px;
  height: 24px;
}

.hamburger span {
  display: block;
  width: 100%;
  height: 2px;
  background-color: var(--text-primary);
  transition: all var(--transition-fast) var(--easing-standard);
  position: absolute;
}

.hamburger span:nth-child(1) {
  top: 6px;
}

.hamburger span:nth-child(2) {
  top: 50%;
  transform: translateY(-50%);
}

.hamburger span:nth-child(3) {
  bottom: 6px;
}

.hamburger.active span:nth-child(1) {
  top: 50%;
  transform: translateY(-50%) rotate(45deg);
}

.hamburger.active span:nth-child(2) {
  opacity: 0;
}

.hamburger.active span:nth-child(3) {
  bottom: 50%;
  transform: translateY(50%) rotate(-45deg);
}

/* Mobile Menu */
.mobile-menu {
  position: fixed;
  top: var(--navbar-height, 80px);
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--surface-background);
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.mobile-menu-content {
  padding: var(--spacing-lg);
}

.mobile-nav-item {
  display: block;
  padding: var(--spacing-md) var(--spacing-lg);
  margin: 0 calc(-1 * var(--spacing-lg));
  color: var(--text-primary);
  text-decoration: none;
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-medium);
  transition: background-color var(--transition-fast) var(--easing-standard);
}

.mobile-nav-item:hover {
  background-color: var(--surface-default);
}

.mobile-nav-item.active {
  color: var(--primary-color);
  background-color: var(--color-primary-50);
}

/* Transitions */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity var(--transition-fast) var(--easing-standard),
              transform var(--transition-fast) var(--easing-standard);
}

.mobile-menu-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Collapsed state */
.navbar-collapsed .navbar-content {
  padding: 0 var(--spacing-sm);
}

.navbar-collapsed .brand-text {
  font-size: var(--font-size-lg);
}

.navbar-collapsed .nav-item {
  padding: var(--spacing-xs) var(--spacing-sm);
  font-size: var(--font-size-sm);
}

/* Dark mode adjustments */
.dark-mode .navbar-transparent {
  background-color: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(10px);
}

.dark-mode .mobile-nav-item.active {
  background-color: rgba(59, 130, 246, 0.1);
}
</style>