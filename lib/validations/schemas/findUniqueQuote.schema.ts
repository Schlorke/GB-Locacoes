import type { Prisma } from '@prisma/client'
import { z } from 'zod'
import { QuoteSelectObjectSchema } from './objects/QuoteSelect.schema'
import { QuoteIncludeObjectSchema } from './objects/QuoteInclude.schema'
import { QuoteWhereUniqueInputObjectSchema } from './objects/QuoteWhereUniqueInput.schema'

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
