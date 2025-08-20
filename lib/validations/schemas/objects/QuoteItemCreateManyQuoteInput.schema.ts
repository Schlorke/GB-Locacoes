import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'

export const QuoteItemCreateManyQuoteInputObjectSchema: z.ZodType<
  Prisma.QuoteItemCreateManyQuoteInput,
  Prisma.QuoteItemCreateManyQuoteInput
> = z
  .object({
    id: z.string().optional(),
    equipmentId: z.string(),
    quantity: z.number().int().optional(),
    days: z.number().int().optional(),
    pricePerDay: z.number(),
    total: z.number(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
  })
  .strict()
export const QuoteItemCreateManyQuoteInputObjectZodSchema = z
  .object({
    id: z.string().optional(),
    equipmentId: z.string(),
    quantity: z.number().int().optional(),
    days: z.number().int().optional(),
    pricePerDay: z.number(),
    total: z.number(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
  })
  .strict()
