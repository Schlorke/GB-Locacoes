import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

export const AccountSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.AccountSumOrderByAggregateInput, Prisma.AccountSumOrderByAggregateInput> = z.object({
  expires_at: SortOrderSchema.optional()
}).strict();
export const AccountSumOrderByAggregateInputObjectZodSchema = z.object({
  expires_at: SortOrderSchema.optional()
}).strict();
