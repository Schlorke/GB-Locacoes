import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'

export const QuoteItemWhereUniqueInputObjectSchema: z.ZodType<
  Prisma.QuoteItemWhereUniqueInput,
  Prisma.QuoteItemWhereUniqueInput
> = z
  .object({
    id: z.string(),
  })
  .strict()
export const QuoteItemWhereUniqueInputObjectZodSchema = z
  .object({
    id: z.string(),
  })
  .strict()
