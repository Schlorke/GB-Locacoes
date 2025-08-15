import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'

export const QuoteItemAvgAggregateInputObjectSchema: z.ZodType<
  Prisma.QuoteItemAvgAggregateInputType,
  Prisma.QuoteItemAvgAggregateInputType
> = z
  .object({
    quantity: z.literal(true).optional(),
    days: z.literal(true).optional(),
    pricePerDay: z.literal(true).optional(),
    total: z.literal(true).optional(),
  })
  .strict()
export const QuoteItemAvgAggregateInputObjectZodSchema = z
  .object({
    quantity: z.literal(true).optional(),
    days: z.literal(true).optional(),
    pricePerDay: z.literal(true).optional(),
    total: z.literal(true).optional(),
  })
  .strict()
