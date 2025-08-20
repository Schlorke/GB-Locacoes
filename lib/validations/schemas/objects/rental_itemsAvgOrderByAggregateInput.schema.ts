import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { SortOrderSchema } from '../enums/SortOrder.schema'

export const rental_itemsAvgOrderByAggregateInputObjectSchema: z.ZodType<
  Prisma.rental_itemsAvgOrderByAggregateInput,
  Prisma.rental_itemsAvgOrderByAggregateInput
> = z
  .object({
    quantity: SortOrderSchema.optional(),
    priceperday: SortOrderSchema.optional(),
    totaldays: SortOrderSchema.optional(),
    totalprice: SortOrderSchema.optional(),
  })
  .strict()
export const rental_itemsAvgOrderByAggregateInputObjectZodSchema = z
  .object({
    quantity: SortOrderSchema.optional(),
    priceperday: SortOrderSchema.optional(),
    totaldays: SortOrderSchema.optional(),
    totalprice: SortOrderSchema.optional(),
  })
  .strict()
