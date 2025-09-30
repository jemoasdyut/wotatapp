import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { BodySmall, Button, Card, Heading3, Text } from '@/components/ui';
import { Colors, Spacing } from '@/constants';

interface UploadSectionProps {
  onUploadPress: () => void;
}

export default function UploadSection({ onUploadPress }: UploadSectionProps) {
  return (
    <View style={styles.container}>
      <Card style={styles.uploadCard}>
        <View style={styles.uploadArea}>
          <TouchableOpacity 
            style={styles.uploadIconContainer}
            onPress={onUploadPress}
            activeOpacity={0.7}
          >
            <Text style={styles.uploadIcon}>📷</Text>
            <View style={styles.uploadIconOverlay}>
              <Text style={styles.uploadIconText}>+</Text>
            </View>
          </TouchableOpacity>
          
          <Heading3 style={styles.uploadTitle}>Upload or Snap a Photo</Heading3>
          <BodySmall color="textSecondary" style={styles.uploadSubtitle}>
            Take a picture of the item you want to price
          </BodySmall>
          
          <Button
            title="Choose Photo"
            onPress={onUploadPress}
            variant="primary"
            style={styles.uploadButton}
          />
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.lg,
  },

  uploadCard: {
    // Card styles are handled by the Card component
  },
  
  uploadArea: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
  },
  
  uploadIconContainer: {
    position: 'relative',
    marginBottom: Spacing.lg,
  },

  uploadIcon: {
    fontSize: 64,
  },

  uploadIconOverlay: {
    position: 'absolute',
    bottom: -8,
    right: -8,
    backgroundColor: Colors.secondary,
    borderRadius: 16,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.background,
  },

  uploadIconText: {
    color: Colors.background,
    fontSize: 18,
    fontWeight: 'bold',
  },
  
  uploadTitle: {
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  
  uploadSubtitle: {
    marginBottom: Spacing.xl,
    textAlign: 'center',
  },
  
  uploadButton: {
    minWidth: 200,
  },
});
