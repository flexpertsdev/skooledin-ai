import globals from 'globals'
import js from '@eslint/js'
import typescript from 'typescript-eslint'
import vue from 'eslint-plugin-vue'
import prettier from 'eslint-config-prettier'
import prettierPlugin from 'eslint-plugin-prettier'

export default [
  js.configs.recommended,
  ...typescript.configs.recommended,
  ...vue.configs['flat/recommended'],
  prettier,
  {
    files: ['**/*.{js,ts,vue}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
        // Nuxt auto-imports
        defineNuxtConfig: 'readonly',
        definePageMeta: 'readonly',
        defineNuxtPlugin: 'readonly',
        defineNuxtRouteMiddleware: 'readonly',
        defineEventHandler: 'readonly',
        useHead: 'readonly',
        useFetch: 'readonly',
        useAsyncData: 'readonly',
        useLazyAsyncData: 'readonly',
        useLazyFetch: 'readonly',
        useRoute: 'readonly',
        useRouter: 'readonly',
        useState: 'readonly',
        useNuxtData: 'readonly',
        useNuxtApp: 'readonly',
        useCookie: 'readonly',
        useRequestHeaders: 'readonly',
        useRequestEvent: 'readonly',
        useRuntimeConfig: 'readonly',
        useError: 'readonly',
        clearError: 'readonly',
        navigateTo: 'readonly',
        abortNavigation: 'readonly',
        setPageLayout: 'readonly',
        // Vue auto-imports
        ref: 'readonly',
        reactive: 'readonly',
        computed: 'readonly',
        watch: 'readonly',
        watchEffect: 'readonly',
        watchPostEffect: 'readonly',
        watchSyncEffect: 'readonly',
        onMounted: 'readonly',
        onUnmounted: 'readonly',
        onBeforeMount: 'readonly',
        onBeforeUnmount: 'readonly',
        onUpdated: 'readonly',
        onBeforeUpdate: 'readonly',
        onActivated: 'readonly',
        onDeactivated: 'readonly',
        onErrorCaptured: 'readonly',
        onRenderTracked: 'readonly',
        onRenderTriggered: 'readonly',
        onServerPrefetch: 'readonly',
        toRefs: 'readonly',
        toRef: 'readonly',
        toValue: 'readonly',
        unref: 'readonly',
        isRef: 'readonly',
        isProxy: 'readonly',
        isReactive: 'readonly',
        isReadonly: 'readonly',
        nextTick: 'readonly',
        defineProps: 'readonly',
        defineEmits: 'readonly',
        defineExpose: 'readonly',
        withDefaults: 'readonly',
        provide: 'readonly',
        inject: 'readonly',
        shallowRef: 'readonly',
        shallowReactive: 'readonly',
        triggerRef: 'readonly',
        readonly: 'readonly',
        shallowReadonly: 'readonly',
        // Vue Router
        onBeforeRouteLeave: 'readonly',
        onBeforeRouteUpdate: 'readonly',
        // VueUse
        breakpointsTailwind: 'readonly',
        useBreakpoints: 'readonly',
        useMediaQuery: 'readonly',
        useScroll: 'readonly',
        useSwipe: 'readonly',
        useFocusTrap: 'readonly',
        onClickOutside: 'readonly',
        // Custom composables
        useToast: 'readonly',
        useResponsive: 'readonly',
        useTheme: 'readonly',
        useLayout: 'readonly',
        useSafeArea: 'readonly',
        useGesture: 'readonly',
        // Node types
        NodeJS: 'readonly',
        // Process
        process: 'readonly'
      },
      parser: vue.parser,
      parserOptions: {
        parser: typescript.parser,
        ecmaVersion: 'latest',
        sourceType: 'module'
      }
    },
    plugins: {
      prettier: prettierPlugin
    },
    rules: {
      'prettier/prettier': 'error',
      'vue/multi-word-component-names': 'off',
      'vue/no-multiple-template-root': 'off',
      'vue/require-default-prop': 'off',
      'vue/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          ignoreRestSiblings: true
        }
      ]
    }
  },
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.nuxt/**',
      '**/.output/**',
      '**/public/**',
      '**/mockups/**',
      '**/.netlify/**',
      '**/pglite-debug.log',
      '**/firebase-debug.log',
      '**/*.min.js',
      '**/*.min.css'
    ]
  }
]
