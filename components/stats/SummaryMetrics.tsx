import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Caption, Card, Heading3, NumericTextLarge } from '@/components/ui';
import { Spacing } from '@/constants';

interface SummaryData {
  totalItems: number;
  totalProfit: number;
  itemsSold: number;
  itemsBought: number;
  currency: string;
}

interface SummaryMetricsProps {
  data: SummaryData;
}

export default function SummaryMetrics({ data }: SummaryMetricsProps) {
  const formatProfit = (profit: number) => {
    if (profit === 0) return `${data.currency}0`;
    return profit > 0 ? `+${data.currency}${profit.toLocaleString()}` : `-${data.currency}${Math.abs(profit).toLocaleString()}`;
  };

  const getProfitColor = (profit: number) => {
    if (profit > 0) return 'secondary';
    if (profit < 0) return 'danger';
    return 'textPrimary';
  };

  return (
    <Card style={styles.container}>
      <Heading3 style={styles.title}>Summary</Heading3>
      
      <View style={styles.metricsGrid}>
        <View style={styles.metricItem}>
          <NumericTextLarge color="primary">{data.totalItems}</NumericTextLarge>
          <Caption color="textSecondary">Items Analyzed</Caption>
        </View>
        
        <View style={styles.metricItem}>
          <NumericTextLarge color={getProfitColor(data.totalProfit)}>
            {formatProfit(data.totalProfit)}
          </NumericTextLarge>
          <Caption color="textSecondary">Total Profit</Caption>
        </View>
      </View>
      
      <View style={styles.metricsGrid}>
        <View style={styles.metricItem}>
          <NumericTextLarge color="textPrimary">{data.itemsSold}</NumericTextLarge>
          <Caption color="textSecondary">Items Sold</Caption>
        </View>
        
        <View style={styles.metricItem}>
          <NumericTextLarge color="textPrimary">{data.itemsBought}</NumericTextLarge>
          <Caption color="textSecondary">Items Bought</Caption>
        </View>
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
  
  metricsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: Spacing.md,
  },
  
  metricItem: {
    alignItems: 'center',
    flex: 1,
  },
});
