/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client'
import * as z from 'zod'
import { QuoteSelectObjectSchema as QuoteSelectObjectSchema } from './objects/QuoteSelect.schema'
import { QuoteIncludeObjectSchema as QuoteIncludeObjectSchema } from './objects/QuoteInclude.schema'
import { QuoteUpdateInputObjectSchema as QuoteUpdateInputObjectSchema } from './objects/QuoteUpdateInput.schema'
import { QuoteUncheckedUpdateInputObjectSchema as QuoteUncheckedUpdateInputObjectSchema } from './objects/QuoteUncheckedUpdateInput.schema'
import { QuoteWhereUniqueInputObjectSchema as QuoteWhereUniqueInputObjectSchema } from './objects/QuoteWhereUniqueInput.schema'

export const QuoteUpdateOneSchema: z.ZodType<Prisma.QuoteUpdateArgs> = z
  .object({
    select: QuoteSelectObjectSchema.optional(),
    include: QuoteIncludeObjectSchema.optional(),
    data: z.union([
      QuoteUpdateInputObjectSchema,
      QuoteUncheckedUpdateInputObjectSchema,
    ]),
    where: QuoteWhereUniqueInputObjectSchema,
  })
  .strict() as unknown as z.ZodType<Prisma.QuoteUpdateArgs>

export const QuoteUpdateOneZodSchema = z
  .object({
    select: QuoteSelectObjectSchema.optional(),
    include: QuoteIncludeObjectSchema.optional(),
    data: z.union([
      QuoteUpdateInputObjectSchema,
      QuoteUncheckedUpdateInputObjectSchema,
    ]),
    where: QuoteWhereUniqueInputObjectSchema,
  })
  .strict()
