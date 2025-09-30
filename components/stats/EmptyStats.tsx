import React from 'react';
import { StyleSheet, View } from 'react-native';

import { BodySmall, Card, Heading4, Text } from '@/components/ui';
import { Spacing } from '@/constants';

export default function EmptyStats() {
  return (
    <Card style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emptyIcon}>📊</Text>
        <Heading4 style={styles.emptyTitle}>No Statistics Yet</Heading4>
        <BodySmall color="textSecondary" style={styles.emptySubtitle}>
          Start analyzing items and saving results to see your stats and insights here
        </BodySmall>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Spacing['5xl'],
    marginBottom: Spacing.lg,
  },
  
  content: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
  },
  
  emptyIcon: {
    fontSize: 64,
    marginBottom: Spacing.lg,
    lineHeight: 72, // Added line height to prevent emoji cut-off
  },
  
  emptyTitle: {
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  
  emptySubtitle: {
    textAlign: 'center',
  },
});
