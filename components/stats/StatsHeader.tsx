import React from 'react';
import { StyleSheet, View } from 'react-native';

import { BodySmall, Heading1, Logo } from '@/components/ui';
import { Spacing } from '@/constants';

interface StatsHeaderProps {
  hasData?: boolean;
}

export default function StatsHeader({ hasData = false }: StatsHeaderProps) {
  const getSubtitleText = () => {
    return hasData ? 'Your analytics & insights' : 'No analytics data yet';
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Logo size="medium" style={styles.logo} />
        <Heading1>Stats</Heading1>
      </View>
      <BodySmall color="textSecondary">
        {getSubtitleText()}
      </BodySmall>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.lg,
    alignItems: 'center',
  },
  
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  
  logo: {
    marginRight: Spacing.md,
  },
});
