<template>
  <LayoutContainer>
    <LayoutStack gap="lg">
      <!-- Page Header -->
      <LayoutRow justify="between" align="center" wrap>
        <div>
          <h1 class="page-title">Grading</h1>
          <p class="page-subtitle">Review and grade student submissions</p>
        </div>
        <LayoutRow gap="sm">
          <Button variant="secondary" @click="showBulkActions = !showBulkActions">
            <template #icon>
              <Icon name="heroicons:bars-3" />
            </template>
            Bulk Actions
          </Button>
          <Button variant="secondary" @click="exportGrades">
            <template #icon>
              <Icon name="heroicons:arrow-down-tray" />
            </template>
            Export
          </Button>
        </LayoutRow>
      </LayoutRow>

      <!-- Stats -->
      <LayoutGrid :cols="{ base: 2, lg: 4 }" gap="md">
        <StatCard
          icon="heroicons:document-text"
          label="To Grade"
          :value="stats.toGrade"
          variant="warning"
        />
        <StatCard
          icon="heroicons:clock"
          label="In Progress"
          :value="stats.inProgress"
          variant="info"
        />
        <StatCard
          icon="heroicons:check-circle"
          label="Graded Today"
          :value="stats.gradedToday"
          variant="success"
        />
        <StatCard
          icon="heroicons:exclamation-triangle"
          label="Overdue"
          :value="stats.overdue"
          variant="error"
        />
      </LayoutGrid>

      <!-- Filters -->
      <LayoutRow gap="md" align="center" wrap>
        <LayoutExpanded>
          <SearchBar
            v-model="searchQuery"
            placeholder="Search by student or assignment..."
            @search="handleSearch"
          />
        </LayoutExpanded>
        <Select
          v-model="filterClass"
          :options="classOptions"
          placeholder="All Classes"
        />
        <Select
          v-model="filterStatus"
          :options="statusOptions"
          placeholder="All Status"
        />
        <SortDropdown
          v-model="sortBy"
          :options="sortOptions"
          @change="handleSort"
        />
      </LayoutRow>

      <!-- Bulk Actions Bar -->
      <Transition name="slide-down">
        <div v-if="showBulkActions && selectedItems.length > 0" class="bulk-actions-bar">
          <LayoutRow justify="between" align="center">
            <span class="bulk-count">{{ selectedItems.length }} items selected</span>
            <LayoutRow gap="sm">
              <Button variant="secondary" size="sm" @click="bulkGrade">
                Grade Selected
              </Button>
              <Button variant="secondary" size="sm" @click="bulkReturn">
                Return Selected
              </Button>
              <Button variant="secondary" size="sm" @click="clearSelection">
                Clear Selection
              </Button>
            </LayoutRow>
          </LayoutRow>
        </div>
      </Transition>

      <!-- Submissions List -->
      <div v-if="loading" class="loading-container">
        <LayoutStack gap="sm">
          <Skeleton v-for="i in 5" :key="i" height="120px" />
        </LayoutStack>
      </div>

      <LayoutStack v-else-if="filteredSubmissions.length > 0" gap="sm">
        <GradingItem
          v-for="submission in paginatedSubmissions"
          :key="submission.id"
          :submission="submission"
          :selected="selectedItems.includes(submission.id)"
          :show-checkbox="showBulkActions"
          @toggle-select="toggleSelect(submission.id)"
          @grade="handleGrade(submission)"
          @view="handleView(submission)"
          @return="handleReturn(submission)"
        />
      </LayoutStack>

      <EmptyState
        v-else
        icon="heroicons:document-text"
        title="No submissions to grade"
        :description="searchQuery ? 'Try adjusting your search or filters' : 'You\'re all caught up!'"
      />

      <!-- Pagination -->
      <LayoutRow v-if="totalPages > 1" justify="center">
        <Pagination
          v-model="currentPage"
          :total="totalPages"
          :sibling-count="1"
        />
      </LayoutRow>
    </LayoutStack>

    <!-- Grading Modal -->
    <GradingModal
      :open="showGradingModal"
      :submission="selectedSubmission"
      @close="closeGradingModal"
      @submit="submitGrade"
    />

    <!-- Quick View Modal -->
    <SubmissionViewModal
      :open="showViewModal"
      :submission="viewingSubmission"
      @close="showViewModal = false"
      @grade="handleGrade"
    />
  </LayoutContainer>
</template>

<script setup lang="ts">
import { useTeacherStore } from '~/stores/teacher'
import { useToast } from '~/composables/useToast'

interface Submission {
  id: string
  studentId: string
  studentName: string
  studentAvatar?: string
  assignmentId: string
  assignmentTitle: string
  classId: string
  className: string
  subject: string
  submittedAt: Date
  dueDate: Date
  status: 'pending' | 'in-progress' | 'graded' | 'returned'
  grade?: number
  maxGrade: number
  feedback?: string
  attachments: Array<{
    name: string
    type: string
    url: string
  }>
}

const teacherStore = useTeacherStore()
const { showToast } = useToast()

// State
const loading = ref(false)
const searchQuery = ref('')
const filterClass = ref('all')
const filterStatus = ref('all')
const sortBy = ref('due-date')
const currentPage = ref(1)
const itemsPerPage = 10

const showBulkActions = ref(false)
const selectedItems = ref<string[]>([])
const showGradingModal = ref(false)
const selectedSubmission = ref<Submission | null>(null)
const showViewModal = ref(false)
const viewingSubmission = ref<Submission | null>(null)

// Mock data
const submissions = ref<Submission[]>([
  {
    id: '1',
    studentId: 's1',
    studentName: 'John Doe',
    studentAvatar: '/avatars/john.jpg',
    assignmentId: 'a1',
    assignmentTitle: 'Chapter 5 Homework',
    classId: 'c1',
    className: 'Mathematics 101',
    subject: 'Mathematics',
    submittedAt: new Date(Date.now() - 3600000),
    dueDate: new Date(Date.now() + 86400000),
    status: 'pending',
    maxGrade: 100,
    attachments: [
      { name: 'homework.pdf', type: 'pdf', url: '/files/homework.pdf' }
    ]
  },
  {
    id: '2',
    studentId: 's2',
    studentName: 'Jane Smith',
    assignmentId: 'a2',
    assignmentTitle: 'Lab Report 3',
    classId: 'c2',
    className: 'Advanced Physics',
    subject: 'Physics',
    submittedAt: new Date(Date.now() - 7200000),
    dueDate: new Date(Date.now() - 3600000),
    status: 'pending',
    maxGrade: 50,
    attachments: [
      { name: 'lab_report.pdf', type: 'pdf', url: '/files/lab_report.pdf' },
      { name: 'data.xlsx', type: 'excel', url: '/files/data.xlsx' }
    ]
  }
])

const stats = computed(() => ({
  toGrade: submissions.value.filter(s => s.status === 'pending').length,
  inProgress: submissions.value.filter(s => s.status === 'in-progress').length,
  gradedToday: 12, // Mock value
  overdue: submissions.value.filter(s => 
    s.status === 'pending' && s.dueDate < new Date()
  ).length
}))

const classOptions = computed(() => [
  { value: 'all', label: 'All Classes' },
  ...Array.from(new Set(submissions.value.map(s => s.classId)))
    .map(id => {
      const sub = submissions.value.find(s => s.classId === id)
      return { value: id, label: sub?.className || id }
    })
])

const statusOptions = [
  { value: 'all', label: 'All Status' },
  { value: 'pending', label: 'To Grade' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'graded', label: 'Graded' },
  { value: 'returned', label: 'Returned' }
]

const sortOptions = [
  { value: 'due-date', label: 'Due Date' },
  { value: 'submitted', label: 'Submission Date' },
  { value: 'student', label: 'Student Name' },
  { value: 'assignment', label: 'Assignment' }
]

// Computed
const filteredSubmissions = computed(() => {
  let result = submissions.value
  
  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(sub => 
      sub.studentName.toLowerCase().includes(query) ||
      sub.assignmentTitle.toLowerCase().includes(query)
    )
  }
  
  // Class filter
  if (filterClass.value !== 'all') {
    result = result.filter(sub => sub.classId === filterClass.value)
  }
  
  // Status filter
  if (filterStatus.value !== 'all') {
    result = result.filter(sub => sub.status === filterStatus.value)
  }
  
  // Sort
  result = [...result].sort((a, b) => {
    switch (sortBy.value) {
      case 'due-date':
        return a.dueDate.getTime() - b.dueDate.getTime()
      case 'submitted':
        return b.submittedAt.getTime() - a.submittedAt.getTime()
      case 'student':
        return a.studentName.localeCompare(b.studentName)
      case 'assignment':
        return a.assignmentTitle.localeCompare(b.assignmentTitle)
      default:
        return 0
    }
  })
  
  return result
})

const totalPages = computed(() => 
  Math.ceil(filteredSubmissions.value.length / itemsPerPage)
)

const paginatedSubmissions = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredSubmissions.value.slice(start, end)
})

// Methods
const handleSearch = (query: string) => {
  searchQuery.value = query
  currentPage.value = 1
}

const handleSort = (value: string) => {
  sortBy.value = value
}

const toggleSelect = (id: string) => {
  if (selectedItems.value.includes(id)) {
    selectedItems.value = selectedItems.value.filter(item => item !== id)
  } else {
    selectedItems.value.push(id)
  }
}

const clearSelection = () => {
  selectedItems.value = []
}

const handleGrade = (submission: Submission) => {
  selectedSubmission.value = submission
  showGradingModal.value = true
}

const handleView = (submission: Submission) => {
  viewingSubmission.value = submission
  showViewModal.value = true
}

const handleReturn = async (submission: Submission) => {
  try {
    submission.status = 'returned'
    showToast('Assignment returned to student', 'success')
  } catch (error) {
    showToast('Failed to return assignment', 'error')
  }
}

const submitGrade = async (data: { grade: number; feedback: string }) => {
  if (!selectedSubmission.value) return
  
  try {
    selectedSubmission.value.grade = data.grade
    selectedSubmission.value.feedback = data.feedback
    selectedSubmission.value.status = 'graded'
    
    showToast('Grade submitted successfully', 'success')
    closeGradingModal()
  } catch (error) {
    showToast('Failed to submit grade', 'error')
  }
}

const closeGradingModal = () => {
  showGradingModal.value = false
  selectedSubmission.value = null
}

const bulkGrade = () => {
  showToast(`Grade ${selectedItems.value.length} submissions`, 'info')
}

const bulkReturn = () => {
  showToast(`Return ${selectedItems.value.length} submissions`, 'info')
}

const exportGrades = () => {
  showToast('Exporting grades...', 'info')
}

// Lifecycle
onMounted(async () => {
  loading.value = true
  try {
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

.bulk-actions-bar {
  background: var(--surface-secondary);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
}

.bulk-count {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

/* Slide down animation */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}

.slide-down-enter-from {
  transform: translateY(-10px);
  opacity: 0;
}

.slide-down-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}

/* Dark mode adjustments */
.dark-mode .bulk-actions-bar {
  background: var(--surface-elevated);
}
</style>