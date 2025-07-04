<template>
  <Modal
    v-model="isOpen"
    title="Export Content"
    size="md"
  >
    <div class="export-modal">
      <div class="export-preview">
        <div class="export-preview-icon">
          <Icon :name="getContentIcon(contentType)" />
        </div>
        <div class="export-preview-info">
          <h3 class="export-preview-title">{{ contentTitle }}</h3>
          <p class="export-preview-meta">{{ contentMeta }}</p>
        </div>
      </div>
      
      <div class="export-formats">
        <h3 class="export-subtitle">Choose Format</h3>
        <div class="export-format-list">
          <label
            v-for="format in availableFormats"
            :key="format.id"
            class="export-format"
          >
            <input
              v-model="selectedFormat"
              :value="format.id"
              type="radio"
              name="export-format"
              class="export-radio"
            />
            <div class="export-format-content">
              <div class="export-format-icon" :class="`export-format-icon--${format.color}`">
                <Icon :name="format.icon" />
              </div>
              <div class="export-format-info">
                <p class="export-format-name">{{ format.name }}</p>
                <p class="export-format-desc">{{ format.description }}</p>
              </div>
            </div>
          </label>
        </div>
      </div>
      
      <div v-if="selectedFormat && formatOptions[selectedFormat]" class="export-options">
        <h3 class="export-subtitle">Options</h3>
        <div class="export-option-list">
          <label
            v-for="option in formatOptions[selectedFormat]"
            :key="option.id"
            class="export-option"
          >
            <input
              v-model="selectedOptions[option.id]"
              type="checkbox"
              class="export-checkbox"
              :checked="option.default"
            />
            <div>
              <p class="export-option-name">{{ option.label }}</p>
              <p v-if="option.description" class="export-option-desc">
                {{ option.description }}
              </p>
            </div>
          </label>
        </div>
      </div>
      
      <Alert v-if="selectedFormat === 'print'" variant="info">
        <Icon name="heroicons:information-circle" />
        Print preview will open in a new window with optimized formatting
      </Alert>
    </div>
    
    <template #footer>
      <div class="export-footer">
        <div class="export-size">
          <Icon name="heroicons:document-arrow-down" />
          <span>Estimated size: {{ estimatedSize }}</span>
        </div>
        <div class="export-actions">
          <Button variant="secondary" @click="isOpen = false">
            Cancel
          </Button>
          <Button
            @click="handleExport"
            :loading="loading"
            :disabled="!selectedFormat"
          >
            <Icon name="heroicons:arrow-down-tray" />
            Export
          </Button>
        </div>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
interface ExportFormat {
  id: string
  name: string
  description: string
  icon: string
  color: string
  extension: string
}

interface FormatOption {
  id: string
  label: string
  description?: string
  default?: boolean
}

interface Props {
  modelValue: boolean
  contentType: string
  contentId: string
  contentTitle: string
  contentMeta?: string
}

const props = withDefaults(defineProps<Props>(), {
  contentMeta: ''
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  export: [data: {
    format: string
    options: Record<string, boolean>
  }]
}>()

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const selectedFormat = ref('')
const selectedOptions = ref<Record<string, boolean>>({})
const loading = ref(false)

// Define available formats based on content type
const availableFormats = computed<ExportFormat[]>(() => {
  const baseFormats: ExportFormat[] = [
    {
      id: 'pdf',
      name: 'PDF Document',
      description: 'Best for printing and sharing',
      icon: 'heroicons:document',
      color: 'red',
      extension: '.pdf'
    },
    {
      id: 'word',
      name: 'Word Document',
      description: 'Editable document format',
      icon: 'simple-icons:microsoftword',
      color: 'blue',
      extension: '.docx'
    },
    {
      id: 'print',
      name: 'Print',
      description: 'Send directly to printer',
      icon: 'heroicons:printer',
      color: 'gray',
      extension: ''
    }
  ]
  
  // Add format-specific options based on content type
  if (props.contentType === 'flashcard' || props.contentType === 'quiz') {
    baseFormats.push({
      id: 'anki',
      name: 'Anki Deck',
      description: 'Import into Anki for spaced repetition',
      icon: 'simple-icons:anki',
      color: 'purple',
      extension: '.apkg'
    })
  }
  
  if (props.contentType === 'notebook' || props.contentType === 'summary') {
    baseFormats.push({
      id: 'markdown',
      name: 'Markdown',
      description: 'Plain text with formatting',
      icon: 'simple-icons:markdown',
      color: 'black',
      extension: '.md'
    })
  }
  
  if (props.contentType === 'mindmap') {
    baseFormats.push({
      id: 'image',
      name: 'Image (PNG)',
      description: 'High-quality image export',
      icon: 'heroicons:photo',
      color: 'green',
      extension: '.png'
    })
  }
  
  return baseFormats
})

// Format-specific options
const formatOptions: Record<string, FormatOption[]> = {
  pdf: [
    { id: 'includeComments', label: 'Include comments', default: false },
    { id: 'includeTimestamps', label: 'Include timestamps', default: true },
    { id: 'compressImages', label: 'Compress images', description: 'Reduce file size', default: true }
  ],
  word: [
    { id: 'includeComments', label: 'Include comments', default: false },
    { id: 'trackChanges', label: 'Enable track changes', default: false },
    { id: 'includeStyles', label: 'Preserve formatting', default: true }
  ],
  anki: [
    { id: 'includeTags', label: 'Include tags', default: true },
    { id: 'includeMedia', label: 'Include images/audio', default: true },
    { id: 'reverseCards', label: 'Create reverse cards', default: false }
  ],
  markdown: [
    { id: 'includeFrontmatter', label: 'Include metadata', default: true },
    { id: 'useGFM', label: 'GitHub Flavored Markdown', default: true }
  ],
  image: [
    { id: 'transparent', label: 'Transparent background', default: false },
    { id: 'highRes', label: 'High resolution (2x)', default: true }
  ],
  print: [
    { id: 'headerFooter', label: 'Include header/footer', default: true },
    { id: 'pageNumbers', label: 'Include page numbers', default: true },
    { id: 'grayscale', label: 'Print in grayscale', default: false }
  ]
}

// Initialize options when format changes
watch(selectedFormat, (newFormat) => {
  if (newFormat && formatOptions[newFormat]) {
    const options: Record<string, boolean> = {}
    formatOptions[newFormat].forEach(opt => {
      options[opt.id] = opt.default || false
    })
    selectedOptions.value = options
  }
})

const estimatedSize = computed(() => {
  if (!selectedFormat.value) return 'N/A'
  
  // Mock size calculation
  const sizes: Record<string, string> = {
    pdf: '1.2 MB',
    word: '850 KB',
    anki: '2.1 MB',
    markdown: '45 KB',
    image: '3.5 MB',
    print: 'N/A'
  }
  
  return sizes[selectedFormat.value] || 'N/A'
})

const getContentIcon = (type: string) => {
  const icons: Record<string, string> = {
    notebook: 'heroicons:book-open',
    flashcard: 'heroicons:square-2-stack',
    quiz: 'heroicons:clipboard-document-check',
    mindmap: 'heroicons:share',
    summary: 'heroicons:document-text'
  }
  return icons[type] || 'heroicons:document'
}

const handleExport = async () => {
  if (!selectedFormat.value) return
  
  loading.value = true
  try {
    emit('export', {
      format: selectedFormat.value,
      options: selectedOptions.value
    })
    
    // Auto close after successful export (except for print)
    if (selectedFormat.value !== 'print') {
      setTimeout(() => {
        isOpen.value = false
      }, 1000)
    }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.export-modal {
  @apply space-y-6;
}

.export-preview {
  @apply flex items-center gap-4 p-4 bg-gray-50 rounded-lg;
}

.export-preview-icon {
  @apply w-12 h-12 bg-primary-100 text-primary-600 rounded-lg
         flex items-center justify-center;
}

.export-preview-icon Icon {
  @apply w-6 h-6;
}

.export-preview-info {
  @apply flex-1 min-w-0;
}

.export-preview-title {
  @apply font-medium text-gray-900 truncate;
}

.export-preview-meta {
  @apply text-sm text-gray-500;
}

.export-subtitle {
  @apply text-sm font-medium text-gray-700 mb-3;
}

.export-format-list {
  @apply space-y-2;
}

.export-format {
  @apply block cursor-pointer;
}

.export-radio {
  @apply sr-only;
}

.export-format-content {
  @apply flex items-center gap-3 p-3 rounded-lg border-2 border-gray-200
         hover:border-primary-200 hover:bg-primary-50/50 transition-all;
}

.export-radio:checked + .export-format-content {
  @apply border-primary-500 bg-primary-50;
}

.export-format-icon {
  @apply w-10 h-10 rounded-lg flex items-center justify-center;
}

.export-format-icon Icon {
  @apply w-5 h-5;
}

.export-format-icon--red {
  @apply bg-red-100 text-red-600;
}

.export-format-icon--blue {
  @apply bg-blue-100 text-blue-600;
}

.export-format-icon--gray {
  @apply bg-gray-100 text-gray-600;
}

.export-format-icon--purple {
  @apply bg-purple-100 text-purple-600;
}

.export-format-icon--black {
  @apply bg-gray-900 text-white;
}

.export-format-icon--green {
  @apply bg-green-100 text-green-600;
}

.export-format-info {
  @apply flex-1;
}

.export-format-name {
  @apply text-sm font-medium text-gray-900;
}

.export-format-desc {
  @apply text-xs text-gray-500;
}

.export-options {
  @apply border-t border-gray-200 pt-6;
}

.export-option-list {
  @apply space-y-3;
}

.export-option {
  @apply flex items-start gap-3 cursor-pointer;
}

.export-checkbox {
  @apply mt-0.5 w-4 h-4 text-primary-600 rounded border-gray-300
         focus:ring-primary-500;
}

.export-option-name {
  @apply text-sm font-medium text-gray-700;
}

.export-option-desc {
  @apply text-xs text-gray-500 mt-0.5;
}

.export-footer {
  @apply flex items-center justify-between;
}

.export-size {
  @apply flex items-center gap-2 text-sm text-gray-500;
}

.export-size Icon {
  @apply w-4 h-4;
}

.export-actions {
  @apply flex gap-3;
}
</style>