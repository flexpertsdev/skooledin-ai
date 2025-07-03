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

  // Auto-import components and composables
  components: true,
  imports: {
    dirs: ['composables', 'utils']
  },

  experimental: {
    componentIslands: true
  },

  nitro: {
    prerender: {
      routes: ['/demo', '/demo/navigation', '/demo/overlays', '/demo/layouts', '/demo/content', '/demo/carousel']
    },
    compressPublicAssets: true
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

  tailwindcss: {
    viewer: false
  },

  image: {
    quality: 80,
    format: ['webp', 'avif', 'jpeg']
  }
})