/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client'
import * as z from 'zod'
import { QuoteItemUpdateManyMutationInputObjectSchema as QuoteItemUpdateManyMutationInputObjectSchema } from './objects/QuoteItemUpdateManyMutationInput.schema'
import { QuoteItemWhereInputObjectSchema as QuoteItemWhereInputObjectSchema } from './objects/QuoteItemWhereInput.schema'

export const QuoteItemUpdateManySchema: z.ZodType<Prisma.QuoteItemUpdateManyArgs> =
  z
    .object({
      data: QuoteItemUpdateManyMutationInputObjectSchema,
      where: QuoteItemWhereInputObjectSchema.optional(),
    })
    .strict() as unknown as z.ZodType<Prisma.QuoteItemUpdateManyArgs>

export const QuoteItemUpdateManyZodSchema = z
  .object({
    data: QuoteItemUpdateManyMutationInputObjectSchema,
    where: QuoteItemWhereInputObjectSchema.optional(),
  })
  .strict()
