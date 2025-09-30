import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AnalyzingState, ProductInputForm, ResultCard } from '@/components/home';
import type { ProductFormData } from '@/components/home/ProductInputForm';
import { BodySmall, Heading1, Logo } from '@/components/ui';
import { Colors, Spacing } from '@/constants';
import type { ProductAnalysisRequest } from '@/services/DeepSeekService';
import { deepSeekService } from '@/services/DeepSeekService';

interface AnalysisResult {
  priceRange: {
    min: number;
    max: number;
    currency: string;
  };
  confidence: number;
  condition: string;
  marketDemand: string;
  productDescription?: string;
  reasoning?: string;
}

export default function HomeScreen() {
  const [showResult, setShowResult] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [productData, setProductData] = useState<ProductFormData | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const analyzeProduct = async (formData: ProductFormData) => {
    try {
      setIsAnalyzing(true);
      setProductData(formData);
      
      const expectedPrice = parseFloat(formData.expectedPrice.replace(/[^0-9.]/g, '')) || 25;

      // Prepare request for DeepSeek service
      const analysisRequest: ProductAnalysisRequest = {
        productName: formData.name,
        productDescription: formData.description,
        category: formData.category,
        condition: formData.condition,
        expectedPrice: expectedPrice,
        transactionType: formData.transactionType,
        currency: 'NGN'
      };

      // Call DeepSeek service for analysis
      const result = await deepSeekService.analyzeProduct(analysisRequest);
      
      // Map service response to component interface (they're already compatible)
      const mappedResult: AnalysisResult = {
        priceRange: result.priceRange,
        confidence: result.confidence,
        condition: result.condition,
        marketDemand: result.marketDemand,
        productDescription: result.productDescription || formData.name,
        reasoning: result.reasoning
      };
      
      setAnalysisResult(mappedResult);
      setShowResult(true);
      
    } catch (error) {
      console.error('Analysis error:', error);
      
      // Provide more specific error messages
      let errorMessage = 'Unable to analyze the product. Please check your connection and try again.';
      
      if (error instanceof Error) {
        if (error.message.includes('authenticate')) {
          errorMessage = 'Authentication failed. Please try again later.';
        } else if (error.message.includes('Rate limit')) {
          errorMessage = 'Too many requests. Please wait a moment and try again.';
        } else if (error.message.includes('Invalid response')) {
          errorMessage = 'Analysis service is temporarily unavailable. Please try again.';
        }
      }
      
      Alert.alert('Analysis Failed', errorMessage);
    } finally {
      setIsAnalyzing(false);
    }
  };


  const saveToHistory = async () => {
    if (!analysisResult || !productData) return;

    try {
      const historyItem = {
        id: Date.now(),
        thumbnail: productData.imageUri || '📝', // Use uploaded image or text icon
        itemName: productData.name || 'Analyzed Item',
        inputPrice: productData.expectedPrice ? `₦${productData.expectedPrice}` : '',
        aiPriceRange: `₦${analysisResult.priceRange.min.toLocaleString()} - ₦${analysisResult.priceRange.max.toLocaleString()}`,
        actualPrice: '',
        timestamp: new Date().toISOString(),
        profit: 'Not sold yet',
        profitColor: 'textSecondary' as const,
        confidence: analysisResult.confidence,
        condition: analysisResult.condition,
        reasoning: analysisResult.reasoning || '',
        category: productData.category,
        transactionType: productData.transactionType,
        imageUri: productData.imageUri // Store the image URI for display
      };

      // Get existing history
      const existingHistory = await AsyncStorage.getItem('priceHistory');
      const history = existingHistory ? JSON.parse(existingHistory) : [];
      
      // Add new item to beginning of array
      history.unshift(historyItem);
      
      // Save back to storage
      await AsyncStorage.setItem('priceHistory', JSON.stringify(history));
      
      Alert.alert('Saved!', 'This estimation has been saved to your history');
      handleDiscard();
    } catch (error) {
      console.error('Save error:', error);
      Alert.alert('Error', 'Failed to save to history');
    }
  };

  const handleDiscard = () => {
    setShowResult(false);
    setProductData(null);
    setAnalysisResult(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Enhanced Header Card */}
        <View style={styles.headerCard}>
          <View style={styles.header}>
            <View style={styles.brandContainer}>
              <Logo size="large" variant="white" />
              <Heading1 style={styles.brandTitle}>WorthAI</Heading1>
            </View>
            <BodySmall style={styles.tagline}>
              Get instant AI price estimates for any product
            </BodySmall>
            <View style={styles.headerDivider} />
          </View>
        </View>

        {!showResult && !isAnalyzing ? (
          /* Product Input Section */
          <View style={styles.inputSection}>
            <ProductInputForm 
              onSubmit={analyzeProduct}
              isLoading={isAnalyzing}
            />
          </View>
        ) : isAnalyzing ? (
          /* Analyzing State */
          <AnalyzingState />
        ) : (
          /* AI Result Section */
          analysisResult && (
            <ResultCard 
              result={analysisResult}
              userInput={productData?.expectedPrice || ''}
              onSaveToHistory={saveToHistory}
              onTryAnother={handleDiscard}
            />
          )
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  
  scrollView: {
    flex: 1,
  },
  
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Spacing.base,
    paddingBottom: Spacing.xl,
  },

  headerCard: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
    marginTop: Spacing.lg,
    marginBottom: Spacing.xl,
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  
  header: {
    paddingTop: Spacing['2xl'],
    paddingBottom: Spacing.xl,
    paddingHorizontal: Spacing.lg,
    alignItems: 'center',
  },

  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
    gap: Spacing.md,
  },

  brandTitle: {
    letterSpacing: -0.5,
    color: Colors.textOnPrimary,
    fontWeight: '700',
  },

  tagline: {
    textAlign: 'center',
    paddingHorizontal: Spacing.lg,
    lineHeight: 22,
    marginBottom: Spacing.lg,
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 16,
    fontWeight: '500',
  },

  headerDivider: {
    width: 60,
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: 2,
  },
  
  inputSection: {
    paddingVertical: Spacing.md,
  },
});
