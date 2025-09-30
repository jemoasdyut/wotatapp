import React from 'react';
import { StyleSheet, View } from 'react-native';

import { BodySmall, Heading1, Logo } from '@/components/ui';
import { Spacing } from '@/constants';

interface HistoryHeaderProps {
  totalItems?: number;
}

export default function HistoryHeader({ totalItems }: HistoryHeaderProps) {
  const getSubtitleText = () => {
    if (totalItems === undefined) return 'Your saved price estimations';
    if (totalItems === 0) return 'No saved estimations yet';
    if (totalItems === 1) return '1 saved estimation';
    return `${totalItems} saved estimations`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Logo size="medium" style={styles.logo} />
        <Heading1>History</Heading1>
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
