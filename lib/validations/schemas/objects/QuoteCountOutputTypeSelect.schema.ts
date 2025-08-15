import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'

export const QuoteCountOutputTypeSelectObjectSchema: z.ZodType<
  Prisma.QuoteCountOutputTypeSelect,
  Prisma.QuoteCountOutputTypeSelect
> = z
  .object({
    items: z.boolean().optional(),
  })
  .strict()
export const QuoteCountOutputTypeSelectObjectZodSchema = z
  .object({
    items: z.boolean().optional(),
  })
  .strict()
