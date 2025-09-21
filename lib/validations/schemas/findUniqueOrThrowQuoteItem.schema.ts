import type { Prisma } from '@prisma/client'
import { z } from 'zod'
import { QuoteItemSelectObjectSchema } from './objects/QuoteItemSelect.schema'
import { QuoteItemIncludeObjectSchema } from './objects/QuoteItemInclude.schema'
import { QuoteItemWhereUniqueInputObjectSchema } from './objects/QuoteItemWhereUniqueInput.schema'

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
