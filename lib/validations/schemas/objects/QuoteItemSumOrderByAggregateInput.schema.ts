import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { SortOrderSchema } from '../enums/SortOrder.schema'

export const QuoteItemSumOrderByAggregateInputObjectSchema: z.ZodType<
  Prisma.QuoteItemSumOrderByAggregateInput,
  Prisma.QuoteItemSumOrderByAggregateInput
> = z
  .object({
    quantity: SortOrderSchema.optional(),
    days: SortOrderSchema.optional(),
    pricePerDay: SortOrderSchema.optional(),
    total: SortOrderSchema.optional(),
  })
  .strict()
export const QuoteItemSumOrderByAggregateInputObjectZodSchema = z
  .object({
    quantity: SortOrderSchema.optional(),
    days: SortOrderSchema.optional(),
    pricePerDay: SortOrderSchema.optional(),
    total: SortOrderSchema.optional(),
  })
  .strict()
