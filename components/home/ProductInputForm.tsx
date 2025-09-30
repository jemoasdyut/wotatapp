import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import { BodySmall, Button, Card, Heading3, Text } from '@/components/ui';
import { Colors, Spacing } from '@/constants';
import ImageUpload from './ImageUpload';

interface ProductInputFormProps {
  onSubmit: (productData: ProductFormData) => void;
  isLoading?: boolean;
}

export interface ProductFormData {
  name: string;
  description: string;
  category: string;
  condition: string;
  expectedPrice: string;
  transactionType: 'buy' | 'sell';
  imageUri?: string | null; // Optional image for visual reference
}

const CATEGORIES = [
  'Electronics',
  'Clothing & Fashion',
  'Home & Garden',
  'Books & Media',
  'Sports & Recreation',
  'Toys & Games',
  'Automotive',
  'Jewelry & Accessories',
  'Art & Collectibles',
  'Musical Instruments',
  'Other'
];

const CONDITIONS = [
  'Brand New',
  'Like New',
  'Very Good',
  'Good',
  'Fair',
  'Poor'
];

export default function ProductInputForm({ onSubmit, isLoading = false }: ProductInputFormProps) {
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    category: CATEGORIES[0],
    condition: CONDITIONS[2], // Default to "Very Good"
    expectedPrice: '',
    transactionType: 'sell',
    imageUri: null
  });

  const [errors, setErrors] = useState<Partial<ProductFormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<ProductFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Product description is required';
    }

    if (!formData.expectedPrice.trim()) {
      newErrors.expectedPrice = 'Expected price is required';
    } else {
      const price = parseFloat(formData.expectedPrice.replace(/[^0-9.]/g, ''));
      if (isNaN(price) || price <= 0) {
        newErrors.expectedPrice = 'Please enter a valid price';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const updateFormData = (field: keyof ProductFormData, value: string | null) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleImageSelected = (uri: string | null) => {
    setFormData(prev => ({ ...prev, imageUri: uri }));
  };

  return (
    <View style={styles.container}>
      <Card style={styles.formCard}>
        <View style={styles.formHeader}>
          <Heading3 style={styles.formTitle}>Product Details</Heading3>
        </View>

        <View style={styles.formContent}>
          {/* Image Upload Section */}
          <ImageUpload
            selectedImage={formData.imageUri}
            onImageSelected={handleImageSelected}
          />

          {/* Enhanced Transaction Type Toggle */}
          <View style={styles.toggleContainer}>
            <BodySmall color="textSecondary" style={styles.fieldLabel}>
              <Text style={styles.labelIcon}>🎯</Text> I want to:
            </BodySmall>
            <View style={styles.toggleButtonsContainer}>
              <Button
                title="💰 Sell"
                variant={formData.transactionType === 'sell' ? 'primary' : 'outline'}
                onPress={() => updateFormData('transactionType', 'sell')}
                style={[styles.toggleButton, formData.transactionType === 'sell' && styles.activeToggle]}
              />
              <Button
                title="🛒 Buy"
                variant={formData.transactionType === 'buy' ? 'primary' : 'outline'}
                onPress={() => updateFormData('transactionType', 'buy')}
                style={[styles.toggleButton, formData.transactionType === 'buy' && styles.activeToggle]}
              />
            </View>
          </View>

          {/* Enhanced Product Name */}
          <View style={styles.inputGroup}>
            <BodySmall color="textSecondary" style={styles.fieldLabel}>
              <Text style={styles.labelIcon}>📦</Text> Product Name *
            </BodySmall>
            <View style={[styles.inputContainer, errors.name && styles.inputContainerError]}>
              <TextInput
                style={[styles.textInput, errors.name && styles.inputError]}
                placeholder="Enter product name..."
                placeholderTextColor={Colors.textTertiary}
                value={formData.name}
                onChangeText={(text) => updateFormData('name', text)}
                autoCapitalize="words"
              />
            </View>
            {errors.name && <BodySmall color="danger" style={styles.errorText}>{errors.name}</BodySmall>}
          </View>

          {/* Enhanced Product Description */}
          <View style={styles.inputGroup}>
            <BodySmall color="textSecondary" style={styles.fieldLabel}>
              <Text style={styles.labelIcon}>📝</Text> Description *
            </BodySmall>
            <View style={[styles.inputContainer, styles.textAreaContainer, errors.description && styles.inputContainerError]}>
              <TextInput
                style={[styles.textArea, errors.description && styles.inputError]}
                placeholder="Describe the product condition, features, brand, etc..."
                placeholderTextColor={Colors.textTertiary}
                value={formData.description}
                onChangeText={(text) => updateFormData('description', text)}
                multiline
                numberOfLines={3}
                textAlignVertical="top"
                autoCapitalize="sentences"
              />
            </View>
            {errors.description && <BodySmall color="danger" style={styles.errorText}>{errors.description}</BodySmall>}
          </View>

          {/* Enhanced Category */}
          <View style={styles.inputGroup}>
            <BodySmall color="textSecondary" style={styles.fieldLabel}>
              <Text style={styles.labelIcon}>🏷️</Text> Category
            </BodySmall>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={formData.category}
                onValueChange={(value) => updateFormData('category', value)}
                style={styles.picker}
              >
                {CATEGORIES.map((category) => (
                  <Picker.Item key={category} label={category} value={category} />
                ))}
              </Picker>
            </View>
          </View>

          {/* Enhanced Condition */}
          <View style={styles.inputGroup}>
            <BodySmall color="textSecondary" style={styles.fieldLabel}>
              <Text style={styles.labelIcon}>⭐</Text> Condition
            </BodySmall>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={formData.condition}
                onValueChange={(value) => updateFormData('condition', value)}
                style={styles.picker}
              >
                {CONDITIONS.map((condition) => (
                  <Picker.Item key={condition} label={condition} value={condition} />
                ))}
              </Picker>
            </View>
          </View>

          {/* Enhanced Expected Price */}
          <View style={styles.inputGroup}>
            <BodySmall color="textSecondary" style={styles.fieldLabel}>
              <Text style={styles.labelIcon}>💰</Text> Expected Price (₦) *
            </BodySmall>
            <View style={[styles.inputContainer, styles.priceInputContainer, errors.expectedPrice && styles.inputContainerError]}>
              <Text style={styles.currencySymbol}>₦</Text>
              <TextInput
                style={[styles.textInput, styles.priceInput, errors.expectedPrice && styles.inputError]}
                placeholder="0.00"
                placeholderTextColor={Colors.textTertiary}
                value={formData.expectedPrice}
                onChangeText={(text) => updateFormData('expectedPrice', text)}
                keyboardType="numeric"
              />
            </View>
            {errors.expectedPrice && <BodySmall color="danger" style={styles.errorText}>{errors.expectedPrice}</BodySmall>}
          </View>

          {/* Enhanced Submit Button */}
          <View style={styles.submitContainer}>
            <Button
              title={isLoading ? "Analyzing..." : "✨ Get AI Price Estimate"}
              onPress={handleSubmit}
              variant="primary"
              size="large"
              style={styles.submitButton}
              disabled={isLoading}
              loading={isLoading}
            />
            <BodySmall color="textTertiary" style={styles.submitHint}>
              Powered by advanced AI analysis
            </BodySmall>
          </View>
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  formCard: {
    // Card styles handled by Card component
  },

  formHeader: {
    alignItems: 'center',
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.md,
  },

  formTitle: {
    textAlign: 'center',
  },

  formContent: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
  },

  toggleContainer: {
    marginBottom: Spacing.lg,
  },

  labelIcon: {
    fontSize: 14,
    marginRight: 4,
  },

  toggleButtonsContainer: {
    flexDirection: 'row',
    marginTop: Spacing.sm,
    gap: Spacing.sm,
    backgroundColor: Colors.surfaceSecondary,
    padding: 4,
    borderRadius: 12,
  },

  toggleButton: {
    flex: 1,
    borderRadius: 8,
  },

  activeToggle: {
    transform: [{ scale: 0.98 }],
  },

  inputGroup: {
    marginBottom: Spacing.lg,
  },

  fieldLabel: {
    marginBottom: Spacing.sm,
    fontWeight: '600',
    flexDirection: 'row',
    alignItems: 'center',
  },

  inputContainer: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    backgroundColor: Colors.surface,
    minHeight: 48,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
  },

  inputContainerError: {
    borderColor: Colors.danger,
    borderWidth: 1.5,
  },

  textInput: {
    flex: 1,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    fontSize: 16,
    color: Colors.textPrimary,
    backgroundColor: 'transparent',
    borderWidth: 0,
  },

  textAreaContainer: {
    alignItems: 'flex-start',
    minHeight: 80,
  },

  textArea: {
    flex: 1,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    fontSize: 16,
    color: Colors.textPrimary,
    backgroundColor: 'transparent',
    borderWidth: 0,
    minHeight: 80,
    width: '100%',
  },

  priceInputContainer: {
    paddingLeft: Spacing.sm,
  },

  currencySymbol: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textSecondary,
    paddingHorizontal: Spacing.sm,
  },

  priceInput: {
    fontWeight: '600',
    fontSize: 16,
  },

  inputError: {
    // Error styling handled by container
  },

  errorText: {
    marginTop: Spacing.xs,
    marginLeft: 4,
  },

  pickerContainer: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    backgroundColor: Colors.surface,
    overflow: 'hidden',
  },

  picker: {
    minHeight: 48,
    color: Colors.textPrimary,
    paddingVertical: 4,
  },

  submitContainer: {
    marginTop: Spacing.xl,
    alignItems: 'center',
  },

  submitButton: {
    width: '100%',
    marginBottom: Spacing.sm,
    minHeight: 56,
    borderRadius: 16,
  },

  submitHint: {
    textAlign: 'center',
    fontSize: 12,
  },
});
