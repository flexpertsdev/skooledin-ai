<template>
  <div class="flashcard-deck">
    <div class="flashcard-header">
      <h2 class="flashcard-title">{{ deckTitle }}</h2>
      <div class="flashcard-progress">
        <Progress 
          :value="currentIndex + 1" 
          :max="cards.length"
          variant="linear"
          color="primary"
          show-value
          value-format="fraction"
        />
      </div>
    </div>

    <div class="flashcard-container" @click="flipCard">
      <div class="flashcard" :class="{ 'flashcard--flipped': isFlipped }">
        <div class="flashcard-face flashcard-face--front">
          <div class="flashcard-content">
            <p class="flashcard-label">Question</p>
            <h3 class="flashcard-text">{{ currentCard?.front }}</h3>
          </div>
          <div class="flashcard-hint">
            <Icon name="heroicons:cursor-arrow-ripple" />
            <span>Tap to reveal answer</span>
          </div>
        </div>
        
        <div class="flashcard-face flashcard-face--back">
          <div class="flashcard-content">
            <p class="flashcard-label">Answer</p>
            <h3 class="flashcard-text">{{ currentCard?.back }}</h3>
            <div v-if="currentCard?.explanation" class="flashcard-explanation">
              <p class="flashcard-label">Explanation</p>
              <p>{{ currentCard.explanation }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="isFlipped" class="flashcard-actions">
      <p class="flashcard-prompt">How well did you know this?</p>
      <div class="flashcard-buttons">
        <button
          v-for="rating in ratings"
          :key="rating.value"
          @click="rateAndNext(rating.value)"
          class="flashcard-button"
          :class="`flashcard-button--${rating.color}`"
        >
          <Icon :name="rating.icon" />
          <span>{{ rating.label }}</span>
        </button>
      </div>
    </div>

    <div v-else class="flashcard-navigation">
      <button
        @click="previousCard"
        :disabled="currentIndex === 0"
        class="flashcard-nav-button"
      >
        <Icon name="heroicons:chevron-left" />
        Previous
      </button>
      
      <div class="flashcard-counter">
        {{ currentIndex + 1 }} / {{ cards.length }}
      </div>
      
      <button
        @click="skipCard"
        :disabled="currentIndex === cards.length - 1"
        class="flashcard-nav-button"
      >
        Skip
        <Icon name="heroicons:chevron-right" />
      </button>
    </div>

    <div v-if="showResults" class="flashcard-results">
      <h3 class="flashcard-results-title">Study Session Complete!</h3>
      <div class="flashcard-stats">
        <div class="flashcard-stat">
          <Icon name="heroicons:check-circle" class="text-green-600" />
          <span class="flashcard-stat-value">{{ stats.easy }}</span>
          <span class="flashcard-stat-label">Easy</span>
        </div>
        <div class="flashcard-stat">
          <Icon name="heroicons:clock" class="text-yellow-600" />
          <span class="flashcard-stat-value">{{ stats.medium }}</span>
          <span class="flashcard-stat-label">Good</span>
        </div>
        <div class="flashcard-stat">
          <Icon name="heroicons:x-circle" class="text-red-600" />
          <span class="flashcard-stat-value">{{ stats.hard }}</span>
          <span class="flashcard-stat-label">Hard</span>
        </div>
      </div>
      <div class="flashcard-results-actions">
        <Button @click="$emit('restart')">Study Again</Button>
        <Button variant="secondary" @click="$emit('finish')">Finish</Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Flashcard {
  id: string
  front: string
  back: string
  explanation?: string
}

interface Props {
  deckTitle: string
  cards: Flashcard[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  rate: [cardId: string, rating: number]
  complete: [stats: Record<string, number>]
  restart: []
  finish: []
}>()

const currentIndex = ref(0)
const isFlipped = ref(false)
const showResults = ref(false)
const stats = reactive({
  easy: 0,
  medium: 0,
  hard: 0
})

const ratings = [
  { value: 1, label: 'Hard', color: 'hard', icon: 'heroicons:x-circle' },
  { value: 2, label: 'Good', color: 'medium', icon: 'heroicons:clock' },
  { value: 3, label: 'Easy', color: 'easy', icon: 'heroicons:check-circle' }
]

const currentCard = computed(() => props.cards[currentIndex.value])

const flipCard = () => {
  if (!isFlipped.value) {
    isFlipped.value = true
  }
}

const rateAndNext = (rating: number) => {
  // Track stats
  if (rating === 1) stats.hard++
  else if (rating === 2) stats.medium++
  else stats.easy++
  
  // Emit rating event
  emit('rate', currentCard.value.id, rating)
  
  // Move to next card
  if (currentIndex.value < props.cards.length - 1) {
    currentIndex.value++
    isFlipped.value = false
  } else {
    // Show results
    showResults.value = true
    emit('complete', { ...stats })
  }
}

const previousCard = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
    isFlipped.value = false
  }
}

const skipCard = () => {
  if (currentIndex.value < props.cards.length - 1) {
    currentIndex.value++
    isFlipped.value = false
  }
}
</script>

<style scoped>
.flashcard-deck {
  @apply max-w-2xl mx-auto space-y-6;
}

.flashcard-header {
  @apply space-y-3;
}

.flashcard-title {
  @apply text-2xl font-bold text-gray-900 text-center;
}

.flashcard-progress {
  @apply max-w-md mx-auto;
}

/* Card container and flip animation */
.flashcard-container {
  @apply relative h-80 cursor-pointer perspective-1000;
}

.flashcard {
  @apply relative w-full h-full transition-transform duration-500 transform-style-preserve-3d;
}

.flashcard--flipped {
  @apply rotate-y-180;
}

.flashcard-face {
  @apply absolute inset-0 bg-white rounded-2xl shadow-lg p-8
         flex flex-col justify-between backface-hidden;
}

.flashcard-face--back {
  @apply rotate-y-180;
}

.flashcard-content {
  @apply flex-1 flex flex-col justify-center text-center space-y-4;
}

.flashcard-label {
  @apply text-sm font-medium text-gray-500 uppercase tracking-wide;
}

.flashcard-text {
  @apply text-2xl font-semibold text-gray-900;
}

.flashcard-explanation {
  @apply mt-6 space-y-2;
}

.flashcard-explanation p {
  @apply text-gray-600;
}

.flashcard-hint {
  @apply flex items-center justify-center gap-2 text-sm text-gray-400;
}

/* Rating actions */
.flashcard-actions {
  @apply space-y-4;
}

.flashcard-prompt {
  @apply text-center text-gray-600 font-medium;
}

.flashcard-buttons {
  @apply grid grid-cols-3 gap-3;
}

.flashcard-button {
  @apply flex flex-col items-center gap-2 p-4 rounded-lg border-2
         transition-all hover:scale-105;
}

.flashcard-button Icon {
  @apply w-8 h-8;
}

.flashcard-button--hard {
  @apply border-red-200 hover:bg-red-50 hover:border-red-300 text-red-600;
}

.flashcard-button--medium {
  @apply border-yellow-200 hover:bg-yellow-50 hover:border-yellow-300 text-yellow-600;
}

.flashcard-button--easy {
  @apply border-green-200 hover:bg-green-50 hover:border-green-300 text-green-600;
}

/* Navigation */
.flashcard-navigation {
  @apply flex items-center justify-between;
}

.flashcard-nav-button {
  @apply flex items-center gap-2 px-4 py-2 text-gray-600
         hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed
         transition-colors;
}

.flashcard-counter {
  @apply text-sm text-gray-500 font-medium;
}

/* Results */
.flashcard-results {
  @apply bg-gray-50 rounded-xl p-8 text-center space-y-6;
}

.flashcard-results-title {
  @apply text-2xl font-bold text-gray-900;
}

.flashcard-stats {
  @apply flex justify-center gap-8;
}

.flashcard-stat {
  @apply flex flex-col items-center gap-2;
}

.flashcard-stat Icon {
  @apply w-12 h-12;
}

.flashcard-stat-value {
  @apply text-2xl font-bold text-gray-900;
}

.flashcard-stat-label {
  @apply text-sm text-gray-600;
}

.flashcard-results-actions {
  @apply flex justify-center gap-3;
}

/* Tailwind utilities */
.perspective-1000 {
  perspective: 1000px;
}

.transform-style-preserve-3d {
  transform-style: preserve-3d;
}

.backface-hidden {
  backface-visibility: hidden;
}

.rotate-y-180 {
  transform: rotateY(180deg);
}
</style>