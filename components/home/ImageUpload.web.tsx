import React, { useRef, useState } from 'react';
import { Alert, Image, StyleSheet, TouchableOpacity, View } from 'react-native';

import { BodySmall, Button, Card, Text } from '@/components/ui';
import { Colors, Spacing } from '@/constants';

interface ImageUploadProps {
  selectedImage: string | null;
  onImageSelected: (uri: string | null) => void;
}

export default function ImageUpload({ selectedImage, onImageSelected }: ImageUploadProps) {
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        Alert.alert('Invalid File', 'Please select an image file (JPG, PNG, etc.)');
        return;
      }

      // Validate file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        Alert.alert('File Too Large', 'Please select an image smaller than 10MB');
        return;
      }

      setIsLoading(true);
      
      // Create object URL for the selected file
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        onImageSelected(result);
        setIsLoading(false);
      };
      reader.onerror = () => {
        Alert.alert('Error', 'Failed to read the selected file');
        setIsLoading(false);
      };
      reader.readAsDataURL(file);
    }
    
    // Clear the input value so the same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const pickImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
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
    <Card style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.uploadIcon}>🖼️</Text>
        <Text style={styles.uploadTitle}>Product Image (Optional)</Text>
        <BodySmall color="textSecondary" style={styles.uploadSubtitle}>
          Upload an image for visual reference - won't be sent to AI
        </BodySmall>
      </View>

      <View style={styles.uploadArea}>
        {selectedImage ? (
          <TouchableOpacity style={styles.imageContainer} onPress={removeImage}>
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
              {isLoading ? 'Loading...' : 'Choose from Files'}
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

      {/* Hidden file input for web */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        style={{ display: 'none' }}
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.lg,
  },

  header: {
    alignItems: 'center',
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.md,
  },

  uploadIcon: {
    fontSize: 32,
    marginBottom: Spacing.sm,
    lineHeight: 38, // Prevent emoji cut-off
  },

  uploadTitle: {
    marginBottom: Spacing.xs,
    fontWeight: '600',
  },

  uploadSubtitle: {
    textAlign: 'center',
    lineHeight: 18,
  },

  uploadArea: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
  },

  uploadButton: {
    borderWidth: 2,
    borderColor: Colors.border,
    borderStyle: 'dashed',
    borderRadius: 12,
    paddingVertical: Spacing.xl,
    paddingHorizontal: Spacing.lg,
    alignItems: 'center',
    backgroundColor: Colors.surfaceSecondary,
    cursor: 'pointer',
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
    cursor: 'pointer',
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
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
  },
});
