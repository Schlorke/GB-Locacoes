/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
export const QuoteItemFindManyResultSchema = z.object({
  data: z.array(z.object({
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
})),
  pagination: z.object({
  page: z.number().int().min(1),
  pageSize: z.number().int().min(1),
  total: z.number().int().min(0),
  totalPages: z.number().int().min(0),
  hasNext: z.boolean(),
  hasPrev: z.boolean()
})
});