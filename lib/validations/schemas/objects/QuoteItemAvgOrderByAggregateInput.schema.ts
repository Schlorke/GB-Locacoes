import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { SortOrderSchema } from '../enums/SortOrder.schema'

export const QuoteItemAvgOrderByAggregateInputObjectSchema: z.ZodType<
  Prisma.QuoteItemAvgOrderByAggregateInput,
  Prisma.QuoteItemAvgOrderByAggregateInput
> = z
  .object({
    quantity: SortOrderSchema.optional(),
    days: SortOrderSchema.optional(),
    pricePerDay: SortOrderSchema.optional(),
    total: SortOrderSchema.optional(),
  })
  .strict()
export const QuoteItemAvgOrderByAggregateInputObjectZodSchema = z
  .object({
    quantity: SortOrderSchema.optional(),
    days: SortOrderSchema.optional(),
    pricePerDay: SortOrderSchema.optional(),
    total: SortOrderSchema.optional(),
  })
  .strict()
