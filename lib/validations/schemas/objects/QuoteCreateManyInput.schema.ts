import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { QuoteStatusSchema } from '../enums/QuoteStatus.schema'

export const QuoteCreateManyInputObjectSchema: z.ZodType<
  Prisma.QuoteCreateManyInput,
  Prisma.QuoteCreateManyInput
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
    userId: z.string().optional().nullable(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
  })
  .strict()
export const QuoteCreateManyInputObjectZodSchema = z
  .object({
    id: z.string().optional(),
    name: z.string(),
    email: z.string(),
    phone: z.string(),
    company: z.string().optional().nullable(),
    message: z.string().optional().nullable(),
    total: z.number().optional(),
    status: QuoteStatusSchema.optional(),
    userId: z.string().optional().nullable(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
  })
  .strict()
