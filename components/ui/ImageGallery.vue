<template>
  <div class="image-gallery" :class="`image-gallery--${layout}`">
    <div class="image-gallery__grid" :style="gridStyle">
      <div
        v-for="(image, index) in images"
        :key="image.id || index"
        class="image-gallery__item"
        :class="[
          getItemClass(image, index),
          selectedIndex === index && 'image-gallery__item--selected'
        ]"
        @click="handleImageClick(image, index)"
      >
        <ResponsiveImage
          :src="image.src"
          :alt="image.alt || `Image ${index + 1}`"
          :width="image.width"
          :height="image.height"
          :sizes="getSizes(layout)"
          :loading="index < lazyLoadThreshold ? 'eager' : 'lazy'"
          :priority="index < 2"
          :placeholder="placeholder"
          :fit="fit"
          :fade-in="true"
        />

        <div v-if="showOverlay && image.title" class="image-gallery__overlay">
          <h4 v-if="image.title">{{ image.title }}</h4>
          <p v-if="image.description">{{ image.description }}</p>
        </div>
      </div>
    </div>

    <!-- Lightbox -->
    <Teleport v-if="showLightbox && selectedImage" to="body">
      <div class="image-lightbox" @click="closeLightbox">
        <button class="lightbox__close" aria-label="Close lightbox" @click="closeLightbox">
          ✕
        </button>

        <button
          v-if="selectedIndex > 0"
          class="lightbox__nav lightbox__nav--prev"
          aria-label="Previous image"
          @click.stop="navigateLightbox(-1)"
        >
          ‹
        </button>

        <div class="lightbox__content" @click.stop>
          <ResponsiveImage
            :src="selectedImage.src"
            :alt="selectedImage.alt || ''"
            :loading="'eager'"
            :placeholder="'none'"
            :fit="'contain'"
            class="lightbox__image"
          />

          <div v-if="selectedImage.title || selectedImage.description" class="lightbox__info">
            <h3 v-if="selectedImage.title">{{ selectedImage.title }}</h3>
            <p v-if="selectedImage.description">{{ selectedImage.description }}</p>
          </div>
        </div>

        <button
          v-if="selectedIndex < images.length - 1"
          class="lightbox__nav lightbox__nav--next"
          aria-label="Next image"
          @click.stop="navigateLightbox(1)"
        >
          ›
        </button>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import ResponsiveImage from './ResponsiveImage.vue'

interface GalleryImage {
  id?: string | number
  src: string
  alt?: string
  title?: string
  description?: string
  width?: number
  height?: number
  featured?: boolean
}

interface ImageGalleryProps {
  images: GalleryImage[]
  layout?: 'grid' | 'masonry' | 'carousel' | 'justified'
  columns?: number | { mobile?: number; tablet?: number; desktop?: number }
  gap?: number
  aspectRatio?: string
  showOverlay?: boolean
  enableLightbox?: boolean
  lazyLoadThreshold?: number
  placeholder?: 'blur' | 'empty' | 'none'
  fit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'
}

const props = withDefaults(defineProps<ImageGalleryProps>(), {
  layout: 'grid',
  columns: 3,
  gap: 16,
  showOverlay: true,
  enableLightbox: true,
  lazyLoadThreshold: 4,
  placeholder: 'blur',
  fit: 'cover'
})

const emit = defineEmits<{
  'image-click': [image: GalleryImage, index: number]
  'lightbox-open': [image: GalleryImage, index: number]
  'lightbox-close': []
}>()

// State
const selectedIndex = ref(-1)
const showLightbox = ref(false)

// Computed
const selectedImage = computed(() => {
  return props.images[selectedIndex.value] || null
})

const gridStyle = computed(() => {
  const style: any = {
    gap: `${props.gap}px`
  }

  if (props.layout === 'grid') {
    if (typeof props.columns === 'number') {
      style.gridTemplateColumns = `repeat(${props.columns}, 1fr)`
    } else {
      // Responsive columns will be handled by CSS
    }
  }

  return style
})

// Methods
const getSizes = (layout: string): string => {
  switch (layout) {
    case 'carousel':
      return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
    case 'masonry':
      return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
    case 'justified':
      return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px'
    default: // grid
      return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
  }
}

const getItemClass = (image: GalleryImage, index: number): string => {
  const classes = []

  if (image.featured && props.layout === 'grid') {
    classes.push('image-gallery__item--featured')
  }

  if (props.aspectRatio) {
    classes.push(`aspect-${props.aspectRatio.replace(':', '-')}`)
  }

  return classes.join(' ')
}

const handleImageClick = (image: GalleryImage, index: number) => {
  emit('image-click', image, index)

  if (props.enableLightbox) {
    openLightbox(image, index)
  }
}

const openLightbox = (image: GalleryImage, index: number) => {
  selectedIndex.value = index
  showLightbox.value = true
  document.body.style.overflow = 'hidden'
  emit('lightbox-open', image, index)
}

const closeLightbox = () => {
  showLightbox.value = false
  document.body.style.overflow = ''
  emit('lightbox-close')

  // Reset after animation
  setTimeout(() => {
    selectedIndex.value = -1
  }, 300)
}

const navigateLightbox = (direction: number) => {
  const newIndex = selectedIndex.value + direction

  if (newIndex >= 0 && newIndex < props.images.length) {
    selectedIndex.value = newIndex
  }
}

// Keyboard navigation for lightbox
onMounted(() => {
  const handleKeydown = (e: KeyboardEvent) => {
    if (!showLightbox.value) return

    switch (e.key) {
      case 'Escape':
        closeLightbox()
        break
      case 'ArrowLeft':
        navigateLightbox(-1)
        break
      case 'ArrowRight':
        navigateLightbox(1)
        break
    }
  }

  window.addEventListener('keydown', handleKeydown)

  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown)
  })
})
</script>

<style scoped>
.image-gallery {
  position: relative;
}

/* Grid layout */
.image-gallery--grid .image-gallery__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

.image-gallery__item {
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: transform var(--transition-fast) var(--easing-standard);
}

.image-gallery__item:hover {
  transform: translateY(-4px);
}

.image-gallery__item--selected {
  ring: 2px solid var(--primary-color);
}

.image-gallery__item--featured {
  grid-column: span 2;
  grid-row: span 2;
}

/* Masonry layout */
.image-gallery--masonry .image-gallery__grid {
  columns: 3;
  column-gap: var(--spacing-md);
}

.image-gallery--masonry .image-gallery__item {
  break-inside: avoid;
  margin-bottom: var(--spacing-md);
}

/* Overlay */
.image-gallery__overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  color: white;
  padding: var(--spacing-md);
  opacity: 0;
  transition: opacity var(--transition-fast) var(--easing-standard);
}

.image-gallery__item:hover .image-gallery__overlay {
  opacity: 1;
}

.image-gallery__overlay h4 {
  font-size: var(--font-size-base);
  margin: 0 0 var(--spacing-xs) 0;
}

.image-gallery__overlay p {
  font-size: var(--font-size-sm);
  margin: 0;
  opacity: 0.9;
}

/* Lightbox */
.image-lightbox {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn var(--transition-fast) var(--easing-standard);
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.lightbox__close {
  position: absolute;
  top: var(--spacing-lg);
  right: var(--spacing-lg);
  width: 48px;
  height: 48px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-full);
  color: white;
  font-size: var(--font-size-xl);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all var(--transition-fast) var(--easing-standard);
  z-index: 10;
}

.lightbox__close:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.1);
}

.lightbox__nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 56px;
  height: 56px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-full);
  color: white;
  font-size: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all var(--transition-fast) var(--easing-standard);
}

.lightbox__nav:hover {
  background: rgba(255, 255, 255, 0.2);
}

.lightbox__nav--prev {
  left: var(--spacing-lg);
}

.lightbox__nav--next {
  right: var(--spacing-lg);
}

.lightbox__content {
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.lightbox__image {
  max-width: 100%;
  max-height: 80vh;
}

.lightbox__info {
  margin-top: var(--spacing-lg);
  text-align: center;
  color: white;
  max-width: 600px;
}

.lightbox__info h3 {
  font-size: var(--font-size-xl);
  margin: 0 0 var(--spacing-sm) 0;
}

.lightbox__info p {
  font-size: var(--font-size-base);
  margin: 0;
  opacity: 0.9;
}

/* Responsive */
@media (max-width: 1024px) {
  .image-gallery--grid .image-gallery__grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .image-gallery--masonry .image-gallery__grid {
    columns: 2;
  }
}

@media (max-width: 640px) {
  .image-gallery--grid .image-gallery__grid {
    grid-template-columns: 1fr;
  }

  .image-gallery--masonry .image-gallery__grid {
    columns: 1;
  }

  .image-gallery__item--featured {
    grid-column: span 1;
    grid-row: span 1;
  }

  .lightbox__nav {
    width: 44px;
    height: 44px;
    font-size: 24px;
  }

  .lightbox__close {
    width: 44px;
    height: 44px;
  }
}

/* Aspect ratios */
.aspect-1-1 {
  aspect-ratio: 1 / 1;
}

.aspect-16-9 {
  aspect-ratio: 16 / 9;
}

.aspect-4-3 {
  aspect-ratio: 4 / 3;
}

.aspect-21-9 {
  aspect-ratio: 21 / 9;
}

.aspect-9-16 {
  aspect-ratio: 9 / 16;
}
</style>
