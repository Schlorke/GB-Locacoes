/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client'
import * as z from 'zod'
import { QuoteItemSelectObjectSchema as QuoteItemSelectObjectSchema } from './objects/QuoteItemSelect.schema'
import { QuoteItemIncludeObjectSchema as QuoteItemIncludeObjectSchema } from './objects/QuoteItemInclude.schema'
import { QuoteItemWhereUniqueInputObjectSchema as QuoteItemWhereUniqueInputObjectSchema } from './objects/QuoteItemWhereUniqueInput.schema'

export const QuoteItemFindUniqueOrThrowSchema: z.ZodType<Prisma.QuoteItemFindUniqueOrThrowArgs> =
  z
    .object({
      select: QuoteItemSelectObjectSchema.optional(),
      include: QuoteItemIncludeObjectSchema.optional(),
      where: QuoteItemWhereUniqueInputObjectSchema,
    })
    .strict() as unknown as z.ZodType<Prisma.QuoteItemFindUniqueOrThrowArgs>

export const QuoteItemFindUniqueOrThrowZodSchema = z
  .object({
    select: QuoteItemSelectObjectSchema.optional(),
    include: QuoteItemIncludeObjectSchema.optional(),
    where: QuoteItemWhereUniqueInputObjectSchema,
  })
  .strict()
