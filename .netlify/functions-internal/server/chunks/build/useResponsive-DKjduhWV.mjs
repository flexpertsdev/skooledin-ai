import { u as useBreakpoints } from './index-Bun7oj4a.mjs';
import { computed } from 'vue';

const breakpoints = {
  mobile: 320,
  tablet: 768,
  laptop: 1024,
  desktop: 1440,
  ultrawide: 1920
};
const useResponsive = () => {
  const points = useBreakpoints(breakpoints);
  const current = computed(() => {
    return "mobile";
  });
  const isMobile = computed(() => {
    return false;
  });
  const isTablet = computed(() => {
    return false;
  });
  const isLaptop = computed(() => {
    return false;
  });
  const isDesktop = computed(() => {
    return false;
  });
  const isUltrawide = computed(() => {
    return false;
  });
  const isTabletAndUp = computed(() => {
    return true;
  });
  const isLaptopAndUp = computed(() => {
    return true;
  });
  const isDesktopAndUp = computed(() => {
    return true;
  });
  const match = (values) => {
    const currentBreakpoint = current.value;
    if (currentBreakpoint in values) {
      return values[currentBreakpoint];
    }
    const breakpointOrder = ["ultrawide", "desktop", "laptop", "tablet", "mobile"];
    const currentIndex = breakpointOrder.indexOf(currentBreakpoint);
    for (let i = currentIndex + 1; i < breakpointOrder.length; i++) {
      const bp = breakpointOrder[i];
      if (bp in values) {
        return values[bp];
      }
    }
    return void 0;
  };
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
  };
};

export { useResponsive as u };
//# sourceMappingURL=useResponsive-DKjduhWV.mjs.map
