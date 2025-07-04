<template>
  <LayoutContainer>
    <LayoutStack gap="lg">
      <!-- Page Header -->
      <LayoutRow justify="between" align="center" wrap>
        <div>
          <h1 class="page-title">My Classes</h1>
          <p class="page-subtitle">Manage your classes and students</p>
        </div>
        <Button @click="showCreateModal = true">
          <template #icon>
            <Icon name="heroicons:plus" />
          </template>
          Create Class
        </Button>
      </LayoutRow>

      <!-- Stats Cards -->
      <LayoutGrid :cols="{ base: 1, sm: 2, lg: 4 }" gap="md">
        <StatCard
          v-for="stat in stats"
          :key="stat.label"
          :icon="stat.icon"
          :label="stat.label"
          :value="stat.value"
          :change="stat.change"
          :trend="stat.trend"
        />
      </LayoutGrid>

      <!-- Filters and Search -->
      <LayoutRow gap="md" align="center" wrap>
        <LayoutExpanded>
          <SearchBar
            v-model="searchQuery"
            placeholder="Search classes..."
            @search="handleSearch"
          />
        </LayoutExpanded>
        <FilterButton
          :activeCount="activeFilterCount"
          @click="showFilters = !showFilters"
        />
        <SortDropdown
          v-model="sortBy"
          :options="sortOptions"
          @change="handleSort"
        />
        <ViewToggle
          v-model="viewMode"
          :options="['grid', 'list']"
        />
      </LayoutRow>

      <!-- Active Filters -->
      <LayoutRow v-if="activeFilters.length > 0" gap="sm" wrap>
        <Chip
          v-for="filter in activeFilters"
          :key="filter.id"
          removable
          @remove="removeFilter(filter.id)"
        >
          {{ filter.label }}
        </Chip>
        <Button
          variant="text"
          size="sm"
          @click="clearFilters"
        >
          Clear all
        </Button>
      </LayoutRow>

      <!-- Classes Grid/List -->
      <div v-if="loading" class="loading-container">
        <LayoutGrid :cols="{ base: 1, md: 2, lg: 3 }" gap="md">
          <Skeleton v-for="i in 6" :key="i" height="200px" />
        </LayoutGrid>
      </div>

      <template v-else-if="filteredClasses.length > 0">
        <LayoutGrid
          v-if="viewMode === 'grid'"
          :cols="{ base: 1, md: 2, lg: 3 }"
          gap="md"
        >
          <ClassCard
            v-for="cls in paginatedClasses"
            :key="cls.id"
            :class-data="cls"
            @click="router.push(`/app/teacher/classes/${cls.id}`)"
            @edit="handleEdit(cls)"
            @archive="handleArchive(cls)"
            @delete="handleDelete(cls)"
          />
        </LayoutGrid>

        <LayoutStack v-else gap="sm">
          <ClassListItem
            v-for="cls in paginatedClasses"
            :key="cls.id"
            :class-data="cls"
            @click="router.push(`/app/teacher/classes/${cls.id}`)"
            @edit="handleEdit(cls)"
            @archive="handleArchive(cls)"
            @delete="handleDelete(cls)"
          />
        </LayoutStack>
      </template>

      <EmptyState
        v-else
        icon="heroicons:academic-cap"
        title="No classes found"
        :description="searchQuery ? 'Try adjusting your search or filters' : 'Create your first class to get started'"
      >
        <Button @click="showCreateModal = true">
          <template #icon>
            <Icon name="heroicons:plus" />
          </template>
          Create Class
        </Button>
      </EmptyState>

      <!-- Pagination -->
      <LayoutRow v-if="totalPages > 1" justify="center">
        <Pagination
          v-model="currentPage"
          :total="totalPages"
          :sibling-count="1"
        />
      </LayoutRow>
    </LayoutStack>

    <!-- Filter Sidebar -->
    <Drawer
      :open="showFilters"
      @close="showFilters = false"
      title="Filter Classes"
      position="right"
    >
      <ClassFilters
        v-model="filters"
        @apply="applyFilters"
        @clear="clearFilters"
      />
    </Drawer>

    <!-- Create/Edit Modal -->
    <ClassFormModal
      :open="showCreateModal || showEditModal"
      :class-data="editingClass"
      @close="closeModals"
      @submit="handleSubmit"
    />

    <!-- Delete Confirmation -->
    <ConfirmDialog
      :open="showDeleteDialog"
      @close="showDeleteDialog = false"
      @confirm="confirmDelete"
      title="Delete Class"
      message="Are you sure you want to delete this class? This action cannot be undone."
      variant="error"
      confirmText="Delete"
      :loading="deleteLoading"
    />
  </LayoutContainer>
</template>

<script setup lang="ts">
import { useTeacherStore } from '~/stores/teacher'
import { useToast } from '~/composables/useToast'

interface ClassData {
  id: string
  name: string
  subject: string
  grade: string
  schedule: string
  studentCount: number
  activeStudents: number
  averageGrade: number
  nextClass?: Date
  coverImage?: string
  status: 'active' | 'archived'
  createdAt: Date
}

const router = useRouter()
const teacherStore = useTeacherStore()
const { showToast } = useToast()

// State
const loading = ref(false)
const searchQuery = ref('')
const sortBy = ref('name')
const viewMode = ref<'grid' | 'list'>('grid')
const currentPage = ref(1)
const itemsPerPage = 9

const showFilters = ref(false)
const showCreateModal = ref(false)
const showEditModal = ref(false)
const showDeleteDialog = ref(false)
const editingClass = ref<ClassData | null>(null)
const deletingClass = ref<ClassData | null>(null)
const deleteLoading = ref(false)

const filters = ref({
  subjects: [],
  grades: [],
  status: 'all',
  schedule: []
})

// Mock data
const classes = ref<ClassData[]>([
  {
    id: '1',
    name: 'Mathematics 101',
    subject: 'Mathematics',
    grade: 'Grade 10',
    schedule: 'Mon, Wed, Fri - 9:00 AM',
    studentCount: 28,
    activeStudents: 26,
    averageGrade: 82,
    nextClass: new Date(Date.now() + 86400000),
    coverImage: '/images/math-class.jpg',
    status: 'active',
    createdAt: new Date('2024-01-01')
  },
  {
    id: '2',
    name: 'Advanced Physics',
    subject: 'Physics',
    grade: 'Grade 12',
    schedule: 'Tue, Thu - 2:00 PM',
    studentCount: 22,
    activeStudents: 20,
    averageGrade: 78,
    nextClass: new Date(Date.now() + 172800000),
    coverImage: '/images/physics-class.jpg',
    status: 'active',
    createdAt: new Date('2024-01-15')
  }
])

const stats = computed(() => [
  {
    icon: 'heroicons:academic-cap',
    label: 'Total Classes',
    value: classes.value.filter(c => c.status === 'active').length,
    change: '+2',
    trend: 'up'
  },
  {
    icon: 'heroicons:users',
    label: 'Total Students',
    value: classes.value.reduce((sum, c) => sum + c.studentCount, 0),
    change: '+12',
    trend: 'up'
  },
  {
    icon: 'heroicons:chart-bar',
    label: 'Average Grade',
    value: Math.round(classes.value.reduce((sum, c) => sum + c.averageGrade, 0) / classes.value.length) + '%',
    change: '+3%',
    trend: 'up'
  },
  {
    icon: 'heroicons:clock',
    label: 'Classes Today',
    value: 3,
    change: '0',
    trend: 'neutral'
  }
])

const sortOptions = [
  { value: 'name', label: 'Name' },
  { value: 'students', label: 'Student Count' },
  { value: 'grade', label: 'Average Grade' },
  { value: 'recent', label: 'Recently Created' }
]

// Computed
const activeFilterCount = computed(() => {
  let count = 0
  if (filters.value.subjects.length > 0) count += filters.value.subjects.length
  if (filters.value.grades.length > 0) count += filters.value.grades.length
  if (filters.value.status !== 'all') count++
  if (filters.value.schedule.length > 0) count += filters.value.schedule.length
  return count
})

const activeFilters = computed(() => {
  const active = []
  
  filters.value.subjects.forEach(subject => {
    active.push({ id: `subject-${subject}`, label: subject })
  })
  
  filters.value.grades.forEach(grade => {
    active.push({ id: `grade-${grade}`, label: grade })
  })
  
  if (filters.value.status !== 'all') {
    active.push({ id: 'status', label: filters.value.status })
  }
  
  filters.value.schedule.forEach(schedule => {
    active.push({ id: `schedule-${schedule}`, label: schedule })
  })
  
  return active
})

const filteredClasses = computed(() => {
  let result = classes.value
  
  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(cls => 
      cls.name.toLowerCase().includes(query) ||
      cls.subject.toLowerCase().includes(query) ||
      cls.grade.toLowerCase().includes(query)
    )
  }
  
  // Subject filter
  if (filters.value.subjects.length > 0) {
    result = result.filter(cls => filters.value.subjects.includes(cls.subject))
  }
  
  // Grade filter
  if (filters.value.grades.length > 0) {
    result = result.filter(cls => filters.value.grades.includes(cls.grade))
  }
  
  // Status filter
  if (filters.value.status !== 'all') {
    result = result.filter(cls => cls.status === filters.value.status)
  }
  
  // Sort
  result = [...result].sort((a, b) => {
    switch (sortBy.value) {
      case 'name':
        return a.name.localeCompare(b.name)
      case 'students':
        return b.studentCount - a.studentCount
      case 'grade':
        return b.averageGrade - a.averageGrade
      case 'recent':
        return b.createdAt.getTime() - a.createdAt.getTime()
      default:
        return 0
    }
  })
  
  return result
})

const totalPages = computed(() => 
  Math.ceil(filteredClasses.value.length / itemsPerPage)
)

const paginatedClasses = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredClasses.value.slice(start, end)
})

// Methods
const handleSearch = (query: string) => {
  searchQuery.value = query
  currentPage.value = 1
}

const handleSort = (value: string) => {
  sortBy.value = value
}

const applyFilters = () => {
  showFilters.value = false
  currentPage.value = 1
}

const clearFilters = () => {
  filters.value = {
    subjects: [],
    grades: [],
    status: 'all',
    schedule: []
  }
  currentPage.value = 1
}

const removeFilter = (filterId: string) => {
  if (filterId.startsWith('subject-')) {
    const subject = filterId.replace('subject-', '')
    filters.value.subjects = filters.value.subjects.filter(s => s !== subject)
  } else if (filterId.startsWith('grade-')) {
    const grade = filterId.replace('grade-', '')
    filters.value.grades = filters.value.grades.filter(g => g !== grade)
  } else if (filterId === 'status') {
    filters.value.status = 'all'
  } else if (filterId.startsWith('schedule-')) {
    const schedule = filterId.replace('schedule-', '')
    filters.value.schedule = filters.value.schedule.filter(s => s !== schedule)
  }
}

const handleEdit = (cls: ClassData) => {
  editingClass.value = cls
  showEditModal.value = true
}

const handleArchive = async (cls: ClassData) => {
  try {
    // Archive class logic
    cls.status = cls.status === 'active' ? 'archived' : 'active'
    showToast(`Class ${cls.status === 'archived' ? 'archived' : 'restored'} successfully`, 'success')
  } catch (error) {
    showToast('Failed to update class status', 'error')
  }
}

const handleDelete = (cls: ClassData) => {
  deletingClass.value = cls
  showDeleteDialog.value = true
}

const confirmDelete = async () => {
  if (!deletingClass.value) return
  
  deleteLoading.value = true
  
  try {
    // Delete class logic
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    classes.value = classes.value.filter(c => c.id !== deletingClass.value!.id)
    showToast('Class deleted successfully', 'success')
    showDeleteDialog.value = false
  } catch (error) {
    showToast('Failed to delete class', 'error')
  } finally {
    deleteLoading.value = false
    deletingClass.value = null
  }
}

const handleSubmit = async (data: Partial<ClassData>) => {
  try {
    if (editingClass.value) {
      // Update existing class
      const index = classes.value.findIndex(c => c.id === editingClass.value!.id)
      if (index !== -1) {
        classes.value[index] = { ...classes.value[index], ...data }
      }
      showToast('Class updated successfully', 'success')
    } else {
      // Create new class
      const newClass: ClassData = {
        id: Date.now().toString(),
        name: data.name || '',
        subject: data.subject || '',
        grade: data.grade || '',
        schedule: data.schedule || '',
        studentCount: 0,
        activeStudents: 0,
        averageGrade: 0,
        status: 'active',
        createdAt: new Date(),
        ...data
      }
      classes.value.unshift(newClass)
      showToast('Class created successfully', 'success')
    }
    
    closeModals()
  } catch (error) {
    showToast('Failed to save class', 'error')
  }
}

const closeModals = () => {
  showCreateModal.value = false
  showEditModal.value = false
  editingClass.value = null
}

// Lifecycle
onMounted(async () => {
  loading.value = true
  try {
    // Load classes from API
    await new Promise(resolve => setTimeout(resolve, 1000))
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.page-title {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
  margin: 0;
}

.page-subtitle {
  font-size: var(--font-size-base);
  color: var(--text-secondary);
  margin: var(--spacing-xs) 0 0;
}

.loading-container {
  min-height: 400px;
}

/* Dark mode adjustments */
.dark-mode .page-title {
  color: var(--text-primary);
}
</style>