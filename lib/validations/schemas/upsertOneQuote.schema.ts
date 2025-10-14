/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client'
import * as z from 'zod'
import { QuoteSelectObjectSchema as QuoteSelectObjectSchema } from './objects/QuoteSelect.schema'
import { QuoteIncludeObjectSchema as QuoteIncludeObjectSchema } from './objects/QuoteInclude.schema'
import { QuoteWhereUniqueInputObjectSchema as QuoteWhereUniqueInputObjectSchema } from './objects/QuoteWhereUniqueInput.schema'
import { QuoteCreateInputObjectSchema as QuoteCreateInputObjectSchema } from './objects/QuoteCreateInput.schema'
import { QuoteUncheckedCreateInputObjectSchema as QuoteUncheckedCreateInputObjectSchema } from './objects/QuoteUncheckedCreateInput.schema'
import { QuoteUpdateInputObjectSchema as QuoteUpdateInputObjectSchema } from './objects/QuoteUpdateInput.schema'
import { QuoteUncheckedUpdateInputObjectSchema as QuoteUncheckedUpdateInputObjectSchema } from './objects/QuoteUncheckedUpdateInput.schema'

export const QuoteUpsertOneSchema: z.ZodType<Prisma.QuoteUpsertArgs> = z
  .object({
    select: QuoteSelectObjectSchema.optional(),
    include: QuoteIncludeObjectSchema.optional(),
    where: QuoteWhereUniqueInputObjectSchema,
    create: z.union([
      QuoteCreateInputObjectSchema,
      QuoteUncheckedCreateInputObjectSchema,
    ]),
    update: z.union([
      QuoteUpdateInputObjectSchema,
      QuoteUncheckedUpdateInputObjectSchema,
    ]),
  })
  .strict() as unknown as z.ZodType<Prisma.QuoteUpsertArgs>

export const QuoteUpsertOneZodSchema = z
  .object({
    select: QuoteSelectObjectSchema.optional(),
    include: QuoteIncludeObjectSchema.optional(),
    where: QuoteWhereUniqueInputObjectSchema,
    create: z.union([
      QuoteCreateInputObjectSchema,
      QuoteUncheckedCreateInputObjectSchema,
    ]),
    update: z.union([
      QuoteUpdateInputObjectSchema,
      QuoteUncheckedUpdateInputObjectSchema,
    ]),
  })
  .strict()
