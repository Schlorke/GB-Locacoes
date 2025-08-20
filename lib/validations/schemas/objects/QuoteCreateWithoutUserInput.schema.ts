import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { QuoteStatusSchema } from '../enums/QuoteStatus.schema'
import { QuoteItemCreateNestedManyWithoutQuoteInputObjectSchema } from './QuoteItemCreateNestedManyWithoutQuoteInput.schema'

export const QuoteCreateWithoutUserInputObjectSchema: z.ZodType<
  Prisma.QuoteCreateWithoutUserInput,
  Prisma.QuoteCreateWithoutUserInput
> = z
  .object({
    id: z.string().optional(),
    name: z.string(),
    email: z.string(),
    phone: z.string(),
    company: z.string().optional().nullable(),
    message: z.string().optional().nullable(),
    total: z.number().optional(),
    status: QuoteStatusSchema.optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    items: z
      .lazy(() => QuoteItemCreateNestedManyWithoutQuoteInputObjectSchema)
      .optional(),
  })
  .strict()
export const QuoteCreateWithoutUserInputObjectZodSchema = z
  .object({
    id: z.string().optional(),
    name: z.string(),
    email: z.string(),
    phone: z.string(),
    company: z.string().optional().nullable(),
    message: z.string().optional().nullable(),
    total: z.number().optional(),
    status: QuoteStatusSchema.optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    items: z
      .lazy(() => QuoteItemCreateNestedManyWithoutQuoteInputObjectSchema)
      .optional(),
  })
  .strict()
