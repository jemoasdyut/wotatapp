# DeepSeek API Integration Guide

## 🚀 Backend Setup Complete

Your backend is configured to securely serve DeepSeek API keys through the `/api/key` endpoint with proper authentication and CORS handling.

## 🔧 Required Environment Variables

Create a `.env.local` file in your project root with:

```env
# DeepSeek API Configuration
DEEPSEEK_API_KEY=your_deepseek_api_key_here

# Authentication
SECRET_TOKEN=your_secret_token_here

# CORS Configuration (for production)
CORS_ORIGIN=https://securebackend-orcin.vercel.app
```

## 📱 Expo App Implementation

Here's how to implement DeepSeek API in your Expo app:

### 1. DeepSeek API Endpoint
Use DeepSeek's chat completions endpoint:
```javascript
const deepseekUrl = 'https://api.deepseek.com/chat/completions';
```

### 2. Request Format
DeepSeek uses OpenAI-compatible format:

```javascript
// DeepSeek API request format
const requestBody = {
  model: "deepseek-chat",
  messages: [
    {
      role: "system", 
      content: "You are a helpful assistant."
    },
    {
      role: "user", 
      content: userMessage
    }
  ],
  stream: false
};

const response = await fetch('https://api.deepseek.com/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${deepseekApiKey}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(requestBody)
});
```

### 3. Response Handling
DeepSeek returns OpenAI-compatible responses:

```javascript
const data = await response.json();

// Extract the assistant's reply
const assistantReply = data.choices[0].message.content;

// Handle usage information (optional)
const usage = data.usage; // { prompt_tokens, completion_tokens, total_tokens }
```

### 4. Error Handling
Implement proper error handling for DeepSeek's HTTP status codes:

```javascript
if (!response.ok) {
  const errorData = await response.json();
  
  switch (response.status) {
    case 400:
      throw new Error(`Invalid Parameters: ${errorData.message}`);
    case 401:
      throw new Error('Unauthorized - Check your API key');
    case 404:
      throw new Error('Endpoint not found');
    case 429:
      throw new Error('Rate limited - Too many requests');
    case 500:
      throw new Error('Server error - Try again later');
    default:
      throw new Error(`API Error: ${response.status}`);
  }
}
```

## 🚀 Getting Your DeepSeek API Key

1. Visit [DeepSeek Platform](https://platform.deepseek.com/)
2. Sign up for an account
3. Navigate to the API section
4. Generate a new API key
5. Add the key to your `.env.local` file as `DEEPSEEK_API_KEY`

## 📊 Available Models

DeepSeek offers several models:
- `deepseek-chat` - General purpose chat model
- `deepseek-coder` - Specialized for code generation

## ⚡ DeepSeek API Features

1. **API Format**: Uses OpenAI-compatible format for easy integration
2. **Authentication**: Bearer token in Authorization header
3. **Response Structure**: Standard OpenAI format with `choices` array
4. **Rate Limits**: Check DeepSeek's documentation for current limits
5. **Pricing**: Monitor your usage to track costs

## 🧪 Testing Your Integration

1. Start your backend: `npm run dev`
2. Test the API endpoint:
   ```bash
   curl -H "Authorization: Bearer your_secret_token" http://localhost:3000/api/key
   ```
3. Verify you receive: `{"key": "your_deepseek_api_key"}`
4. Implement the API calls in your Expo app using the format above
5. Test end-to-end functionality

## 🔒 Security Notes

- Keep your DeepSeek API key secure
- Use the same authentication flow (SECRET_TOKEN) for your API proxy
- The backend acts as a secure proxy to hide your DeepSeek API key from client apps
- Monitor API usage to prevent unexpected charges

## 📚 Additional Resources

- [DeepSeek API Documentation](https://platform.deepseek.com/api-docs/)
- [DeepSeek Models Overview](https://platform.deepseek.com/api-docs/api/deepseek-api/)
- [OpenAI API Compatibility](https://platform.deepseek.com/api-docs/api/deepseek-api/) (DeepSeek is compatible)

---

**Status**: ✅ Backend ready. Implement the API calls in your Expo app using the format above.
