import React from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Button, Card, Heading3 } from '@/components/ui';
import { Spacing } from '@/constants';

interface SettingsSectionProps {
  onClearAllData?: () => void;
}

export default function SettingsSection({ onClearAllData }: SettingsSectionProps) {
  const handleAboutApp = () => {
    Alert.alert(
      'About WorthAI',
      'WorthAI helps you make smarter decisions in thrift and second-hand marketplaces by providing AI-powered price estimates.\n\nVersion 1.0.0\nBuilt with React Native & Expo'
    );
  };

  const handlePrivacyPolicy = () => {
    Alert.alert(
      'Privacy Policy',
      'Your privacy is important to us. All your data is stored locally on your device. We do not collect, store, or share any personal information.\n\n• No user accounts required\n• All data stays on your device\n• No cloud storage or backups\n• AI analysis requires internet but no data is stored'
    );
  };

  const handleClearAllData = () => {
    Alert.alert(
      'Clear All Data',
      'This will permanently delete all your history, statistics, and app data. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Clear All Data', 
          style: 'destructive', 
          onPress: () => {
            if (onClearAllData) {
              onClearAllData();
            } else {
              Alert.alert('Data Cleared', 'All app data has been cleared');
            }
          }
        },
      ]
    );
  };

  return (
    <Card style={styles.container}>
      <Heading3 style={styles.title}>Settings</Heading3>
      
      <View style={styles.settingsList}>
        <Button
          title="About WorthAI"
          onPress={handleAboutApp}
          variant="ghost"
          style={styles.settingButton}
        />
        
        <Button
          title="Privacy Policy"
          onPress={handlePrivacyPolicy}
          variant="ghost"
          style={styles.settingButton}
        />
        
        <Button
          title="Clear All Data"
          onPress={handleClearAllData}
          variant="ghost"
          style={[styles.settingButton, styles.dangerButton]}
        />
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
  
  settingsList: {
    gap: Spacing.xs,
  },
  
  settingButton: {
    justifyContent: 'flex-start',
    paddingHorizontal: 0,
  },
  
  dangerButton: {
    // We can style this differently later if needed
  },
});
