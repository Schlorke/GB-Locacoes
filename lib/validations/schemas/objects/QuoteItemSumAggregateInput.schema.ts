import { z } from 'zod'
import type { Prisma } from '@prisma/client'

const makeSchema = () =>
  z
    .object({
      quantity: z.literal(true).optional(),
      days: z.literal(true).optional(),
      pricePerDay: z.literal(true).optional(),
      total: z.literal(true).optional(),
    })
    .strict()
export const QuoteItemSumAggregateInputObjectSchema: z.ZodType<Prisma.QuoteItemSumAggregateInputType> =
  makeSchema() as unknown as z.ZodType<Prisma.QuoteItemSumAggregateInputType>
export const QuoteItemSumAggregateInputObjectZodSchema = makeSchema()
