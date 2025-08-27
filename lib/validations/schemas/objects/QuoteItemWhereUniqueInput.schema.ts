import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'

const makeSchema = (): z.ZodObject<any> =>
  z
    .object({
      id: z.string(),
    })
    .strict()
export const QuoteItemWhereUniqueInputObjectSchema: z.ZodType<Prisma.QuoteItemWhereUniqueInput> =
  makeSchema() as unknown as z.ZodType<Prisma.QuoteItemWhereUniqueInput>
export const QuoteItemWhereUniqueInputObjectZodSchema = makeSchema()
