import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { QuoteStatusSchema } from '../enums/QuoteStatus.schema'
import { NestedEnumQuoteStatusFilterObjectSchema } from './NestedEnumQuoteStatusFilter.schema'

export const EnumQuoteStatusFilterObjectSchema: z.ZodType<
  Prisma.EnumQuoteStatusFilter,
  Prisma.EnumQuoteStatusFilter
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
export const EnumQuoteStatusFilterObjectZodSchema = z
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
