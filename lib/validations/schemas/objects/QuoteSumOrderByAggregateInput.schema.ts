import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  total: SortOrderSchema.optional(),
  deliveryFee: SortOrderSchema.optional(),
  deposit: SortOrderSchema.optional(),
  discount: SortOrderSchema.optional(),
  finalTotal: SortOrderSchema.optional(),
  pickupFee: SortOrderSchema.optional(),
  priority: SortOrderSchema.optional(),
  subtotal: SortOrderSchema.optional(),
  taxes: SortOrderSchema.optional(),
  originalTotal: SortOrderSchema.optional(),
  lateFee: SortOrderSchema.optional()
}).strict();
export const QuoteSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.QuoteSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.QuoteSumOrderByAggregateInput>;
export const QuoteSumOrderByAggregateInputObjectZodSchema = makeSchema();
