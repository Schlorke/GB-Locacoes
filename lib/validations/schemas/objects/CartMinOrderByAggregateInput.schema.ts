/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const CartMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.CartMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.CartMinOrderByAggregateInput>;
export const CartMinOrderByAggregateInputObjectZodSchema = makeSchema();
