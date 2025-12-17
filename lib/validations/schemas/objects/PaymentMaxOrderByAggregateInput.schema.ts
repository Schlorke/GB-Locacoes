import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  rentalId: SortOrderSchema.optional(),
  quoteId: SortOrderSchema.optional(),
  amount: SortOrderSchema.optional(),
  method: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  type: SortOrderSchema.optional(),
  paidAt: SortOrderSchema.optional(),
  dueDate: SortOrderSchema.optional(),
  invoiceNumber: SortOrderSchema.optional(),
  transactionId: SortOrderSchema.optional(),
  pixCode: SortOrderSchema.optional(),
  pixQrCode: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const PaymentMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.PaymentMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.PaymentMaxOrderByAggregateInput>;
export const PaymentMaxOrderByAggregateInputObjectZodSchema = makeSchema();
