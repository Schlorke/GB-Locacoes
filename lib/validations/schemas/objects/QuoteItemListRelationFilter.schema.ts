import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { QuoteItemWhereInputObjectSchema } from './QuoteItemWhereInput.schema'

const makeSchema = (): z.ZodObject<any> =>
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
