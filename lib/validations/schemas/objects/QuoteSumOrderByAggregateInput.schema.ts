import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { SortOrderSchema } from '../enums/SortOrder.schema'

export const QuoteSumOrderByAggregateInputObjectSchema: z.ZodType<
  Prisma.QuoteSumOrderByAggregateInput,
  Prisma.QuoteSumOrderByAggregateInput
> = z
  .object({
    total: SortOrderSchema.optional(),
  })
  .strict()
export const QuoteSumOrderByAggregateInputObjectZodSchema = z
  .object({
    total: SortOrderSchema.optional(),
  })
  .strict()
