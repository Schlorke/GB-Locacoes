import { z } from 'zod'
import type { Prisma } from '@prisma/client'

const makeSchema = () =>
  z
    .object({
      id: z.literal(true).optional(),
      name: z.literal(true).optional(),
      email: z.literal(true).optional(),
      phone: z.literal(true).optional(),
      company: z.literal(true).optional(),
      message: z.literal(true).optional(),
      total: z.literal(true).optional(),
      status: z.literal(true).optional(),
      userId: z.literal(true).optional(),
      createdAt: z.literal(true).optional(),
      updatedAt: z.literal(true).optional(),
    })
    .strict()
export const QuoteMaxAggregateInputObjectSchema: z.ZodType<Prisma.QuoteMaxAggregateInputType> =
  makeSchema() as unknown as z.ZodType<Prisma.QuoteMaxAggregateInputType>
export const QuoteMaxAggregateInputObjectZodSchema = makeSchema()
