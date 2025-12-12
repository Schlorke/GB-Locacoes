/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
export const rentalsUpsertResultSchema = z.object({
  id: z.string(),
  startdate: z.date(),
  enddate: z.date(),
  total: z.number(),
  status: z.string().optional(),
  userid: z.string(),
  createdat: z.date().optional(),
  updatedat: z.date().optional(),
  quoteId: z.string().optional(),
  quote: z.unknown().optional(),
  lateFee: z.number().optional(),
  extensionDays: z.number().int().optional(),
  extensionFee: z.number().optional(),
  checkInAt: z.date().optional(),
  checkOutAt: z.date().optional(),
  notes: z.string().optional(),
  rental_items: z.array(z.unknown()),
  users: z.unknown(),
  payments: z.array(z.unknown()),
  deliveries: z.array(z.unknown()),
  contract: z.unknown().optional()
});