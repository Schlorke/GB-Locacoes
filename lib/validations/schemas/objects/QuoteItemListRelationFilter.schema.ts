import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { QuoteItemWhereInputObjectSchema } from './QuoteItemWhereInput.schema'

export const QuoteItemListRelationFilterObjectSchema: z.ZodType<
  Prisma.QuoteItemListRelationFilter,
  Prisma.QuoteItemListRelationFilter
> = z
  .object({
    every: z.lazy(() => QuoteItemWhereInputObjectSchema).optional(),
    some: z.lazy(() => QuoteItemWhereInputObjectSchema).optional(),
    none: z.lazy(() => QuoteItemWhereInputObjectSchema).optional(),
  })
  .strict()
export const QuoteItemListRelationFilterObjectZodSchema = z
  .object({
    every: z.lazy(() => QuoteItemWhereInputObjectSchema).optional(),
    some: z.lazy(() => QuoteItemWhereInputObjectSchema).optional(),
    none: z.lazy(() => QuoteItemWhereInputObjectSchema).optional(),
  })
  .strict()
