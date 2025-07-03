// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  
  typescript: {
    strict: true,
    typeCheck: true
  },

  modules: [
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxt/image',
    'nuxt-viewport',
    '@nuxtjs/color-mode',
    '@nuxtjs/tailwindcss'
  ],
  
  css: [
    '~/assets/styles/base.css',
    '~/assets/styles/tokens.css'
  ],
  
  colorMode: {
    preference: 'system',
    fallback: 'light',
    classPrefix: '',
    classSuffix: '',
    storageKey: 'theme'
  },

  viewport: {
    breakpoints: {
      mobile: 320,
      tablet: 768,
      laptop: 1024,
      desktop: 1440,
      ultrawide: 1920
    }
  },

  tailwindcss: {
    viewer: false
  },

  image: {
    quality: 80,
    format: ['webp', 'avif', 'jpeg']
  },
  
  // Auto-import components and composables
  components: {
    global: true,
    dirs: [
      '~/components',
      '~/components/layout',
      '~/components/navigation',
      '~/components/overlay',
      '~/components/ui',
      '~/components/content'
    ]
  },
  
  imports: {
    dirs: [
      'composables',
      'composables/*/index.ts',
      'utils',
      'utils/*/index.ts'
    ]
  },
  
  // Performance optimizations
  experimental: {
    payloadExtraction: false,
    renderJsonPayloads: true,
    componentIslands: true
  },
  
  nitro: {
    prerender: {
      routes: ['/demo', '/demo/navigation', '/demo/overlays', '/demo/layouts', '/demo/content', '/demo/carousel', '/demo/forms', '/demo/lazy-loading', '/demo/images', '/demo/accessible-forms']
    },
    compressPublicAssets: true
  },
  
  vite: {
    optimizeDeps: {
      include: ['vue', 'vue-router', '@vueuse/core', 'pinia']
    },
    build: {
      // Enable code splitting
      rollupOptions: {
        output: {
          // Manual chunks for better caching
          manualChunks: (id) => {
            // Vendor chunk for node_modules
            if (id.includes('node_modules')) {
              if (id.includes('vue') || id.includes('@vueuse')) {
                return 'vue-vendor'
              }
              if (id.includes('floating-ui')) {
                return 'floating-ui'
              }
              return 'vendor'
            }
            // Component chunks
            if (id.includes('/components/ui/')) {
              return 'ui-components'
            }
            if (id.includes('/components/form/')) {
              return 'form-components'
            }
            if (id.includes('/components/layout/')) {
              return 'layout-components'
            }
            if (id.includes('/components/navigation/')) {
              return 'navigation-components'
            }
          }
        }
      }
    }
  }
})
