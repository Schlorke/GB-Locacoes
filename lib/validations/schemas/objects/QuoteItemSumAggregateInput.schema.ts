import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'

export const QuoteItemSumAggregateInputObjectSchema: z.ZodType<
  Prisma.QuoteItemSumAggregateInputType,
  Prisma.QuoteItemSumAggregateInputType
> = z
  .object({
    quantity: z.literal(true).optional(),
    days: z.literal(true).optional(),
    pricePerDay: z.literal(true).optional(),
    total: z.literal(true).optional(),
  })
  .strict()
export const QuoteItemSumAggregateInputObjectZodSchema = z
  .object({
    quantity: z.literal(true).optional(),
    days: z.literal(true).optional(),
    pricePerDay: z.literal(true).optional(),
    total: z.literal(true).optional(),
  })
  .strict()
