import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { SortOrderSchema } from '../enums/SortOrder.schema'

export const QuoteItemMaxOrderByAggregateInputObjectSchema: z.ZodType<
  Prisma.QuoteItemMaxOrderByAggregateInput,
  Prisma.QuoteItemMaxOrderByAggregateInput
> = z
  .object({
    id: SortOrderSchema.optional(),
    quoteId: SortOrderSchema.optional(),
    equipmentId: SortOrderSchema.optional(),
    quantity: SortOrderSchema.optional(),
    days: SortOrderSchema.optional(),
    pricePerDay: SortOrderSchema.optional(),
    total: SortOrderSchema.optional(),
    createdAt: SortOrderSchema.optional(),
    updatedAt: SortOrderSchema.optional(),
  })
  .strict()
export const QuoteItemMaxOrderByAggregateInputObjectZodSchema = z
  .object({
    id: SortOrderSchema.optional(),
    quoteId: SortOrderSchema.optional(),
    equipmentId: SortOrderSchema.optional(),
    quantity: SortOrderSchema.optional(),
    days: SortOrderSchema.optional(),
    pricePerDay: SortOrderSchema.optional(),
    total: SortOrderSchema.optional(),
    createdAt: SortOrderSchema.optional(),
    updatedAt: SortOrderSchema.optional(),
  })
  .strict()
