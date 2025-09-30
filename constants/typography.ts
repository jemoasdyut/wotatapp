/**
 * Global typography system for WorthAI app
 * Using Inter font family with consistent sizing and weights
 */

import { Platform, StyleSheet } from 'react-native';

// Font weights
export const FontWeights = {
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
} as const;

// Font sizes
export const FontSizes = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 28,
  '4xl': 32,
} as const;

// Line heights (relative to font size)
export const LineHeights = {
  tight: 1.3,    // Increased from 1.2 to prevent text cut-offs
  normal: 1.5,   // Increased from 1.4 for better readability
  relaxed: 1.7,  // Increased from 1.6 for optimal spacing
} as const;

// Typography styles
export const Typography = StyleSheet.create({
  // Headings
  h1: {
    fontFamily: Platform.select({
      ios: 'Inter-Bold',
      android: 'Inter_700Bold',
      web: 'Inter, system-ui, sans-serif',
    }),
    fontSize: FontSizes['3xl'],
    fontWeight: FontWeights.bold,
    lineHeight: FontSizes['3xl'] * LineHeights.tight,
  },
  
  h2: {
    fontFamily: Platform.select({
      ios: 'Inter-Bold',
      android: 'Inter_700Bold',
      web: 'Inter, system-ui, sans-serif',
    }),
    fontSize: FontSizes['2xl'],
    fontWeight: FontWeights.bold,
    lineHeight: FontSizes['2xl'] * LineHeights.tight,
  },
  
  h3: {
    fontFamily: Platform.select({
      ios: 'Inter-SemiBold',
      android: 'Inter_600SemiBold',
      web: 'Inter, system-ui, sans-serif',
    }),
    fontSize: FontSizes.xl,
    fontWeight: FontWeights.semibold,
    lineHeight: FontSizes.xl * LineHeights.normal,
  },
  
  h4: {
    fontFamily: Platform.select({
      ios: 'Inter-SemiBold',
      android: 'Inter_600SemiBold',
      web: 'Inter, system-ui, sans-serif',
    }),
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.semibold,
    lineHeight: FontSizes.lg * LineHeights.normal,
  },
  
  // Body text
  body: {
    fontFamily: Platform.select({
      ios: 'Inter-Regular',
      android: 'Inter_400Regular',
      web: 'Inter, system-ui, sans-serif',
    }),
    fontSize: FontSizes.base,
    fontWeight: FontWeights.regular,
    lineHeight: FontSizes.base * LineHeights.normal,
  },
  
  bodyLarge: {
    fontFamily: Platform.select({
      ios: 'Inter-Regular',
      android: 'Inter_400Regular',
      web: 'Inter, system-ui, sans-serif',
    }),
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.regular,
    lineHeight: FontSizes.lg * LineHeights.normal,
  },
  
  bodySmall: {
    fontFamily: Platform.select({
      ios: 'Inter-Regular',
      android: 'Inter_400Regular',
      web: 'Inter, system-ui, sans-serif',
    }),
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.regular,
    lineHeight: FontSizes.sm * LineHeights.normal,
  },
  
  // Special text styles
  caption: {
    fontFamily: Platform.select({
      ios: 'Inter-Regular',
      android: 'Inter_400Regular',
      web: 'Inter, system-ui, sans-serif',
    }),
    fontSize: FontSizes.xs,
    fontWeight: FontWeights.regular,
    lineHeight: FontSizes.xs * LineHeights.normal,
  },
  
  button: {
    fontFamily: Platform.select({
      ios: 'Inter-Medium',
      android: 'Inter_500Medium',
      web: 'Inter, system-ui, sans-serif',
    }),
    fontSize: FontSizes.base,
    fontWeight: FontWeights.medium,
    lineHeight: FontSizes.base * LineHeights.tight,
  },
  
  buttonSmall: {
    fontFamily: Platform.select({
      ios: 'Inter-Medium',
      android: 'Inter_500Medium',
      web: 'Inter, system-ui, sans-serif',
    }),
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.medium,
    lineHeight: FontSizes.sm * LineHeights.tight,
  },
  
  // Numeric text (for financial data)
  numeric: {
    fontFamily: Platform.select({
      ios: 'Inter-Medium',
      android: 'Inter_500Medium',
      web: 'Inter, system-ui, sans-serif',
    }),
    fontSize: FontSizes.base,
    fontWeight: FontWeights.medium,
    lineHeight: FontSizes.base * LineHeights.normal,
    fontVariant: ['tabular-nums'], // Ensures consistent number spacing
  },
  
  numericLarge: {
    fontFamily: Platform.select({
      ios: 'Inter-SemiBold',
      android: 'Inter_600SemiBold',
      web: 'Inter, system-ui, sans-serif',
    }),
    fontSize: FontSizes['2xl'],
    fontWeight: FontWeights.semibold,
    lineHeight: FontSizes['2xl'] * LineHeights.tight,
    fontVariant: ['tabular-nums'],
  },
});

export default Typography;
