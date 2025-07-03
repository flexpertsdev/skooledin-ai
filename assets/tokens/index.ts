export * from './colors'
export * from './spacing'
export * from './typography'
export * from './shadows'
export * from './radius'

// Re-export all tokens as a single object
import { colors } from './colors'
import { spacing, spacingAliases } from './spacing'
import { typography, typeScale } from './typography'
import { shadows, elevation } from './shadows'
import { radius } from './radius'

export const tokens = {
  colors,
  spacing,
  spacingAliases,
  typography,
  typeScale,
  shadows,
  elevation,
  radius
} as const

export type DesignTokens = typeof tokens