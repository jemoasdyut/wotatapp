import { type NextRequest, NextResponse } from "next/server"
import { headers } from "next/headers"

// CORS middleware
function corsMiddleware(request: NextRequest) {
  // Get origin from request
  const requestOrigin = request.headers.get("origin") || ""
  const isProd = process.env.NODE_ENV === "production"

  // In development, allow all origins
  // In production, use the configured origin or default to none
  const allowedOrigin = isProd ? process.env.CORS_ORIGIN || "" : "*"

  // Check if the request origin is allowed in production
  const responseHeaders: HeadersInit = {
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  }

  // Set the appropriate Access-Control-Allow-Origin header
  if (allowedOrigin === "*" || requestOrigin === allowedOrigin) {
    responseHeaders["Access-Control-Allow-Origin"] = isProd ? allowedOrigin : "*"
  }

  return responseHeaders
}

// Handle OPTIONS request (preflight)
export async function OPTIONS(request: NextRequest) {
  const corsHeaders = corsMiddleware(request)

  return new NextResponse(null, {
    status: 204, // No content
    headers: corsHeaders,
  })
}

// Handle GET request
export async function GET(request: NextRequest) {
  const corsHeaders = corsMiddleware(request)

  // Get authorization header
  const headersList = headers()
  const authHeader = headersList.get("authorization")

  // Check if authorization header exists and has the correct format
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers: corsHeaders })
  }

  // Extract the token
  const token = authHeader.substring(7) // Remove 'Bearer ' prefix

  // Validate the token against the environment variable
  if (token !== process.env.SECRET_TOKEN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers: corsHeaders })
  }

  // If authorized, return the DeepSeek API key
  return NextResponse.json({ key: process.env.DEEPSEEK_API_KEY }, { status: 200, headers: corsHeaders })
}
