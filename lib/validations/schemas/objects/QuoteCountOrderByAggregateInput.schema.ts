/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  email: SortOrderSchema.optional(),
  phone: SortOrderSchema.optional(),
  company: SortOrderSchema.optional(),
  message: SortOrderSchema.optional(),
  total: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const QuoteCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.QuoteCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.QuoteCountOrderByAggregateInput>;
export const QuoteCountOrderByAggregateInputObjectZodSchema = makeSchema();
