import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { QuoteStatusSchema } from '../enums/QuoteStatus.schema'

export const QuoteCreateManyUserInputObjectSchema: z.ZodType<
  Prisma.QuoteCreateManyUserInput,
  Prisma.QuoteCreateManyUserInput
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
  })
  .strict()
export const QuoteCreateManyUserInputObjectZodSchema = z
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
  })
  .strict()
