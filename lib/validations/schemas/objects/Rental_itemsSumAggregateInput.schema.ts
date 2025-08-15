import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'

export const Rental_itemsSumAggregateInputObjectSchema: z.ZodType<
  Prisma.Rental_itemsSumAggregateInputType,
  Prisma.Rental_itemsSumAggregateInputType
> = z
  .object({
    quantity: z.literal(true).optional(),
    priceperday: z.literal(true).optional(),
    totaldays: z.literal(true).optional(),
    totalprice: z.literal(true).optional(),
  })
  .strict()
export const Rental_itemsSumAggregateInputObjectZodSchema = z
  .object({
    quantity: z.literal(true).optional(),
    priceperday: z.literal(true).optional(),
    totaldays: z.literal(true).optional(),
    totalprice: z.literal(true).optional(),
  })
  .strict()
