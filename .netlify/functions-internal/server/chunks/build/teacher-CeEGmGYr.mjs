import { ref } from 'vue';
import { defineStore } from 'pinia';

const useTeacherStore = defineStore("teacher", () => {
  const classes = ref([]);
  const activeClass = ref(null);
  const students = ref([]);
  const assignments = ref([]);
  const grades = ref([]);
  const fetchClasses = async () => {
  };
  const fetchStudents = async (classId) => {
  };
  const createAssignment = async (assignment) => {
  };
  const submitGrade = async (grade) => {
  };
  const takeAttendance = async (attendance) => {
  };
  return {
    classes,
    activeClass,
    students,
    assignments,
    grades,
    fetchClasses,
    fetchStudents,
    createAssignment,
    submitGrade,
    takeAttendance
  };
});

export { useTeacherStore as u };
//# sourceMappingURL=teacher-CeEGmGYr.mjs.map
