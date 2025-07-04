// Notebook store: Note management and organization
// Will handle: Note CRUD operations, search/filter, tags
// Features: Offline storage with Dexie.js, full-text search, sync queue

export const useNotebookStore = defineStore('notebook', () => {
  // State
  const notes = ref([])
  const activeNote = ref(null)
  const tags = ref([])
  const searchQuery = ref('')
  const sortBy = ref('updated')
  const filterTag = ref('')
  
  // Getters
  const filteredNotes = computed(() => {
    let filtered = notes.value
    
    // Apply search filter
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      filtered = filtered.filter(note => 
        note.title.toLowerCase().includes(query) ||
        note.content.toLowerCase().includes(query)
      )
    }
    
    // Apply tag filter
    if (filterTag.value) {
      filtered = filtered.filter(note => 
        note.tags?.includes(filterTag.value)
      )
    }
    
    // Apply sorting
    return filtered.sort((a, b) => {
      if (sortBy.value === 'updated') {
        return new Date(b.updatedAt) - new Date(a.updatedAt)
      } else if (sortBy.value === 'created') {
        return new Date(b.createdAt) - new Date(a.createdAt)
      } else if (sortBy.value === 'title') {
        return a.title.localeCompare(b.title)
      }
      return 0
    })
  })
  
  // Actions
  const fetchNotes = async () => {
    // Fetch notes from API/database
  }
  
  const createNote = async (note: any) => {
    // Create new note
  }
  
  const updateNote = async (id: string, updates: any) => {
    // Update existing note
  }
  
  const deleteNote = async (id: string) => {
    // Delete note
  }
  
  const searchNotes = (query: string) => {
    searchQuery.value = query
  }
  
  const setSortBy = (sort: string) => {
    sortBy.value = sort
  }
  
  const setFilterTag = (tag: string) => {
    filterTag.value = tag
  }
  
  return {
    notes,
    activeNote,
    tags,
    searchQuery,
    sortBy,
    filterTag,
    filteredNotes,
    fetchNotes,
    createNote,
    updateNote,
    deleteNote,
    searchNotes,
    setSortBy,
    setFilterTag
  }
})