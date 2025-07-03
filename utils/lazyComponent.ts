import { defineAsyncComponent, type AsyncComponentLoader, type Component } from 'vue'

// Lazy load component with loading and error states
export const lazyComponent = (
  loader: AsyncComponentLoader,
  options?: {
    loadingComponent?: Component
    errorComponent?: Component
    delay?: number
    timeout?: number
    suspensible?: boolean
  }
) => {
  return defineAsyncComponent({
    loader,
    loadingComponent: options?.loadingComponent,
    errorComponent: options?.errorComponent,
    delay: options?.delay ?? 200,
    timeout: options?.timeout ?? 30000,
    suspensible: options?.suspensible ?? false,
    onError(error, retry, fail, attempts) {
      if (error.message.match(/fetch/) && attempts <= 3) {
        // Retry on fetch errors
        retry()
      } else {
        // Log error and fail
        console.error('Failed to load component:', error)
        fail()
      }
    }
  })
}

// Preload component
export const preloadComponent = (component: any) => {
  if (typeof component === 'function') {
    component()
  }
}

// Lazy load with intersection observer
export const lazyLoadOnVisible = (
  loader: AsyncComponentLoader,
  options?: IntersectionObserverInit
) => {
  let component: any = null
  
  return defineAsyncComponent({
    loader: () => {
      return new Promise((resolve) => {
        if (component) {
          resolve(component)
          return
        }
        
        // Create placeholder element
        const placeholder = document.createElement('div')
        placeholder.style.height = '1px'
        
        const observer = new IntersectionObserver(
          (entries) => {
            if (entries[0].isIntersecting) {
              observer.disconnect()
              loader().then((mod) => {
                component = mod
                resolve(mod)
              })
            }
          },
          options ?? { rootMargin: '50px' }
        )
        
        // Start observing when component is mounted
        setTimeout(() => {
          observer.observe(placeholder)
        }, 0)
      })
    }
  })
}

// Component loader with retry logic
export const createComponentLoader = (
  importFn: () => Promise<any>,
  retries = 3,
  retryDelay = 1000
) => {
  return async () => {
    let lastError: Error | null = null
    
    for (let i = 0; i < retries; i++) {
      try {
        return await importFn()
      } catch (error) {
        lastError = error as Error
        console.warn(`Failed to load component (attempt ${i + 1}/${retries}):`, error)
        
        if (i < retries - 1) {
          await new Promise(resolve => setTimeout(resolve, retryDelay))
        }
      }
    }
    
    throw lastError
  }
}

// Batch preload components
export const preloadComponentsAsync = (components: Array<() => Promise<any>>) => {
  return Promise.all(components.map(component => component()))
}

// Route-based component preloading
export const preloadRouteComponentsAsync = (routeName: string) => {
  const componentsMap: Record<string, Array<() => Promise<any>>> = {
    'demo-overlays': [
      () => import('~/components/overlay/Modal.vue'),
      () => import('~/components/overlay/BottomSheet.vue'),
      () => import('~/components/overlay/Drawer.vue'),
      () => import('~/components/overlay/ActionSheet.vue')
    ],
    'demo-carousel': [
      () => import('~/components/ui/Carousel.vue'),
      () => import('~/components/ui/PageView.vue'),
      () => import('~/components/content/MasonryGrid.vue')
    ],
    'demo-forms': [
      () => import('~/components/form/ChatInput.vue'),
      () => import('~/components/form/BottomSheetSelect.vue'),
      () => import('~/components/form/ChoiceButtons.vue')
    ]
  }
  
  const components = componentsMap[routeName]
  if (components) {
    preloadComponentsAsync(components)
  }
}