<template>
  <figure
    class="responsive-image"
    :class="[
      `responsive-image--${fit}`,
      loading && 'responsive-image--loading',
      loaded && 'responsive-image--loaded',
      error && 'responsive-image--error'
    ]"
  >
    <div class="responsive-image__wrapper" :style="wrapperStyle">
      <!-- Placeholder -->
      <div v-if="showPlaceholder" class="responsive-image__placeholder" :style="placeholderStyle" />

      <!-- Main image -->
      <img
        v-if="!error"
        ref="imageRef"
        :src="currentSrc"
        :srcset="srcset"
        :sizes="sizes"
        :alt="alt"
        :loading="loading"
        :width="width"
        :height="height"
        :class="imageClasses"
        @load="handleLoad"
        @error="handleError"
      />

      <!-- Error state -->
      <div v-else class="responsive-image__error">
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
        <p v-if="errorText">{{ errorText }}</p>
      </div>

      <!-- Loading spinner -->
      <div v-if="showSpinner && loading" class="responsive-image__spinner">
        <LoadingSpinner size="sm" variant="current" />
      </div>
    </div>

    <!-- Caption -->
    <figcaption v-if="caption" class="responsive-image__caption">
      {{ caption }}
    </figcaption>
  </figure>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import {
  generateSrcSet,
  generateSizes,
  generateBlurPlaceholder,
  calculateAspectRatio
} from '~/utils/imageOptimization'
import LoadingSpinner from './LoadingSpinner.vue'

interface ResponsiveImageProps {
  src: string
  alt?: string
  width?: number
  height?: number
  sizes?: string
  srcset?: string
  loading?: 'lazy' | 'eager'
  priority?: boolean
  placeholder?: 'blur' | 'empty' | 'none'
  placeholderColor?: string
  fit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'
  caption?: string
  errorText?: string
  showSpinner?: boolean
  fadeIn?: boolean
  srcsetWidths?: number[]
  responsiveSizes?: {
    mobile?: string
    tablet?: string
    desktop?: string
    default: string
  }
}

const props = withDefaults(defineProps<ResponsiveImageProps>(), {
  loading: 'lazy',
  priority: false,
  placeholder: 'blur',
  placeholderColor: '#f3f4f6',
  fit: 'cover',
  showSpinner: false,
  fadeIn: true
})

// State
const imageRef = ref<HTMLImageElement>()
const loaded = ref(false)
const error = ref(false)
const currentSrc = ref('')

// Computed
const aspectRatioPercent = computed(() => {
  if (props.width && props.height) {
    return calculateAspectRatio(props.width, props.height)
  }
  return null
})

const wrapperStyle = computed(() => {
  const style: any = {}

  // Set aspect ratio padding
  if (aspectRatioPercent.value) {
    style.paddingBottom = `${aspectRatioPercent.value}%`
  }

  return style
})

const placeholderStyle = computed(() => {
  if (props.placeholder === 'blur') {
    return {
      backgroundImage: `url(${generateBlurPlaceholder(props.placeholderColor)})`,
      filter: 'blur(20px)',
      transform: 'scale(1.1)'
    }
  }

  return {
    backgroundColor: props.placeholderColor
  }
})

const showPlaceholder = computed(() => {
  return props.placeholder !== 'none' && !loaded.value
})

const imageClasses = computed(() => {
  return ['responsive-image__img', props.fadeIn && 'responsive-image__img--fade']
})

const srcset = computed(() => {
  if (props.srcset) return props.srcset
  if (props.srcsetWidths) {
    return generateSrcSet(props.src, props.srcsetWidths)
  }
  return undefined
})

const sizes = computed(() => {
  if (props.sizes) return props.sizes
  if (props.responsiveSizes) {
    return generateSizes(props.responsiveSizes)
  }
  return undefined
})

// Methods
const handleLoad = () => {
  loaded.value = true
  error.value = false
}

const handleError = () => {
  error.value = true
  loaded.value = false
}

// Progressive loading for priority images
const loadProgressively = async () => {
  if (props.priority && props.placeholder === 'blur') {
    // Load a low-quality version first
    const lowQualitySrc = `${props.src}?w=50&q=10`
    currentSrc.value = lowQualitySrc

    // Then load the full quality
    await new Promise(resolve => setTimeout(resolve, 100))
    currentSrc.value = props.src
  } else {
    currentSrc.value = props.src
  }
}

// Lifecycle
onMounted(() => {
  loadProgressively()

  // Preload priority images
  if (props.priority && props.loading === 'eager') {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.href = props.src
    if (srcset.value) link.setAttribute('imagesrcset', srcset.value)
    if (sizes.value) link.setAttribute('imagesizes', sizes.value)
    document.head.appendChild(link)
  }
})

onUnmounted(() => {
  // Clean up any resources if needed
})
</script>

<style scoped>
.responsive-image {
  display: block;
  margin: 0;
}

.responsive-image__wrapper {
  position: relative;
  overflow: hidden;
  background: var(--surface-default);
}

/* Aspect ratio container */
.responsive-image__wrapper[style*='padding-bottom'] {
  height: 0;
}

.responsive-image__wrapper[style*='padding-bottom'] > * {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

/* Image styles */
.responsive-image__img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: inherit;
}

.responsive-image__img--fade {
  opacity: 0;
  transition: opacity var(--transition-medium) var(--easing-standard);
}

.responsive-image--loaded .responsive-image__img--fade {
  opacity: 1;
}

/* Object fit variants */
.responsive-image--cover .responsive-image__img {
  object-fit: cover;
}

.responsive-image--contain .responsive-image__img {
  object-fit: contain;
}

.responsive-image--fill .responsive-image__img {
  object-fit: fill;
}

.responsive-image--none .responsive-image__img {
  object-fit: none;
}

.responsive-image--scale-down .responsive-image__img {
  object-fit: scale-down;
}

/* Placeholder */
.responsive-image__placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
}

/* Error state */
.responsive-image__error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: 200px;
  color: var(--text-secondary);
  background: var(--surface-elevated);
}

.responsive-image__error svg {
  margin-bottom: var(--spacing-sm);
  opacity: 0.5;
}

.responsive-image__error p {
  font-size: var(--font-size-sm);
  margin: 0;
}

/* Loading spinner */
.responsive-image__spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
}

/* Caption */
.responsive-image__caption {
  margin-top: var(--spacing-sm);
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  text-align: center;
}

/* Loading state */
.responsive-image--loading .responsive-image__wrapper {
  background: var(--surface-elevated);
}

/* Border radius inheritance */
.responsive-image {
  border-radius: inherit;
}

.responsive-image__wrapper {
  border-radius: inherit;
}

.responsive-image__img {
  border-radius: inherit;
}

/* Dark mode */
.dark-mode .responsive-image__wrapper {
  background: var(--surface-card);
}

.dark-mode .responsive-image__error {
  background: var(--surface-default);
}
</style>
