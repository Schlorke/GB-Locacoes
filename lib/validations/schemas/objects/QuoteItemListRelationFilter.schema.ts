/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod'
import type { Prisma } from '@prisma/client'
import { QuoteItemWhereInputObjectSchema as QuoteItemWhereInputObjectSchema } from './QuoteItemWhereInput.schema'

const makeSchema = () =>
  z
    .object({
      every: z.lazy(() => QuoteItemWhereInputObjectSchema).optional(),
      some: z.lazy(() => QuoteItemWhereInputObjectSchema).optional(),
      none: z.lazy(() => QuoteItemWhereInputObjectSchema).optional(),
    })
    .strict()
export const QuoteItemListRelationFilterObjectSchema: z.ZodType<Prisma.QuoteItemListRelationFilter> =
  makeSchema() as unknown as z.ZodType<Prisma.QuoteItemListRelationFilter>
export const QuoteItemListRelationFilterObjectZodSchema = makeSchema()
