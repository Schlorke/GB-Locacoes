import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'

export const QuoteSumAggregateInputObjectSchema: z.ZodType<
  Prisma.QuoteSumAggregateInputType,
  Prisma.QuoteSumAggregateInputType
> = z
  .object({
    total: z.literal(true).optional(),
  })
  .strict()
export const QuoteSumAggregateInputObjectZodSchema = z
  .object({
    total: z.literal(true).optional(),
  })
  .strict()
