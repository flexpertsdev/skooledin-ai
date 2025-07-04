<template>
  <article
    class="course-card"
    @click="$emit('click')"
  >
    <div class="course-thumbnail">
      <ResponsiveImage
        v-if="course.thumbnail"
        :src="course.thumbnail"
        :alt="course.title"
        aspect-ratio="16:9"
        class="course-image"
      />
      <div v-else class="course-placeholder" :class="`course-placeholder--${subjectColor}`">
        <Icon :name="subjectIcon" />
      </div>
      <div class="course-progress-overlay">
        <Progress
          :value="course.progress"
          :max="100"
          variant="circular"
          size="sm"
          color="white"
          :show-value="false"
        />
        <span class="course-progress-text">{{ course.progress }}%</span>
      </div>
    </div>
    
    <div class="course-content">
      <div class="course-header">
        <h3 class="course-title">{{ course.title }}</h3>
        <Badge
          :label="course.subject"
          :variant="subjectBadgeVariant"
          size="sm"
        />
      </div>
      
      <div v-if="course.instructor" class="course-instructor">
        <Icon name="heroicons:user" />
        <span>{{ course.instructor }}</span>
      </div>
      
      <div class="course-stats">
        <div class="course-stat">
          <Icon name="heroicons:book-open" />
          <span>{{ course.lessonCount || 0 }} lessons</span>
        </div>
        <div class="course-stat">
          <Icon name="heroicons:clock" />
          <span>{{ course.duration || '0h' }}</span>
        </div>
      </div>
      
      <div v-if="course.nextLesson" class="course-next">
        <p class="course-next-label">Next lesson:</p>
        <p class="course-next-title">{{ course.nextLesson }}</p>
      </div>
      
      <div class="course-actions">
        <Button
          size="sm"
          variant="primary"
          @click.stop="$emit('continue')"
          class="course-action"
        >
          Continue Learning
        </Button>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
interface Course {
  id: string
  title: string
  subject: string
  progress: number
  thumbnail?: string
  instructor?: string
  lessonCount?: number
  duration?: string
  nextLesson?: string
}

interface Props {
  course: Course
}

const props = defineProps<Props>()

defineEmits<{
  click: []
  continue: []
}>()

// Subject color mapping
const subjectColors: Record<string, string> = {
  Mathematics: 'blue',
  Science: 'green',
  English: 'purple',
  History: 'orange',
  Geography: 'teal',
  Art: 'pink',
  Music: 'indigo',
  'Physical Education': 'red',
  'Computer Science': 'gray'
}

const subjectColor = computed(() => 
  subjectColors[props.course.subject] || 'gray'
)

// Subject icon mapping
const subjectIcons: Record<string, string> = {
  Mathematics: 'heroicons:calculator',
  Science: 'heroicons:beaker',
  English: 'heroicons:book-open',
  History: 'heroicons:clock',
  Geography: 'heroicons:globe-alt',
  Art: 'heroicons:paint-brush',
  Music: 'heroicons:musical-note',
  'Physical Education': 'heroicons:heart',
  'Computer Science': 'heroicons:computer-desktop'
}

const subjectIcon = computed(() => 
  subjectIcons[props.course.subject] || 'heroicons:academic-cap'
)

// Badge variant based on subject
const subjectBadgeVariant = computed(() => {
  const variants: Record<string, string> = {
    Mathematics: 'info',
    Science: 'success',
    English: 'primary',
    History: 'warning',
    default: 'secondary'
  }
  return variants[props.course.subject] || variants.default
})
</script>

<style scoped>
.course-card {
  @apply bg-white rounded-xl shadow-sm hover:shadow-lg transition-all
         cursor-pointer overflow-hidden;
}

.course-thumbnail {
  @apply relative h-48 overflow-hidden;
}

.course-image {
  @apply w-full h-full object-cover;
}

.course-placeholder {
  @apply w-full h-full flex items-center justify-center;
}

.course-placeholder Icon {
  @apply w-16 h-16 text-white/80;
}

.course-placeholder--blue {
  @apply bg-gradient-to-br from-blue-500 to-blue-600;
}

.course-placeholder--green {
  @apply bg-gradient-to-br from-green-500 to-green-600;
}

.course-placeholder--purple {
  @apply bg-gradient-to-br from-purple-500 to-purple-600;
}

.course-placeholder--orange {
  @apply bg-gradient-to-br from-orange-500 to-orange-600;
}

.course-placeholder--teal {
  @apply bg-gradient-to-br from-teal-500 to-teal-600;
}

.course-placeholder--pink {
  @apply bg-gradient-to-br from-pink-500 to-pink-600;
}

.course-placeholder--indigo {
  @apply bg-gradient-to-br from-indigo-500 to-indigo-600;
}

.course-placeholder--red {
  @apply bg-gradient-to-br from-red-500 to-red-600;
}

.course-placeholder--gray {
  @apply bg-gradient-to-br from-gray-500 to-gray-600;
}

.course-progress-overlay {
  @apply absolute top-3 right-3 bg-black/60 backdrop-blur-sm rounded-full
         p-2 flex items-center justify-center;
}

.course-progress-text {
  @apply absolute text-xs font-medium text-white;
}

.course-content {
  @apply p-5 space-y-3;
}

.course-header {
  @apply flex items-start justify-between gap-3;
}

.course-title {
  @apply text-lg font-semibold text-gray-900 line-clamp-2;
}

.course-instructor {
  @apply flex items-center gap-1.5 text-sm text-gray-600;
}

.course-instructor Icon {
  @apply w-4 h-4;
}

.course-stats {
  @apply flex items-center gap-4;
}

.course-stat {
  @apply flex items-center gap-1.5 text-sm text-gray-500;
}

.course-stat Icon {
  @apply w-4 h-4;
}

.course-next {
  @apply pt-3 border-t border-gray-100;
}

.course-next-label {
  @apply text-xs text-gray-500 mb-0.5;
}

.course-next-title {
  @apply text-sm font-medium text-gray-900 truncate;
}

.course-actions {
  @apply pt-3;
}

.course-action {
  @apply w-full;
}

/* Hover effects */
.course-card:hover .course-image {
  @apply scale-105;
}

.course-image {
  @apply transition-transform duration-300;
}
</style>