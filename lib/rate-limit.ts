import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"

// Crie um cliente Redis.
// As variáveis de ambiente UPSTASH_REDIS_REST_URL e UPSTASH_REDIS_REST_TOKEN
// são lidas automaticamente pelo construtor do Redis.
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

// Limita a 5 requisições por janela de 10 segundos
export const rateLimiter = (
  identifier: string,
  requests = 5,
  window: `${number} s` | `${number} m` | `${number} h` | `${number} d` = "10 s",
) =>
  new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(requests, window),
    analytics: true,
    prefix: `@upstash/ratelimit:${identifier}`,
  })

export async function checkRateLimit(identifier: string, req: Request) {
  const ip = req.headers.get("x-forwarded-for") ?? req.headers.get("cf-connecting-ip") ?? "127.0.0.1"
  const { success, pending, limit, reset, remaining } = await rateLimiter(identifier).limit(ip)
  return { success, pending, limit, reset, remaining, ip }
}
