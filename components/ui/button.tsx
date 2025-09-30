/**
 * Reusable Button component with consistent styling
 * Supports multiple variants and sizes
 */

import React from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TextStyle,
    TouchableOpacity,
    ViewStyle,
} from 'react-native';
import { Colors } from '../../constants/colors';
import { BorderRadius, Layout, Spacing } from '../../constants/layout';
import { Typography } from '../../constants/typography';

export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  fullWidth?: boolean;
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  style,
  textStyle,
  fullWidth = false,
}: ButtonProps) {
  const buttonStyle = [
    styles.base,
    styles[variant],
    styles[size],
    fullWidth && styles.fullWidth,
    (disabled || loading) && styles.disabled,
    style,
  ];

  const textStyleCombined = [
    styles.baseText,
    styles[`${variant}Text`],
    styles[`${size}Text`],
    (disabled || loading) && styles.disabledText,
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' || variant === 'danger' ? Colors.textOnPrimary : Colors.primary}
        />
      ) : (
        <Text style={textStyleCombined}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  // Base styles
  base: {
    borderRadius: BorderRadius.base,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: Layout.button.height,
    minWidth: Layout.button.minWidth,
    paddingHorizontal: Spacing.base,
  },
  
  baseText: {
    ...Typography.button,
    textAlign: 'center',
  },
  
  // Variants
  primary: {
    backgroundColor: Colors.primary,
  },
  
  secondary: {
    backgroundColor: Colors.secondary,
  },
  
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  
  ghost: {
    backgroundColor: 'transparent',
  },
  
  danger: {
    backgroundColor: Colors.danger,
  },
  
  // Text variants
  primaryText: {
    color: Colors.textOnPrimary,
  },
  
  secondaryText: {
    color: Colors.textOnPrimary,
  },
  
  outlineText: {
    color: Colors.primary,
  },
  
  ghostText: {
    color: Colors.primary,
  },
  
  dangerText: {
    color: Colors.textOnPrimary,
  },
  
  // Sizes
  small: {
    minHeight: Layout.buttonSmall.height,
    minWidth: Layout.buttonSmall.minWidth,
    paddingHorizontal: Spacing.md,
  },
  
  medium: {
    minHeight: Layout.button.height,
    minWidth: Layout.button.minWidth,
    paddingHorizontal: Spacing.base,
  },
  
  large: {
    minHeight: 56,
    minWidth: 140,
    paddingHorizontal: Spacing.xl,
  },
  
  // Text sizes
  smallText: {
    ...Typography.buttonSmall,
  },
  
  mediumText: {
    ...Typography.button,
  },
  
  largeText: {
    ...Typography.button,
    fontSize: 18,
  },
  
  // States
  fullWidth: {
    width: '100%',
  },
  
  disabled: {
    opacity: 0.5,
  },
  
  disabledText: {
    opacity: 0.7,
  },
});

export default Button;
