<template>
  <div class="search-bar" :class="{ 'search-bar--focused': isFocused }">
    <Icon name="heroicons:magnifying-glass" class="search-bar-icon" />
    <input
      ref="searchInput"
      v-model="searchQuery"
      type="search"
      :placeholder="placeholder"
      :disabled="disabled"
      class="search-bar-input"
      @focus="isFocused = true"
      @blur="isFocused = false"
      @input="handleInput"
      @keydown.enter="handleSubmit"
    />
    <button
      v-if="searchQuery"
      type="button"
      @click="clearSearch"
      class="search-bar-clear"
    >
      <Icon name="heroicons:x-mark" />
    </button>
    <button
      v-if="showSubmit"
      type="button"
      @click="handleSubmit"
      :disabled="!searchQuery || disabled"
      class="search-bar-submit"
    >
      <Icon name="heroicons:arrow-right" />
    </button>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue?: string
  placeholder?: string
  disabled?: boolean
  showSubmit?: boolean
  debounce?: number
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Search...',
  showSubmit: false,
  debounce: 300
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  search: [value: string]
  clear: []
}>()

const searchInput = ref<HTMLInputElement>()
const isFocused = ref(false)
const searchQuery = ref(props.modelValue || '')

let debounceTimer: NodeJS.Timeout

const handleInput = () => {
  emit('update:modelValue', searchQuery.value)
  
  if (props.debounce > 0) {
    clearTimeout(debounceTimer)
    debounceTimer = setTimeout(() => {
      emit('search', searchQuery.value)
    }, props.debounce)
  } else {
    emit('search', searchQuery.value)
  }
}

const handleSubmit = () => {
  emit('search', searchQuery.value)
}

const clearSearch = () => {
  searchQuery.value = ''
  emit('update:modelValue', '')
  emit('clear')
  searchInput.value?.focus()
}

watch(() => props.modelValue, (newValue) => {
  searchQuery.value = newValue || ''
})

defineExpose({
  focus: () => searchInput.value?.focus()
})
</script>

<style scoped>
.search-bar {
  @apply relative flex items-center px-4 py-2 bg-gray-100 rounded-lg
         transition-all duration-200;
}

.search-bar--focused {
  @apply bg-white ring-2 ring-primary-500/20 shadow-sm;
}

.search-bar-icon {
  @apply flex-shrink-0 w-5 h-5 text-gray-400 mr-3;
}

.search-bar-input {
  @apply flex-1 bg-transparent border-0 outline-none text-gray-900
         placeholder-gray-500;
}

.search-bar-input::-webkit-search-cancel-button {
  @apply hidden;
}

.search-bar-clear,
.search-bar-submit {
  @apply flex-shrink-0 p-1 -m-1 rounded text-gray-400
         hover:text-gray-600 transition-colors;
}

.search-bar-clear {
  @apply ml-2;
}

.search-bar-submit {
  @apply ml-3;
}

.search-bar-submit:disabled {
  @apply opacity-50 cursor-not-allowed;
}
</style>