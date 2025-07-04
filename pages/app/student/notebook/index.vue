<template>
  <LayoutSafeArea top>
    <LayoutContainer>
      <LayoutStack gap="lg">
        <!-- Page Header -->
        <LayoutRow justify="between" align="center" responsive>
          <div>
            <h1 class="page-title">My Notebook</h1>
            <p class="page-subtitle">Create, organize, and manage your study notes</p>
          </div>
          <LayoutRow gap="sm">
            <Button variant="secondary" size="sm" @click="showTemplates = true">
              <Icon name="heroicons:document-duplicate" />
              <span>Templates</span>
            </Button>
            <Button size="sm" @click="createNewNote">
              <Icon name="heroicons:plus" />
              <span>New Note</span>
            </Button>
          </LayoutRow>
        </LayoutRow>

        <!-- Search and Filters -->
        <LayoutRow justify="between" align="center" responsive>
          <SearchBar
            v-model="searchQuery"
            placeholder="Search notes..."
            @search="handleSearch"
          />
          <LayoutRow gap="sm">
            <FilterButton
              :count="activeFilterCount"
              @click="showFilters = true"
            />
            <SortDropdown
              v-model="sortBy"
              :options="sortOptions"
              @change="handleSort"
            />
            <ViewToggle
              v-model="viewMode"
              :options="['grid', 'list', 'board']"
              @change="handleViewChange"
            />
          </LayoutRow>
        </LayoutRow>

        <!-- Quick Filters -->
        <LayoutWrap gap="sm">
          <Chip
            v-for="type in noteTypes"
            :key="type.value"
            :label="type.label"
            :selected="selectedTypes.includes(type.value)"
            @click="toggleType(type.value)"
          />
        </LayoutWrap>

        <!-- Notes Display -->
        <div v-if="loading" class="loading-container">
          <LayoutGrid :cols="gridCols" gap="lg">
            <Skeleton
              v-for="i in 8"
              :key="`skeleton-${i}`"
              variant="rectangular"
              height="200"
            />
          </LayoutGrid>
        </div>

        <div v-else-if="filteredNotes.length === 0" class="empty-state-container">
          <EmptyState
            icon="heroicons:document-text"
            title="No notes found"
            :description="searchQuery ? 'Try adjusting your search or filters' : 'Start creating notes to build your knowledge base'"
          >
            <Button @click="createNewNote">
              <Icon name="heroicons:plus" />
              Create Your First Note
            </Button>
          </EmptyState>
        </div>

        <!-- Grid View -->
        <LayoutGrid
          v-else-if="viewMode === 'grid'"
          :cols="gridCols"
          gap="lg"
        >
          <NoteCard
            v-for="note in paginatedNotes"
            :key="note.id"
            :note="note"
            @click="openNote(note)"
            @edit="editNote(note)"
            @delete="confirmDelete(note)"
            @share="shareNote(note)"
            @export="exportNote(note)"
          />
        </LayoutGrid>

        <!-- List View -->
        <LayoutColumn
          v-else-if="viewMode === 'list'"
          gap="md"
        >
          <NoteListItem
            v-for="note in paginatedNotes"
            :key="note.id"
            :note="note"
            @click="openNote(note)"
            @edit="editNote(note)"
            @delete="confirmDelete(note)"
            @share="shareNote(note)"
            @export="exportNote(note)"
          />
        </LayoutColumn>

        <!-- Board View -->
        <div v-else-if="viewMode === 'board'" class="board-view">
          <LayoutRow gap="lg" class="board-columns">
            <LayoutColumn
              v-for="category in noteCategories"
              :key="category.id"
              class="board-column"
              gap="md"
            >
              <div class="board-header">
                <h3 class="board-title">{{ category.name }}</h3>
                <Badge>{{ getCategoryNotes(category.id).length }}</Badge>
              </div>
              <div class="board-notes">
                <NoteCard
                  v-for="note in getCategoryNotes(category.id)"
                  :key="note.id"
                  :note="note"
                  compact
                  @click="openNote(note)"
                  @edit="editNote(note)"
                  @delete="confirmDelete(note)"
                />
              </div>
            </LayoutColumn>
          </LayoutRow>
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1 && viewMode !== 'board'" class="pagination-container">
          <LayoutRow justify="center" align="center" gap="sm">
            <Button
              variant="secondary"
              size="sm"
              :disabled="currentPage === 1"
              @click="currentPage--"
            >
              <Icon name="heroicons:chevron-left" />
              Previous
            </Button>
            <span class="pagination-info">
              Page {{ currentPage }} of {{ totalPages }}
            </span>
            <Button
              variant="secondary"
              size="sm"
              :disabled="currentPage === totalPages"
              @click="currentPage++"
            >
              Next
              <Icon name="heroicons:chevron-right" />
            </Button>
          </LayoutRow>
        </div>
      </LayoutStack>
    </LayoutContainer>
  </LayoutSafeArea>

  <!-- Modals -->
  <ContentFilter
    v-model:visible="showFilters"
    :filters="filterConfig"
    @apply="applyFilters"
  />

  <ConfirmDialog
    v-model:visible="showDeleteConfirm"
    variant="error"
    title="Delete Note?"
    :message="`Are you sure you want to delete '${selectedNote?.title}'? This action cannot be undone.`"
    confirm-text="Delete"
    @confirm="deleteNote"
  />

  <ShareModal
    v-model:visible="showShare"
    :item="selectedNote"
    item-type="note"
    @share="handleShare"
  />

  <ExportModal
    v-model:visible="showExport"
    :item="selectedNote"
    item-type="note"
    @export="handleExport"
  />

  <TemplateModal
    v-model:visible="showTemplates"
    @select="createFromTemplate"
  />
</template>

<script setup lang="ts">
import type { Note } from '~/types/note'
import { useNotebookStore } from '~/stores/notebook'
import { useResponsive } from '~/composables/useResponsive'

// Page meta
useHead({
  title: 'My Notebook - Skooledin AI',
  meta: [
    {
      name: 'description',
      content: 'Create and manage your study notes with AI assistance'
    }
  ]
})

// Composables
const { match } = useResponsive()
const notebookStore = useNotebookStore()
const { $toast } = useNuxtApp()

// State
const searchQuery = ref('')
const sortBy = ref('modified')
const viewMode = ref<'grid' | 'list' | 'board'>('grid')
const showFilters = ref(false)
const showDeleteConfirm = ref(false)
const showShare = ref(false)
const showExport = ref(false)
const showTemplates = ref(false)
const selectedNote = ref<Note | null>(null)
const selectedTypes = ref<string[]>([])
const currentPage = ref(1)
const itemsPerPage = 16
const loading = ref(false)
const activeFilters = ref<Record<string, any>>({})

// Computed
const gridCols = computed(() => match({
  mobile: 1,
  tablet: 2,
  laptop: 3,
  desktop: 4
}))

const activeFilterCount = computed(() => 
  Object.values(activeFilters.value).filter(v => v !== null && v !== undefined).length
)

const filteredNotes = computed(() => {
  let notes = [...notebookStore.notes]

  // Apply search
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    notes = notes.filter(note =>
      note.title.toLowerCase().includes(query) ||
      note.content?.toLowerCase().includes(query) ||
      note.tags?.some(tag => tag.toLowerCase().includes(query))
    )
  }

  // Apply type filter
  if (selectedTypes.value.length > 0) {
    notes = notes.filter(note => selectedTypes.value.includes(note.type))
  }

  // Apply other filters
  Object.entries(activeFilters.value).forEach(([key, value]) => {
    if (value === null || value === undefined) return
    
    switch (key) {
      case 'subject':
        notes = notes.filter(n => n.subject === value)
        break
      case 'dateRange':
        const [start, end] = value
        notes = notes.filter(n => {
          const date = new Date(n.modifiedAt)
          return date >= start && date <= end
        })
        break
      case 'hasAttachments':
        notes = notes.filter(n => value ? n.attachments?.length > 0 : !n.attachments?.length)
        break
    }
  })

  // Apply sorting
  notes.sort((a, b) => {
    switch (sortBy.value) {
      case 'modified':
        return new Date(b.modifiedAt).getTime() - new Date(a.modifiedAt).getTime()
      case 'created':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      case 'title':
        return a.title.localeCompare(b.title)
      case 'type':
        return a.type.localeCompare(b.type)
      default:
        return 0
    }
  })

  return notes
})

const totalPages = computed(() => 
  Math.ceil(filteredNotes.value.length / itemsPerPage)
)

const paginatedNotes = computed(() => {
  if (viewMode.value === 'board') return filteredNotes.value
  
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredNotes.value.slice(start, end)
})

// Data
const noteTypes = [
  { value: 'note', label: 'Notes', icon: 'heroicons:document-text' },
  { value: 'summary', label: 'Summaries', icon: 'heroicons:document-duplicate' },
  { value: 'flashcard', label: 'Flashcards', icon: 'heroicons:squares-2x2' },
  { value: 'mindmap', label: 'Mind Maps', icon: 'heroicons:cpu-chip' },
  { value: 'quiz', label: 'Quizzes', icon: 'heroicons:clipboard-document-check' }
]

const noteCategories = [
  { id: 'recent', name: 'Recent' },
  { id: 'important', name: 'Important' },
  { id: 'shared', name: 'Shared' },
  { id: 'archived', name: 'Archived' }
]

const sortOptions = [
  { value: 'modified', label: 'Last Modified' },
  { value: 'created', label: 'Date Created' },
  { value: 'title', label: 'Title' },
  { value: 'type', label: 'Type' }
]

const filterConfig = {
  subject: {
    type: 'select',
    label: 'Subject',
    options: [
      { value: 'mathematics', label: 'Mathematics' },
      { value: 'science', label: 'Science' },
      { value: 'english', label: 'English' },
      { value: 'history', label: 'History' },
      { value: 'geography', label: 'Geography' },
      { value: 'computer-science', label: 'Computer Science' }
    ]
  },
  dateRange: {
    type: 'dateRange',
    label: 'Date Range'
  },
  hasAttachments: {
    type: 'toggle',
    label: 'Has Attachments'
  }
}

// Methods
const handleSearch = (query: string) => {
  searchQuery.value = query
  currentPage.value = 1
}

const handleSort = (value: string) => {
  sortBy.value = value
}

const handleViewChange = (mode: 'grid' | 'list' | 'board') => {
  viewMode.value = mode
  currentPage.value = 1
}

const toggleType = (type: string) => {
  const index = selectedTypes.value.indexOf(type)
  if (index > -1) {
    selectedTypes.value.splice(index, 1)
  } else {
    selectedTypes.value.push(type)
  }
  currentPage.value = 1
}

const applyFilters = (filters: Record<string, any>) => {
  activeFilters.value = filters
  currentPage.value = 1
}

const getCategoryNotes = (categoryId: string): Note[] => {
  switch (categoryId) {
    case 'recent':
      return filteredNotes.value.slice(0, 5)
    case 'important':
      return filteredNotes.value.filter(n => n.starred)
    case 'shared':
      return filteredNotes.value.filter(n => n.shared)
    case 'archived':
      return filteredNotes.value.filter(n => n.archived)
    default:
      return []
  }
}

const createNewNote = () => {
  navigateTo('/app/student/notebook/new')
}

const createFromTemplate = (template: any) => {
  navigateTo(`/app/student/notebook/new?template=${template.id}`)
}

const openNote = (note: Note) => {
  navigateTo(`/app/student/notebook/${note.id}`)
}

const editNote = (note: Note) => {
  navigateTo(`/app/student/notebook/${note.id}/edit`)
}

const confirmDelete = (note: Note) => {
  selectedNote.value = note
  showDeleteConfirm.value = true
}

const deleteNote = async () => {
  if (!selectedNote.value) return

  try {
    await notebookStore.deleteNote(selectedNote.value.id)
    $toast.success('Note deleted successfully')
    showDeleteConfirm.value = false
    selectedNote.value = null
  } catch (error) {
    $toast.error('Failed to delete note')
  }
}

const shareNote = (note: Note) => {
  selectedNote.value = note
  showShare.value = true
}

const handleShare = async (shareData: any) => {
  try {
    await notebookStore.shareNote(selectedNote.value!.id, shareData)
    $toast.success('Note shared successfully')
    showShare.value = false
  } catch (error) {
    $toast.error('Failed to share note')
  }
}

const exportNote = (note: Note) => {
  selectedNote.value = note
  showExport.value = true
}

const handleExport = async (exportData: any) => {
  try {
    await notebookStore.exportNote(selectedNote.value!.id, exportData)
    $toast.success('Note exported successfully')
    showExport.value = false
  } catch (error) {
    $toast.error('Failed to export note')
  }
}

// Load notes on mount
onMounted(async () => {
  loading.value = true
  try {
    await notebookStore.loadNotes()
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.page-title {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
  margin: 0;
}

.page-subtitle {
  font-size: var(--font-size-base);
  color: var(--text-secondary);
  margin-top: var(--spacing-xs);
}

.loading-container,
.empty-state-container {
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.board-view {
  overflow-x: auto;
  padding-bottom: var(--spacing-lg);
}

.board-columns {
  min-width: 1000px;
  align-items: stretch;
}

.board-column {
  flex: 1;
  min-width: 250px;
  background: var(--surface-secondary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
}

.board-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--spacing-md);
}

.board-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  margin: 0;
}

.board-notes {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.pagination-container {
  margin-top: var(--spacing-xl);
}

.pagination-info {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  padding: 0 var(--spacing-md);
}

/* Dark mode adjustments */
.dark-mode .board-column {
  background: var(--surface-elevated);
}

/* Mobile adjustments */
@media (max-width: 768px) {
  .board-columns {
    flex-direction: column;
    min-width: auto;
  }

  .board-column {
    min-width: auto;
  }
}
</style>