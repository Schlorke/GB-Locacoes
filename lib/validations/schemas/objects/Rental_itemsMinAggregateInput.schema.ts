import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'

export const Rental_itemsMinAggregateInputObjectSchema: z.ZodType<
  Prisma.Rental_itemsMinAggregateInputType,
  Prisma.Rental_itemsMinAggregateInputType
> = z
  .object({
    id: z.literal(true).optional(),
    rentalid: z.literal(true).optional(),
    equipmentid: z.literal(true).optional(),
    quantity: z.literal(true).optional(),
    priceperday: z.literal(true).optional(),
    totaldays: z.literal(true).optional(),
    totalprice: z.literal(true).optional(),
    createdat: z.literal(true).optional(),
    updatedat: z.literal(true).optional(),
  })
  .strict()
export const Rental_itemsMinAggregateInputObjectZodSchema = z
  .object({
    id: z.literal(true).optional(),
    rentalid: z.literal(true).optional(),
    equipmentid: z.literal(true).optional(),
    quantity: z.literal(true).optional(),
    priceperday: z.literal(true).optional(),
    totaldays: z.literal(true).optional(),
    totalprice: z.literal(true).optional(),
    createdat: z.literal(true).optional(),
    updatedat: z.literal(true).optional(),
  })
  .strict()
