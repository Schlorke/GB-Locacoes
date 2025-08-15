import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { SortOrderSchema } from '../enums/SortOrder.schema'

export const rental_itemsMaxOrderByAggregateInputObjectSchema: z.ZodType<
  Prisma.rental_itemsMaxOrderByAggregateInput,
  Prisma.rental_itemsMaxOrderByAggregateInput
> = z
  .object({
    id: SortOrderSchema.optional(),
    rentalid: SortOrderSchema.optional(),
    equipmentid: SortOrderSchema.optional(),
    quantity: SortOrderSchema.optional(),
    priceperday: SortOrderSchema.optional(),
    totaldays: SortOrderSchema.optional(),
    totalprice: SortOrderSchema.optional(),
    createdat: SortOrderSchema.optional(),
    updatedat: SortOrderSchema.optional(),
  })
  .strict()
export const rental_itemsMaxOrderByAggregateInputObjectZodSchema = z
  .object({
    id: SortOrderSchema.optional(),
    rentalid: SortOrderSchema.optional(),
    equipmentid: SortOrderSchema.optional(),
    quantity: SortOrderSchema.optional(),
    priceperday: SortOrderSchema.optional(),
    totaldays: SortOrderSchema.optional(),
    totalprice: SortOrderSchema.optional(),
    createdat: SortOrderSchema.optional(),
    updatedat: SortOrderSchema.optional(),
  })
  .strict()
