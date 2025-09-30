import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import { BodySmall, Card, Text } from '@/components/ui';
import { Colors, Spacing } from '@/constants';

interface PriceInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export default function PriceInput({ 
  value, 
  onChangeText, 
  placeholder = "5,000" 
}: PriceInputProps) {
  return (
    <Card style={styles.container}>
      <Text style={styles.inputLabel}>Price in Mind (Optional)</Text>
      <BodySmall color="textSecondary" style={styles.inputSubtitle}>
        What price are you thinking?
      </BodySmall>
      <View style={styles.inputContainer}>
        <Text style={styles.currencySymbol}>₦</Text>
        <TextInput
          style={styles.priceInput}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={Colors.textSecondary}
          keyboardType="numeric"
          returnKeyType="done"
        />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.lg,
  },

  inputLabel: {
    marginBottom: Spacing.xs,
  },
  
  inputSubtitle: {
    marginBottom: Spacing.md,
  },
  
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    backgroundColor: Colors.surface,
    paddingHorizontal: Spacing.md,
  },

  currencySymbol: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginRight: Spacing.xs,
  },

  priceInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.text,
    paddingVertical: Spacing.md,
  },
});
