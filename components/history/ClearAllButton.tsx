import React from 'react';
import { StyleSheet } from 'react-native';

import { Button } from '@/components/ui';
import { Spacing } from '@/constants';

interface ClearAllButtonProps {
  onClearAll: () => void;
  disabled?: boolean;
}

export default function ClearAllButton({ 
  onClearAll, 
  disabled = false 
}: ClearAllButtonProps) {
  return (
    <Button
      title="Clear All History"
      onPress={onClearAll}
      variant="danger"
      style={styles.button}
      disabled={disabled}
    />
  );
}

const styles = StyleSheet.create({
  button: {
    marginVertical: Spacing.xl,
  },
});
