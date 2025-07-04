<template>
  <LayoutSafeArea top>
    <LayoutContainer>
      <LayoutStack gap="xl">
        <!-- Welcome Header -->
        <div class="welcome-section">
          <LayoutRow justify="between" align="center" responsive>
            <div>
              <h1 class="welcome-title">Welcome back, {{ user?.name?.split(' ')[0] }}</h1>
              <p class="welcome-subtitle">{{ currentGreeting }}</p>
            </div>
            <LayoutRow gap="sm">
              <Button variant="secondary" @click="navigateTo('/app/teacher/schedule')">
                <Icon name="heroicons:calendar" />
                View Schedule
              </Button>
              <Button @click="navigateTo('/app/teacher/classes/new')">
                <Icon name="heroicons:plus" />
                Create Class
              </Button>
            </LayoutRow>
          </LayoutRow>
        </div>

        <!-- Quick Stats -->
        <LayoutGrid cols="1" sm="2" lg="4" gap="lg">
          <div class="stat-card">
            <div class="stat-icon stat-icon-classes">
              <Icon name="heroicons:user-group" />
            </div>
            <div class="stat-content">
              <h3 class="stat-value">{{ stats.totalClasses }}</h3>
              <p class="stat-label">Active Classes</p>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon stat-icon-students">
              <Icon name="heroicons:academic-cap" />
            </div>
            <div class="stat-content">
              <h3 class="stat-value">{{ stats.totalStudents }}</h3>
              <p class="stat-label">Total Students</p>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon stat-icon-assignments">
              <Icon name="heroicons:clipboard-document-list" />
            </div>
            <div class="stat-content">
              <h3 class="stat-value">{{ stats.pendingAssignments }}</h3>
              <p class="stat-label">Pending Reviews</p>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon stat-icon-messages">
              <Icon name="heroicons:chat-bubble-bottom-center-text" />
            </div>
            <div class="stat-content">
              <h3 class="stat-value">{{ stats.unreadMessages }}</h3>
              <p class="stat-label">Unread Messages</p>
            </div>
          </div>
        </LayoutGrid>

        <!-- Today's Schedule -->
        <section class="dashboard-section">
          <LayoutRow justify="between" align="center">
            <h2 class="section-title">Today's Schedule</h2>
            <NuxtLink to="/app/teacher/schedule" class="section-link">
              <LayoutRow gap="xs" align="center">
                <span>View full schedule</span>
                <Icon name="heroicons:chevron-right" />
              </LayoutRow>
            </NuxtLink>
          </LayoutRow>
          
          <LayoutStack gap="md" class="schedule-list">
            <div v-if="todaySchedule.length === 0" class="empty-schedule">
              <Icon name="heroicons:calendar-days" size="24" />
              <p>No classes scheduled for today</p>
            </div>
            <ScheduleItem
              v-else
              v-for="item in todaySchedule"
              :key="item.id"
              :schedule="item"
              @click="navigateTo(`/app/teacher/classes/${item.classId}`)"
            />
          </LayoutStack>
        </section>

        <!-- Recent Activity -->
        <section class="dashboard-section">
          <LayoutRow justify="between" align="center">
            <h2 class="section-title">Recent Activity</h2>
            <SortDropdown
              v-model="activitySort"
              :options="activitySortOptions"
              size="sm"
            />
          </LayoutRow>
          
          <LayoutStack gap="md" class="activity-list">
            <ActivityItem
              v-for="activity in recentActivity"
              :key="activity.id"
              :activity="activity"
              @action="handleActivityAction"
            />
          </LayoutStack>
        </section>

        <!-- Quick Actions -->
        <section class="dashboard-section">
          <h2 class="section-title">Quick Actions</h2>
          <LayoutGrid cols="1" sm="2" lg="3" gap="md">
            <QuickActionCard
              icon="heroicons:document-plus"
              title="Create Assignment"
              description="Design new assignments for your classes"
              @click="navigateTo('/app/teacher/assignments/new')"
            />
            <QuickActionCard
              icon="heroicons:clipboard-document-check"
              title="Grade Submissions"
              description="Review and grade student submissions"
              @click="navigateTo('/app/teacher/grading')"
            />
            <QuickActionCard
              icon="heroicons:chart-bar"
              title="View Analytics"
              description="Track student progress and performance"
              @click="navigateTo('/app/teacher/analytics')"
            />
            <QuickActionCard
              icon="heroicons:users"
              title="Manage Students"
              description="Add or remove students from classes"
              @click="navigateTo('/app/teacher/students')"
            />
            <QuickActionCard
              icon="heroicons:megaphone"
              title="Send Announcement"
              description="Broadcast messages to your classes"
              @click="showAnnouncementModal = true"
            />
            <QuickActionCard
              icon="heroicons:video-camera"
              title="Schedule Meeting"
              description="Set up virtual classroom sessions"
              @click="navigateTo('/app/teacher/meetings/new')"
            />
          </LayoutGrid>
        </section>

        <!-- Class Performance Overview -->
        <section class="dashboard-section">
          <LayoutRow justify="between" align="center">
            <h2 class="section-title">Class Performance</h2>
            <ViewToggle
              v-model="performanceView"
              :options="['chart', 'table']"
              size="sm"
            />
          </LayoutRow>
          
          <div class="performance-container">
            <ClassPerformanceChart
              v-if="performanceView === 'chart'"
              :data="performanceData"
            />
            <ClassPerformanceTable
              v-else
              :data="performanceData"
              @view-details="viewClassDetails"
            />
          </div>
        </section>
      </LayoutStack>
    </LayoutContainer>
  </LayoutSafeArea>

  <!-- Announcement Modal -->
  <AnnouncementModal
    v-model:visible="showAnnouncementModal"
    @send="sendAnnouncement"
  />
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
import { useTeacherStore } from '~/stores/teacher'

// Page meta
useHead({
  title: 'Teacher Dashboard - Skooledin AI',
  meta: [
    {
      name: 'description',
      content: 'Manage your classes, students, and assignments'
    }
  ]
})

// Stores
const authStore = useAuthStore()
const teacherStore = useTeacherStore()
const { $toast } = useNuxtApp()

// State
const activitySort = ref('recent')
const performanceView = ref<'chart' | 'table'>('chart')
const showAnnouncementModal = ref(false)

// Computed
const user = computed(() => authStore.user)

const currentGreeting = computed(() => {
  const hour = new Date().getHours()
  if (hour < 12) return "Good morning! Here's your teaching overview for today"
  if (hour < 17) return "Good afternoon! Here's what's happening in your classes"
  return "Good evening! Here's a summary of your teaching activities"
})

const stats = computed(() => teacherStore.dashboardStats)
const todaySchedule = computed(() => teacherStore.todaySchedule)
const recentActivity = computed(() => teacherStore.recentActivity)
const performanceData = computed(() => teacherStore.classPerformance)

// Data
const activitySortOptions = [
  { value: 'recent', label: 'Most Recent' },
  { value: 'priority', label: 'Priority' },
  { value: 'type', label: 'Activity Type' }
]

// Methods
const handleActivityAction = async (activity: any, action: string) => {
  try {
    await teacherStore.handleActivityAction(activity.id, action)
    $toast.success('Action completed successfully')
  } catch (error) {
    $toast.error('Failed to complete action')
  }
}

const viewClassDetails = (classId: string) => {
  navigateTo(`/app/teacher/classes/${classId}/analytics`)
}

const sendAnnouncement = async (data: any) => {
  try {
    await teacherStore.sendAnnouncement(data)
    $toast.success('Announcement sent successfully')
    showAnnouncementModal.value = false
  } catch (error) {
    $toast.error('Failed to send announcement')
  }
}

// Load dashboard data
onMounted(async () => {
  await teacherStore.loadDashboardData()
})
</script>

<style scoped>
.welcome-section {
  background: linear-gradient(135deg, var(--primary-color), var(--color-primary-700));
  color: white;
  padding: var(--spacing-2xl);
  border-radius: var(--radius-xl);
  margin-bottom: var(--spacing-xl);
}

.welcome-title {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  margin: 0;
}

.welcome-subtitle {
  font-size: var(--font-size-lg);
  margin-top: var(--spacing-xs);
  opacity: 0.9;
}

.stat-card {
  background: var(--surface-card);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stat-icon-classes {
  background: var(--color-blue-100);
  color: var(--color-blue-600);
}

.stat-icon-students {
  background: var(--color-green-100);
  color: var(--color-green-600);
}

.stat-icon-assignments {
  background: var(--color-orange-100);
  color: var(--color-orange-600);
}

.stat-icon-messages {
  background: var(--color-purple-100);
  color: var(--color-purple-600);
}

.stat-content {
  flex: 1;
}

.stat-value {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
  margin: 0;
}

.stat-label {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  margin: 0;
}

.dashboard-section {
  margin-bottom: var(--spacing-2xl);
}

.section-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  margin: 0 0 var(--spacing-lg);
}

.section-link {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  color: var(--primary-color);
  font-size: var(--font-size-sm);
  text-decoration: none;
  transition: opacity 0.2s;
}

.section-link:hover {
  opacity: 0.8;
}

.schedule-list,
.activity-list {
  background: var(--surface-secondary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
}

.empty-schedule {
  text-align: center;
  padding: var(--spacing-2xl);
  color: var(--text-secondary);
}

.empty-schedule p {
  margin-top: var(--spacing-sm);
}

.performance-container {
  background: var(--surface-card);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  min-height: 400px;
}

/* Dark mode adjustments */
.dark-mode .welcome-section {
  background: linear-gradient(135deg, var(--color-primary-600), var(--color-primary-800));
}

.dark-mode .stat-card {
  background: var(--surface-elevated);
}

.dark-mode .schedule-list,
.dark-mode .activity-list {
  background: var(--surface-elevated);
}

.dark-mode .performance-container {
  background: var(--surface-elevated);
}

.dark-mode .stat-icon-classes {
  background: var(--color-blue-900);
  color: var(--color-blue-300);
}

.dark-mode .stat-icon-students {
  background: var(--color-green-900);
  color: var(--color-green-300);
}

.dark-mode .stat-icon-assignments {
  background: var(--color-orange-900);
  color: var(--color-orange-300);
}

.dark-mode .stat-icon-messages {
  background: var(--color-purple-900);
  color: var(--color-purple-300);
}

/* Mobile adjustments */
@media (max-width: 768px) {
  .welcome-section {
    padding: var(--spacing-lg);
  }

  .welcome-title {
    font-size: var(--font-size-2xl);
  }

  .welcome-subtitle {
    font-size: var(--font-size-base);
  }
}
</style>