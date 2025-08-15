import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

export const AccountAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.AccountAvgOrderByAggregateInput, Prisma.AccountAvgOrderByAggregateInput> = z.object({
  expires_at: SortOrderSchema.optional()
}).strict();
export const AccountAvgOrderByAggregateInputObjectZodSchema = z.object({
  expires_at: SortOrderSchema.optional()
}).strict();
