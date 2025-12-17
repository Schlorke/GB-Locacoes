/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
export const rentalsFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.string(),
  startdate: z.date(),
  enddate: z.date(),
  total: z.number(),
  status: z.string().optional(),
  userid: z.string(),
  createdat: z.date().optional(),
  updatedat: z.date().optional(),
  checkInAt: z.date().optional(),
  checkOutAt: z.date().optional(),
  extensionDays: z.number().int().optional(),
  extensionFee: z.number().optional(),
  lateFee: z.number().optional(),
  notes: z.string().optional(),
  quoteId: z.string().optional(),
  contract: z.unknown().optional(),
  deliveries: z.array(z.unknown()),
  payments: z.array(z.unknown()),
  rental_items: z.array(z.unknown()),
  quote: z.unknown().optional(),
  users: z.unknown()
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