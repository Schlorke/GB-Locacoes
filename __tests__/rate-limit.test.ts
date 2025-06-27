import { describe, it, expect } from 'vitest'
import { checkRateLimit } from '../lib/rate-limit'

describe('rate limiter', () => {
  it('blocks after limit is reached', () => {
    const ip = '127.0.0.1'
    for (let i = 0; i < 5; i++) {
      const res = checkRateLimit(ip)
      expect(res.success).toBe(true)
    }
    const blocked = checkRateLimit(ip)
    expect(blocked.success).toBe(false)
  })
})
