import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { QuoteItemFindManySchema } from '../findManyQuoteItem.schema'
import { UserArgsObjectSchema } from './UserArgs.schema'
import { QuoteCountOutputTypeArgsObjectSchema } from './QuoteCountOutputTypeArgs.schema'

const makeSchema = () =>
  z
    .object({
      items: z
        .union([z.boolean(), z.lazy(() => QuoteItemFindManySchema)])
        .optional(),
      user: z
        .union([z.boolean(), z.lazy(() => UserArgsObjectSchema)])
        .optional(),
      _count: z
        .union([
          z.boolean(),
          z.lazy(() => QuoteCountOutputTypeArgsObjectSchema),
        ])
        .optional(),
    })
    .strict()
export const QuoteIncludeObjectSchema: z.ZodType<Prisma.QuoteInclude> =
  makeSchema() as unknown as z.ZodType<Prisma.QuoteInclude>
export const QuoteIncludeObjectZodSchema = makeSchema()
