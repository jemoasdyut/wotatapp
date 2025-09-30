/**
 * Reusable Text components with consistent typography
 * Provides semantic text styles for different use cases
 */

import React from 'react';
import {
    Text as RNText,
    TextProps as RNTextProps,
    TextStyle
} from 'react-native';
import { Colors } from '../../constants/colors';
import { Typography } from '../../constants/typography';

interface BaseTextProps extends RNTextProps {
  children: React.ReactNode;
  color?: keyof typeof Colors | string;
  style?: TextStyle;
}

// Base Text component
export function Text({ 
  children, 
  color = 'textPrimary', 
  style, 
  ...props 
}: BaseTextProps) {
  const textColor = Colors[color as keyof typeof Colors] || color;
  
  return (
    <RNText
      style={[
        Typography.body,
        { color: textColor },
        style,
      ]}
      {...props}
    >
      {children}
    </RNText>
  );
}

// Heading components
export function Heading1({ children, color = 'textPrimary', style, ...props }: BaseTextProps) {
  const textColor = Colors[color as keyof typeof Colors] || color;
  
  return (
    <RNText
      style={[
        Typography.h1,
        { color: textColor },
        style,
      ]}
      {...props}
    >
      {children}
    </RNText>
  );
}

export function Heading2({ children, color = 'textPrimary', style, ...props }: BaseTextProps) {
  const textColor = Colors[color as keyof typeof Colors] || color;
  
  return (
    <RNText
      style={[
        Typography.h2,
        { color: textColor },
        style,
      ]}
      {...props}
    >
      {children}
    </RNText>
  );
}

export function Heading3({ children, color = 'textPrimary', style, ...props }: BaseTextProps) {
  const textColor = Colors[color as keyof typeof Colors] || color;
  
  return (
    <RNText
      style={[
        Typography.h3,
        { color: textColor },
        style,
      ]}
      {...props}
    >
      {children}
    </RNText>
  );
}

export function Heading4({ children, color = 'textPrimary', style, ...props }: BaseTextProps) {
  const textColor = Colors[color as keyof typeof Colors] || color;
  
  return (
    <RNText
      style={[
        Typography.h4,
        { color: textColor },
        style,
      ]}
      {...props}
    >
      {children}
    </RNText>
  );
}

// Body text variants
export function BodyLarge({ children, color = 'textPrimary', style, ...props }: BaseTextProps) {
  const textColor = Colors[color as keyof typeof Colors] || color;
  
  return (
    <RNText
      style={[
        Typography.bodyLarge,
        { color: textColor },
        style,
      ]}
      {...props}
    >
      {children}
    </RNText>
  );
}

export function BodySmall({ children, color = 'textSecondary', style, ...props }: BaseTextProps) {
  const textColor = Colors[color as keyof typeof Colors] || color;
  
  return (
    <RNText
      style={[
        Typography.bodySmall,
        { color: textColor },
        style,
      ]}
      {...props}
    >
      {children}
    </RNText>
  );
}

// Specialized text components
export function Caption({ children, color = 'textTertiary', style, ...props }: BaseTextProps) {
  const textColor = Colors[color as keyof typeof Colors] || color;
  
  return (
    <RNText
      style={[
        Typography.caption,
        { color: textColor },
        style,
      ]}
      {...props}
    >
      {children}
    </RNText>
  );
}

// Numeric text for financial data
export function NumericText({ children, color = 'textPrimary', style, ...props }: BaseTextProps) {
  const textColor = Colors[color as keyof typeof Colors] || color;
  
  return (
    <RNText
      style={[
        Typography.numeric,
        { color: textColor },
        style,
      ]}
      {...props}
    >
      {children}
    </RNText>
  );
}

export function NumericTextLarge({ children, color = 'textPrimary', style, ...props }: BaseTextProps) {
  const textColor = Colors[color as keyof typeof Colors] || color;
  
  return (
    <RNText
      style={[
        Typography.numericLarge,
        { color: textColor },
        style,
      ]}
      {...props}
    >
      {children}
    </RNText>
  );
}

export default Text;
