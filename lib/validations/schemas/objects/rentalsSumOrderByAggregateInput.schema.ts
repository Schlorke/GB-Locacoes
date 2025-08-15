import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

export const rentalsSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.rentalsSumOrderByAggregateInput, Prisma.rentalsSumOrderByAggregateInput> = z.object({
  total: SortOrderSchema.optional()
}).strict();
export const rentalsSumOrderByAggregateInputObjectZodSchema = z.object({
  total: SortOrderSchema.optional()
}).strict();
