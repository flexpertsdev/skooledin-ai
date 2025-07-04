<template>
  <nav class="bottom-nav" :class="bottomNavClasses" role="navigation" :aria-label="ariaLabel">
    <div class="bottom-nav-content">
      <button
        v-for="item in navItems"
        :key="item.id"
        class="bottom-nav-item"
        :class="{ active: isActive(item) }"
        :aria-label="item.ariaLabel || item.label"
        :aria-current="isActive(item) ? 'page' : undefined"
        @click="handleItemClick(item)"
      >
        <span v-if="item.icon" class="nav-icon">
          <component :is="item.icon" v-if="typeof item.icon !== 'string'" />
          <span v-else v-html="item.icon" />
        </span>
        <span class="nav-label">{{ item.label }}</span>
        <span v-if="item.badge" class="nav-badge">{{ item.badge }}</span>
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
interface NavItem {
  id: string
  label: string
  icon?: any // Can be component or HTML string
  to?: string
  action?: () => void
  badge?: string | number
  ariaLabel?: string
}

interface Props {
  navItems: NavItem[]
  activeId?: string
  showLabels?: boolean
  hideOnScroll?: boolean
  safeArea?: boolean
  ariaLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  showLabels: true,
  hideOnScroll: false,
  safeArea: true,
  ariaLabel: 'Bottom navigation'
})

const emit = defineEmits<{
  'update:activeId': [id: string]
  'item-click': [item: NavItem]
}>()

const router = useRouter()
const route = useRoute()
const { y: scrollY } = useScroll(window)
const { isMobile } = useResponsive()

const lastScrollY = ref(0)
const isScrollingDown = ref(false)

// Track scroll direction
watch(scrollY, newY => {
  if (props.hideOnScroll) {
    isScrollingDown.value = newY > lastScrollY.value && newY > 50
    lastScrollY.value = newY
  }
})

const bottomNavClasses = computed(() => ({
  'bottom-nav-hidden': props.hideOnScroll && isScrollingDown.value,
  'bottom-nav-safe-area': props.safeArea,
  'bottom-nav-labels-hidden': !props.showLabels
}))

const isActive = (item: NavItem) => {
  if (props.activeId !== undefined) {
    return item.id === props.activeId
  }
  // Auto-detect active state based on route
  if (item.to) {
    return route.path === item.to || route.path.startsWith(item.to + '/')
  }
  return false
}

const handleItemClick = (item: NavItem) => {
  emit('item-click', item)
  emit('update:activeId', item.id)

  if (item.action) {
    item.action()
  } else if (item.to) {
    router.push(item.to)
  }
}

// Haptic feedback on mobile
const triggerHaptic = () => {
  if ('vibrate' in navigator && isMobile.value) {
    navigator.vibrate(10)
  }
}

// Add haptic feedback to clicks
const handleItemClickWithHaptic = (item: NavItem) => {
  triggerHaptic()
  handleItemClick(item)
}
</script>

<style scoped>
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: var(--surface-background);
  border-top: 1px solid var(--border-default);
  box-shadow: var(--shadow-lg);
  z-index: var(--z-index-sticky);
  transition: transform var(--transition-normal) var(--easing-decelerate);
}

.bottom-nav-hidden {
  transform: translateY(100%);
}

.bottom-nav-safe-area {
  padding-bottom: max(8px, var(--safe-area-inset-bottom));
}

.bottom-nav-content {
  display: flex;
  align-items: stretch;
  justify-content: space-around;
  height: 56px;
  padding: 0 var(--spacing-xs);
}

/* Navigation Items */
.bottom-nav-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  padding: var(--spacing-xs);
  background: none;
  border: none;
  color: var(--text-secondary);
  text-decoration: none;
  cursor: pointer;
  position: relative;
  transition: all var(--transition-fast) var(--easing-standard);
  -webkit-tap-highlight-color: transparent;
  outline: none;
}

.bottom-nav-item:active {
  transform: scale(0.95);
}

.bottom-nav-item.active {
  color: var(--primary-color);
}

/* Icon */
.nav-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  font-size: 24px;
  transition: transform var(--transition-fast) var(--easing-standard);
}

.bottom-nav-item.active .nav-icon {
  transform: scale(1.1);
}

/* Label */
.nav-label {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  line-height: 1.2;
  max-width: 64px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.bottom-nav-labels-hidden .nav-label {
  display: none;
}

.bottom-nav-labels-hidden .nav-icon {
  width: 28px;
  height: 28px;
  font-size: 28px;
}

/* Badge */
.nav-badge {
  position: absolute;
  top: 4px;
  right: calc(50% - 16px);
  background-color: var(--error-color);
  color: white;
  font-size: 10px;
  font-weight: var(--font-weight-bold);
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  transform: scale(0.9);
}

/* Active indicator */
.bottom-nav-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%) scaleX(0);
  width: 32px;
  height: 3px;
  background-color: var(--primary-color);
  border-radius: 0 0 var(--radius-sm) var(--radius-sm);
  transition: transform var(--transition-fast) var(--easing-standard);
}

.bottom-nav-item.active::before {
  transform: translateX(-50%) scaleX(1);
}

/* Focus states */
.bottom-nav-item:focus-visible {
  outline: 2px solid var(--primary-color);
  outline-offset: -2px;
  border-radius: var(--radius-sm);
}

/* Ripple effect */
@keyframes ripple {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(4);
    opacity: 0;
  }
}

.bottom-nav-item::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 20px;
  height: 20px;
  transform: translate(-50%, -50%) scale(0);
  background-color: currentColor;
  border-radius: 50%;
  opacity: 0;
  pointer-events: none;
}

.bottom-nav-item:active::after {
  animation: ripple 0.6s ease-out;
}

/* Tablet adjustments */
@media (min-width: 768px) {
  .bottom-nav {
    max-width: 500px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: var(--radius-lg) var(--radius-lg) 0 0;
    border: 1px solid var(--border-default);
    border-bottom: none;
  }

  .bottom-nav-hidden {
    transform: translateX(-50%) translateY(100%);
  }

  .bottom-nav-content {
    height: 64px;
  }

  .nav-label {
    font-size: var(--font-size-sm);
    max-width: 80px;
  }
}

/* Dark mode adjustments */
.dark-mode .bottom-nav {
  background-color: var(--surface-card);
  border-top-color: var(--border-subtle);
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .bottom-nav-item {
    transition: none;
  }

  .bottom-nav-item::after {
    animation: none;
  }

  .bottom-nav-item:active {
    transform: none;
  }
}
</style>
