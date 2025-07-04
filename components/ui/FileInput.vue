<template>
  <div class="file-input-wrapper">
    <label v-if="label" class="file-input-label">{{ label }}</label>
    <div
      class="file-input-dropzone"
      :class="{
        'file-input-dropzone--active': isDragging,
        'file-input-dropzone--disabled': disabled
      }"
      @drop="handleDrop"
      @dragover.prevent
      @dragenter.prevent="isDragging = true"
      @dragleave.prevent="isDragging = false"
    >
      <input
        ref="fileInput"
        type="file"
        :accept="accept"
        :multiple="multiple"
        :disabled="disabled"
        class="file-input-hidden"
        @change="handleFileSelect"
      />
      
      <div class="file-input-content">
        <Icon name="heroicons:cloud-arrow-up" class="file-input-icon" />
        <p class="file-input-text">
          Drop files here or <button type="button" @click="openFileDialog" class="file-input-button">browse</button>
        </p>
        <p class="file-input-hint">{{ hint }}</p>
      </div>
    </div>
    
    <div v-if="files.length > 0" class="file-input-list">
      <div v-for="(file, index) in files" :key="index" class="file-input-item">
        <span class="file-input-name">{{ file.name }}</span>
        <button
          type="button"
          @click="removeFile(index)"
          class="file-input-remove"
          :disabled="disabled"
        >
          <Icon name="heroicons:x-mark" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue?: File[]
  label?: string
  accept?: string
  multiple?: boolean
  disabled?: boolean
  maxSize?: number // in MB
  hint?: string
}

const props = withDefaults(defineProps<Props>(), {
  accept: '*',
  multiple: false,
  maxSize: 10,
  hint: 'PNG, JPG, PDF up to 10MB'
})

const emit = defineEmits<{
  'update:modelValue': [files: File[]]
  error: [message: string]
}>()

const fileInput = ref<HTMLInputElement>()
const isDragging = ref(false)
const files = ref<File[]>(props.modelValue || [])

const openFileDialog = () => {
  fileInput.value?.click()
}

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files) {
    addFiles(Array.from(target.files))
  }
}

const handleDrop = (event: DragEvent) => {
  event.preventDefault()
  isDragging.value = false
  
  if (event.dataTransfer?.files) {
    addFiles(Array.from(event.dataTransfer.files))
  }
}

const addFiles = (newFiles: File[]) => {
  const validFiles = newFiles.filter(file => {
    if (file.size > props.maxSize * 1024 * 1024) {
      emit('error', `${file.name} exceeds maximum size of ${props.maxSize}MB`)
      return false
    }
    return true
  })
  
  if (props.multiple) {
    files.value = [...files.value, ...validFiles]
  } else {
    files.value = validFiles.slice(0, 1)
  }
  
  emit('update:modelValue', files.value)
}

const removeFile = (index: number) => {
  files.value.splice(index, 1)
  emit('update:modelValue', files.value)
}

watch(() => props.modelValue, (newValue) => {
  files.value = newValue || []
})
</script>

<style scoped>
.file-input-wrapper {
  @apply space-y-2;
}

.file-input-label {
  @apply block text-sm font-medium text-gray-700;
}

.file-input-dropzone {
  @apply relative border-2 border-dashed border-gray-300 rounded-lg
         p-6 text-center hover:border-gray-400 transition-colors;
}

.file-input-dropzone--active {
  @apply border-primary-500 bg-primary-50;
}

.file-input-dropzone--disabled {
  @apply bg-gray-50 cursor-not-allowed hover:border-gray-300;
}

.file-input-hidden {
  @apply sr-only;
}

.file-input-content {
  @apply space-y-2;
}

.file-input-icon {
  @apply mx-auto h-12 w-12 text-gray-400;
}

.file-input-text {
  @apply text-sm text-gray-600;
}

.file-input-button {
  @apply text-primary-600 hover:text-primary-700 font-medium;
}

.file-input-hint {
  @apply text-xs text-gray-500;
}

.file-input-list {
  @apply space-y-2;
}

.file-input-item {
  @apply flex items-center justify-between p-3 bg-gray-50 rounded-lg;
}

.file-input-name {
  @apply text-sm text-gray-700 truncate;
}

.file-input-remove {
  @apply p-1 text-gray-400 hover:text-red-600 transition-colors;
}
</style>