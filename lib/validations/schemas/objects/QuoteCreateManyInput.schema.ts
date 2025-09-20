import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { QuoteStatusSchema } from '../enums/QuoteStatus.schema'

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
      userId: z.string().optional().nullable(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict()
export const QuoteCreateManyInputObjectSchema: z.ZodType<Prisma.QuoteCreateManyInput> =
  makeSchema() as unknown as z.ZodType<Prisma.QuoteCreateManyInput>
export const QuoteCreateManyInputObjectZodSchema = makeSchema()
