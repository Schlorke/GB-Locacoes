import { z } from 'zod'
export const QuoteDeleteManyResultSchema = z.object({
  count: z.number(),
})
