/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod'
import type { Prisma } from '@prisma/client'
import { QuoteSelectObjectSchema as QuoteSelectObjectSchema } from './QuoteSelect.schema'
import { QuoteIncludeObjectSchema as QuoteIncludeObjectSchema } from './QuoteInclude.schema'

const makeSchema = () =>
  z
    .object({
      select: z.lazy(() => QuoteSelectObjectSchema).optional(),
      include: z.lazy(() => QuoteIncludeObjectSchema).optional(),
    })
    .strict()
export const QuoteArgsObjectSchema = makeSchema()
export const QuoteArgsObjectZodSchema = makeSchema()
