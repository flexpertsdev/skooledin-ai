import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useEventListener, useThrottleFn } from '@vueuse/core'

// Safe area inset values
export interface SafeAreaInsets {
  top: number
  right: number
  bottom: number
  left: number
}

// Safe area sides
export type SafeAreaSide = keyof SafeAreaInsets

// CSS environment variables for safe areas
const safeAreaEnvVars = {
  top: 'safe-area-inset-top',
  right: 'safe-area-inset-right',
  bottom: 'safe-area-inset-bottom',
  left: 'safe-area-inset-left'
}

// Fallback values for different devices
const deviceFallbacks: Record<string, SafeAreaInsets> = {
  // iPhone X and newer
  iphoneX: {
    top: 44,
    right: 0,
    bottom: 34,
    left: 0
  },
  // iPhone 12 and newer (slightly different)
  iphone12: {
    top: 47,
    right: 0,
    bottom: 34,
    left: 0
  },
  // iPad Pro with home indicator
  ipadPro: {
    top: 24,
    right: 0,
    bottom: 20,
    left: 0
  },
  // Default (no safe areas)
  default: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }
}

export const useSafeArea = () => {
  // Current inset values
  const insets = ref<SafeAreaInsets>({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  })

  // Device detection
  const isIOS = ref(false)
  const isStandalone = ref(false)
  const hasNotch = ref(false)
  const orientation = ref<'portrait' | 'landscape'>('portrait')

  // Get safe area value from CSS env()
  const getSafeAreaValue = (side: SafeAreaSide): number => {
    if (typeof window === 'undefined') return 0

    const envVar = safeAreaEnvVars[side]
    const computedStyle = window.getComputedStyle(document.documentElement)

    // Try env() function
    const envValue = computedStyle.getPropertyValue(`env(${envVar})`)
    if (envValue && envValue !== '0px') {
      return parseInt(envValue) || 0
    }

    // Try constant() function (older iOS)
    const constantValue = computedStyle.getPropertyValue(`constant(${envVar})`)
    if (constantValue && constantValue !== '0px') {
      return parseInt(constantValue) || 0
    }

    // Fallback to CSS custom property
    const customValue = computedStyle.getPropertyValue(`--${envVar}`)
    if (customValue && customValue !== '0px') {
      return parseInt(customValue) || 0
    }

    return 0
  }

  // Detect device type
  const detectDevice = () => {
    if (typeof window === 'undefined') return

    const userAgent = navigator.userAgent.toLowerCase()
    const standalone = 'standalone' in navigator && (navigator as any).standalone

    isIOS.value =
      /iphone|ipad|ipod/.test(userAgent) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
    isStandalone.value = standalone || window.matchMedia('(display-mode: standalone)').matches

    // Detect notch by checking safe area insets
    const topInset = getSafeAreaValue('top')
    hasNotch.value = topInset > 20

    // Detect orientation
    updateOrientation()
  }

  // Update orientation
  const updateOrientation = () => {
    if (typeof window === 'undefined') return

    const isLandscape = window.innerWidth > window.innerHeight
    orientation.value = isLandscape ? 'landscape' : 'portrait'
  }

  // Update safe area insets
  const updateInsets = () => {
    if (typeof window === 'undefined') return

    // Get values from env()
    const newInsets: SafeAreaInsets = {
      top: getSafeAreaValue('top'),
      right: getSafeAreaValue('right'),
      bottom: getSafeAreaValue('bottom'),
      left: getSafeAreaValue('left')
    }

    // Apply fallbacks if needed
    if (isIOS.value && hasNotch.value) {
      const allZero = Object.values(newInsets).every(v => v === 0)
      if (allZero) {
        // Use device-specific fallbacks
        const fallback = detectDeviceModel()
        Object.assign(newInsets, fallback)
      }
    }

    // Adjust for orientation in landscape
    if (orientation.value === 'landscape' && hasNotch.value) {
      // In landscape, top becomes left/right
      const sideInset = newInsets.top || 44
      newInsets.left = Math.max(newInsets.left, sideInset)
      newInsets.right = Math.max(newInsets.right, sideInset)
      newInsets.top = 0
    }

    insets.value = newInsets
  }

  // Detect specific device model for fallbacks
  const detectDeviceModel = (): SafeAreaInsets => {
    if (typeof window === 'undefined') return deviceFallbacks.default

    const width = window.screen.width
    const height = window.screen.height

    // iPhone X, XS, 11 Pro
    if ((width === 375 && height === 812) || (height === 375 && width === 812)) {
      return deviceFallbacks.iphoneX
    }

    // iPhone XR, XS Max, 11, 11 Pro Max
    if ((width === 414 && height === 896) || (height === 414 && width === 896)) {
      return deviceFallbacks.iphoneX
    }

    // iPhone 12, 12 Pro, 13, 13 Pro, 14, 14 Pro
    if ((width === 390 && height === 844) || (height === 390 && width === 844)) {
      return deviceFallbacks.iphone12
    }

    // iPhone 12 Pro Max, 13 Pro Max, 14 Plus, 14 Pro Max
    if ((width === 428 && height === 926) || (height === 428 && width === 926)) {
      return deviceFallbacks.iphone12
    }

    // iPad Pro with home indicator
    if (width >= 1024 && isStandalone.value) {
      return deviceFallbacks.ipadPro
    }

    return deviceFallbacks.default
  }

  // Computed values
  const hasInsets = computed(() => Object.values(insets.value).some(v => v > 0))

  const cssVars = computed(() => ({
    '--safe-area-top': `${insets.value.top}px`,
    '--safe-area-right': `${insets.value.right}px`,
    '--safe-area-bottom': `${insets.value.bottom}px`,
    '--safe-area-left': `${insets.value.left}px`
  }))

  const classes = computed(() => ({
    'has-safe-area': hasInsets.value,
    'has-notch': hasNotch.value,
    'is-standalone': isStandalone.value,
    [`orientation-${orientation.value}`]: true
  }))

  // Helper methods
  const addInset = (side: SafeAreaSide, value: number): string => {
    const insetValue = insets.value[side]
    return `${insetValue + value}px`
  }

  const maxInset = (side: SafeAreaSide, value: number): string => {
    const insetValue = insets.value[side]
    return `${Math.max(insetValue, value)}px`
  }

  const getPaddingStyle = (sides: SafeAreaSide[] = ['top', 'right', 'bottom', 'left']) => {
    const styles: Record<string, string> = {}

    sides.forEach(side => {
      const property = `padding${side.charAt(0).toUpperCase() + side.slice(1)}`
      styles[property] = `${insets.value[side]}px`
    })

    return styles
  }

  const getMarginStyle = (sides: SafeAreaSide[] = ['top', 'right', 'bottom', 'left']) => {
    const styles: Record<string, string> = {}

    sides.forEach(side => {
      const property = `margin${side.charAt(0).toUpperCase() + side.slice(1)}`
      styles[property] = `${insets.value[side]}px`
    })

    return styles
  }

  // Throttled update functions
  const throttledUpdateInsets = useThrottleFn(updateInsets, 100)
  const throttledUpdateOrientation = useThrottleFn(() => {
    updateOrientation()
    updateInsets()
  }, 100)

  // Lifecycle
  onMounted(() => {
    detectDevice()
    updateInsets()

    // Listen for changes
    useEventListener(window, 'resize', throttledUpdateOrientation)
    useEventListener(window, 'orientationchange', throttledUpdateOrientation)

    // Listen for viewport changes (iOS specific)
    if (isIOS.value) {
      useEventListener(window, 'scroll', throttledUpdateInsets)
    }

    // Update when returning from background (PWA)
    useEventListener(document, 'visibilitychange', () => {
      if (!document.hidden) {
        updateInsets()
      }
    })
  })

  return {
    // State
    insets: computed(() => insets.value),
    isIOS: computed(() => isIOS.value),
    isStandalone: computed(() => isStandalone.value),
    hasNotch: computed(() => hasNotch.value),
    hasInsets,
    orientation: computed(() => orientation.value),

    // Styles
    cssVars,
    classes,

    // Methods
    addInset,
    maxInset,
    getPaddingStyle,
    getMarginStyle,
    updateInsets
  }
}

// Global CSS for safe area support
if (typeof window !== 'undefined') {
  const style = document.createElement('style')
  style.textContent = `
    /* Safe area CSS variables */
    :root {
      --safe-area-top: env(safe-area-inset-top, 0px);
      --safe-area-right: env(safe-area-inset-right, 0px);
      --safe-area-bottom: env(safe-area-inset-bottom, 0px);
      --safe-area-left: env(safe-area-inset-left, 0px);
    }
    
    /* Viewport meta tag support */
    @supports (padding: max(0px)) {
      :root {
        --safe-area-top: max(env(safe-area-inset-top, 0px), 0px);
        --safe-area-right: max(env(safe-area-inset-right, 0px), 0px);
        --safe-area-bottom: max(env(safe-area-inset-bottom, 0px), 0px);
        --safe-area-left: max(env(safe-area-inset-left, 0px), 0px);
      }
    }
    
    /* Utility classes */
    .safe-area-top {
      padding-top: var(--safe-area-top);
    }
    
    .safe-area-right {
      padding-right: var(--safe-area-right);
    }
    
    .safe-area-bottom {
      padding-bottom: var(--safe-area-bottom);
    }
    
    .safe-area-left {
      padding-left: var(--safe-area-left);
    }
    
    .safe-area-all {
      padding-top: var(--safe-area-top);
      padding-right: var(--safe-area-right);
      padding-bottom: var(--safe-area-bottom);
      padding-left: var(--safe-area-left);
    }
  `
  document.head.appendChild(style)
}
