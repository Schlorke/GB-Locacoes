/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client'
import * as z from 'zod'
import { QuoteWhereInputObjectSchema as QuoteWhereInputObjectSchema } from './objects/QuoteWhereInput.schema'

export const QuoteDeleteManySchema: z.ZodType<Prisma.QuoteDeleteManyArgs> = z
  .object({ where: QuoteWhereInputObjectSchema.optional() })
  .strict() as unknown as z.ZodType<Prisma.QuoteDeleteManyArgs>

export const QuoteDeleteManyZodSchema = z
  .object({ where: QuoteWhereInputObjectSchema.optional() })
  .strict()
