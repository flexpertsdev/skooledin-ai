export const typography = {
  // Font families
  fontFamily: {
    sans: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(', '),
    mono: [
      'ui-monospace',
      'SFMono-Regular',
      '"SF Mono"',
      'Consolas',
      '"Liberation Mono"',
      'Menlo',
      'monospace'
    ].join(', ')
  },

  // Font sizes with line heights
  fontSize: {
    xs: { size: '12px', lineHeight: '16px' },
    sm: { size: '14px', lineHeight: '20px' },
    base: { size: '16px', lineHeight: '24px' },
    lg: { size: '18px', lineHeight: '28px' },
    xl: { size: '20px', lineHeight: '28px' },
    '2xl': { size: '24px', lineHeight: '32px' },
    '3xl': { size: '28px', lineHeight: '36px' },
    '4xl': { size: '32px', lineHeight: '40px' },
    '5xl': { size: '40px', lineHeight: '48px' },
    '6xl': { size: '48px', lineHeight: '56px' },
    '7xl': { size: '64px', lineHeight: '72px' }
  },

  // Font weights
  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700'
  },

  // Line heights
  lineHeight: {
    none: '1',
    tight: '1.2',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '1.75',
    double: '2'
  },

  // Letter spacing
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em'
  }
} as const

// Mobile-optimized type scale
export const typeScale = {
  mobile: {
    h1: { ...typography.fontSize['4xl'], weight: typography.fontWeight.bold },
    h2: { ...typography.fontSize['3xl'], weight: typography.fontWeight.semibold },
    h3: { ...typography.fontSize['2xl'], weight: typography.fontWeight.semibold },
    h4: { ...typography.fontSize.xl, weight: typography.fontWeight.semibold },
    h5: { ...typography.fontSize.lg, weight: typography.fontWeight.medium },
    h6: { ...typography.fontSize.base, weight: typography.fontWeight.medium },
    body: { ...typography.fontSize.base, weight: typography.fontWeight.normal },
    small: { ...typography.fontSize.sm, weight: typography.fontWeight.normal },
    caption: { ...typography.fontSize.xs, weight: typography.fontWeight.normal }
  },
  desktop: {
    h1: { ...typography.fontSize['6xl'], weight: typography.fontWeight.bold },
    h2: { ...typography.fontSize['5xl'], weight: typography.fontWeight.semibold },
    h3: { ...typography.fontSize['4xl'], weight: typography.fontWeight.semibold },
    h4: { ...typography.fontSize['2xl'], weight: typography.fontWeight.semibold },
    h5: { ...typography.fontSize.xl, weight: typography.fontWeight.medium },
    h6: { ...typography.fontSize.lg, weight: typography.fontWeight.medium },
    body: { ...typography.fontSize.base, weight: typography.fontWeight.normal },
    small: { ...typography.fontSize.sm, weight: typography.fontWeight.normal },
    caption: { ...typography.fontSize.xs, weight: typography.fontWeight.normal }
  }
} as const

export type TypographyToken = typeof typography
export type TypeScale = typeof typeScale