// Course Store
// Manages course data, enrollment, progress tracking

export const useCourseStore = defineStore('course', () => {
  // State
  const courses = ref([])
  const enrolledCourses = ref([])
  const activeCourse = ref(null)
  const courseProgress = ref({})
  
  // Actions
  const fetchCourses = async () => {
    // Fetch available courses
  }
  
  const fetchEnrolledCourses = async () => {
    // Fetch user's enrolled courses
  }
  
  const enrollInCourse = async (courseId: string) => {
    // Enroll in a course
  }
  
  const updateProgress = async (courseId: string, lessonId: string, progress: number) => {
    // Update course progress
  }
  
  const getCourseById = (courseId: string) => {
    return courses.value.find(c => c.id === courseId)
  }
  
  return {
    courses,
    enrolledCourses,
    activeCourse,
    courseProgress,
    fetchCourses,
    fetchEnrolledCourses,
    enrollInCourse,
    updateProgress,
    getCourseById
  }
})