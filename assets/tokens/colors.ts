export const colors = {
  // Semantic colors - Using Skooledin Purple
  primary: {
    50: '#faf5ff',
    100: '#f3e8ff',
    200: '#e9d5ff',
    300: '#d8b4fe',
    400: '#c084fc',
    500: '#a855f7',
    600: '#7c3aed', // Skooledin brand purple
    700: '#6d28d9',
    800: '#5b21b6',
    900: '#4c1d95',
    950: '#2e1065'
  },
  secondary: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
    950: '#020617'
  },
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
    950: '#052e16'
  },
  warning: {
    50: '#fefce8',
    100: '#fef9c3',
    200: '#fef08a',
    300: '#fde047',
    400: '#facc15',
    500: '#eab308',
    600: '#ca8a04',
    700: '#a16207',
    800: '#854d0e',
    900: '#713f12',
    950: '#422006'
  },
  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
    950: '#450a0a'
  },
  info: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
    950: '#082f49'
  },

  // Subject-specific colors
  subject: {
    math: {
      light: '#3b82f6',
      DEFAULT: '#2563eb',
      dark: '#1d4ed8'
    },
    science: {
      light: '#10b981',
      DEFAULT: '#059669',
      dark: '#047857'
    },
    language: {
      light: '#f59e0b',
      DEFAULT: '#d97706',
      dark: '#b45309'
    },
    history: {
      light: '#a78bfa',
      DEFAULT: '#8b5cf6',
      dark: '#7c3aed'
    },
    arts: {
      light: '#ec4899',
      DEFAULT: '#db2777',
      dark: '#be185d'
    },
    sports: {
      light: '#14b8a6',
      DEFAULT: '#0d9488',
      dark: '#0f766e'
    }
  },

  // AI-specific colors
  ai: {
    thinking: {
      light: '#818cf8',
      DEFAULT: '#6366f1',
      dark: '#4f46e5'
    },
    response: {
      light: '#c7d2fe',
      DEFAULT: '#a5b4fc',
      dark: '#818cf8'
    },
    context: {
      light: '#ddd6fe',
      DEFAULT: '#c4b5fd',
      dark: '#a78bfa'
    }
  },

  // Surface colors
  surface: {
    light: {
      background: '#ffffff',
      surface: '#f8fafc',
      card: '#ffffff',
      overlay: 'rgba(0, 0, 0, 0.5)'
    },
    dark: {
      background: '#0f172a',
      surface: '#1e293b',
      card: '#1e293b',
      overlay: 'rgba(0, 0, 0, 0.7)'
    }
  },

  // Text colors
  text: {
    light: {
      primary: '#0f172a',
      secondary: '#475569',
      muted: '#94a3b8',
      inverse: '#f8fafc'
    },
    dark: {
      primary: '#f8fafc',
      secondary: '#cbd5e1',
      muted: '#64748b',
      inverse: '#0f172a'
    }
  },

  // Border colors
  border: {
    light: {
      subtle: '#f1f5f9',
      default: '#e2e8f0',
      emphasis: '#cbd5e1'
    },
    dark: {
      subtle: '#1e293b',
      default: '#334155',
      emphasis: '#475569'
    }
  }
} as const

export type ColorToken = typeof colors
