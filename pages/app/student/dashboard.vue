<template>
  <div class="student-dashboard">
    <LayoutContainer>
      <!-- Welcome Header -->
      <section class="dashboard-welcome">
        <div class="welcome-content">
          <h1 class="welcome-title">
            Welcome back, {{ user?.name?.split(' ')[0] || 'Student' }}! 👋
          </h1>
          <p class="welcome-subtitle">
            {{ greeting }}. Ready to continue learning?
          </p>
        </div>
        <div class="welcome-stats">
          <div class="stat-card">
            <Icon name="heroicons:fire" class="stat-icon stat-icon--streak" />
            <div class="stat-info">
              <p class="stat-value">{{ stats.streak }}</p>
              <p class="stat-label">Day Streak</p>
            </div>
          </div>
          <div class="stat-card">
            <Icon name="heroicons:academic-cap" class="stat-icon stat-icon--points" />
            <div class="stat-info">
              <p class="stat-value">{{ stats.points }}</p>
              <p class="stat-label">Points</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Quick Actions -->
      <LayoutStack gap="md" class="dashboard-section">
        <h2 class="section-title">Quick Actions</h2>
        <LayoutGrid cols="2" md="4" gap="md">
          <Card
            v-for="action in quickActions"
            :key="action.id"
            @click="navigateTo(action.route)"
            class="quick-action"
            :class="`quick-action--${action.color}`"
            hoverable
          >
            <LayoutColumn align="center" gap="sm">
              <Icon :name="action.icon" class="quick-action-icon" />
              <span class="quick-action-label">{{ action.label }}</span>
            </LayoutColumn>
          </Card>
        </LayoutGrid>
      </LayoutStack>

      <!-- Continue Learning -->
      <LayoutStack gap="md" class="dashboard-section">
        <LayoutRow justify="between" align="center">
          <h2 class="section-title">Continue Learning</h2>
          <NuxtLink to="/app/student/courses" class="section-link">
            <LayoutRow gap="xs" align="center">
              <span>View all courses</span>
              <Icon name="heroicons:chevron-right" />
            </LayoutRow>
          </NuxtLink>
        </LayoutRow>
        <LayoutGrid v-if="recentCourses.length > 0" cols="1" md="2" gap="lg">
          <CourseCard
            v-for="course in recentCourses"
            :key="course.id"
            :course="course"
            @click="navigateTo(`/app/student/courses/${course.id}`)"
          />
        </LayoutGrid>
        <EmptyState
          v-else
          icon="heroicons:academic-cap"
          title="No courses yet"
          description="Start exploring courses to begin your learning journey"
        >
          <Button @click="navigateTo('/app/student/courses')">
            Browse Courses
          </Button>
        </EmptyState>
      </LayoutStack>

      <!-- Study Tools -->
      <LayoutStack gap="md" class="dashboard-section">
        <h2 class="section-title">Study Tools</h2>
        <LayoutGrid cols="1" sm="2" md="3" gap="lg">
          <Card
            v-for="tool in studyTools"
            :key="tool.id"
            class="tool-card"
            hoverable
            @click="navigateTo(tool.route)"
          >
            <LayoutStack gap="md">
              <div class="tool-icon" :class="`tool-icon--${tool.color}`">
                <Icon :name="tool.icon" />
              </div>
              <LayoutStack gap="sm">
                <h3 class="tool-title">{{ tool.title }}</h3>
                <p class="tool-description">{{ tool.description }}</p>
              </LayoutStack>
              <LayoutRow justify="between" align="center">
                <Badge :label="`${tool.count} items`" variant="secondary" />
                <span class="tool-updated">{{ tool.lastUsed }}</span>
              </LayoutRow>
            </LayoutStack>
          </Card>
        </LayoutGrid>
      </LayoutStack>

      <!-- Upcoming Tasks -->
      <LayoutStack gap="md" class="dashboard-section">
        <LayoutRow justify="between" align="center">
          <h2 class="section-title">Upcoming Tasks</h2>
          <FilterButton
            :active-count="activeFilters"
            @click="showTaskFilter = true"
          />
        </LayoutRow>
        <LayoutStack v-if="upcomingTasks.length > 0" gap="sm">
          <TaskItem
            v-for="task in upcomingTasks"
            :key="task.id"
            :task="task"
            @complete="completeTask(task.id)"
            @click="navigateTo(`/app/student/tasks/${task.id}`)"
          />
        </LayoutStack>
        <EmptyState
          v-else
          icon="heroicons:clipboard-document-check"
          title="All caught up!"
          description="You have no pending tasks"
        />
      </LayoutStack>

      <!-- Recent Activity -->
      <LayoutStack gap="md" class="dashboard-section">
        <LayoutRow justify="between" align="center">
          <h2 class="section-title">Recent Activity</h2>
          <NuxtLink to="/app/student/activity" class="section-link">
            <LayoutRow gap="xs" align="center">
              <span>View all</span>
              <Icon name="heroicons:chevron-right" />
            </LayoutRow>
          </NuxtLink>
        </LayoutRow>
        <LayoutStack gap="md">
          <ActivityItem
            v-for="activity in recentActivity"
            :key="activity.id"
            :activity="activity"
          />
        </LayoutStack>
      </LayoutStack>
    </LayoutContainer>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'app',
  middleware: ['auth', 'role-student']
})

const authStore = useAuthStore()
const user = computed(() => authStore.user)

// Greeting based on time of day
const greeting = computed(() => {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
})

// Dashboard stats
const stats = ref({
  streak: 7,
  points: 1250
})

// Quick actions
const quickActions = [
  {
    id: 'chat',
    label: 'AI Chat',
    icon: 'heroicons:chat-bubble-bottom-center-text',
    route: '/app/chat',
    color: 'purple'
  },
  {
    id: 'notebook',
    label: 'Notebook',
    icon: 'heroicons:book-open',
    route: '/app/notebook',
    color: 'blue'
  },
  {
    id: 'flashcards',
    label: 'Flashcards',
    icon: 'heroicons:square-2-stack',
    route: '/app/study/flashcards',
    color: 'green'
  },
  {
    id: 'quiz',
    label: 'Take Quiz',
    icon: 'heroicons:clipboard-document-check',
    route: '/app/study/quiz',
    color: 'orange'
  }
]

// Recent courses (mock data)
const recentCourses = ref([
  {
    id: '1',
    title: 'Advanced Mathematics',
    subject: 'Mathematics',
    progress: 65,
    nextLesson: 'Calculus: Derivatives',
    thumbnail: '/images/math-course.jpg'
  },
  {
    id: '2',
    title: 'Physics Fundamentals',
    subject: 'Science',
    progress: 45,
    nextLesson: 'Newton\'s Laws of Motion',
    thumbnail: '/images/physics-course.jpg'
  }
])

// Study tools
const studyTools = [
  {
    id: 'flashcards',
    title: 'Flashcards',
    description: 'Review and memorize key concepts',
    icon: 'heroicons:square-2-stack',
    color: 'purple',
    count: 156,
    lastUsed: 'Used 2 hours ago',
    route: '/app/study/flashcards'
  },
  {
    id: 'quizzes',
    title: 'Quizzes',
    description: 'Test your knowledge',
    icon: 'heroicons:clipboard-document-check',
    color: 'green',
    count: 23,
    lastUsed: 'Used yesterday',
    route: '/app/study/quiz'
  },
  {
    id: 'summaries',
    title: 'Summaries',
    description: 'Quick revision notes',
    icon: 'heroicons:document-text',
    color: 'blue',
    count: 48,
    lastUsed: 'Used 3 days ago',
    route: '/app/notebook?filter=summary'
  }
]

// Upcoming tasks
const showTaskFilter = ref(false)
const activeFilters = ref(0)
const upcomingTasks = ref([
  {
    id: '1',
    title: 'Math Assignment: Chapter 5',
    subject: 'Mathematics',
    dueDate: new Date(Date.now() + 86400000), // Tomorrow
    type: 'assignment',
    priority: 'high'
  },
  {
    id: '2',
    title: 'Physics Lab Report',
    subject: 'Physics',
    dueDate: new Date(Date.now() + 172800000), // In 2 days
    type: 'assignment',
    priority: 'medium'
  },
  {
    id: '3',
    title: 'History Essay: World War II',
    subject: 'History',
    dueDate: new Date(Date.now() + 259200000), // In 3 days
    type: 'essay',
    priority: 'medium'
  }
])

// Recent activity
const recentActivity = ref([
  {
    id: '1',
    type: 'achievement',
    title: 'Completed Math Quiz',
    description: 'Scored 95% on Algebra Quiz',
    time: new Date(Date.now() - 3600000), // 1 hour ago
    icon: 'heroicons:trophy',
    color: 'yellow'
  },
  {
    id: '2',
    type: 'study',
    title: 'Studied Physics',
    description: 'Reviewed 25 flashcards',
    time: new Date(Date.now() - 7200000), // 2 hours ago
    icon: 'heroicons:square-2-stack',
    color: 'purple'
  },
  {
    id: '3',
    type: 'submission',
    title: 'Submitted Assignment',
    description: 'English Essay submitted',
    time: new Date(Date.now() - 86400000), // Yesterday
    icon: 'heroicons:document-check',
    color: 'green'
  }
])

const completeTask = (taskId: string) => {
  // Handle task completion
  upcomingTasks.value = upcomingTasks.value.filter(task => task.id !== taskId)
}
</script>

<style scoped>
.student-dashboard {
  @apply min-h-screen bg-gray-50 py-6;
}

/* Welcome Section */
.dashboard-welcome {
  @apply bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8
         text-white mb-8 flex items-center justify-between gap-6;
}

.welcome-content {
  @apply flex-1;
}

.welcome-title {
  @apply text-3xl font-bold mb-2;
}

.welcome-subtitle {
  @apply text-primary-100 text-lg;
}

.welcome-stats {
  @apply flex gap-4;
}

.stat-card {
  @apply bg-white/10 backdrop-blur-sm rounded-xl p-4 flex items-center gap-3;
}

.stat-icon {
  @apply w-10 h-10;
}

.stat-icon--streak {
  @apply text-orange-300;
}

.stat-icon--points {
  @apply text-yellow-300;
}

.stat-info {
  @apply text-white;
}

.stat-value {
  @apply text-2xl font-bold;
}

.stat-label {
  @apply text-sm text-primary-100;
}

/* Sections */
.dashboard-section {
  @apply mb-8;
}

.section-header {
  @apply flex items-center justify-between mb-6;
}

.section-title {
  @apply text-xl font-semibold text-gray-900;
}

.section-link {
  @apply flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700
         font-medium transition-colors;
}

.section-link Icon {
  @apply w-4 h-4;
}

/* Quick Actions */
.quick-action {
  @apply flex flex-col items-center justify-center gap-3 p-6 rounded-xl
         border-2 border-transparent hover:scale-105 transition-all
         text-white font-medium;
}

.quick-action-icon {
  @apply w-8 h-8;
}

.quick-action-label {
  @apply text-sm;
}

.quick-action--purple {
  @apply bg-purple-600 hover:bg-purple-700;
}

.quick-action--blue {
  @apply bg-blue-600 hover:bg-blue-700;
}

.quick-action--green {
  @apply bg-green-600 hover:bg-green-700;
}

.quick-action--orange {
  @apply bg-orange-600 hover:bg-orange-700;
}

/* Course Grid */
.course-grid {
  @apply grid grid-cols-1 md:grid-cols-2 gap-6;
}

/* Tool Cards */
.tool-card {
  @apply cursor-pointer hover:shadow-lg transition-all;
}

.tool-icon {
  @apply w-12 h-12 rounded-xl flex items-center justify-center mb-4;
}

.tool-icon Icon {
  @apply w-6 h-6 text-white;
}

.tool-icon--purple {
  @apply bg-purple-600;
}

.tool-icon--green {
  @apply bg-green-600;
}

.tool-icon--blue {
  @apply bg-blue-600;
}

.tool-title {
  @apply text-lg font-semibold text-gray-900 mb-2;
}

.tool-description {
  @apply text-sm text-gray-600 mb-4;
}

.tool-stats {
  @apply flex items-center justify-between text-sm;
}

.tool-updated {
  @apply text-gray-500;
}

/* Task List */
.task-list {
  @apply space-y-3;
}

/* Activity Timeline */
.activity-timeline {
  @apply space-y-4;
}

/* Mobile adjustments */
@media (max-width: 768px) {
  .dashboard-welcome {
    @apply flex-col text-center;
  }
  
  .welcome-stats {
    @apply w-full justify-center;
  }
  
  .stat-card {
    @apply flex-1;
  }
  
  .quick-action {
    @apply p-4;
  }
  
  .quick-action-icon {
    @apply w-6 h-6;
  }
}
</style>