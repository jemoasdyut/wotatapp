import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Alert, Image, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';

import { BodySmall, Button, Text } from '@/components/ui';
import { Colors, Spacing } from '@/constants';

interface ImageUploadProps {
  selectedImage: string | null;
  onImageSelected: (uri: string | null) => void;
}

export default function ImageUpload({ selectedImage, onImageSelected }: ImageUploadProps) {
  const [isLoading, setIsLoading] = useState(false);

  const requestPermissions = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission Required',
          'Sorry, we need camera roll permissions to upload images!',
          [{ text: 'OK' }]
        );
        return false;
      }
    }
    return true;
  };

  const pickImage = async () => {
    try {
      setIsLoading(true);
      
      // Request permissions
      const hasPermission = await requestPermissions();
      if (!hasPermission) {
        return;
      }

      // Launch image picker (library only, no camera)
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8, // Reduce quality to save storage space
        allowsMultipleSelection: false,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const imageUri = result.assets[0].uri;
        onImageSelected(imageUri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const removeImage = () => {
    Alert.alert(
      'Remove Image',
      'Are you sure you want to remove this image?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Remove', 
          style: 'destructive',
          onPress: () => onImageSelected(null)
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.uploadTitle}>Product Image (Optional)</Text>
      </View>

      <View style={styles.uploadArea}>
        {selectedImage ? (
          <TouchableOpacity 
            style={styles.imageContainer} 
            onPress={removeImage}
            activeOpacity={0.8}
          >
            <Image source={{ uri: selectedImage }} style={styles.uploadedImage} />
            <View style={styles.imageOverlay}>
              <Text style={styles.overlayText}>Tap to remove</Text>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity 
            style={styles.uploadButton} 
            onPress={pickImage}
            disabled={isLoading}
          >
            <Text style={styles.uploadButtonIcon}>📁</Text>
            <Text style={styles.uploadButtonText}>
              {isLoading ? 'Loading...' : 'Choose from Gallery'}
            </Text>
            <BodySmall color="textTertiary" style={styles.uploadHint}>
              JPG, PNG up to 10MB
            </BodySmall>
          </TouchableOpacity>
        )}
      </View>

      {selectedImage && (
        <Button
          title="Change Image"
          onPress={pickImage}
          variant="outline"
          size="small"
          style={styles.changeButton}
          disabled={isLoading}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.lg,
  },

  header: {
    alignItems: 'center',
    paddingBottom: Spacing.md,
  },

  uploadTitle: {
    fontWeight: '600',
  },

  uploadSubtitle: {
    textAlign: 'center',
    lineHeight: 18,
  },

  uploadArea: {
    paddingBottom: Spacing.md,
  },

  uploadButton: {
    borderWidth: 2,
    borderColor: Colors.primary + '30',
    borderStyle: 'dashed',
    borderRadius: 16,
    paddingVertical: Spacing.xl,
    paddingHorizontal: Spacing.lg,
    alignItems: 'center',
    backgroundColor: Colors.primary + '05',
  },

  uploadButtonIcon: {
    fontSize: 24,
    marginBottom: Spacing.sm,
    lineHeight: 28,
  },

  uploadButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.primary,
    marginBottom: Spacing.xs,
  },

  uploadHint: {
    fontSize: 12,
    textAlign: 'center',
  },

  imageContainer: {
    position: 'relative',
    borderRadius: 12,
    overflow: 'hidden',
  },

  uploadedImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    backgroundColor: Colors.surfaceSecondary,
  },

  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0,
  },

  overlayText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },

  changeButton: {
    marginTop: Spacing.md,
  },
});

// No additional conditional styles needed
