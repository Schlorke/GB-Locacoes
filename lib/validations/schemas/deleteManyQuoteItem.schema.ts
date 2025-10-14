/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client'
import * as z from 'zod'
import { QuoteItemWhereInputObjectSchema as QuoteItemWhereInputObjectSchema } from './objects/QuoteItemWhereInput.schema'

export const QuoteItemDeleteManySchema: z.ZodType<Prisma.QuoteItemDeleteManyArgs> =
  z
    .object({ where: QuoteItemWhereInputObjectSchema.optional() })
    .strict() as unknown as z.ZodType<Prisma.QuoteItemDeleteManyArgs>

export const QuoteItemDeleteManyZodSchema = z
  .object({ where: QuoteItemWhereInputObjectSchema.optional() })
  .strict()
