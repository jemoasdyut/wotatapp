/**
 * Legacy theme configuration - maintained for backward compatibility
 * For new development, use the design system from './colors.ts' and './theme-config.ts'
 */

import { Platform } from 'react-native';
import { Colors as DesignSystemColors } from './colors';

// Legacy color scheme - updated to use design system colors
const tintColorLight = DesignSystemColors.primary;
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: DesignSystemColors.textPrimary,
    background: DesignSystemColors.background,
    tint: tintColorLight,
    icon: DesignSystemColors.textSecondary,
    tabIconDefault: DesignSystemColors.textSecondary,
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};

// Legacy theme object for backward compatibility
export const Theme = {
  colors: Colors,
  fonts: Fonts,
} as const;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
