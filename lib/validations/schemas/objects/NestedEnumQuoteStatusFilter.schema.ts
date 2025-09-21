import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { QuoteStatusSchema } from '../enums/QuoteStatus.schema'

const nestedenumquotestatusfilterSchema = z
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
export const NestedEnumQuoteStatusFilterObjectSchema: z.ZodType<Prisma.NestedEnumQuoteStatusFilter> =
  nestedenumquotestatusfilterSchema as unknown as z.ZodType<Prisma.NestedEnumQuoteStatusFilter>
export const NestedEnumQuoteStatusFilterObjectZodSchema =
  nestedenumquotestatusfilterSchema
