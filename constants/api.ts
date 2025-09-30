// API Configuration
export const API_CONFIG = {
  // Deployed backend URL
  BACKEND_URL: 'https://securebackend-orcin.vercel.app',
  
  ENDPOINTS: {
    GET_API_KEY: '/api/key', // Endpoint to get DeepSeek API key
  },
  
  // DeepSeek API Configuration
  DEEPSEEK: {
    BASE_URL: 'https://api.deepseek.com',
    ENDPOINTS: {
      CHAT_COMPLETIONS: '/chat/completions',
    },
    MODEL: 'deepseek-chat',
  },
  
  // Authentication token for backend (matches SECRET_TOKEN in backend env)
  SECRET_TOKEN: process.env.EXPO_PUBLIC_BACKEND_API_KEY || 'fuhw4e76242rb4r98uh3bey3fe7tu23orhbirub234r2gefg3gw4',
  
  TIMEOUT: 30000, // 30 seconds timeout for analysis
};
