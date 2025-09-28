/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import { z } from 'zod';
export const QuoteItemFindFirstResultSchema = z.nullable(z.object({
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
}));