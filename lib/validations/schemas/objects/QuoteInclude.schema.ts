import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { QuoteItemFindManySchema } from '../findManyQuoteItem.schema'
import { UserArgsObjectSchema } from './UserArgs.schema'
import { QuoteCountOutputTypeArgsObjectSchema } from './QuoteCountOutputTypeArgs.schema'

export const QuoteIncludeObjectSchema: z.ZodType<
  Prisma.QuoteInclude,
  Prisma.QuoteInclude
> = z
  .object({
    items: z
      .union([z.boolean(), z.lazy(() => QuoteItemFindManySchema)])
      .optional(),
    user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => QuoteCountOutputTypeArgsObjectSchema)])
      .optional(),
  })
  .strict()
export const QuoteIncludeObjectZodSchema = z
  .object({
    items: z
      .union([z.boolean(), z.lazy(() => QuoteItemFindManySchema)])
      .optional(),
    user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => QuoteCountOutputTypeArgsObjectSchema)])
      .optional(),
  })
  .strict()
