import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { QuoteStatusSchema } from '../enums/QuoteStatus.schema'

const makeSchema = (): z.ZodObject<any> =>
  z
    .object({
      equals: QuoteStatusSchema.optional(),
      in: QuoteStatusSchema.array().optional(),
      notIn: QuoteStatusSchema.array().optional(),
      not: z.union([QuoteStatusSchema, z.lazy(makeSchema)]).optional(),
    })
    .strict()
export const NestedEnumQuoteStatusFilterObjectSchema: z.ZodType<Prisma.NestedEnumQuoteStatusFilter> =
  makeSchema() as unknown as z.ZodType<Prisma.NestedEnumQuoteStatusFilter>
export const NestedEnumQuoteStatusFilterObjectZodSchema = makeSchema()
