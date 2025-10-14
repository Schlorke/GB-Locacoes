/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client'
import * as z from 'zod'
import { QuoteSelectObjectSchema as QuoteSelectObjectSchema } from './objects/QuoteSelect.schema'
import { QuoteIncludeObjectSchema as QuoteIncludeObjectSchema } from './objects/QuoteInclude.schema'
import { QuoteWhereUniqueInputObjectSchema as QuoteWhereUniqueInputObjectSchema } from './objects/QuoteWhereUniqueInput.schema'

export const QuoteFindUniqueSchema: z.ZodType<Prisma.QuoteFindUniqueArgs> = z
  .object({
    select: QuoteSelectObjectSchema.optional(),
    include: QuoteIncludeObjectSchema.optional(),
    where: QuoteWhereUniqueInputObjectSchema,
  })
  .strict() as unknown as z.ZodType<Prisma.QuoteFindUniqueArgs>

export const QuoteFindUniqueZodSchema = z
  .object({
    select: QuoteSelectObjectSchema.optional(),
    include: QuoteIncludeObjectSchema.optional(),
    where: QuoteWhereUniqueInputObjectSchema,
  })
  .strict()
