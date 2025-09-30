/**
 * Design System Demo Screen
 * Showcases all the global design system components
 */

import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
    BodyLarge,
    BodySmall,
    Button,
    Caption,
    Card,
    Heading1,
    Heading2,
    Heading3,
    Heading4,
    NumericText,
    NumericTextLarge,
    Text,
} from '@/components/ui';
import { Colors } from '@/constants/colors';
import { Spacing } from '@/constants/layout';
import { StylePresets } from '@/constants/theme-config';

export default function DesignSystemDemo() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Typography Section */}
        <Card style={styles.section}>
          <Heading2>Typography</Heading2>
          <View style={styles.spacer} />
          
          <Heading1>Heading 1 - Main Title</Heading1>
          <Heading2>Heading 2 - Section Title</Heading2>
          <Heading3>Heading 3 - Subsection</Heading3>
          <Heading4>Heading 4 - Small Heading</Heading4>
          
          <View style={styles.spacer} />
          
          <BodyLarge>Body Large - Important information text</BodyLarge>
          <Text>Body Text - Regular paragraph content</Text>
          <BodySmall>Body Small - Secondary information</BodySmall>
          <Caption>Caption - Minimal details</Caption>
          
          <View style={styles.spacer} />
          
          <NumericTextLarge>$1,234.56</NumericTextLarge>
          <NumericText>$456.78</NumericText>
        </Card>

        {/* Colors Section */}
        <Card style={styles.section}>
          <Heading2>Colors</Heading2>
          <View style={styles.spacer} />
          
          <View style={styles.colorRow}>
            <View style={[styles.colorSwatch, { backgroundColor: Colors.primary }]} />
            <Text>Primary - {Colors.primary}</Text>
          </View>
          
          <View style={styles.colorRow}>
            <View style={[styles.colorSwatch, { backgroundColor: Colors.secondary }]} />
            <Text>Secondary - {Colors.secondary}</Text>
          </View>
          
          <View style={styles.colorRow}>
            <View style={[styles.colorSwatch, { backgroundColor: Colors.danger }]} />
            <Text>Danger - {Colors.danger}</Text>
          </View>
          
          <View style={styles.colorRow}>
            <View style={[styles.colorSwatch, { backgroundColor: Colors.textPrimary }]} />
            <Text>Text Primary - {Colors.textPrimary}</Text>
          </View>
          
          <View style={styles.colorRow}>
            <View style={[styles.colorSwatch, { backgroundColor: Colors.textSecondary }]} />
            <Text>Text Secondary - {Colors.textSecondary}</Text>
          </View>
        </Card>

        {/* Buttons Section */}
        <Card style={styles.section}>
          <Heading2>Buttons</Heading2>
          <View style={styles.spacer} />
          
          <View style={styles.buttonRow}>
            <Button
              title="Primary"
              onPress={() => console.log('Primary pressed')}
              variant="primary"
              size="small"
            />
            <Button
              title="Secondary"
              onPress={() => console.log('Secondary pressed')}
              variant="secondary"
              size="small"
            />
          </View>
          
          <View style={styles.buttonRow}>
            <Button
              title="Outline"
              onPress={() => console.log('Outline pressed')}
              variant="outline"
              size="small"
            />
            <Button
              title="Ghost"
              onPress={() => console.log('Ghost pressed')}
              variant="ghost"
              size="small"
            />
          </View>
          
          <Button
            title="Full Width Primary"
            onPress={() => console.log('Full width pressed')}
            variant="primary"
            fullWidth
            style={styles.fullWidthButton}
          />
          
          <Button
            title="Loading..."
            onPress={() => {}}
            variant="primary"
            loading
            style={styles.fullWidthButton}
          />
          
          <Button
            title="Disabled"
            onPress={() => {}}
            variant="primary"
            disabled
            style={styles.fullWidthButton}
          />
        </Card>

        {/* Cards Section */}
        <Card style={styles.section}>
          <Heading2>Cards & Layout</Heading2>
          <View style={styles.spacer} />
          
          <Card shadow="small" padding="sm">
            <Text>Small Shadow Card</Text>
            <Caption>With small padding</Caption>
          </Card>
          
          <View style={styles.spacer} />
          
          <Card shadow="large" padding="xl">
            <Heading4>Large Shadow Card</Heading4>
            <Text>With extra large padding</Text>
          </Card>
        </Card>

        {/* Financial Data Example */}
        <Card style={styles.section}>
          <Heading2>Financial Data Example</Heading2>
          <View style={styles.spacer} />
          
          <View style={StylePresets.rowBetween}>
            <Text>Total Portfolio Value</Text>
            <NumericTextLarge color="secondary">$25,847.32</NumericTextLarge>
          </View>
          
          <View style={StylePresets.divider} />
          
          <View style={StylePresets.rowBetween}>
            <BodySmall>Today&apos;s Change</BodySmall>
            <NumericText color="secondary">+$342.18 (+1.34%)</NumericText>
          </View>
          
          <View style={StylePresets.rowBetween}>
            <BodySmall>Total Gain/Loss</BodySmall>
            <NumericText color="danger">-$1,234.56 (-4.56%)</NumericText>
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  
  scrollContent: {
    padding: Spacing.base,
  },
  
  section: {
    marginBottom: Spacing.lg,
  },
  
  spacer: {
    height: Spacing.md,
  },
  
  colorRow: {
    ...StylePresets.row,
    marginBottom: Spacing.sm,
  },
  
  colorSwatch: {
    width: 24,
    height: 24,
    borderRadius: 4,
    marginRight: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  
  buttonRow: {
    ...StylePresets.row,
    marginBottom: Spacing.md,
    gap: Spacing.sm,
  },
  
  fullWidthButton: {
    marginBottom: Spacing.sm,
  },
});
