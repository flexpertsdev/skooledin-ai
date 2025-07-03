import { ref, computed, reactive, watch } from 'vue'
import { useLocalStorage, useWindowScroll, useWindowSize, useToggle } from '@vueuse/core'
import { useResponsive } from './useResponsive'

// Layout configuration types
export interface LayoutConfig {
  navbar: {
    show: boolean
    height: number
    collapsed: boolean
    transparent: boolean
    fixed: boolean
    hideOnScroll: boolean
  }
  sidebar: {
    show: boolean
    open: boolean
    width: number
    mini: boolean
    overlay: boolean
    position: 'left' | 'right'
  }
  bottomNav: {
    show: boolean
    height: number
    hideOnScroll: boolean
    activeIndex: number
  }
  footer: {
    show: boolean
    height: number
  }
  content: {
    fullWidth: boolean
    centered: boolean
    padded: boolean
  }
}

// Layout breakpoints for responsive behavior
interface LayoutBreakpoints {
  sidebarCollapse: number
  navbarCollapse: number
  bottomNavShow: number
}

// Create global layout state
const layoutState = reactive<LayoutConfig>({
  navbar: {
    show: true,
    height: 64,
    collapsed: false,
    transparent: false,
    fixed: true,
    hideOnScroll: false
  },
  sidebar: {
    show: false,
    open: false,
    width: 280,
    mini: false,
    overlay: true,
    position: 'left'
  },
  bottomNav: {
    show: false,
    height: 56,
    hideOnScroll: true,
    activeIndex: 0
  },
  footer: {
    show: true,
    height: 200
  },
  content: {
    fullWidth: false,
    centered: true,
    padded: true
  }
})

// Layout preferences in localStorage
const savedPreferences = useLocalStorage<Partial<LayoutConfig>>('layout-preferences', {})

export const useLayout = () => {
  const { isMobile, isTablet, current } = useResponsive()
  const { y: scrollY, arrivedState } = useWindowScroll()
  const { width: windowWidth, height: windowHeight } = useWindowSize()
  
  // Sidebar toggle
  const [sidebarOpen, toggleSidebar] = useToggle(false)
  
  // Scroll direction tracking
  const lastScrollY = ref(0)
  const scrollDirection = ref<'up' | 'down'>('up')
  
  // Watch scroll changes
  watch(scrollY, (newY, oldY) => {
    scrollDirection.value = newY > oldY ? 'down' : 'up'
    lastScrollY.value = newY
  })
  
  // Computed values
  const navbarVisible = computed(() => {
    if (!layoutState.navbar.show) return false
    if (!layoutState.navbar.hideOnScroll) return true
    
    // Hide on scroll down, show on scroll up
    return scrollDirection.value === 'up' || scrollY.value < 100
  })
  
  const sidebarVisible = computed(() => {
    if (!layoutState.sidebar.show) return false
    if (isMobile.value && !layoutState.sidebar.open) return false
    return true
  })
  
  const bottomNavVisible = computed(() => {
    if (!layoutState.bottomNav.show) return false
    if (!isMobile.value && !isTablet.value) return false
    
    if (layoutState.bottomNav.hideOnScroll) {
      return scrollDirection.value === 'up' || arrivedState.bottom
    }
    
    return true
  })
  
  const contentOffset = computed(() => {
    const top = navbarVisible.value && layoutState.navbar.fixed 
      ? layoutState.navbar.height 
      : 0
    
    const bottom = bottomNavVisible.value 
      ? layoutState.bottomNav.height 
      : 0
    
    return { top, bottom }
  })
  
  const contentMargin = computed(() => {
    const left = sidebarVisible.value && !layoutState.sidebar.overlay && layoutState.sidebar.position === 'left'
      ? layoutState.sidebar.mini 
        ? 64 
        : layoutState.sidebar.width
      : 0
    
    const right = sidebarVisible.value && !layoutState.sidebar.overlay && layoutState.sidebar.position === 'right'
      ? layoutState.sidebar.mini 
        ? 64 
        : layoutState.sidebar.width
      : 0
    
    return { left, right }
  })
  
  const mainContentStyle = computed(() => ({
    paddingTop: `${contentOffset.value.top}px`,
    paddingBottom: `${contentOffset.value.bottom}px`,
    marginLeft: `${contentMargin.value.left}px`,
    marginRight: `${contentMargin.value.right}px`,
    minHeight: `calc(100vh - ${contentOffset.value.top + contentOffset.value.bottom}px)`
  }))
  
  // Methods
  const setNavbar = (config: Partial<LayoutConfig['navbar']>) => {
    Object.assign(layoutState.navbar, config)
    savePreferences()
  }
  
  const setSidebar = (config: Partial<LayoutConfig['sidebar']>) => {
    Object.assign(layoutState.sidebar, config)
    if (config.open !== undefined) {
      sidebarOpen.value = config.open
    }
    savePreferences()
  }
  
  const setBottomNav = (config: Partial<LayoutConfig['bottomNav']>) => {
    Object.assign(layoutState.bottomNav, config)
    savePreferences()
  }
  
  const setContent = (config: Partial<LayoutConfig['content']>) => {
    Object.assign(layoutState.content, config)
    savePreferences()
  }
  
  const openSidebar = () => {
    layoutState.sidebar.open = true
    sidebarOpen.value = true
  }
  
  const closeSidebar = () => {
    layoutState.sidebar.open = false
    sidebarOpen.value = false
  }
  
  const toggleSidebarMini = () => {
    layoutState.sidebar.mini = !layoutState.sidebar.mini
    savePreferences()
  }
  
  const setBottomNavActive = (index: number) => {
    layoutState.bottomNav.activeIndex = index
  }
  
  const resetLayout = () => {
    // Reset to defaults
    Object.assign(layoutState, {
      navbar: {
        show: true,
        height: 64,
        collapsed: false,
        transparent: false,
        fixed: true,
        hideOnScroll: false
      },
      sidebar: {
        show: false,
        open: false,
        width: 280,
        mini: false,
        overlay: true,
        position: 'left'
      },
      bottomNav: {
        show: false,
        height: 56,
        hideOnScroll: true,
        activeIndex: 0
      },
      footer: {
        show: true,
        height: 200
      },
      content: {
        fullWidth: false,
        centered: true,
        padded: true
      }
    })
    savedPreferences.value = {}
  }
  
  const savePreferences = () => {
    savedPreferences.value = {
      navbar: { ...layoutState.navbar },
      sidebar: { ...layoutState.sidebar },
      bottomNav: { ...layoutState.bottomNav },
      content: { ...layoutState.content }
    }
  }
  
  const loadPreferences = () => {
    if (savedPreferences.value.navbar) {
      Object.assign(layoutState.navbar, savedPreferences.value.navbar)
    }
    if (savedPreferences.value.sidebar) {
      Object.assign(layoutState.sidebar, savedPreferences.value.sidebar)
    }
    if (savedPreferences.value.bottomNav) {
      Object.assign(layoutState.bottomNav, savedPreferences.value.bottomNav)
    }
    if (savedPreferences.value.content) {
      Object.assign(layoutState.content, savedPreferences.value.content)
    }
  }
  
  // Responsive adjustments
  watch([isMobile, isTablet], () => {
    // Auto-close sidebar on mobile
    if (isMobile.value) {
      layoutState.sidebar.overlay = true
      if (layoutState.sidebar.open) {
        closeSidebar()
      }
    } else {
      layoutState.sidebar.overlay = false
    }
    
    // Show bottom nav on mobile/tablet
    layoutState.bottomNav.show = isMobile.value || isTablet.value
    
    // Adjust navbar
    layoutState.navbar.collapsed = isMobile.value
  })
  
  // Load preferences on init
  loadPreferences()
  
  return {
    // State
    layout: computed(() => layoutState),
    navbar: computed(() => layoutState.navbar),
    sidebar: computed(() => layoutState.sidebar),
    bottomNav: computed(() => layoutState.bottomNav),
    content: computed(() => layoutState.content),
    
    // Computed
    navbarVisible,
    sidebarVisible,
    bottomNavVisible,
    contentOffset,
    contentMargin,
    mainContentStyle,
    scrollDirection,
    
    // Methods
    setNavbar,
    setSidebar,
    setBottomNav,
    setContent,
    openSidebar,
    closeSidebar,
    toggleSidebar,
    toggleSidebarMini,
    setBottomNavActive,
    resetLayout,
    
    // Responsive helpers
    isMobile,
    isTablet,
    windowWidth,
    windowHeight
  }
}