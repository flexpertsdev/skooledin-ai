<template>
  <Modal
    v-model:visible="visible"
    title="Choose a Template"
    size="lg"
  >
    <LayoutStack gap="lg">
      <!-- Template Categories -->
      <LayoutWrap gap="sm">
        <Chip
          v-for="category in categories"
          :key="category.id"
          :label="category.name"
          :selected="selectedCategory === category.id"
          @click="selectedCategory = category.id"
        />
      </LayoutWrap>

      <!-- Template Grid -->
      <LayoutGrid cols="1" sm="2" gap="md">
        <div
          v-for="template in filteredTemplates"
          :key="template.id"
          class="template-card"
          @click="selectTemplate(template)"
        >
          <div class="template-icon" :class="`template-${template.type}`">
            <Icon :name="template.icon" size="24" />
          </div>
          <h4 class="template-name">{{ template.name }}</h4>
          <p class="template-description">{{ template.description }}</p>
          <LayoutWrap gap="xs" class="template-tags">
            <Badge
              v-for="tag in template.tags"
              :key="tag"
              size="sm"
              variant="secondary"
            >
              {{ tag }}
            </Badge>
          </LayoutWrap>
        </div>
      </LayoutGrid>

      <!-- Blank Note Option -->
      <div class="blank-note-card" @click="selectBlank">
        <Icon name="heroicons:document-plus" size="24" />
        <span>Start with a blank note</span>
      </div>
    </LayoutStack>
  </Modal>
</template>

<script setup lang="ts">
interface Template {
  id: string
  name: string
  description: string
  type: string
  icon: string
  category: string
  tags: string[]
  content?: string
  structure?: any
}

interface Props {
  visible: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:visible': [value: boolean]
  select: [template: Template | null]
}>()

// State
const selectedCategory = ref('all')

// Data
const categories = [
  { id: 'all', name: 'All Templates' },
  { id: 'study', name: 'Study' },
  { id: 'research', name: 'Research' },
  { id: 'creative', name: 'Creative' },
  { id: 'organization', name: 'Organization' }
]

const templates: Template[] = [
  {
    id: 'cornell-notes',
    name: 'Cornell Notes',
    description: 'Organize notes with cues, main ideas, and summaries',
    type: 'note',
    icon: 'heroicons:document-text',
    category: 'study',
    tags: ['structured', 'study method'],
    structure: {
      sections: ['cues', 'notes', 'summary']
    }
  },
  {
    id: 'chapter-summary',
    name: 'Chapter Summary',
    description: 'Summarize key points and concepts from textbook chapters',
    type: 'summary',
    icon: 'heroicons:document-duplicate',
    category: 'study',
    tags: ['reading', 'comprehension']
  },
  {
    id: 'vocabulary-flashcards',
    name: 'Vocabulary Flashcards',
    description: 'Create flashcards for learning new terms and definitions',
    type: 'flashcard',
    icon: 'heroicons:squares-2x2',
    category: 'study',
    tags: ['memorization', 'language']
  },
  {
    id: 'concept-map',
    name: 'Concept Map',
    description: 'Visualize relationships between ideas and concepts',
    type: 'mindmap',
    icon: 'heroicons:cpu-chip',
    category: 'study',
    tags: ['visual', 'connections']
  },
  {
    id: 'practice-quiz',
    name: 'Practice Quiz',
    description: 'Create self-assessment questions to test understanding',
    type: 'quiz',
    icon: 'heroicons:clipboard-document-check',
    category: 'study',
    tags: ['assessment', 'practice']
  },
  {
    id: 'research-notes',
    name: 'Research Notes',
    description: 'Organize sources, quotes, and findings for research projects',
    type: 'note',
    icon: 'heroicons:magnifying-glass',
    category: 'research',
    tags: ['academic', 'citations']
  },
  {
    id: 'essay-outline',
    name: 'Essay Outline',
    description: 'Structure your essay with introduction, body, and conclusion',
    type: 'note',
    icon: 'heroicons:pencil-square',
    category: 'creative',
    tags: ['writing', 'planning']
  },
  {
    id: 'project-plan',
    name: 'Project Plan',
    description: 'Break down projects into tasks, timelines, and resources',
    type: 'note',
    icon: 'heroicons:clipboard-document-list',
    category: 'organization',
    tags: ['planning', 'tasks']
  },
  {
    id: 'meeting-notes',
    name: 'Meeting Notes',
    description: 'Record discussions, decisions, and action items',
    type: 'note',
    icon: 'heroicons:users',
    category: 'organization',
    tags: ['collaboration', 'minutes']
  },
  {
    id: 'brainstorm',
    name: 'Brainstorming',
    description: 'Capture ideas freely without structure',
    type: 'note',
    icon: 'heroicons:light-bulb',
    category: 'creative',
    tags: ['ideas', 'freeform']
  }
]

// Computed
const filteredTemplates = computed(() => {
  if (selectedCategory.value === 'all') {
    return templates
  }
  return templates.filter(t => t.category === selectedCategory.value)
})

// Methods
const selectTemplate = (template: Template) => {
  emit('select', template)
  emit('update:visible', false)
}

const selectBlank = () => {
  emit('select', null)
  emit('update:visible', false)
}
</script>

<style scoped>
.template-card {
  background: var(--surface-secondary);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  cursor: pointer;
  transition: all 0.2s ease;
}

.template-card:hover {
  border-color: var(--primary-color);
  box-shadow: var(--shadow-sm);
  transform: translateY(-2px);
}

.template-icon {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--spacing-md);
}

/* Template type colors */
.template-note {
  background: var(--color-blue-100);
  color: var(--color-blue-600);
}

.template-summary {
  background: var(--color-purple-100);
  color: var(--color-purple-600);
}

.template-flashcard {
  background: var(--color-green-100);
  color: var(--color-green-600);
}

.template-mindmap {
  background: var(--color-orange-100);
  color: var(--color-orange-600);
}

.template-quiz {
  background: var(--color-pink-100);
  color: var(--color-pink-600);
}

.template-name {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  margin: 0 0 var(--spacing-xs);
}

.template-description {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  line-height: 1.5;
  margin: 0 0 var(--spacing-md);
}

.template-tags {
  margin-top: auto;
}

.blank-note-card {
  background: var(--surface-secondary);
  border: 2px dashed var(--border-default);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-sm);
  color: var(--text-secondary);
}

.blank-note-card:hover {
  border-color: var(--primary-color);
  color: var(--primary-color);
}

/* Dark mode adjustments */
.dark-mode .template-card {
  background: var(--surface-elevated);
}

.dark-mode .blank-note-card {
  background: var(--surface-elevated);
}

.dark-mode .template-note {
  background: var(--color-blue-900);
  color: var(--color-blue-300);
}

.dark-mode .template-summary {
  background: var(--color-purple-900);
  color: var(--color-purple-300);
}

.dark-mode .template-flashcard {
  background: var(--color-green-900);
  color: var(--color-green-300);
}

.dark-mode .template-mindmap {
  background: var(--color-orange-900);
  color: var(--color-orange-300);
}

.dark-mode .template-quiz {
  background: var(--color-pink-900);
  color: var(--color-pink-300);
}
</style>