import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { SortOrderSchema } from '../enums/SortOrder.schema'

export const VerificationTokenCountOrderByAggregateInputObjectSchema: z.ZodType<
  Prisma.VerificationTokenCountOrderByAggregateInput,
  Prisma.VerificationTokenCountOrderByAggregateInput
> = z
  .object({
    identifier: SortOrderSchema.optional(),
    token: SortOrderSchema.optional(),
    expires: SortOrderSchema.optional(),
  })
  .strict()
export const VerificationTokenCountOrderByAggregateInputObjectZodSchema = z
  .object({
    identifier: SortOrderSchema.optional(),
    token: SortOrderSchema.optional(),
    expires: SortOrderSchema.optional(),
  })
  .strict()
