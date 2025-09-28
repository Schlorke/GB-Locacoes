/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  quoteId: SortOrderSchema.optional(),
  equipmentId: SortOrderSchema.optional(),
  quantity: SortOrderSchema.optional(),
  days: SortOrderSchema.optional(),
  pricePerDay: SortOrderSchema.optional(),
  total: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const QuoteItemMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.QuoteItemMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.QuoteItemMinOrderByAggregateInput>;
export const QuoteItemMinOrderByAggregateInputObjectZodSchema = makeSchema();
