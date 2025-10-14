/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod'
import type { Prisma } from '@prisma/client'

const makeSchema = () =>
  z
    .object({
      quantity: z.literal(true).optional(),
      priceperday: z.literal(true).optional(),
      totaldays: z.literal(true).optional(),
      totalprice: z.literal(true).optional(),
    })
    .strict()
export const Rental_itemsAvgAggregateInputObjectSchema: z.ZodType<Prisma.Rental_itemsAvgAggregateInputType> =
  makeSchema() as unknown as z.ZodType<Prisma.Rental_itemsAvgAggregateInputType>
export const Rental_itemsAvgAggregateInputObjectZodSchema = makeSchema()
