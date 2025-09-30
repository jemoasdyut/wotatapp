# WorthAI Design System

A comprehensive design system built for the WorthAI React Native app, providing consistent styling, typography, and components across the entire application.

## Overview

The design system includes:
- **Colors**: Professional color palette with semantic naming
- **Typography**: Inter font family with consistent sizing and weights
- **Layout**: Spacing, borders, shadows, and layout constants
- **Components**: Reusable UI components (Button, Card, Text variants)
- **Theme**: Integrated theme configuration

## Quick Start

```tsx
import { Button, Card, Heading1, Text } from '@/components/ui';
import { Colors, Spacing } from '@/constants';

function MyScreen() {
  return (
    <Card>
      <Heading1>Welcome to WorthAI</Heading1>
      <Text color="textSecondary">Your financial companion</Text>
      <Button 
        title="Get Started" 
        onPress={() => {}} 
        variant="primary" 
        fullWidth 
      />
    </Card>
  );
}
```

## Colors

### Primary Colors
- `Colors.primary` - #2563EB (blue-600) - buttons, highlights
- `Colors.secondary` - #22C55E (green-500) - positive states, profit
- `Colors.danger` - #EF4444 (red-500) - errors, losses

### Background Colors
- `Colors.background` - #F9FAFB (gray-50) - main background
- `Colors.surface` - #FFFFFF - cards, surfaces

### Text Colors
- `Colors.textPrimary` - #111827 (gray-900) - main text
- `Colors.textSecondary` - #6B7280 (gray-500) - secondary text
- `Colors.textTertiary` - #9CA3AF (gray-400) - tertiary text

## Typography

Using Inter font family with the following components:

### Headings
```tsx
<Heading1>Main Title</Heading1>      // 28px, bold
<Heading2>Section Title</Heading2>   // 24px, bold
<Heading3>Subsection</Heading3>      // 20px, semibold
<Heading4>Small Heading</Heading4>   // 18px, semibold
```

### Body Text
```tsx
<Text>Regular body text</Text>           // 16px, regular
<BodyLarge>Important text</BodyLarge>    // 18px, regular
<BodySmall>Secondary text</BodySmall>    // 14px, regular
<Caption>Small details</Caption>         // 12px, regular
```

### Financial Data
```tsx
<NumericTextLarge>$1,234.56</NumericTextLarge>  // 24px, semibold, tabular-nums
<NumericText>$456.78</NumericText>               // 16px, medium, tabular-nums
```

## Components

### Button
```tsx
<Button 
  title="Primary Action"
  onPress={() => {}}
  variant="primary"        // primary, secondary, outline, ghost, danger
  size="medium"           // small, medium, large
  fullWidth={false}
  loading={false}
  disabled={false}
/>
```

### Card
```tsx
<Card 
  padding="base"          // xs, sm, md, base, lg, xl, 2xl, 3xl, 4xl, 5xl
  shadow="medium"         // none, small, medium, large
  borderRadius="lg"       // xs, sm, md, base, lg, xl, 2xl, full
>
  <Text>Card content</Text>
</Card>
```

## Layout & Spacing

### Spacing System (4px grid)
```tsx
Spacing.xs    // 4px
Spacing.sm    // 8px
Spacing.md    // 12px
Spacing.base  // 16px (standard)
Spacing.lg    // 20px
Spacing.xl    // 24px
Spacing.2xl   // 32px
Spacing.3xl   // 40px
Spacing.4xl   // 48px
Spacing.5xl   // 64px
```

### Common Style Presets
```tsx
import { StylePresets } from '@/constants/theme-config';

// Container with standard padding
<View style={StylePresets.container}>

// Row layout
<View style={StylePresets.row}>

// Space between items
<View style={StylePresets.rowBetween}>

// Section divider
<View style={StylePresets.divider} />
```

## Safe Areas & Layout

The main layout (`app/_layout.tsx`) includes:
- `SafeAreaProvider` for proper safe area handling
- Font loading with splash screen management
- Global theme provider

All screens should use `SafeAreaView` from `react-native-safe-area-context`:

```tsx
import { SafeAreaView } from 'react-native-safe-area-context';

function MyScreen() {
  return (
    <SafeAreaView style={StylePresets.container}>
      {/* Your content */}
    </SafeAreaView>
  );
}
```

## Financial App Specific Features

### Number Formatting
Use `NumericText` components for consistent number display with tabular numerals for proper alignment.

### Color Semantics
- Green (`secondary`) for profits, positive changes
- Red (`danger`) for losses, negative changes
- Blue (`primary`) for actions, highlights

### Touch Targets
All interactive elements meet the minimum 48px touch target requirement.

## Demo

See `app/design-system-demo.tsx` for a comprehensive showcase of all components and styles.

## File Structure

```
constants/
├── colors.ts           # Color palette
├── typography.ts       # Font styles and typography
├── layout.ts          # Spacing, borders, shadows
├── theme-config.ts    # Integrated theme configuration
├── theme.ts           # Legacy theme (backward compatibility)
└── index.ts           # Barrel exports

components/ui/
├── button.tsx         # Button component
├── card.tsx           # Card component
├── text.tsx           # Text components
└── index.ts           # Component exports

hooks/
└── use-fonts.ts       # Font loading hook
```

## Best Practices

1. **Use semantic colors**: `Colors.textPrimary` instead of `#111827`
2. **Consistent spacing**: Use `Spacing` constants instead of hardcoded values
3. **Component props**: Leverage component variants instead of custom styles
4. **Typography**: Use semantic text components instead of raw `<Text>`
5. **Touch targets**: Ensure minimum 48px height for interactive elements
6. **Safe areas**: Always wrap screens in `SafeAreaView`

## Migration from Legacy

If you have existing code using the old theme system:

```tsx
// Old way
import { Colors } from '@/constants/theme';
<Text style={{ color: Colors.light.text }}>

// New way
import { Colors } from '@/constants';
import { Text } from '@/components/ui';
<Text color="textPrimary">
```

The legacy theme is still available for backward compatibility, but new development should use the design system components and constants.
