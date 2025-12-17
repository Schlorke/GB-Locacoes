/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
export const QuoteItemFindFirstResultSchema = z.nullable(z.object({
  id: z.string(),
  quoteId: z.string(),
  equipmentId: z.string(),
  quantity: z.number().int(),
  days: z.number().int(),
  pricePerDay: z.number(),
  total: z.number(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  includeWeekends: z.boolean(),
  appliedDiscount: z.number().optional(),
  appliedPeriod: z.string().optional(),
  useDirectValue: z.boolean(),
  directValue: z.number().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  equipment: z.unknown(),
  quote: z.unknown()
}));