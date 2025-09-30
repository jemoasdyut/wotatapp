import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Card, Heading3, NumericText, Text } from '@/components/ui';
import { Colors, Spacing, StylePresets } from '@/constants';

interface AccuracyData {
  withinRange: number;
  aboveRange: number;
  belowRange: number;
}

interface AccuracyChartProps {
  data: AccuracyData;
}

export default function AccuracyChart({ data }: AccuracyChartProps) {
  const total = data.withinRange + data.aboveRange + data.belowRange;
  
  if (total === 0) {
    return null; // Don't show if no data
  }

  const withinPercentage = Math.round((data.withinRange / total) * 100);
  const abovePercentage = Math.round((data.aboveRange / total) * 100);
  const belowPercentage = Math.round((data.belowRange / total) * 100);

  return (
    <Card style={styles.container}>
      <Heading3 style={styles.title}>AI Accuracy</Heading3>
      
      <View style={styles.accuracyItem}>
        <View style={StylePresets.rowBetween}>
          <Text>Within AI Range</Text>
          <NumericText color="secondary">{withinPercentage}%</NumericText>
        </View>
        <View style={styles.progressBar}>
          <View style={[
            styles.progressFill, 
            { width: `${withinPercentage}%`, backgroundColor: Colors.secondary }
          ]} />
        </View>
      </View>
      
      <View style={styles.accuracyItem}>
        <View style={StylePresets.rowBetween}>
          <Text>Above AI Range</Text>
          <NumericText>{abovePercentage}%</NumericText>
        </View>
        <View style={styles.progressBar}>
          <View style={[
            styles.progressFill, 
            { width: `${abovePercentage}%`, backgroundColor: Colors.primary }
          ]} />
        </View>
      </View>
      
      <View style={styles.accuracyItem}>
        <View style={StylePresets.rowBetween}>
          <Text>Below AI Range</Text>
          <NumericText color="danger">{belowPercentage}%</NumericText>
        </View>
        <View style={styles.progressBar}>
          <View style={[
            styles.progressFill, 
            { width: `${belowPercentage}%`, backgroundColor: Colors.danger }
          ]} />
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.lg,
  },
  
  title: {
    marginBottom: Spacing.md,
  },
  
  accuracyItem: {
    marginBottom: Spacing.md,
  },
  
  progressBar: {
    height: 4,
    backgroundColor: Colors.borderLight,
    borderRadius: 2,
    marginTop: Spacing.xs,
    overflow: 'hidden',
  },
  
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
});
