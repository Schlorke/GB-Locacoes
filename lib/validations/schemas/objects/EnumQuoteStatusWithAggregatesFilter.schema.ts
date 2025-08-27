import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { QuoteStatusSchema } from '../enums/QuoteStatus.schema'
import { NestedEnumQuoteStatusWithAggregatesFilterObjectSchema } from './NestedEnumQuoteStatusWithAggregatesFilter.schema'
import { NestedIntFilterObjectSchema } from './NestedIntFilter.schema'
import { NestedEnumQuoteStatusFilterObjectSchema } from './NestedEnumQuoteStatusFilter.schema'

const makeSchema = (): z.ZodObject<any> =>
  z
    .object({
      equals: QuoteStatusSchema.optional(),
      in: QuoteStatusSchema.array().optional(),
      notIn: QuoteStatusSchema.array().optional(),
      not: z
        .union([
          QuoteStatusSchema,
          z.lazy(() => NestedEnumQuoteStatusWithAggregatesFilterObjectSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
      _min: z.lazy(() => NestedEnumQuoteStatusFilterObjectSchema).optional(),
      _max: z.lazy(() => NestedEnumQuoteStatusFilterObjectSchema).optional(),
    })
    .strict()
export const EnumQuoteStatusWithAggregatesFilterObjectSchema: z.ZodType<Prisma.EnumQuoteStatusWithAggregatesFilter> =
  makeSchema() as unknown as z.ZodType<Prisma.EnumQuoteStatusWithAggregatesFilter>
export const EnumQuoteStatusWithAggregatesFilterObjectZodSchema = makeSchema()
