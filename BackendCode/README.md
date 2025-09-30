# Protected API Endpoint

This API endpoint serves the DeepSeek API key only to authenticated requests.

## Authentication

The endpoint requires a Bearer token in the Authorization header. The token must match the `SECRET_TOKEN` environment variable.

Example:
\`\`\`bash
curl -H "Authorization: Bearer your_secret_token" https://your-domain.com/api/key
\`\`\`

## CORS Configuration

- In development, all origins are allowed.
- In production, only the origin specified in the `CORS_ORIGIN` environment variable is allowed.

## Environment Variables

Create a `.env.local` file with the following variables:

\`\`\`
SECRET_TOKEN=your_secret_token
DEEPSEEK_API_KEY=your_deepseek_api_key
CORS_ORIGIN=https://securebackend-orcin.vercel.app/
\`\`\`

## Production Setup

Before deploying to production:

1. Set a strong, unique `SECRET_TOKEN` value
2. Add your actual DeepSeek API key as `DEEPSEEK_API_KEY`
3. Update `CORS_ORIGIN` to match your frontend domain
