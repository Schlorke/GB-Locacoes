import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { SortOrderSchema } from '../enums/SortOrder.schema'

export const QuoteAvgOrderByAggregateInputObjectSchema: z.ZodType<
  Prisma.QuoteAvgOrderByAggregateInput,
  Prisma.QuoteAvgOrderByAggregateInput
> = z
  .object({
    total: SortOrderSchema.optional(),
  })
  .strict()
export const QuoteAvgOrderByAggregateInputObjectZodSchema = z
  .object({
    total: SortOrderSchema.optional(),
  })
  .strict()
