// Image optimization utilities for responsive loading

interface ImageSource {
  src: string
  width: number
  density?: number
}

interface ResponsiveImageOptions {
  src: string
  alt?: string
  sizes?: string
  loading?: 'lazy' | 'eager'
  priority?: boolean
  placeholder?: 'blur' | 'empty' | 'tracedSVG'
  quality?: number
  format?: 'webp' | 'avif' | 'jpeg' | 'png' | 'auto'
  fit?: 'cover' | 'contain' | 'fill' | 'inside' | 'outside'
}

// Generate srcset for responsive images
export const generateSrcSet = (
  baseSrc: string,
  widths: number[] = [320, 640, 768, 1024, 1280, 1536]
): string => {
  return widths
    .map(width => `${baseSrc}?w=${width} ${width}w`)
    .join(', ')
}

// Generate sizes attribute based on breakpoints
export const generateSizes = (config: {
  mobile?: string
  tablet?: string
  desktop?: string
  default: string
}): string => {
  const sizes: string[] = []
  
  if (config.mobile) {
    sizes.push(`(max-width: 640px) ${config.mobile}`)
  }
  if (config.tablet) {
    sizes.push(`(max-width: 1024px) ${config.tablet}`)
  }
  if (config.desktop) {
    sizes.push(`(max-width: 1440px) ${config.desktop}`)
  }
  
  sizes.push(config.default)
  return sizes.join(', ')
}

// Calculate aspect ratio for placeholder
export const calculateAspectRatio = (width: number, height: number): number => {
  return (height / width) * 100
}

// Generate blur placeholder data URL
export const generateBlurPlaceholder = (
  dominantColor: string = '#f3f4f6'
): string => {
  const svg = `
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <filter id="blur">
        <feGaussianBlur in="SourceGraphic" stdDeviation="20" />
      </filter>
      <rect width="100%" height="100%" fill="${dominantColor}" filter="url(#blur)" />
    </svg>
  `
  return `data:image/svg+xml;base64,${btoa(svg.trim())}`
}

// Preload critical images
export const preloadImage = (src: string, as: 'image' = 'image'): void => {
  const link = document.createElement('link')
  link.rel = 'preload'
  link.as = as
  link.href = src
  document.head.appendChild(link)
}

// Lazy load images with Intersection Observer
export const lazyLoadImages = (
  selector: string = '[data-lazy]',
  options?: IntersectionObserverInit
): void => {
  const images = document.querySelectorAll<HTMLImageElement>(selector)
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement
        const src = img.dataset.src
        const srcset = img.dataset.srcset
        
        if (src) img.src = src
        if (srcset) img.srcset = srcset
        
        img.classList.add('loaded')
        imageObserver.unobserve(img)
      }
    })
  }, options ?? { rootMargin: '50px' })
  
  images.forEach(img => imageObserver.observe(img))
}

// Progressive image loading
export const loadImageProgressively = async (
  lowQualitySrc: string,
  highQualitySrc: string,
  onLoad?: (src: string) => void
): Promise<void> => {
  // Load low quality first
  const lowQualityImg = new Image()
  lowQualityImg.src = lowQualitySrc
  await new Promise(resolve => {
    lowQualityImg.onload = resolve
  })
  onLoad?.(lowQualitySrc)
  
  // Then load high quality
  const highQualityImg = new Image()
  highQualityImg.src = highQualitySrc
  await new Promise(resolve => {
    highQualityImg.onload = resolve
  })
  onLoad?.(highQualitySrc)
}

// Get optimal image format based on browser support
export const getOptimalFormat = (): 'avif' | 'webp' | 'jpeg' => {
  const canvas = document.createElement('canvas')
  canvas.width = 1
  canvas.height = 1
  
  // Check AVIF support
  if (canvas.toDataURL('image/avif').indexOf('image/avif') === 5) {
    return 'avif'
  }
  
  // Check WebP support
  if (canvas.toDataURL('image/webp').indexOf('image/webp') === 5) {
    return 'webp'
  }
  
  return 'jpeg'
}

// Image loading state manager
export const useImageLoader = () => {
  const loading = ref(true)
  const error = ref(false)
  const progress = ref(0)
  
  const loadImage = async (src: string) => {
    loading.value = true
    error.value = false
    progress.value = 0
    
    try {
      const img = new Image()
      
      // Track loading progress if supported
      if ('decode' in img) {
        img.src = src
        await img.decode()
      } else {
        await new Promise((resolve, reject) => {
          const image = img as HTMLImageElement
          image.onload = resolve
          image.onerror = reject
          image.src = src
        })
      }
      
      loading.value = false
      progress.value = 100
    } catch (err) {
      error.value = true
      loading.value = false
      console.error('Image loading failed:', err)
    }
  }
  
  return {
    loading: readonly(loading),
    error: readonly(error),
    progress: readonly(progress),
    loadImage
  }
}

// Responsive breakpoints for images
export const imageBreakpoints = {
  mobile: 640,
  tablet: 1024,
  desktop: 1440,
  wide: 1920
}

// Common aspect ratios
export const aspectRatios = {
  square: '1:1',
  landscape: '16:9',
  portrait: '9:16',
  ultrawide: '21:9',
  classic: '4:3'
}

// Convert aspect ratio string to numeric value
export const parseAspectRatio = (ratio: string): number => {
  const [width, height] = ratio.split(':').map(Number)
  return height / width
}