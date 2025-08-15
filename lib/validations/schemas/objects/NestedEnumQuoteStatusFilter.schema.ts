import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { QuoteStatusSchema } from '../enums/QuoteStatus.schema'

export const NestedEnumQuoteStatusFilterObjectSchema: z.ZodType<
  Prisma.NestedEnumQuoteStatusFilter,
  Prisma.NestedEnumQuoteStatusFilter
> = z
  .object({
    equals: QuoteStatusSchema.optional(),
    in: QuoteStatusSchema.array().optional(),
    notIn: QuoteStatusSchema.array().optional(),
    not: z
      .union([
        QuoteStatusSchema,
        z.lazy(() => NestedEnumQuoteStatusFilterObjectSchema),
      ])
      .optional(),
  })
  .strict()
export const NestedEnumQuoteStatusFilterObjectZodSchema = z
  .object({
    equals: QuoteStatusSchema.optional(),
    in: QuoteStatusSchema.array().optional(),
    notIn: QuoteStatusSchema.array().optional(),
    not: z
      .union([
        QuoteStatusSchema,
        z.lazy(() => NestedEnumQuoteStatusFilterObjectSchema),
      ])
      .optional(),
  })
  .strict()
