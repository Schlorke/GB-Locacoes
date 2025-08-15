import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { QuoteWhereInputObjectSchema } from './QuoteWhereInput.schema'

export const QuoteScalarRelationFilterObjectSchema: z.ZodType<
  Prisma.QuoteScalarRelationFilter,
  Prisma.QuoteScalarRelationFilter
> = z
  .object({
    is: z.lazy(() => QuoteWhereInputObjectSchema).optional(),
    isNot: z.lazy(() => QuoteWhereInputObjectSchema).optional(),
  })
  .strict()
export const QuoteScalarRelationFilterObjectZodSchema = z
  .object({
    is: z.lazy(() => QuoteWhereInputObjectSchema).optional(),
    isNot: z.lazy(() => QuoteWhereInputObjectSchema).optional(),
  })
  .strict()
