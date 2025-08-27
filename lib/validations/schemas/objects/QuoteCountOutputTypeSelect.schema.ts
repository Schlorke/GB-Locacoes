import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'

const makeSchema = (): z.ZodObject<any> =>
  z
    .object({
      items: z.boolean().optional(),
    })
    .strict()
export const QuoteCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.QuoteCountOutputTypeSelect> =
  makeSchema() as unknown as z.ZodType<Prisma.QuoteCountOutputTypeSelect>
export const QuoteCountOutputTypeSelectObjectZodSchema = makeSchema()
