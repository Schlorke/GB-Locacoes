/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client'
import * as z from 'zod'
import { QuoteItemSelectObjectSchema as QuoteItemSelectObjectSchema } from './objects/QuoteItemSelect.schema'
import { QuoteItemCreateManyInputObjectSchema as QuoteItemCreateManyInputObjectSchema } from './objects/QuoteItemCreateManyInput.schema'

export const QuoteItemCreateManyAndReturnSchema: z.ZodType<Prisma.QuoteItemCreateManyAndReturnArgs> =
  z
    .object({
      select: QuoteItemSelectObjectSchema.optional(),
      data: z.union([
        QuoteItemCreateManyInputObjectSchema,
        z.array(QuoteItemCreateManyInputObjectSchema),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.QuoteItemCreateManyAndReturnArgs>

export const QuoteItemCreateManyAndReturnZodSchema = z
  .object({
    select: QuoteItemSelectObjectSchema.optional(),
    data: z.union([
      QuoteItemCreateManyInputObjectSchema,
      z.array(QuoteItemCreateManyInputObjectSchema),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict()
