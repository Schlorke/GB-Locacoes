import { z } from 'zod'
export const QuoteCreateManyResultSchema = z.object({
  count: z.number(),
})
