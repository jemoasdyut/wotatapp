/**
 * Global color palette for WorthAI app
 * Based on modern design principles with accessibility in mind
 */

export const Colors = {
  // Primary Colors
  primary: '#2563EB',      // blue-600 - buttons, highlights
  primaryLight: '#3B82F6', // blue-500 - lighter variant
  primaryDark: '#1D4ED8',  // blue-700 - darker variant
  
  // Secondary Colors
  secondary: '#22C55E',     // green-500 - positive states, profit, success
  secondaryLight: '#34D399', // green-400 - lighter variant
  secondaryDark: '#16A34A', // green-600 - darker variant
  
  // Status Colors
  danger: '#EF4444',       // red-500 - delete, losses, errors
  dangerLight: '#F87171',  // red-400 - lighter variant
  dangerDark: '#DC2626',   // red-600 - darker variant
  
  warning: '#F59E0B',      // amber-500 - warnings, caution
  warningLight: '#FBBF24', // amber-400 - lighter variant
  
  // Background Colors
  background: '#F9FAFB',   // gray-50 - main background
  surface: '#FFFFFF',      // white - cards, surfaces
  surfaceSecondary: '#F3F4F6', // gray-100 - secondary surfaces
  
  // Text Colors
  textPrimary: '#111827',  // gray-900 - main text
  textSecondary: '#6B7280', // gray-500 - secondary text
  textTertiary: '#9CA3AF', // gray-400 - tertiary text
  textOnPrimary: '#FFFFFF', // white text on primary backgrounds
  
  // Border Colors
  border: '#E5E7EB',       // gray-200 - default borders
  borderLight: '#F3F4F6',  // gray-100 - light borders
  borderFocus: '#2563EB',  // blue-600 - focused elements
  
  // Shadow Colors (for consistent shadows across platforms)
  shadow: {
    light: '#00000010',    // 6% opacity black
    medium: '#00000020',   // 12% opacity black
    dark: '#00000030',     // 18% opacity black
  }
} as const;

// Color utility functions
export const getColorWithOpacity = (color: string, opacity: number): string => {
  // Convert hex to rgba
  const hex = color.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export default Colors;
