import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { QuoteCountOutputTypeSelectObjectSchema } from './QuoteCountOutputTypeSelect.schema'

export const QuoteCountOutputTypeArgsObjectSchema = z
  .object({
    select: z.lazy(() => QuoteCountOutputTypeSelectObjectSchema).optional(),
  })
  .strict()
export const QuoteCountOutputTypeArgsObjectZodSchema = z
  .object({
    select: z.lazy(() => QuoteCountOutputTypeSelectObjectSchema).optional(),
  })
  .strict()
