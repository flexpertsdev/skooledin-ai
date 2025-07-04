<template>
  <div class="content-filter">
    <div class="filter-header">
      <h3 class="filter-title">Filters</h3>
      <button
        v-if="hasActiveFilters"
        @click="clearAllFilters"
        class="filter-clear"
      >
        Clear all
      </button>
    </div>
    
    <div class="filter-sections">
      <!-- Search -->
      <div class="filter-section">
        <label class="filter-label">Search</label>
        <SearchBar
          v-model="filters.search"
          placeholder="Search content..."
          @search="applyFilters"
        />
      </div>
      
      <!-- Content Type -->
      <div class="filter-section">
        <label class="filter-label">Content Type</label>
        <div class="filter-options">
          <label
            v-for="type in contentTypes"
            :key="type.value"
            class="filter-option"
          >
            <input
              v-model="filters.types"
              :value="type.value"
              type="checkbox"
              class="filter-checkbox"
            />
            <Icon :name="type.icon" class="filter-option-icon" />
            <span>{{ type.label }}</span>
            <Badge
              v-if="type.count"
              :label="String(type.count)"
              size="sm"
              variant="secondary"
            />
          </label>
        </div>
      </div>
      
      <!-- Subject -->
      <div class="filter-section">
        <label class="filter-label">Subject</label>
        <Select
          v-model="filters.subject"
          :options="subjectOptions"
          placeholder="All subjects"
        />
      </div>
      
      <!-- Grade Level -->
      <div class="filter-section">
        <label class="filter-label">Grade Level</label>
        <div class="filter-grade-range">
          <Select
            v-model="filters.gradeMin"
            :options="gradeOptions"
            placeholder="From"
          />
          <span class="filter-range-separator">to</span>
          <Select
            v-model="filters.gradeMax"
            :options="gradeOptions"
            placeholder="To"
          />
        </div>
      </div>
      
      <!-- Difficulty -->
      <div class="filter-section">
        <label class="filter-label">Difficulty</label>
        <div class="filter-options">
          <label
            v-for="level in difficultyLevels"
            :key="level.value"
            class="filter-option"
          >
            <input
              v-model="filters.difficulty"
              :value="level.value"
              type="checkbox"
              class="filter-checkbox"
            />
            <div
              class="filter-difficulty-dot"
              :class="`filter-difficulty-dot--${level.value}`"
            />
            <span>{{ level.label }}</span>
          </label>
        </div>
      </div>
      
      <!-- Date Range -->
      <div class="filter-section">
        <label class="filter-label">Date Range</label>
        <Select
          v-model="filters.dateRange"
          :options="dateRangeOptions"
          placeholder="Any time"
        />
        <div v-if="filters.dateRange === 'custom'" class="filter-date-inputs">
          <DatePicker
            v-model="filters.dateFrom"
            label="From"
          />
          <DatePicker
            v-model="filters.dateTo"
            label="To"
          />
        </div>
      </div>
      
      <!-- Tags -->
      <div class="filter-section">
        <label class="filter-label">Tags</label>
        <div class="filter-tags">
          <button
            v-for="tag in popularTags"
            :key="tag"
            @click="toggleTag(tag)"
            class="filter-tag"
            :class="{ 'filter-tag--active': filters.tags.includes(tag) }"
          >
            {{ tag }}
          </button>
        </div>
        <button @click="showAllTags = !showAllTags" class="filter-show-more">
          {{ showAllTags ? 'Show less' : 'Show more tags' }}
        </button>
      </div>
      
      <!-- Additional Filters -->
      <div class="filter-section">
        <label class="filter-label">Additional Options</label>
        <div class="filter-toggles">
          <label class="filter-toggle">
            <Switch v-model="filters.favoritesOnly" />
            <span>Favorites only</span>
          </label>
          <label class="filter-toggle">
            <Switch v-model="filters.sharedWithMe" />
            <span>Shared with me</span>
          </label>
          <label class="filter-toggle">
            <Switch v-model="filters.hasAttachments" />
            <span>Has attachments</span>
          </label>
        </div>
      </div>
      
      <!-- Active Filters Summary -->
      <div v-if="activeFiltersList.length > 0" class="filter-active">
        <label class="filter-label">Active Filters</label>
        <div class="filter-active-list">
          <Chip
            v-for="(filter, index) in activeFiltersList"
            :key="index"
            :label="filter.label"
            removable
            @remove="removeFilter(filter.type, filter.value)"
          />
        </div>
      </div>
    </div>
    
    <div class="filter-actions">
      <Button
        variant="secondary"
        @click="resetFilters"
        :disabled="!hasActiveFilters"
        class="filter-action"
      >
        Reset
      </Button>
      <Button
        @click="applyFilters"
        class="filter-action"
      >
        Apply Filters
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface FilterState {
  search: string
  types: string[]
  subject: string
  gradeMin: string
  gradeMax: string
  difficulty: string[]
  dateRange: string
  dateFrom: Date | null
  dateTo: Date | null
  tags: string[]
  favoritesOnly: boolean
  sharedWithMe: boolean
  hasAttachments: boolean
}

interface Props {
  modelValue: Partial<FilterState>
  contentCounts?: Record<string, number>
}

const props = withDefaults(defineProps<Props>(), {
  contentCounts: () => ({})
})

const emit = defineEmits<{
  'update:modelValue': [filters: Partial<FilterState>]
  apply: [filters: Partial<FilterState>]
}>()

const showAllTags = ref(false)

const filters = reactive<FilterState>({
  search: '',
  types: [],
  subject: '',
  gradeMin: '',
  gradeMax: '',
  difficulty: [],
  dateRange: '',
  dateFrom: null,
  dateTo: null,
  tags: [],
  favoritesOnly: false,
  sharedWithMe: false,
  hasAttachments: false,
  ...props.modelValue
})

const contentTypes = computed(() => [
  { 
    value: 'notebook', 
    label: 'Notebooks', 
    icon: 'heroicons:book-open',
    count: props.contentCounts.notebook 
  },
  { 
    value: 'flashcard', 
    label: 'Flashcards', 
    icon: 'heroicons:square-2-stack',
    count: props.contentCounts.flashcard 
  },
  { 
    value: 'quiz', 
    label: 'Quizzes', 
    icon: 'heroicons:clipboard-document-check',
    count: props.contentCounts.quiz 
  },
  { 
    value: 'summary', 
    label: 'Summaries', 
    icon: 'heroicons:document-text',
    count: props.contentCounts.summary 
  },
  { 
    value: 'mindmap', 
    label: 'Mind Maps', 
    icon: 'heroicons:share',
    count: props.contentCounts.mindmap 
  }
])

const subjectOptions = [
  { value: '', label: 'All subjects' },
  { value: 'math', label: 'Mathematics' },
  { value: 'science', label: 'Science' },
  { value: 'english', label: 'English' },
  { value: 'history', label: 'History' },
  { value: 'geography', label: 'Geography' },
  { value: 'art', label: 'Art' },
  { value: 'music', label: 'Music' },
  { value: 'pe', label: 'Physical Education' },
  { value: 'cs', label: 'Computer Science' }
]

const gradeOptions = [
  { value: '', label: 'Any' },
  { value: 'k', label: 'Kindergarten' },
  { value: '1', label: 'Grade 1' },
  { value: '2', label: 'Grade 2' },
  { value: '3', label: 'Grade 3' },
  { value: '4', label: 'Grade 4' },
  { value: '5', label: 'Grade 5' },
  { value: '6', label: 'Grade 6' },
  { value: '7', label: 'Grade 7' },
  { value: '8', label: 'Grade 8' },
  { value: '9', label: 'Grade 9' },
  { value: '10', label: 'Grade 10' },
  { value: '11', label: 'Grade 11' },
  { value: '12', label: 'Grade 12' }
]

const difficultyLevels = [
  { value: 'easy', label: 'Easy' },
  { value: 'medium', label: 'Medium' },
  { value: 'hard', label: 'Hard' },
  { value: 'expert', label: 'Expert' }
]

const dateRangeOptions = [
  { value: '', label: 'Any time' },
  { value: 'today', label: 'Today' },
  { value: 'week', label: 'This week' },
  { value: 'month', label: 'This month' },
  { value: 'quarter', label: 'Last 3 months' },
  { value: 'year', label: 'This year' },
  { value: 'custom', label: 'Custom range' }
]

const popularTags = [
  'exam-prep',
  'homework',
  'review',
  'practice',
  'project',
  'test',
  'assignment',
  'notes'
]

const hasActiveFilters = computed(() => {
  return filters.search !== '' ||
         filters.types.length > 0 ||
         filters.subject !== '' ||
         filters.gradeMin !== '' ||
         filters.gradeMax !== '' ||
         filters.difficulty.length > 0 ||
         filters.dateRange !== '' ||
         filters.tags.length > 0 ||
         filters.favoritesOnly ||
         filters.sharedWithMe ||
         filters.hasAttachments
})

const activeFiltersList = computed(() => {
  const active: Array<{ type: string; value: string; label: string }> = []
  
  if (filters.search) {
    active.push({ type: 'search', value: filters.search, label: `"${filters.search}"` })
  }
  
  filters.types.forEach(type => {
    const typeObj = contentTypes.value.find(t => t.value === type)
    if (typeObj) {
      active.push({ type: 'types', value: type, label: typeObj.label })
    }
  })
  
  if (filters.subject) {
    const subjectObj = subjectOptions.find(s => s.value === filters.subject)
    if (subjectObj) {
      active.push({ type: 'subject', value: filters.subject, label: subjectObj.label })
    }
  }
  
  if (filters.gradeMin || filters.gradeMax) {
    const min = filters.gradeMin || 'K'
    const max = filters.gradeMax || '12'
    active.push({ type: 'grade', value: 'range', label: `Grade ${min}-${max}` })
  }
  
  filters.difficulty.forEach(level => {
    active.push({ type: 'difficulty', value: level, label: `${level} difficulty` })
  })
  
  if (filters.dateRange) {
    const rangeObj = dateRangeOptions.find(d => d.value === filters.dateRange)
    if (rangeObj) {
      active.push({ type: 'dateRange', value: filters.dateRange, label: rangeObj.label })
    }
  }
  
  filters.tags.forEach(tag => {
    active.push({ type: 'tags', value: tag, label: `#${tag}` })
  })
  
  if (filters.favoritesOnly) {
    active.push({ type: 'favoritesOnly', value: 'true', label: 'Favorites' })
  }
  
  if (filters.sharedWithMe) {
    active.push({ type: 'sharedWithMe', value: 'true', label: 'Shared' })
  }
  
  if (filters.hasAttachments) {
    active.push({ type: 'hasAttachments', value: 'true', label: 'Has files' })
  }
  
  return active
})

const toggleTag = (tag: string) => {
  const index = filters.tags.indexOf(tag)
  if (index > -1) {
    filters.tags.splice(index, 1)
  } else {
    filters.tags.push(tag)
  }
}

const removeFilter = (type: string, value: string) => {
  switch (type) {
    case 'search':
      filters.search = ''
      break
    case 'types':
      filters.types = filters.types.filter(t => t !== value)
      break
    case 'subject':
      filters.subject = ''
      break
    case 'grade':
      filters.gradeMin = ''
      filters.gradeMax = ''
      break
    case 'difficulty':
      filters.difficulty = filters.difficulty.filter(d => d !== value)
      break
    case 'dateRange':
      filters.dateRange = ''
      filters.dateFrom = null
      filters.dateTo = null
      break
    case 'tags':
      filters.tags = filters.tags.filter(t => t !== value)
      break
    case 'favoritesOnly':
      filters.favoritesOnly = false
      break
    case 'sharedWithMe':
      filters.sharedWithMe = false
      break
    case 'hasAttachments':
      filters.hasAttachments = false
      break
  }
}

const clearAllFilters = () => {
  resetFilters()
  applyFilters()
}

const resetFilters = () => {
  Object.assign(filters, {
    search: '',
    types: [],
    subject: '',
    gradeMin: '',
    gradeMax: '',
    difficulty: [],
    dateRange: '',
    dateFrom: null,
    dateTo: null,
    tags: [],
    favoritesOnly: false,
    sharedWithMe: false,
    hasAttachments: false
  })
}

const applyFilters = () => {
  const cleanFilters = { ...filters }
  emit('update:modelValue', cleanFilters)
  emit('apply', cleanFilters)
}

// Watch for external changes
watch(() => props.modelValue, (newValue) => {
  Object.assign(filters, newValue)
}, { deep: true })
</script>

<style scoped>
.content-filter {
  @apply bg-white rounded-lg border border-gray-200 p-4;
}

.filter-header {
  @apply flex items-center justify-between mb-4;
}

.filter-title {
  @apply text-lg font-semibold text-gray-900;
}

.filter-clear {
  @apply text-sm text-primary-600 hover:text-primary-700 font-medium;
}

.filter-sections {
  @apply space-y-6;
}

.filter-section {
  @apply space-y-2;
}

.filter-label {
  @apply block text-sm font-medium text-gray-700;
}

.filter-options {
  @apply space-y-2;
}

.filter-option {
  @apply flex items-center gap-2 cursor-pointer;
}

.filter-checkbox {
  @apply w-4 h-4 text-primary-600 rounded border-gray-300
         focus:ring-primary-500;
}

.filter-option-icon {
  @apply w-4 h-4 text-gray-400;
}

.filter-grade-range {
  @apply grid grid-cols-[1fr,auto,1fr] gap-2 items-center;
}

.filter-range-separator {
  @apply text-sm text-gray-500;
}

.filter-difficulty-dot {
  @apply w-3 h-3 rounded-full;
}

.filter-difficulty-dot--easy {
  @apply bg-green-500;
}

.filter-difficulty-dot--medium {
  @apply bg-yellow-500;
}

.filter-difficulty-dot--hard {
  @apply bg-orange-500;
}

.filter-difficulty-dot--expert {
  @apply bg-red-500;
}

.filter-date-inputs {
  @apply grid grid-cols-2 gap-2 mt-2;
}

.filter-tags {
  @apply flex flex-wrap gap-2;
}

.filter-tag {
  @apply px-3 py-1 text-sm rounded-full border border-gray-300
         hover:border-primary-300 transition-colors;
}

.filter-tag--active {
  @apply bg-primary-100 border-primary-500 text-primary-700;
}

.filter-show-more {
  @apply text-sm text-primary-600 hover:text-primary-700 font-medium mt-2;
}

.filter-toggles {
  @apply space-y-3;
}

.filter-toggle {
  @apply flex items-center gap-2 cursor-pointer;
}

.filter-active {
  @apply pt-4 border-t border-gray-200;
}

.filter-active-list {
  @apply flex flex-wrap gap-2;
}

.filter-actions {
  @apply flex gap-2 mt-6 pt-6 border-t border-gray-200;
}

.filter-action {
  @apply flex-1;
}
</style>