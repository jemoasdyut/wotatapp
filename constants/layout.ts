/**
 * Global layout constants for WorthAI app
 * Consistent spacing, sizing, and layout values
 */

import { Dimensions, Platform } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Spacing system (based on 4px grid)
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  '2xl': 32,
  '3xl': 40,
  '4xl': 48,
  '5xl': 64,
} as const;

// Border radius values
export const BorderRadius = {
  xs: 4,
  sm: 6,
  md: 8,
  base: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  full: 9999,
} as const;

// Common layout values
export const Layout = {
  // Screen dimensions
  screen: {
    width: screenWidth,
    height: screenHeight,
  },
  
  // Container padding
  container: {
    paddingHorizontal: Spacing.base, // 16px standard padding
  },
  
  // Minimum touch targets (accessibility)
  minTouchTarget: 48,
  
  // Common component sizes
  button: {
    height: 48,
    minWidth: 120,
  },
  
  buttonSmall: {
    height: 36,
    minWidth: 80,
  },
  
  input: {
    height: 48,
  },
  
  // Card spacing
  card: {
    padding: Spacing.base,
    marginBottom: Spacing.md,
  },
  
  // Header heights
  header: {
    height: Platform.select({
      ios: 44,
      android: 56,
      web: 56,
    }),
  },
  
  // Tab bar height
  tabBar: {
    height: Platform.select({
      ios: 83, // includes safe area
      android: 56,
      web: 56,
    }),
  },
} as const;

// Shadow presets for consistent elevation
export const Shadows = {
  small: Platform.select({
    ios: {
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.06,
      shadowRadius: 2,
    },
    android: {
      elevation: 2,
    },
    web: {
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    },
  }),
  
  medium: Platform.select({
    ios: {
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.12,
      shadowRadius: 4,
    },
    android: {
      elevation: 4,
    },
    web: {
      boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.12)',
    },
  }),
  
  large: Platform.select({
    ios: {
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.18,
      shadowRadius: 8,
    },
    android: {
      elevation: 8,
    },
    web: {
      boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.18)',
    },
  }),
} as const;

export default {
  Spacing,
  BorderRadius,
  Layout,
  Shadows,
};
