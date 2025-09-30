/**
 * Global theme configuration for WorthAI app
 * Integrates colors, typography, and layout into a cohesive theme
 */

import { Colors } from './colors';
import { BorderRadius, Layout, Shadows, Spacing } from './layout';
import { Typography } from './typography';

// Create a comprehensive theme object
export const AppTheme = {
  colors: Colors,
  typography: Typography,
  layout: Layout,
  spacing: Spacing,
  borderRadius: BorderRadius,
  shadows: Shadows,
} as const;

// Navigation theme override to match our design system
export const NavigationTheme = {
  dark: false,
  colors: {
    primary: Colors.primary,
    background: Colors.background,
    card: Colors.surface,
    text: Colors.textPrimary,
    border: Colors.border,
    notification: Colors.secondary,
  },
};

// Common style presets for quick usage
export const StylePresets = {
  // Container styles
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: Spacing.base,
  },
  
  containerCentered: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: Spacing.base,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  },
  
  // Screen padding
  screenPadding: {
    paddingHorizontal: Spacing.base,
  },
  
  // Common card style
  card: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.base,
    ...Shadows.medium,
  },
  
  // Section spacing
  section: {
    marginBottom: Spacing.xl,
  },
  
  // Row layouts
  row: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
  },
  
  rowBetween: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
  },
  
  // Common separators
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: Spacing.md,
  },
  
  // Input styles
  input: {
    height: Layout.input.height,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.base,
    paddingHorizontal: Spacing.base,
    fontSize: 16,
    color: Colors.textPrimary,
  },
  
  inputFocused: {
    borderColor: Colors.primary,
    borderWidth: 2,
  },
} as const;

export default AppTheme;
