import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

export const breakpoints = {
  mobile: 320,
  tablet: 768,
  laptop: 1024,
  desktop: 1440,
  ultrawide: 1920
} as const

export type Breakpoint = keyof typeof breakpoints

export const useResponsive = () => {
  const points = useBreakpoints(breakpoints)
  
  const current = computed<Breakpoint>(() => {
    if (points.smaller('tablet').value) return 'mobile'
    if (points.between('tablet', 'laptop').value) return 'tablet'
    if (points.between('laptop', 'desktop').value) return 'laptop'
    if (points.between('desktop', 'ultrawide').value) return 'desktop'
    return 'ultrawide'
  })

  const isMobile = computed(() => points.smaller('tablet').value)
  const isTablet = computed(() => points.between('tablet', 'laptop').value)
  const isLaptop = computed(() => points.between('laptop', 'desktop').value)
  const isDesktop = computed(() => points.between('desktop', 'ultrawide').value)
  const isUltrawide = computed(() => points.greater('ultrawide').value)
  
  const isTabletAndUp = computed(() => points.greaterOrEqual('tablet').value)
  const isLaptopAndUp = computed(() => points.greaterOrEqual('laptop').value)
  const isDesktopAndUp = computed(() => points.greaterOrEqual('desktop').value)

  const match = <T>(values: Partial<Record<Breakpoint, T>>): T | undefined => {
    const currentBreakpoint = current.value
    
    // Try exact match first
    if (currentBreakpoint in values) {
      return values[currentBreakpoint]
    }
    
    // Fall back to lower breakpoints
    const breakpointOrder: Breakpoint[] = ['ultrawide', 'desktop', 'laptop', 'tablet', 'mobile']
    const currentIndex = breakpointOrder.indexOf(currentBreakpoint)
    
    for (let i = currentIndex + 1; i < breakpointOrder.length; i++) {
      const bp = breakpointOrder[i]
      if (bp in values) {
        return values[bp]
      }
    }
    
    return undefined
  }

  return {
    current,
    isMobile,
    isTablet,
    isLaptop,
    isDesktop,
    isUltrawide,
    isTabletAndUp,
    isLaptopAndUp,
    isDesktopAndUp,
    match,
    breakpoints: points
  }
}