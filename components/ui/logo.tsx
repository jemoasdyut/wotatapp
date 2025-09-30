/**
 * WorthAI Logo Component
 * Consistent diamond logo used across the entire app
 */

import { Colors } from '@/constants/colors';
import React from 'react';
import { Text, TextStyle, View, ViewStyle } from 'react-native';

interface LogoProps {
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  variant?: 'default' | 'white' | 'minimal';
  style?: ViewStyle;
  iconStyle?: TextStyle;
}

const SIZES = {
  small: {
    container: 32,
    icon: 16,
    borderRadius: 16,
    borderWidth: 1,
  },
  medium: {
    container: 48,
    icon: 24,
    borderRadius: 24,
    borderWidth: 2,
  },
  large: {
    container: 64,
    icon: 32,
    borderRadius: 32,
    borderWidth: 2,
  },
  xlarge: {
    container: 80,
    icon: 40,
    borderRadius: 40,
    borderWidth: 3,
  },
} as const;

export function Logo({ 
  size = 'medium', 
  variant = 'default',
  style,
  iconStyle 
}: LogoProps) {
  const sizeConfig = SIZES[size];
  
  const getContainerStyle = () => {
    const baseStyle = {
      width: sizeConfig.container,
      height: sizeConfig.container,
      borderRadius: sizeConfig.borderRadius,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      borderWidth: sizeConfig.borderWidth,
    };

    switch (variant) {
      case 'white':
        return {
          ...baseStyle,
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          borderColor: 'rgba(255, 255, 255, 0.3)',
        };
      case 'minimal':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
          borderColor: 'transparent',
          borderWidth: 0,
        };
      default:
        return {
          ...baseStyle,
          backgroundColor: Colors.primary + '15',
          borderColor: Colors.primary + '30',
        };
    }
  };

  const getIconStyle = () => {
    return {
      fontSize: sizeConfig.icon,
      lineHeight: sizeConfig.icon + 4,
    };
  };

  return (
    <View style={[getContainerStyle(), style]}>
      <Text style={[getIconStyle(), iconStyle]}>💎</Text>
    </View>
  );
}

export default Logo;
