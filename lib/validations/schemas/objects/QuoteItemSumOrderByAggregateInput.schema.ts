import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  quantity: SortOrderSchema.optional(),
  days: SortOrderSchema.optional(),
  pricePerDay: SortOrderSchema.optional(),
  total: SortOrderSchema.optional()
}).strict();
export const QuoteItemSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.QuoteItemSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.QuoteItemSumOrderByAggregateInput>;
export const QuoteItemSumOrderByAggregateInputObjectZodSchema = makeSchema();
