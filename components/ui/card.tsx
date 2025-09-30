/**
 * Reusable Card component with consistent styling
 * Provides a surface for content with proper shadows and spacing
 */

import React from 'react';
import {
    StyleSheet,
    View,
    ViewStyle,
} from 'react-native';
import { Colors } from '../../constants/colors';
import { BorderRadius, Shadows, Spacing } from '../../constants/layout';

export interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: keyof typeof Spacing;
  shadow?: 'none' | 'small' | 'medium' | 'large';
  borderRadius?: keyof typeof BorderRadius;
}

export function Card({
  children,
  style,
  padding = 'base',
  shadow = 'medium',
  borderRadius = 'lg',
}: CardProps) {
  const cardStyle = [
    styles.base,
    { 
      padding: Spacing[padding],
      borderRadius: BorderRadius[borderRadius],
    },
    shadow !== 'none' && Shadows[shadow],
    style,
  ];

  return (
    <View style={cardStyle}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
});

export default Card;
