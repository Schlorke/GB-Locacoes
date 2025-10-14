/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod'
import type { Prisma } from '@prisma/client'
import { QuoteWhereInputObjectSchema as QuoteWhereInputObjectSchema } from './QuoteWhereInput.schema'

const makeSchema = () =>
  z
    .object({
      every: z.lazy(() => QuoteWhereInputObjectSchema).optional(),
      some: z.lazy(() => QuoteWhereInputObjectSchema).optional(),
      none: z.lazy(() => QuoteWhereInputObjectSchema).optional(),
    })
    .strict()
export const QuoteListRelationFilterObjectSchema: z.ZodType<Prisma.QuoteListRelationFilter> =
  makeSchema() as unknown as z.ZodType<Prisma.QuoteListRelationFilter>
export const QuoteListRelationFilterObjectZodSchema = makeSchema()
