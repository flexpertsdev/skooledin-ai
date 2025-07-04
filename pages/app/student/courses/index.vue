<template>
  <LayoutSafeArea top>
    <LayoutContainer>
      <LayoutStack gap="lg">
        <!-- Page Header -->
        <LayoutRow justify="between" align="center" responsive>
          <div>
            <h1 class="page-title">My Courses</h1>
            <p class="page-subtitle">Manage your enrolled courses and track progress</p>
          </div>
          <LayoutRow gap="sm">
            <Button variant="secondary" size="sm" @click="showFilters = true">
              <Icon name="heroicons:funnel" />
              <span>Filter</span>
            </Button>
            <Button size="sm" @click="navigateTo('/app/student/courses/explore')">
              <Icon name="heroicons:plus" />
              <span>Explore Courses</span>
            </Button>
          </LayoutRow>
        </LayoutRow>

        <!-- View Controls -->
        <LayoutRow justify="between" align="center" responsive>
          <SearchBar
            v-model="searchQuery"
            placeholder="Search courses..."
            @search="handleSearch"
          />
          <LayoutRow gap="sm">
            <SortDropdown
              v-model="sortBy"
              :options="sortOptions"
              @change="handleSort"
            />
            <ViewToggle
              v-model="viewMode"
              :options="['grid', 'list']"
              @change="handleViewChange"
            />
          </LayoutRow>
        </LayoutRow>

        <!-- Active Filters -->
        <div v-if="activeFilters.length > 0" class="active-filters">
          <LayoutWrap gap="sm">
            <Chip
              v-for="filter in activeFilters"
              :key="filter.id"
              :label="filter.label"
              removable
              @remove="removeFilter(filter.id)"
            />
            <Button
              variant="text"
              size="sm"
              @click="clearAllFilters"
            >
              Clear all
            </Button>
          </LayoutWrap>
        </div>

        <!-- Course Grid/List -->
        <div v-if="loading" class="loading-container">
          <LayoutGrid :cols="viewMode === 'grid' ? gridCols : 1" gap="lg">
            <Skeleton
              v-for="i in 6"
              :key="`skeleton-${i}`"
              variant="rectangular"
              :height="viewMode === 'grid' ? 280 : 120"
            />
          </LayoutGrid>
        </div>

        <div v-else-if="filteredCourses.length === 0" class="empty-state-container">
          <EmptyState
            icon="heroicons:academic-cap"
            title="No courses found"
            :description="searchQuery ? 'Try adjusting your search or filters' : 'Start exploring courses to begin learning'"
          >
            <Button @click="navigateTo('/app/student/courses/explore')">
              Explore Courses
            </Button>
          </EmptyState>
        </div>

        <LayoutGrid
          v-else
          :cols="viewMode === 'grid' ? gridCols : 1"
          gap="lg"
        >
          <component
            :is="viewMode === 'grid' ? CourseCard : CourseListItem"
            v-for="course in paginatedCourses"
            :key="course.id"
            :course="course"
            @click="navigateTo(`/app/student/courses/${course.id}`)"
            @edit="editCourse(course)"
            @delete="confirmDelete(course)"
          />
        </LayoutGrid>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="pagination-container">
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

  <!-- Filter Modal -->
  <ContentFilter
    v-model:visible="showFilters"
    :filters="filterConfig"
    @apply="applyFilters"
  />

  <!-- Delete Confirmation -->
  <ConfirmDialog
    v-model:visible="showDeleteConfirm"
    variant="error"
    title="Remove Course?"
    :message="`Are you sure you want to remove '${selectedCourse?.title}' from your courses?`"
    confirm-text="Remove"
    @confirm="deleteCourse"
  />
</template>

<script setup lang="ts">
import type { Course } from '~/types/course'
import { useCourseStore } from '~/stores/course'
import { useResponsive } from '~/composables/useResponsive'

// Page meta
useHead({
  title: 'My Courses - Skooledin AI',
  meta: [
    {
      name: 'description',
      content: 'Manage your enrolled courses and track learning progress'
    }
  ]
})

// Composables
const { match } = useResponsive()
const courseStore = useCourseStore()
const { $toast } = useNuxtApp()

// State
const searchQuery = ref('')
const sortBy = ref('recent')
const viewMode = ref<'grid' | 'list'>('grid')
const showFilters = ref(false)
const showDeleteConfirm = ref(false)
const selectedCourse = ref<Course | null>(null)
const currentPage = ref(1)
const itemsPerPage = 12
const loading = ref(false)
const activeFilters = ref<Array<{ id: string; label: string; value: any }>>([])

// Computed
const gridCols = computed(() => match({
  mobile: 1,
  tablet: 2,
  laptop: 3,
  default: 4
}))

const filteredCourses = computed(() => {
  let courses = [...courseStore.enrolledCourses]

  // Apply search
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    courses = courses.filter(course =>
      course.title.toLowerCase().includes(query) ||
      course.description?.toLowerCase().includes(query) ||
      course.instructor?.toLowerCase().includes(query)
    )
  }

  // Apply filters
  activeFilters.value.forEach(filter => {
    // Filter logic based on filter type
    switch (filter.id) {
      case 'subject':
        courses = courses.filter(c => c.subject === filter.value)
        break
      case 'difficulty':
        courses = courses.filter(c => c.difficulty === filter.value)
        break
      case 'status':
        courses = courses.filter(c => c.status === filter.value)
        break
      case 'progress':
        const [min, max] = filter.value
        courses = courses.filter(c => c.progress >= min && c.progress <= max)
        break
    }
  })

  // Apply sorting
  courses.sort((a, b) => {
    switch (sortBy.value) {
      case 'recent':
        return new Date(b.lastAccessed).getTime() - new Date(a.lastAccessed).getTime()
      case 'title':
        return a.title.localeCompare(b.title)
      case 'progress':
        return b.progress - a.progress
      case 'started':
        return new Date(b.enrolledAt).getTime() - new Date(a.enrolledAt).getTime()
      default:
        return 0
    }
  })

  return courses
})

const totalPages = computed(() => 
  Math.ceil(filteredCourses.value.length / itemsPerPage)
)

const paginatedCourses = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredCourses.value.slice(start, end)
})

// Data
const sortOptions = [
  { value: 'recent', label: 'Recently Accessed' },
  { value: 'title', label: 'Title' },
  { value: 'progress', label: 'Progress' },
  { value: 'started', label: 'Date Started' }
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
  difficulty: {
    type: 'select',
    label: 'Difficulty',
    options: [
      { value: 'beginner', label: 'Beginner' },
      { value: 'intermediate', label: 'Intermediate' },
      { value: 'advanced', label: 'Advanced' }
    ]
  },
  status: {
    type: 'select',
    label: 'Status',
    options: [
      { value: 'active', label: 'In Progress' },
      { value: 'completed', label: 'Completed' },
      { value: 'paused', label: 'Paused' }
    ]
  },
  progress: {
    type: 'range',
    label: 'Progress',
    min: 0,
    max: 100,
    step: 10
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

const handleViewChange = (mode: 'grid' | 'list') => {
  viewMode.value = mode
}

const applyFilters = (filters: Record<string, any>) => {
  activeFilters.value = Object.entries(filters)
    .filter(([_, value]) => value !== null && value !== undefined)
    .map(([key, value]) => ({
      id: key,
      label: `${filterConfig[key].label}: ${formatFilterValue(key, value)}`,
      value
    }))
  currentPage.value = 1
}

const formatFilterValue = (key: string, value: any): string => {
  if (key === 'progress') {
    return `${value[0]}% - ${value[1]}%`
  }
  const option = filterConfig[key].options?.find((o: any) => o.value === value)
  return option?.label || value
}

const removeFilter = (filterId: string) => {
  activeFilters.value = activeFilters.value.filter(f => f.id !== filterId)
}

const clearAllFilters = () => {
  activeFilters.value = []
}

const editCourse = (course: Course) => {
  navigateTo(`/app/student/courses/${course.id}/edit`)
}

const confirmDelete = (course: Course) => {
  selectedCourse.value = course
  showDeleteConfirm.value = true
}

const deleteCourse = async () => {
  if (!selectedCourse.value) return

  try {
    await courseStore.unenrollFromCourse(selectedCourse.value.id)
    $toast.success('Course removed successfully')
    showDeleteConfirm.value = false
    selectedCourse.value = null
  } catch (error) {
    $toast.error('Failed to remove course')
  }
}

// Load courses on mount
onMounted(async () => {
  loading.value = true
  try {
    await courseStore.loadEnrolledCourses()
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

.active-filters {
  padding: var(--spacing-md);
  background: var(--surface-secondary);
  border-radius: var(--radius-md);
}

.loading-container,
.empty-state-container {
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
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
.dark-mode .active-filters {
  background: var(--surface-elevated);
}
</style>