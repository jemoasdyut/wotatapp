/**
 * Design System Barrel Export
 * Centralized exports for all design system constants
 */

// API configuration
export { API_CONFIG } from './api';

// Core design tokens
export { Colors, getColorWithOpacity } from './colors';
export { BorderRadius, Layout, Shadows, Spacing } from './layout';
export { FontSizes, FontWeights, LineHeights, Typography } from './typography';

// Theme configuration
export { AppTheme, NavigationTheme, StylePresets } from './theme-config';

// Re-export existing theme
export { Theme } from './theme';
