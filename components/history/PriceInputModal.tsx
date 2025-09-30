import React, { useState } from 'react';
import { Modal, StyleSheet, TextInput, View } from 'react-native';

import { Button, Card, Heading3, Text } from '@/components/ui';
import { Colors, Spacing } from '@/constants';

interface PriceInputModalProps {
  visible: boolean;
  itemName: string;
  currentPrice: string;
  onClose: () => void;
  onSave: (price: string) => void;
}

export default function PriceInputModal({
  visible,
  itemName,
  currentPrice,
  onClose,
  onSave
}: PriceInputModalProps) {
  const [inputPrice, setInputPrice] = useState(currentPrice.replace(/[^0-9]/g, ''));

  const handleSave = () => {
    if (inputPrice.trim() === '') {
      return;
    }
    onSave(inputPrice);
    onClose();
  };

  const handleClose = () => {
    setInputPrice(currentPrice.replace(/[^0-9]/g, ''));
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Card style={styles.modalCard}>
            <View style={styles.header}>
              <Heading3 style={styles.title}>Edit Actual Price</Heading3>
              <Text color="textSecondary" style={styles.subtitle}>
                Enter the actual price you sold/bought "{itemName}" for:
              </Text>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.currencySymbol}>₦</Text>
              <TextInput
                style={styles.priceInput}
                value={inputPrice}
                onChangeText={setInputPrice}
                placeholder="Enter price..."
                placeholderTextColor={Colors.textSecondary}
                keyboardType="numeric"
                autoFocus
                selectTextOnFocus
              />
            </View>

            <View style={styles.buttonContainer}>
              <Button
                title="Cancel"
                onPress={handleClose}
                variant="ghost"
                style={styles.button}
              />
              <Button
                title="Save"
                onPress={handleSave}
                variant="primary"
                style={styles.button}
                disabled={!inputPrice.trim()}
              />
            </View>
          </Card>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
  },

  modalContainer: {
    width: '100%',
    maxWidth: 400,
  },

  modalCard: {
    // Card styles handled by Card component
  },

  header: {
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.lg,
    paddingHorizontal: Spacing.lg,
    alignItems: 'center',
  },

  title: {
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },

  subtitle: {
    textAlign: 'center',
    lineHeight: 20,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    backgroundColor: Colors.surface,
    paddingHorizontal: Spacing.md,
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
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
    minHeight: 48,
  },

  buttonContainer: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
    gap: Spacing.md,
  },

  button: {
    flex: 1,
  },
});
