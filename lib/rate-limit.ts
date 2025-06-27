// Simple in-memory rate limiter used for API routes.
// NOTE: This does not persist across serverless instances.
interface RateInfo {
  count: number
  expiresAt: number
}

const requests = new Map<string, RateInfo>()

export function checkRateLimit(
  ip: string,
  limit = 5,
  windowMs = 10_000,
) {
  const now = Date.now()
  const entry = requests.get(ip)

  if (!entry || entry.expiresAt < now) {
    requests.set(ip, { count: 1, expiresAt: now + windowMs })
    return { success: true, remaining: limit - 1, reset: now + windowMs }
  }

  if (entry.count < limit) {
    entry.count += 1
    requests.set(ip, entry)
    return { success: true, remaining: limit - entry.count, reset: entry.expiresAt }
  }

  return { success: false, remaining: 0, reset: entry.expiresAt }
}
