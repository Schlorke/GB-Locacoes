/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
export const PaymentFindFirstResultSchema = z.nullable(z.object({
  id: z.string(),
  rentalId: z.string().optional(),
  quoteId: z.string().optional(),
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
  updatedAt: z.date(),
  quote: z.unknown().optional(),
  rental: z.unknown().optional()
}));