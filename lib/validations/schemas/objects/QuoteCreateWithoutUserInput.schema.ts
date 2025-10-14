/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod'
import type { Prisma } from '@prisma/client'
import { QuoteStatusSchema } from '../enums/QuoteStatus.schema'
import { QuoteItemCreateNestedManyWithoutQuoteInputObjectSchema as QuoteItemCreateNestedManyWithoutQuoteInputObjectSchema } from './QuoteItemCreateNestedManyWithoutQuoteInput.schema'

const makeSchema = () =>
  z
    .object({
      id: z.string().optional(),
      name: z.string(),
      email: z.string(),
      phone: z.string(),
      company: z.string().optional().nullable(),
      message: z.string().optional().nullable(),
      total: z.number().optional(),
      status: QuoteStatusSchema.optional(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      items: z
        .lazy(() => QuoteItemCreateNestedManyWithoutQuoteInputObjectSchema)
        .optional(),
    })
    .strict()
export const QuoteCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.QuoteCreateWithoutUserInput> =
  makeSchema() as unknown as z.ZodType<Prisma.QuoteCreateWithoutUserInput>
export const QuoteCreateWithoutUserInputObjectZodSchema = makeSchema()
