import { NextRequest } from 'next/server'

interface RateLimitStore {
  [key: string]: {
    count: number
    resetTime: number
  }
}

const store: RateLimitStore = {}

interface RateLimitOptions {
  windowMs: number // Time window in milliseconds
  maxRequests: number // Maximum requests per window
  keyGenerator?: (request: NextRequest) => string
}

interface RateLimitResult {
  allowed: boolean
  remaining: number
  resetTime: number
  error?: string
}

/**
 * Simple in-memory rate limiter
 * For production, consider using Redis or a dedicated service
 */
export function rateLimit(options: RateLimitOptions) {
  const {
    windowMs,
    maxRequests,
    keyGenerator = (req) => getClientIp(req) || 'anonymous',
  } = options

  return (request: NextRequest): RateLimitResult => {
    const key = keyGenerator(request)
    const now = Date.now()

    // Clean up expired entries periodically
    if (Math.random() < 0.01) {
      // 1% chance
      cleanupExpiredEntries(now)
    }

    // Get or create rate limit entry
    let entry = store[key]
    if (!entry || now > entry.resetTime) {
      entry = {
        count: 0,
        resetTime: now + windowMs,
      }
      store[key] = entry
    }

    // Check if limit exceeded
    if (entry.count >= maxRequests) {
      return {
        allowed: false,
        remaining: 0,
        resetTime: entry.resetTime,
        error: 'Rate limit exceeded',
      }
    }

    // Increment counter
    entry.count++

    return {
      allowed: true,
      remaining: maxRequests - entry.count,
      resetTime: entry.resetTime,
    }
  }
}

/**
 * Pre-configured rate limiters for common use cases
 */
export const authRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 5, // 5 login attempts per 15 minutes
})

export const apiRateLimit = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 100, // 100 requests per minute
})

export const adminApiRateLimit = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 200, // 200 requests per minute for admin operations
})

export const strictRateLimit = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 10, // 10 requests per minute for sensitive operations
})

/**
 * Get client IP from request headers
 */
function getClientIp(request: NextRequest): string | null {
  // Try different headers that might contain the real IP
  const headers = [
    'x-forwarded-for',
    'x-real-ip',
    'x-client-ip',
    'cf-connecting-ip', // Cloudflare
    'true-client-ip',
  ]

  for (const header of headers) {
    const value = request.headers.get(header)
    if (value) {
      // Handle comma-separated IPs (x-forwarded-for can have multiple)
      const ip = value.split(',')[0]?.trim()
      if (ip && ip !== 'unknown') {
        return ip
      }
    }
  }

  return null
}

/**
 * Clean up expired entries from memory store
 */
function cleanupExpiredEntries(now: number) {
  for (const [key, entry] of Object.entries(store)) {
    if (now > entry.resetTime) {
      delete store[key]
    }
  }
}

/**
 * Helper to check rate limit and return appropriate response
 */
export function checkRateLimit(
  request: NextRequest,
  limiter: (req: NextRequest) => RateLimitResult
): { allowed: boolean; response?: Response; headers: Record<string, string> } {
  const result = limiter(request)

  const headers = {
    'X-RateLimit-Limit': String(
      limiter === authRateLimit
        ? 5
        : limiter === apiRateLimit
          ? 100
          : limiter === adminApiRateLimit
            ? 200
            : 10
    ),
    'X-RateLimit-Remaining': String(result.remaining),
    'X-RateLimit-Reset': String(Math.ceil(result.resetTime / 1000)),
  }

  if (!result.allowed) {
    return {
      allowed: false,
      response: new Response(
        JSON.stringify({
          error: 'Rate limit exceeded',
          message: 'Too many requests. Please try again later.',
          retryAfter: Math.ceil((result.resetTime - Date.now()) / 1000),
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': String(
              Math.ceil((result.resetTime - Date.now()) / 1000)
            ),
            ...headers,
          },
        }
      ),
      headers,
    }
  }

  return { allowed: true, headers }
}
