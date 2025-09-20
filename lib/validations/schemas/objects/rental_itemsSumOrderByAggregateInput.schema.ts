import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () =>
  z
    .object({
      quantity: SortOrderSchema.optional(),
      priceperday: SortOrderSchema.optional(),
      totaldays: SortOrderSchema.optional(),
      totalprice: SortOrderSchema.optional(),
    })
    .strict()
export const rental_itemsSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.rental_itemsSumOrderByAggregateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.rental_itemsSumOrderByAggregateInput>
export const rental_itemsSumOrderByAggregateInputObjectZodSchema = makeSchema()
