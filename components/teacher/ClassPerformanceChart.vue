<template>
  <div class="performance-chart">
    <canvas ref="chartCanvas" :height="chartHeight"></canvas>
  </div>
</template>

<script setup lang="ts">
import { Chart, registerables } from 'chart.js'
import { useTheme } from '~/composables/useTheme'

Chart.register(...registerables)

interface PerformanceData {
  classes: Array<{
    id: string
    name: string
    averageGrade: number
    completionRate: number
    activeStudents: number
    totalStudents: number
  }>
}

interface Props {
  data: PerformanceData
}

const props = defineProps<Props>()
const { isDark } = useTheme()

const chartCanvas = ref<HTMLCanvasElement>()
const chartInstance = ref<Chart | null>(null)
const chartHeight = ref(300)

const chartColors = computed(() => ({
  primary: isDark.value ? '#a78bfa' : '#7c3aed',
  secondary: isDark.value ? '#60a5fa' : '#3b82f6',
  tertiary: isDark.value ? '#34d399' : '#10b981',
  text: isDark.value ? '#e5e7eb' : '#374151',
  grid: isDark.value ? '#374151' : '#e5e7eb',
  background: isDark.value ? '#1f2937' : '#ffffff'
}))

const chartData = computed(() => {
  const labels = props.data.classes.map(c => c.name)
  
  return {
    labels,
    datasets: [
      {
        label: 'Average Grade (%)',
        data: props.data.classes.map(c => c.averageGrade),
        backgroundColor: chartColors.value.primary,
        borderColor: chartColors.value.primary,
        borderWidth: 2,
        type: 'line' as const,
        yAxisID: 'y',
        tension: 0.4
      },
      {
        label: 'Completion Rate (%)',
        data: props.data.classes.map(c => c.completionRate),
        backgroundColor: `${chartColors.value.secondary}80`,
        borderColor: chartColors.value.secondary,
        borderWidth: 1,
        type: 'bar' as const,
        yAxisID: 'y'
      },
      {
        label: 'Active Students',
        data: props.data.classes.map(c => (c.activeStudents / c.totalStudents) * 100),
        backgroundColor: `${chartColors.value.tertiary}80`,
        borderColor: chartColors.value.tertiary,
        borderWidth: 1,
        type: 'bar' as const,
        yAxisID: 'y'
      }
    ]
  }
})

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: 'index' as const,
    intersect: false
  },
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: {
        color: chartColors.value.text,
        padding: 16,
        usePointStyle: true,
        font: {
          size: 12
        }
      }
    },
    tooltip: {
      backgroundColor: chartColors.value.background,
      titleColor: chartColors.value.text,
      bodyColor: chartColors.value.text,
      borderColor: chartColors.value.grid,
      borderWidth: 1,
      padding: 12,
      cornerRadius: 8,
      displayColors: true,
      callbacks: {
        label: (context: any) => {
          const label = context.dataset.label || ''
          const value = context.parsed.y
          if (label.includes('Students')) {
            const classData = props.data.classes[context.dataIndex]
            return `${label}: ${classData.activeStudents}/${classData.totalStudents}`
          }
          return `${label}: ${value.toFixed(1)}%`
        }
      }
    }
  },
  scales: {
    x: {
      grid: {
        color: chartColors.value.grid,
        drawBorder: false
      },
      ticks: {
        color: chartColors.value.text,
        font: {
          size: 11
        }
      }
    },
    y: {
      position: 'left' as const,
      grid: {
        color: chartColors.value.grid,
        drawBorder: false
      },
      ticks: {
        color: chartColors.value.text,
        font: {
          size: 11
        },
        callback: (value: any) => `${value}%`
      },
      max: 100
    }
  }
}))

const createChart = () => {
  if (!chartCanvas.value) return
  
  if (chartInstance.value) {
    chartInstance.value.destroy()
  }
  
  chartInstance.value = new Chart(chartCanvas.value, {
    type: 'bar',
    data: chartData.value,
    options: chartOptions.value
  })
}

watch([chartData, isDark], () => {
  if (chartInstance.value) {
    chartInstance.value.data = chartData.value
    chartInstance.value.options = chartOptions.value
    chartInstance.value.update()
  }
})

onMounted(() => {
  createChart()
})

onUnmounted(() => {
  if (chartInstance.value) {
    chartInstance.value.destroy()
  }
})
</script>

<style scoped>
.performance-chart {
  width: 100%;
  height: 100%;
  min-height: 300px;
  position: relative;
}

/* Mobile adjustments */
@media (max-width: 768px) {
  .performance-chart {
    min-height: 250px;
  }
}
</style>