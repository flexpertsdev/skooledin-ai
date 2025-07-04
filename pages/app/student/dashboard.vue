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
  min-height: 100vh;
  background-color: rgb(249 250 251);
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
}

/* Welcome Section */
.dashboard-welcome {
  background-image: linear-gradient(to right, var(--primary-600), var(--primary-700));
  border-radius: 1rem;
  padding: 2rem;
  color: #ffffff;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
}

.welcome-content {
  flex: 1 1 0%;
}

.welcome-title {
  font-size: 1.875rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.welcome-subtitle {
  color: var(--primary-100);
  font-size: 1.125rem;
}

.welcome-stats {
  display: flex;
  gap: 1rem;
}

.stat-card {
  background-color: rgb(255 255 255 / 0.1);
  backdrop-filter: blur(4px);
  border-radius: 0.75rem;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.stat-icon {
  width: 2.5rem;
  height: 2.5rem;
}

.stat-icon--streak {
  color: rgb(253 186 116);
}

.stat-icon--points {
  color: rgb(252 211 77);
}

.stat-info {
  color: #ffffff;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
}

.stat-label {
  font-size: 0.875rem;
  color: var(--primary-100);
}

/* Sections */
.dashboard-section {
  margin-bottom: 2rem;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: rgb(17 24 39);
}

.section-link {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.875rem;
  color: var(--primary-600);
  font-weight: 500;
  transition: color 150ms ease;
}

.section-link:hover {
  color: var(--primary-700);
}

.section-link Icon {
  width: 1rem;
  height: 1rem;
}

/* Quick Actions */
.quick-action {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1.5rem;
  border-radius: 0.75rem;
  border: 2px solid transparent;
  transition: all 150ms ease;
  color: #ffffff;
  font-weight: 500;
}

.quick-action:hover {
  transform: scale(1.05);
}

.quick-action-icon {
  width: 2rem;
  height: 2rem;
}

.quick-action-label {
  font-size: 0.875rem;
}

.quick-action--purple {
  background-color: rgb(147 51 234);
}

.quick-action--purple:hover {
  background-color: rgb(126 34 206);
}

.quick-action--blue {
  background-color: rgb(37 99 235);
}

.quick-action--blue:hover {
  background-color: rgb(29 78 216);
}

.quick-action--green {
  background-color: rgb(34 197 94);
}

.quick-action--green:hover {
  background-color: rgb(21 128 61);
}

.quick-action--orange {
  background-color: rgb(251 146 60);
}

.quick-action--orange:hover {
  background-color: rgb(234 88 12);
}

/* Course Grid */
.course-grid {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .course-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

/* Tool Cards */
.tool-card {
  cursor: pointer;
  transition: all 150ms ease;
}

.tool-card:hover {
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -2px rgb(0 0 0 / 0.05);
}

.tool-icon {
  width: 3rem;
  height: 3rem;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

.tool-icon Icon {
  width: 1.5rem;
  height: 1.5rem;
  color: #ffffff;
}

.tool-icon--purple {
  background-color: rgb(147 51 234);
}

.tool-icon--green {
  background-color: rgb(34 197 94);
}

.tool-icon--blue {
  background-color: rgb(37 99 235);
}

.tool-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: rgb(17 24 39);
  margin-bottom: 0.5rem;
}

.tool-description {
  font-size: 0.875rem;
  color: rgb(75 85 99);
  margin-bottom: 1rem;
}

.tool-stats {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.875rem;
}

.tool-updated {
  color: rgb(107 114 128);
}

/* Task List */
.task-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

/* Activity Timeline */
.activity-timeline {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Mobile adjustments */
@media (max-width: 768px) {
  .dashboard-welcome {
    flex-direction: column;
    text-align: center;
  }
  
  .welcome-stats {
    width: 100%;
    justify-content: center;
  }
  
  .stat-card {
    flex: 1 1 0%;
  }
  
  .quick-action {
    padding: 1rem;
  }
  
  .quick-action-icon {
    width: 1.5rem;
    height: 1.5rem;
  }
}
</style>