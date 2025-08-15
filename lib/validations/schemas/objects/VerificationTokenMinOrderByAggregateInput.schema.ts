import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

export const VerificationTokenMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.VerificationTokenMinOrderByAggregateInput, Prisma.VerificationTokenMinOrderByAggregateInput> = z.object({
  identifier: SortOrderSchema.optional(),
  token: SortOrderSchema.optional(),
  expires: SortOrderSchema.optional()
}).strict();
export const VerificationTokenMinOrderByAggregateInputObjectZodSchema = z.object({
  identifier: SortOrderSchema.optional(),
  token: SortOrderSchema.optional(),
  expires: SortOrderSchema.optional()
}).strict();
