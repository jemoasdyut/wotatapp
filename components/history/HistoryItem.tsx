import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

import { Button, Caption, Card, Heading4, NumericText, Text } from '@/components/ui';
import { Colors, Spacing, StylePresets } from '@/constants';

export interface HistoryItemData {
  id: number;
  thumbnail: string;
  itemName: string;
  inputPrice: string;
  aiPriceRange: string;
  actualPrice: string;
  timestamp: string;
  profit: string;
  profitColor: 'secondary' | 'danger' | 'textSecondary';
  imageUri?: string | null; // Optional image URI for uploaded images
}

interface HistoryItemProps {
  item: HistoryItemData;
  onDelete: (id: number) => void;
  onEditActualPrice: (id: number) => void;
}

export default function HistoryItem({ 
  item, 
  onDelete, 
  onEditActualPrice 
}: HistoryItemProps) {
  const handleLongPress = () => {
    onDelete(item.id);
  };

  const formatTimestamp = (timestamp: string) => {
    try {
      const date = new Date(timestamp);
      const now = new Date();
      const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
      
      if (diffInHours < 1) return 'Just now';
      if (diffInHours < 24) return `${diffInHours}h ago`;
      if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
      return date.toLocaleDateString();
    } catch {
      return timestamp;
    }
  };

  return (
    <TouchableOpacity 
      onLongPress={handleLongPress}
      activeOpacity={0.7}
      style={styles.touchableContainer}
    >
      <Card style={styles.container}>
        <View style={StylePresets.rowBetween}>
          <View style={StylePresets.row}>
            <View style={styles.thumbnail}>
              {item.imageUri ? (
                <Image 
                  source={{ uri: item.imageUri }} 
                  style={styles.thumbnailImage}
                  resizeMode="cover"
                />
              ) : (
                <Text style={styles.thumbnailIcon}>{item.thumbnail}</Text>
              )}
            </View>
            <View style={styles.itemInfo}>
              <Heading4>{item.itemName}</Heading4>
              <Caption color="textTertiary">{formatTimestamp(item.timestamp)}</Caption>
            </View>
          </View>
          
          <Button
            title="Delete"
            onPress={() => onDelete(item.id)}
            variant="ghost"
            size="small"
          />
        </View>

        <View style={StylePresets.divider} />

        <View style={styles.priceInfo}>
          <View style={StylePresets.rowBetween}>
            <Text>Your Input</Text>
            <NumericText>{item.inputPrice}</NumericText>
          </View>
          
          <View style={StylePresets.rowBetween}>
            <Text>AI Suggested</Text>
            <NumericText>{item.aiPriceRange}</NumericText>
          </View>
          
          <View style={StylePresets.rowBetween}>
            <Text>Actual Price</Text>
            <View style={StylePresets.row}>
              {item.actualPrice ? (
                <NumericText>{item.actualPrice}</NumericText>
              ) : (
                <Button
                  title="Add Price"
                  onPress={() => onEditActualPrice(item.id)}
                  variant="outline"
                  size="small"
                />
              )}
            </View>
          </View>
          
          {item.profit !== 'Not sold yet' && (
            <View style={StylePresets.rowBetween}>
              <Text>Profit/Loss</Text>
              <NumericText color={item.profitColor}>{item.profit}</NumericText>
            </View>
          )}
        </View>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  touchableContainer: {
    marginBottom: Spacing.md,
  },
  container: {
    // Card styles are handled by the Card component
  },
  thumbnail: {
    width: 48,
    height: 48,
    backgroundColor: Colors.surfaceSecondary,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  thumbnailIcon: {
    fontSize: 24,
    lineHeight: 28, // Prevent emoji cut-off
  },

  thumbnailImage: {
    width: '100%',
    height: '100%',
    borderRadius: 6,
  },
  itemInfo: {
    flex: 1,
  },
  priceInfo: {
    gap: Spacing.sm,
  },
});