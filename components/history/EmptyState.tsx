import React from 'react';
import { StyleSheet, View } from 'react-native';

import { BodySmall, Card, Heading4, Text } from '@/components/ui';
import { Spacing } from '@/constants';

export default function EmptyState() {
  return (
    <Card style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emptyIcon}>📋</Text>
        <Heading4 style={styles.emptyTitle}>No History Yet</Heading4>
        <BodySmall color="textSecondary" style={styles.emptySubtitle}>
          Start by estimating some item prices on the Home tab
        </BodySmall>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Spacing['5xl'],
  },
  
  content: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
  },
  
  emptyIcon: {
    fontSize: 64,
    marginBottom: Spacing.lg,
  },
  
  emptyTitle: {
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  
  emptySubtitle: {
    textAlign: 'center',
  },
});
