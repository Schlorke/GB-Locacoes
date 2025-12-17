import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  rentalId: z.literal(true).optional(),
  quoteId: z.literal(true).optional(),
  amount: z.literal(true).optional(),
  method: z.literal(true).optional(),
  status: z.literal(true).optional(),
  type: z.literal(true).optional(),
  paidAt: z.literal(true).optional(),
  dueDate: z.literal(true).optional(),
  invoiceNumber: z.literal(true).optional(),
  transactionId: z.literal(true).optional(),
  pixCode: z.literal(true).optional(),
  pixQrCode: z.literal(true).optional(),
  metadata: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const PaymentCountAggregateInputObjectSchema: z.ZodType<Prisma.PaymentCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.PaymentCountAggregateInputType>;
export const PaymentCountAggregateInputObjectZodSchema = makeSchema();
