import { z } from 'zod'
export const QuoteItemCreateManyResultSchema = z.object({
  count: z.number(),
})
