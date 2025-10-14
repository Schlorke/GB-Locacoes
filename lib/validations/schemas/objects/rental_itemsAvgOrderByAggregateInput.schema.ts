/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod'
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
export const rental_itemsAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.rental_itemsAvgOrderByAggregateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.rental_itemsAvgOrderByAggregateInput>
export const rental_itemsAvgOrderByAggregateInputObjectZodSchema = makeSchema()
