/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client'
import * as z from 'zod'
import { QuoteItemSelectObjectSchema as QuoteItemSelectObjectSchema } from './objects/QuoteItemSelect.schema'
import { QuoteItemIncludeObjectSchema as QuoteItemIncludeObjectSchema } from './objects/QuoteItemInclude.schema'
import { QuoteItemWhereUniqueInputObjectSchema as QuoteItemWhereUniqueInputObjectSchema } from './objects/QuoteItemWhereUniqueInput.schema'

export const QuoteItemDeleteOneSchema: z.ZodType<Prisma.QuoteItemDeleteArgs> = z
  .object({
    select: QuoteItemSelectObjectSchema.optional(),
    include: QuoteItemIncludeObjectSchema.optional(),
    where: QuoteItemWhereUniqueInputObjectSchema,
  })
  .strict() as unknown as z.ZodType<Prisma.QuoteItemDeleteArgs>

export const QuoteItemDeleteOneZodSchema = z
  .object({
    select: QuoteItemSelectObjectSchema.optional(),
    include: QuoteItemIncludeObjectSchema.optional(),
    where: QuoteItemWhereUniqueInputObjectSchema,
  })
  .strict()
