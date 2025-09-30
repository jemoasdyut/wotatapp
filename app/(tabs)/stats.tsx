import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { HistoryItemData } from '@/components/history';
import {
  AccuracyChart,
  ChartPlaceholder,
  EmptyStats,
  SettingsSection,
  StatsHeader,
  SummaryMetrics
} from '@/components/stats';
import { BodySmall } from '@/components/ui';
import { Colors, Spacing } from '@/constants';

interface StatsData {
  totalItems: number;
  totalProfit: number;
  itemsSold: number;
  itemsBought: number;
  currency: string;
}

interface AccuracyData {
  withinRange: number;
  aboveRange: number;
  belowRange: number;
}

export default function StatsScreen() {
  const [historyData, setHistoryData] = useState<HistoryItemData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load history data from AsyncStorage
  const loadHistoryData = async () => {
    try {
      setIsLoading(true);
      const existingHistory = await AsyncStorage.getItem('priceHistory');
      if (existingHistory) {
        const history = JSON.parse(existingHistory);
        setHistoryData(history);
      } else {
        setHistoryData([]);
      }
    } catch (error) {
      console.error('Error loading history for stats:', error);
      setHistoryData([]);
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

  // Calculate stats from history data
  const calculateStats = (): StatsData => {
    if (historyData.length === 0) {
      return {
        totalItems: 0,
        totalProfit: 0,
        itemsSold: 0,
        itemsBought: 0,
        currency: '₦'
      };
    }

    let totalProfit = 0;
    let itemsSold = 0;
    let itemsBought = 0;

    historyData.forEach(item => {
      if (item.actualPrice && item.actualPrice !== '') {
        // Parse actual price
        const actualPrice = parseInt(item.actualPrice.replace(/[^0-9]/g, ''));
        
        // Parse AI price range to get midpoint
        const priceRange = item.aiPriceRange.split(' - ');
        const aiMin = parseInt(priceRange[0].replace(/[^0-9]/g, ''));
        const aiMax = parseInt(priceRange[1].replace(/[^0-9]/g, ''));
        const aiMidpoint = (aiMin + aiMax) / 2;
        
        // Calculate profit/loss
        const profit = actualPrice - aiMidpoint;
        totalProfit += profit;
        
        // Determine if it's a buy or sell (this is simplified logic)
        // In a real app, you might want to track this explicitly
        if (profit > 0) {
          itemsSold++; // Assume profit means it was sold
        } else {
          itemsBought++; // Assume loss means it was bought
        }
      }
    });

    return {
      totalItems: historyData.length,
      totalProfit: Math.round(totalProfit),
      itemsSold,
      itemsBought,
      currency: '₦'
    };
  };

  // Calculate accuracy data
  const calculateAccuracy = (): AccuracyData => {
    if (historyData.length === 0) {
      return { withinRange: 0, aboveRange: 0, belowRange: 0 };
    }

    let withinRange = 0;
    let aboveRange = 0;
    let belowRange = 0;

    historyData.forEach(item => {
      if (item.actualPrice && item.actualPrice !== '') {
        const actualPrice = parseInt(item.actualPrice.replace(/[^0-9]/g, ''));
        const priceRange = item.aiPriceRange.split(' - ');
        const aiMin = parseInt(priceRange[0].replace(/[^0-9]/g, ''));
        const aiMax = parseInt(priceRange[1].replace(/[^0-9]/g, ''));

        if (actualPrice >= aiMin && actualPrice <= aiMax) {
          withinRange++;
        } else if (actualPrice > aiMax) {
          aboveRange++;
        } else {
          belowRange++;
        }
      }
    });

    return { withinRange, aboveRange, belowRange };
  };

  const statsData = calculateStats();
  const accuracyData = calculateAccuracy();
  const hasData = statsData.totalItems > 0;

  const handleClearAllData = async () => {
    Alert.alert(
      'Clear All Data',
      'This will permanently delete all your history, statistics, and app data. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Clear All Data', 
          style: 'destructive', 
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('priceHistory');
              setHistoryData([]);
              Alert.alert('Data Cleared', 'All app data has been cleared');
            } catch (error) {
              console.error('Error clearing all data:', error);
              Alert.alert('Error', 'Failed to clear data');
            }
          }
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatsHeader hasData={hasData} />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <BodySmall color="textSecondary">Loading statistics...</BodySmall>
          </View>
        ) : hasData ? (
          <>
            <SummaryMetrics data={statsData} />
            <AccuracyChart data={accuracyData} />
            <ChartPlaceholder title="Profit/Loss Trends" />
          </>
        ) : (
          <EmptyStats />
        )}
        
        <SettingsSection onClearAllData={handleClearAllData} />
        
        {/* Bottom spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
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
    paddingVertical: Spacing['5xl'],
  },
  
  bottomSpacing: {
    height: Spacing.xl,
  },
});
