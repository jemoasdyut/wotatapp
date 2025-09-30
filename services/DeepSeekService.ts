import { API_CONFIG } from '@/constants/api';

export interface ProductAnalysisRequest {
  productName: string;
  productDescription: string;
  category: string;
  condition: string;
  expectedPrice: number;
  transactionType: 'buy' | 'sell';
  currency: string;
}

export interface ProductAnalysisResponse {
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

export class DeepSeekService {
  private apiKey: string | null = null;

  /**
   * Fetch DeepSeek API key from our secure backend
   */
  private async getApiKey(): Promise<string> {
    if (this.apiKey) {
      return this.apiKey;
    }

    try {
      const response = await fetch(`${API_CONFIG.BACKEND_URL}${API_CONFIG.ENDPOINTS.GET_API_KEY}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${API_CONFIG.SECRET_TOKEN}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to get API key: ${response.status}`);
      }

      const data = await response.json();
      this.apiKey = data.key;
      
      if (!this.apiKey) {
        throw new Error('No API key received from backend');
      }

      return this.apiKey;
    } catch (error) {
      console.error('Error fetching API key:', error);
      throw new Error('Failed to authenticate with backend');
    }
  }

  /**
   * Generate product analysis prompt for DeepSeek
   */
  private generateAnalysisPrompt(request: ProductAnalysisRequest): string {
    const { productName, productDescription, category, condition, expectedPrice, transactionType, currency } = request;
    
    return `You are a professional product pricing analyst specializing in second-hand and thrift market valuations. Analyze the following product and provide a detailed pricing assessment.

PRODUCT DETAILS:
- Name: ${productName}
- Description: ${productDescription}
- Category: ${category}
- Condition: ${condition}
- User's Expected Price: ${currency}${expectedPrice.toLocaleString()}
- Transaction Type: ${transactionType === 'buy' ? 'Buyer wants to purchase' : 'Seller wants to sell'}

ANALYSIS REQUIREMENTS:
1. Provide a realistic price range for this item in the current market
2. Consider the item's condition, brand reputation, market demand, and rarity
3. Factor in typical depreciation for second-hand items
4. Assess market demand (High/Moderate/Low)
5. Provide confidence level (0-100%)
6. Give reasoning for your assessment

RESPONSE FORMAT (JSON only, no additional text):
{
  "priceRange": {
    "min": [minimum_price_number],
    "max": [maximum_price_number],
    "currency": "${currency}"
  },
  "confidence": [confidence_percentage_number],
  "condition": "${condition}",
  "marketDemand": "[High/Moderate/Low]",
  "productDescription": "${productName}",
  "reasoning": "[Brief explanation of pricing factors and market analysis]"
}`;
  }

  /**
   * Call DeepSeek API for product analysis
   */
  async analyzeProduct(request: ProductAnalysisRequest): Promise<ProductAnalysisResponse> {
    try {
      // Get API key from backend
      const apiKey = await this.getApiKey();

      // Prepare DeepSeek API request
      const prompt = this.generateAnalysisPrompt(request);
      
      const deepSeekRequest = {
        model: API_CONFIG.DEEPSEEK.MODEL,
        messages: [
          {
            role: "system",
            content: "You are a professional product pricing analyst. Always respond with valid JSON only, no additional text or formatting."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        stream: false,
        temperature: 0.3, // Lower temperature for more consistent pricing
        max_tokens: 1000
      };

      // Call DeepSeek API
      const response = await fetch(`${API_CONFIG.DEEPSEEK.BASE_URL}${API_CONFIG.DEEPSEEK.ENDPOINTS.CHAT_COMPLETIONS}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(deepSeekRequest),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        this.handleDeepSeekError(response.status, errorData);
      }

      const data = await response.json();
      
      // Extract the assistant's reply
      const assistantReply = data.choices?.[0]?.message?.content;
      if (!assistantReply) {
        throw new Error('No response from DeepSeek API');
      }

      // Parse JSON response
      try {
        const analysisResult = JSON.parse(assistantReply.trim());
        return this.validateAnalysisResponse(analysisResult);
      } catch (parseError) {
        console.error('Failed to parse DeepSeek response:', assistantReply);
        throw new Error('Invalid response format from AI');
      }

    } catch (error) {
      console.error('DeepSeek analysis error:', error);
      throw error;
    }
  }

  /**
   * Handle DeepSeek API errors
   */
  private handleDeepSeekError(status: number, errorData: any): never {
    switch (status) {
      case 400:
        throw new Error(`Invalid request: ${errorData.message || 'Bad request'}`);
      case 401:
        this.apiKey = null; // Clear cached key
        throw new Error('Authentication failed - API key invalid');
      case 404:
        throw new Error('DeepSeek API endpoint not found');
      case 429:
        throw new Error('Rate limit exceeded - Please try again later');
      case 500:
        throw new Error('DeepSeek server error - Please try again');
      default:
        throw new Error(`DeepSeek API error: ${status}`);
    }
  }

  /**
   * Validate and sanitize the analysis response
   */
  private validateAnalysisResponse(response: any): ProductAnalysisResponse {
    // Provide defaults and validate required fields
    const validated: ProductAnalysisResponse = {
      priceRange: {
        min: Math.max(0, Number(response.priceRange?.min) || 0),
        max: Math.max(0, Number(response.priceRange?.max) || 0),
        currency: response.priceRange?.currency || 'NGN',
      },
      confidence: Math.min(100, Math.max(0, Number(response.confidence) || 50)),
      condition: response.condition || 'Good',
      marketDemand: ['High', 'Moderate', 'Low'].includes(response.marketDemand) 
        ? response.marketDemand 
        : 'Moderate',
      productDescription: response.productDescription || 'Product',
      reasoning: response.reasoning || 'Analysis completed based on market data.',
    };

    // Ensure min <= max
    if (validated.priceRange.min > validated.priceRange.max) {
      const temp = validated.priceRange.min;
      validated.priceRange.min = validated.priceRange.max;
      validated.priceRange.max = temp;
    }

    // Ensure reasonable price range
    if (validated.priceRange.max === 0) {
      validated.priceRange.min = 1000;
      validated.priceRange.max = 5000;
      validated.confidence = 30;
      validated.reasoning = 'Unable to determine accurate pricing - showing estimated range.';
    }

    return validated;
  }

  /**
   * Clear cached API key (useful for testing or key rotation)
   */
  clearApiKey(): void {
    this.apiKey = null;
  }
}

// Export singleton instance
export const deepSeekService = new DeepSeekService();
