import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
    ClearAllButton,
    EmptyState,
    HistoryHeader,
    HistoryItemData,
    HistoryList,
    PriceInputModal
} from '@/components/history';
import { BodySmall } from '@/components/ui';
import { Colors, Spacing } from '@/constants';

export default function HistoryScreen() {
  const [historyData, setHistoryData] = useState<HistoryItemData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<HistoryItemData | null>(null);

  // Load history data from AsyncStorage
  const loadHistoryData = async () => {
    try {
      setIsLoading(true);
      const existingHistory = await AsyncStorage.getItem('priceHistory');
      if (existingHistory) {
        const history = JSON.parse(existingHistory);
        setHistoryData(history);
      }
    } catch (error) {
      console.error('Error loading history:', error);
      Alert.alert('Error', 'Failed to load history data');
    } finally {
      setIsLoading(false);
    }
  };

  // Load data when component mounts and when screen comes into focus
  useEffect(() => {
    loadHistoryData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadHistoryData();
    }, [])
  );

  const handleDeleteItem = async (id: number) => {
    Alert.alert(
      'Delete Item',
      'Are you sure you want to delete this history entry?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive', 
          onPress: async () => {
            try {
              const updatedHistory = historyData.filter(item => item.id !== id);
              await AsyncStorage.setItem('priceHistory', JSON.stringify(updatedHistory));
              setHistoryData(updatedHistory);
              Alert.alert('Deleted', 'Item removed from history');
            } catch (error) {
              console.error('Error deleting item:', error);
              Alert.alert('Error', 'Failed to delete item');
            }
          }
        },
      ]
    );
  };

  const handleClearAll = async () => {
    Alert.alert(
      'Clear All History',
      'This will permanently delete all your price estimation history. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Clear All', 
          style: 'destructive', 
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('priceHistory');
              setHistoryData([]);
              Alert.alert('Cleared', 'All history has been cleared');
            } catch (error) {
              console.error('Error clearing history:', error);
              Alert.alert('Error', 'Failed to clear history');
            }
          }
        },
      ]
    );
  };

  const handleEditActualPrice = (id: number) => {
    const item = historyData.find(item => item.id === id);
    if (!item) return;

    setSelectedItem(item);
    setModalVisible(true);
  };

  const handleSavePrice = async (actualPrice: string) => {
    if (!selectedItem || !actualPrice.trim()) return;
    
    try {
      const numericPrice = parseInt(actualPrice.replace(/[^0-9]/g, ''));
      if (isNaN(numericPrice)) {
        Alert.alert('Error', 'Please enter a valid price');
        return;
      }

      const updatedHistory = historyData.map(historyItem => {
        if (historyItem.id === selectedItem.id) {
          const updatedItem = {
            ...historyItem,
            actualPrice: `₦${numericPrice.toLocaleString()}`
          };
          
          // Calculate profit/loss
          const aiMin = parseInt(historyItem.aiPriceRange.split(' - ')[0].replace(/[^0-9]/g, ''));
          const aiMax = parseInt(historyItem.aiPriceRange.split(' - ')[1].replace(/[^0-9]/g, ''));
          const aiMidpoint = (aiMin + aiMax) / 2;
          const profit = numericPrice - aiMidpoint;
          
          updatedItem.profit = profit > 0 
            ? `+₦${Math.round(profit).toLocaleString()}`
            : `-₦${Math.abs(Math.round(profit)).toLocaleString()}`;
          updatedItem.profitColor = profit > 0 ? 'secondary' : profit < 0 ? 'danger' : 'textSecondary';
          
          return updatedItem;
        }
        return historyItem;
      });

      await AsyncStorage.setItem('priceHistory', JSON.stringify(updatedHistory));
      setHistoryData(updatedHistory);
      Alert.alert('Updated', 'Actual price has been saved');
    } catch (error) {
      console.error('Error updating price:', error);
      Alert.alert('Error', 'Failed to update price');
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedItem(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <HistoryHeader totalItems={historyData.length} />

      <View style={styles.content}>
        {isLoading ? (
          // Loading state - could be replaced with a proper loading component
          <View style={styles.loadingContainer}>
            <BodySmall color="textSecondary">Loading history...</BodySmall>
          </View>
        ) : historyData.length > 0 ? (
          <>
            <HistoryList
              data={historyData}
              onDeleteItem={handleDeleteItem}
              onEditActualPrice={handleEditActualPrice}
            />
            <ClearAllButton onClearAll={handleClearAll} />
          </>
        ) : (
          <EmptyState />
        )}
      </View>

      <PriceInputModal
        visible={modalVisible}
        itemName={selectedItem?.itemName || ''}
        currentPrice={selectedItem?.actualPrice || ''}
        onClose={handleCloseModal}
        onSave={handleSavePrice}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  
  content: {
    flex: 1,
    paddingHorizontal: Spacing.base,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
