import React from 'react';
import { StyleSheet, View } from 'react-native';

import { BodySmall, Card, Heading3, Heading4, Text } from '@/components/ui';
import { Spacing } from '@/constants';

interface ChartPlaceholderProps {
  title: string;
  message?: string;
}

export default function ChartPlaceholder({ 
  title, 
  message = "Interactive charts will be implemented in the next version" 
}: ChartPlaceholderProps) {
  return (
    <Card style={styles.container}>
      <Heading3 style={styles.title}>{title}</Heading3>
      
      <View style={styles.placeholder}>
        <Text style={styles.icon}>📈</Text>
        <Heading4>Chart Coming Soon</Heading4>
        <BodySmall color="textSecondary" style={styles.subtitle}>
          {message}
        </BodySmall>
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
  
  placeholder: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
  },
  
  icon: {
    fontSize: 48,
    marginBottom: Spacing.md,
  },
  
  subtitle: {
    textAlign: 'center',
    marginTop: Spacing.sm,
  },
});
