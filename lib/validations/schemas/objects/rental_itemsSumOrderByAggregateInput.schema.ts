import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { SortOrderSchema } from '../enums/SortOrder.schema'

export const rental_itemsSumOrderByAggregateInputObjectSchema: z.ZodType<
  Prisma.rental_itemsSumOrderByAggregateInput,
  Prisma.rental_itemsSumOrderByAggregateInput
> = z
  .object({
    quantity: SortOrderSchema.optional(),
    priceperday: SortOrderSchema.optional(),
    totaldays: SortOrderSchema.optional(),
    totalprice: SortOrderSchema.optional(),
  })
  .strict()
export const rental_itemsSumOrderByAggregateInputObjectZodSchema = z
  .object({
    quantity: SortOrderSchema.optional(),
    priceperday: SortOrderSchema.optional(),
    totaldays: SortOrderSchema.optional(),
    totalprice: SortOrderSchema.optional(),
  })
  .strict()
