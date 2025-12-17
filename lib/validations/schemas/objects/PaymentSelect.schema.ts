/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { QuoteArgsObjectSchema as QuoteArgsObjectSchema } from './QuoteArgs.schema';
import { rentalsArgsObjectSchema as rentalsArgsObjectSchema } from './rentalsArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  rentalId: z.boolean().optional(),
  quoteId: z.boolean().optional(),
  amount: z.boolean().optional(),
  method: z.boolean().optional(),
  status: z.boolean().optional(),
  type: z.boolean().optional(),
  paidAt: z.boolean().optional(),
  dueDate: z.boolean().optional(),
  invoiceNumber: z.boolean().optional(),
  transactionId: z.boolean().optional(),
  pixCode: z.boolean().optional(),
  pixQrCode: z.boolean().optional(),
  metadata: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  quote: z.union([z.boolean(), z.lazy(() => QuoteArgsObjectSchema)]).optional(),
  rental: z.union([z.boolean(), z.lazy(() => rentalsArgsObjectSchema)]).optional()
}).strict();
export const PaymentSelectObjectSchema: z.ZodType<Prisma.PaymentSelect> = makeSchema() as unknown as z.ZodType<Prisma.PaymentSelect>;
export const PaymentSelectObjectZodSchema = makeSchema();
