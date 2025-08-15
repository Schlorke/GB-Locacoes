import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { SortOrderSchema } from '../enums/SortOrder.schema'

export const QuoteItemOrderByRelationAggregateInputObjectSchema: z.ZodType<
  Prisma.QuoteItemOrderByRelationAggregateInput,
  Prisma.QuoteItemOrderByRelationAggregateInput
> = z
  .object({
    _count: SortOrderSchema.optional(),
  })
  .strict()
export const QuoteItemOrderByRelationAggregateInputObjectZodSchema = z
  .object({
    _count: SortOrderSchema.optional(),
  })
  .strict()
