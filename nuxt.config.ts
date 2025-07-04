// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },

  // Netlify deployment preset
  nitro: {
    preset: 'netlify',
    prerender: {
      routes: [
        '/demo',
        '/demo/navigation',
        '/demo/overlays',
        '/demo/layouts',
        '/demo/content',
        '/demo/carousel'
      ]
    }
  },

  typescript: {
    strict: true,
    typeCheck: false
  },

  modules: [
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxt/image',
    'nuxt-viewport',
    '@nuxtjs/color-mode',
    '@vite-pwa/nuxt'
  ],

  css: ['~/assets/styles/base.css', '~/assets/styles/tokens.css'],

  // Auto-import components and composables
  components: true,
  imports: {
    dirs: ['composables', 'utils']
  },

  experimental: {
    componentIslands: true
  },

  ssr: true,

  // Runtime configuration
  runtimeConfig: {
    // Private keys (server-only)
    anthropicApiKey: process.env.ANTHROPIC_API_KEY || '',
    
    // Public keys (client + server)
    public: {
      firebaseApiKey: process.env.NUXT_PUBLIC_FIREBASE_API_KEY || '',
      firebaseAuthDomain: process.env.NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
      firebaseProjectId: process.env.NUXT_PUBLIC_FIREBASE_PROJECT_ID || '',
      firebaseStorageBucket: process.env.NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
      firebaseMessagingSenderId: process.env.NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
      firebaseAppId: process.env.NUXT_PUBLIC_FIREBASE_APP_ID || '',
      firebaseMeasurementId: process.env.NUXT_PUBLIC_FIREBASE_MEASUREMENT_ID || '',
      useFirebaseEmulator: process.env.NUXT_PUBLIC_USE_FIREBASE_EMULATOR === 'true',
      isDevelopment: process.env.NODE_ENV === 'development'
    }
  },

  // Module configurations
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


  image: {
    quality: 80,
    format: ['webp', 'avif', 'jpeg']
  },

  // PWA Configuration
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'Skooledin AI',
      short_name: 'Skooledin',
      description: 'AI-powered educational platform for personalized learning',
      theme_color: '#7c3aed',
      background_color: '#ffffff',
      display: 'standalone',
      orientation: 'portrait',
      scope: '/',
      start_url: '/',
      icons: [
        {
          src: 'icons/icon-72x72.png',
          sizes: '72x72',
          type: 'image/png'
        },
        {
          src: 'icons/icon-96x96.png',
          sizes: '96x96',
          type: 'image/png'
        },
        {
          src: 'icons/icon-128x128.png',
          sizes: '128x128',
          type: 'image/png'
        },
        {
          src: 'icons/icon-144x144.png',
          sizes: '144x144',
          type: 'image/png'
        },
        {
          src: 'icons/icon-152x152.png',
          sizes: '152x152',
          type: 'image/png'
        },
        {
          src: 'icons/icon-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: 'icons/icon-384x384.png',
          sizes: '384x384',
          type: 'image/png'
        },
        {
          src: 'icons/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    },
    workbox: {
      navigateFallback: '/',
      globPatterns: ['**/*.{js,css,html,png,svg,ico,jpg,jpeg}'],
      runtimeCaching: [
        {
          urlPattern: ({ url }) => url.origin === 'https://api.anthropic.com',
          handler: 'NetworkFirst',
          options: {
            cacheName: 'api-cache',
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24 * 7 // 1 week
            },
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        }
      ]
    },
    client: {
      installPrompt: true,
      periodicSyncForUpdates: 3600
    }
  }
})
