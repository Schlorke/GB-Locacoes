/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
export const PaymentFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.string(),
  rentalId: z.string().optional(),
  quoteId: z.string().optional(),
  rental: z.unknown().optional(),
  quote: z.unknown().optional(),
  amount: z.number(),
  method: z.unknown(),
  status: z.unknown(),
  type: z.unknown(),
  paidAt: z.date().optional(),
  dueDate: z.date(),
  invoiceNumber: z.string().optional(),
  transactionId: z.string().optional(),
  pixCode: z.string().optional(),
  pixQrCode: z.string().optional(),
  metadata: z.unknown().optional(),
  createdAt: z.date(),
  updatedAt: z.date()
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