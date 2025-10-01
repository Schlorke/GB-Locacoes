/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
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
export const QuoteItemMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.QuoteItemMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.QuoteItemMaxOrderByAggregateInput>;
export const QuoteItemMaxOrderByAggregateInputObjectZodSchema = makeSchema();
