import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { QuoteItemSelectObjectSchema } from './QuoteItemSelect.schema'
import { QuoteItemIncludeObjectSchema } from './QuoteItemInclude.schema'

const makeSchema = (): z.ZodObject<any> =>
  z
    .object({
      select: z.lazy(() => QuoteItemSelectObjectSchema).optional(),
      include: z.lazy(() => QuoteItemIncludeObjectSchema).optional(),
    })
    .strict()
export const QuoteItemArgsObjectSchema = makeSchema()
export const QuoteItemArgsObjectZodSchema = makeSchema()
