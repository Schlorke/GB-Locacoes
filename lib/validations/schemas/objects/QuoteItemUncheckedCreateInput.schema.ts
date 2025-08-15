import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'

export const QuoteItemUncheckedCreateInputObjectSchema: z.ZodType<
  Prisma.QuoteItemUncheckedCreateInput,
  Prisma.QuoteItemUncheckedCreateInput
> = z
  .object({
    id: z.string().optional(),
    quoteId: z.string(),
    equipmentId: z.string(),
    quantity: z.number().int().optional(),
    days: z.number().int().optional(),
    pricePerDay: z.number(),
    total: z.number(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
  })
  .strict()
export const QuoteItemUncheckedCreateInputObjectZodSchema = z
  .object({
    id: z.string().optional(),
    quoteId: z.string(),
    equipmentId: z.string(),
    quantity: z.number().int().optional(),
    days: z.number().int().optional(),
    pricePerDay: z.number(),
    total: z.number(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
  })
  .strict()
