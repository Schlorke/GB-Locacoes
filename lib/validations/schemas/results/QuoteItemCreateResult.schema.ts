import * as z from 'zod';
export const QuoteItemCreateResultSchema = z.object({
  id: z.string(),
  quoteId: z.string(),
  equipmentId: z.string(),
  quantity: z.number().int(),
  days: z.number().int(),
  pricePerDay: z.number(),
  total: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
  equipment: z.unknown(),
  quote: z.unknown()
});