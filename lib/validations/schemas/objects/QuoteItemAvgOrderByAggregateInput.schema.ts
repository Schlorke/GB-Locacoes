import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  quantity: SortOrderSchema.optional(),
  days: SortOrderSchema.optional(),
  pricePerDay: SortOrderSchema.optional(),
  total: SortOrderSchema.optional(),
  appliedDiscount: SortOrderSchema.optional(),
  directValue: SortOrderSchema.optional()
}).strict();
export const QuoteItemAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.QuoteItemAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.QuoteItemAvgOrderByAggregateInput>;
export const QuoteItemAvgOrderByAggregateInputObjectZodSchema = makeSchema();
