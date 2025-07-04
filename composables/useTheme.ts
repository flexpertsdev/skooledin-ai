import { ref, computed, watch, onMounted } from 'vue'
import { useColorMode, useLocalStorage, usePreferredColorScheme } from '@vueuse/core'
import { colors } from '~/assets/tokens/colors'

// Theme configuration types
export interface ThemeConfig {
  mode: 'light' | 'dark' | 'auto'
  primaryColor?: string
  primaryColorDark?: string
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
  density?: 'compact' | 'comfortable' | 'spacious'
  fontScale?: number
  reducedMotion?: boolean
  highContrast?: boolean
}

// Custom theme colors
export interface CustomColors {
  primary?: string
  primaryDark?: string
  secondary?: string
  secondaryDark?: string
  accent?: string
  accentDark?: string
}

// Theme presets
export const themePresets = {
  default: {
    primary: colors.primary[500],
    primaryDark: colors.primary[400],
    secondary: colors.secondary[500],
    secondaryDark: colors.secondary[400]
  },
  ocean: {
    primary: '#0066CC',
    primaryDark: '#4A90E2',
    secondary: '#00BCD4',
    secondaryDark: '#4DD0E1'
  },
  forest: {
    primary: '#2E7D32',
    primaryDark: '#66BB6A',
    secondary: '#558B2F',
    secondaryDark: '#7CB342'
  },
  sunset: {
    primary: '#FF6B6B',
    primaryDark: '#FF8787',
    secondary: '#FFB74D',
    secondaryDark: '#FFD54F'
  },
  midnight: {
    primary: '#5C6BC0',
    primaryDark: '#7986CB',
    secondary: '#7E57C2',
    secondaryDark: '#9575CD'
  }
}

export const useTheme = () => {
  // Color mode from @vueuse/core
  const colorMode = useColorMode({
    attribute: 'class',
    modes: {
      light: 'light-mode',
      dark: 'dark-mode'
    }
  })
  const mode = colorMode
  const system = usePreferredColorScheme()

  // Preferred color scheme
  const preferredColorScheme = usePreferredColorScheme()

  // Theme configuration in localStorage
  const savedConfig = useLocalStorage<ThemeConfig>('theme-config', {
    mode: 'auto',
    radius: 'md',
    density: 'comfortable',
    fontScale: 1,
    reducedMotion: false,
    highContrast: false
  })

  // Custom colors in localStorage
  const customColors = useLocalStorage<CustomColors>('theme-colors', {})

  // Active theme preset
  const activePreset = useLocalStorage<keyof typeof themePresets>('theme-preset', 'default')

  // Computed values
  const isDark = computed(() => {
    if (savedConfig.value.mode === 'auto') {
      return mode.value === 'dark'
    }
    return savedConfig.value.mode === 'dark'
  })

  const currentColors = computed(() => {
    const preset = themePresets[activePreset.value] || themePresets.default
    return {
      ...preset,
      ...customColors.value
    }
  })

  // Methods
  const setMode = (newMode: 'light' | 'dark' | 'auto') => {
    savedConfig.value.mode = newMode
    if (newMode !== 'auto') {
      mode.value = newMode
    }
  }

  const toggleMode = () => {
    const modes: Array<'light' | 'dark' | 'auto'> = ['light', 'dark', 'auto']
    const currentIndex = modes.indexOf(savedConfig.value.mode)
    const nextIndex = (currentIndex + 1) % modes.length
    setMode(modes[nextIndex])
  }

  const setPreset = (preset: keyof typeof themePresets) => {
    activePreset.value = preset
    applyTheme()
  }

  const setCustomColors = (colors: CustomColors) => {
    customColors.value = { ...customColors.value, ...colors }
    applyTheme()
  }

  const setRadius = (radius: ThemeConfig['radius']) => {
    savedConfig.value.radius = radius
    applyTheme()
  }

  const setDensity = (density: ThemeConfig['density']) => {
    savedConfig.value.density = density
    applyTheme()
  }

  const setFontScale = (scale: number) => {
    savedConfig.value.fontScale = Math.max(0.8, Math.min(1.5, scale))
    applyTheme()
  }

  const setReducedMotion = (reduced: boolean) => {
    savedConfig.value.reducedMotion = reduced
    applyTheme()
  }

  const setHighContrast = (contrast: boolean) => {
    savedConfig.value.highContrast = contrast
    applyTheme()
  }

  const resetTheme = () => {
    savedConfig.value = {
      mode: 'auto',
      radius: 'md',
      density: 'comfortable',
      fontScale: 1,
      reducedMotion: false,
      highContrast: false
    }
    customColors.value = {}
    activePreset.value = 'default'
    applyTheme()
  }

  // Apply theme to DOM
  const applyTheme = () => {
    if (typeof window === 'undefined') return

    const root = document.documentElement
    const colors = currentColors.value

    // Apply primary colors
    if (colors.primary) {
      root.style.setProperty('--primary-color', colors.primary)
    }
    if (colors.primaryDark && isDark.value) {
      root.style.setProperty('--primary-color', colors.primaryDark)
    }

    // Apply secondary colors
    if (colors.secondary) {
      root.style.setProperty('--secondary-color', colors.secondary)
    }
    if (colors.secondaryDark && isDark.value) {
      root.style.setProperty('--secondary-color', colors.secondaryDark)
    }

    // Apply accent colors
    if (colors.accent) {
      root.style.setProperty('--accent-color', colors.accent)
    }
    if (colors.accentDark && isDark.value) {
      root.style.setProperty('--accent-color', colors.accentDark)
    }

    // Apply radius
    const radiusMap = {
      none: '0',
      sm: '0.25rem',
      md: '0.5rem',
      lg: '0.75rem',
      xl: '1rem',
      full: '9999px'
    }
    const radiusValue = radiusMap[savedConfig.value.radius || 'md']
    root.style.setProperty('--radius-base', radiusValue)

    // Apply density
    const densityMap = {
      compact: 0.75,
      comfortable: 1,
      spacious: 1.25
    }
    const densityScale = densityMap[savedConfig.value.density || 'comfortable']
    root.style.setProperty('--spacing-scale', String(densityScale))

    // Apply font scale
    root.style.setProperty('--font-scale', String(savedConfig.value.fontScale || 1))

    // Apply reduced motion
    if (savedConfig.value.reducedMotion) {
      root.classList.add('reduced-motion')
    } else {
      root.classList.remove('reduced-motion')
    }

    // Apply high contrast
    if (savedConfig.value.highContrast) {
      root.classList.add('high-contrast')
    } else {
      root.classList.remove('high-contrast')
    }
  }

  // Watch for changes
  watch(
    [isDark, savedConfig, customColors, activePreset],
    () => {
      applyTheme()
    },
    { deep: true }
  )

  // Apply theme on mount
  onMounted(() => {
    applyTheme()
  })

  return {
    // State
    isDark,
    mode: computed(() => savedConfig.value.mode),
    systemMode: computed(() => system.value ?? 'light'),
    colors: currentColors,
    config: computed(() => savedConfig.value),
    activePreset: computed(() => activePreset.value),
    presets: themePresets,

    // Methods
    setMode,
    toggleMode,
    setPreset,
    setCustomColors,
    setRadius,
    setDensity,
    setFontScale,
    setReducedMotion,
    setHighContrast,
    resetTheme,
    applyTheme
  }
}

// Global styles for theme features
if (typeof window !== 'undefined') {
  const style = document.createElement('style')
  style.textContent = `
    /* Reduced motion */
    .reduced-motion * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
    
    /* High contrast */
    .high-contrast {
      --border-default: var(--text-primary);
      --border-strong: var(--text-primary);
      --shadow-sm: 0 0 0 1px var(--text-primary);
      --shadow-md: 0 0 0 2px var(--text-primary);
      --shadow-lg: 0 0 0 3px var(--text-primary);
    }
    
    .high-contrast button,
    .high-contrast a,
    .high-contrast input,
    .high-contrast select,
    .high-contrast textarea {
      outline: 2px solid transparent;
      outline-offset: 2px;
    }
    
    .high-contrast button:focus,
    .high-contrast a:focus,
    .high-contrast input:focus,
    .high-contrast select:focus,
    .high-contrast textarea:focus {
      outline-color: var(--primary-color);
    }
    
    /* Spacing scale */
    :root {
      --spacing-scale: 1;
    }
    
    /* Font scale */
    :root {
      --font-scale: 1;
    }
    
    html {
      font-size: calc(16px * var(--font-scale));
    }
  `
  document.head.appendChild(style)
}
