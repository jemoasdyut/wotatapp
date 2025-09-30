import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Button, Card, Heading3, NumericText, NumericTextLarge, Text } from '@/components/ui';
import { Colors, Spacing, StylePresets } from '@/constants';

interface ResultData {
  priceRange: {
    min: number;
    max: number;
    currency: string;
  };
  confidence: number;
  condition: string;
  marketDemand: string;
}

interface ResultCardProps {
  result: ResultData;
  userInput?: string;
  onSaveToHistory: () => void;
  onTryAnother: () => void;
}

export default function ResultCard({ 
  result, 
  userInput, 
  onSaveToHistory, 
  onTryAnother 
}: ResultCardProps) {
  return (
    <View style={styles.container}>
      <Card style={styles.resultCard}>
        <View style={styles.resultHeader}>
          <View style={styles.resultIconContainer}>
            <Text style={styles.resultIcon}>✨</Text>
          </View>
          <Heading3 style={styles.resultTitle}>AI Price Analysis</Heading3>
          <Text style={styles.resultBadge}>COMPLETE</Text>
        </View>
        
        <View style={styles.priceRange}>
          <Text color="textSecondary" style={styles.priceRangeLabel}>
            💰 Suggested Price Range
          </Text>
          <View style={styles.priceContainer}>
            <NumericTextLarge color="secondary" style={styles.priceText}>
              {result.priceRange.currency}{result.priceRange.min.toLocaleString()} - {result.priceRange.currency}{result.priceRange.max.toLocaleString()}
            </NumericTextLarge>
          </View>
          <View style={styles.confidenceBadge}>
            <Text style={styles.confidenceIcon}>🎯</Text>
            <Text style={styles.confidenceText}>
              {result.confidence}% Confidence
            </Text>
          </View>
        </View>

        <View style={StylePresets.divider} />

        <View style={styles.analysisDetails}>
          {userInput && (
            <View style={styles.detailRow}>
              <View style={styles.detailLabelContainer}>
                <Text style={styles.detailIcon}>💭</Text>
                <Text style={styles.detailLabel}>Your Input</Text>
              </View>
              <NumericText style={styles.detailValue}>₦{userInput}</NumericText>
            </View>
          )}
          
          <View style={styles.detailRow}>
            <View style={styles.detailLabelContainer}>
              <Text style={styles.detailIcon}>⭐</Text>
              <Text style={styles.detailLabel}>Item Condition</Text>
            </View>
            <Text color="secondary" style={styles.detailValue}>{result.condition}</Text>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.detailLabelContainer}>
              <Text style={styles.detailIcon}>📈</Text>
              <Text style={styles.detailLabel}>Market Demand</Text>
            </View>
            <Text color="secondary" style={styles.detailValue}>{result.marketDemand}</Text>
          </View>
        </View>

        <View style={styles.actionButtons}>
          <Button
            title="💾 Save to History"
            onPress={onSaveToHistory}
            variant="primary"
            size="large"
            style={styles.primaryButton}
          />
          <Button
            title="🔄 Try Another"
            onPress={onTryAnother}
            variant="outline"
            size="large"
            style={styles.secondaryButton}
          />
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  
  resultCard: {
    marginBottom: Spacing.lg,
  },

  resultHeader: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
    position: 'relative',
  },

  resultIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.secondary + '15',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },

  resultIcon: {
    fontSize: 32,
    lineHeight: 38,
  },

  resultBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: Colors.secondary,
    color: Colors.textOnPrimary,
    fontSize: 10,
    fontWeight: '700',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    overflow: 'hidden',
  },
  
  resultTitle: {
    textAlign: 'center',
  },
  
  priceRange: {
    alignItems: 'center',
    marginBottom: Spacing.lg,
    paddingVertical: Spacing.md,
  },

  priceRangeLabel: {
    marginBottom: Spacing.sm,
    fontSize: 16,
    fontWeight: '500',
  },

  priceContainer: {
    backgroundColor: Colors.secondary + '10',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: 16,
    marginBottom: Spacing.md,
  },

  priceText: {
    textAlign: 'center',
    letterSpacing: -0.5,
  },

  confidenceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary + '15',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: 16,
  },

  confidenceIcon: {
    fontSize: 14,
    marginRight: 6,
  },

  confidenceText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },

  analysisDetails: {
    marginTop: Spacing.lg,
    gap: Spacing.md,
  },

  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.xs,
  },

  detailLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  detailIcon: {
    fontSize: 16,
    marginRight: Spacing.sm,
  },

  detailLabel: {
    fontSize: 16,
    color: Colors.textSecondary,
  },

  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'right',
  },
  
  actionButtons: {
    marginTop: Spacing.xl,
    gap: Spacing.md,
  },
  
  primaryButton: {
    width: '100%',
    borderRadius: 16,
  },

  secondaryButton: {
    width: '100%',
    borderRadius: 16,
  },
});
