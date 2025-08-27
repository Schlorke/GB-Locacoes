import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { QuoteWhereInputObjectSchema } from './QuoteWhereInput.schema'

const makeSchema = (): z.ZodObject<any> =>
  z
    .object({
      is: z.lazy(() => QuoteWhereInputObjectSchema).optional(),
      isNot: z.lazy(() => QuoteWhereInputObjectSchema).optional(),
    })
    .strict()
export const QuoteScalarRelationFilterObjectSchema: z.ZodType<Prisma.QuoteScalarRelationFilter> =
  makeSchema() as unknown as z.ZodType<Prisma.QuoteScalarRelationFilter>
export const QuoteScalarRelationFilterObjectZodSchema = makeSchema()
