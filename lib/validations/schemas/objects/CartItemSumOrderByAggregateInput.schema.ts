/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  quantity: SortOrderSchema.optional(),
  days: SortOrderSchema.optional(),
  pricePerDay: SortOrderSchema.optional(),
  finalPrice: SortOrderSchema.optional()
}).strict();
export const CartItemSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.CartItemSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.CartItemSumOrderByAggregateInput>;
export const CartItemSumOrderByAggregateInputObjectZodSchema = makeSchema();
