/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod'
import type { Prisma } from '@prisma/client'

const makeSchema = () =>
  z
    .object({
      id: z.string().optional(),
      equipmentId: z.string(),
      quantity: z.number().int().optional(),
      days: z.number().int().optional(),
      pricePerDay: z.number(),
      total: z.number(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict()
export const QuoteItemUncheckedCreateWithoutQuoteInputObjectSchema: z.ZodType<Prisma.QuoteItemUncheckedCreateWithoutQuoteInput> =
  makeSchema() as unknown as z.ZodType<Prisma.QuoteItemUncheckedCreateWithoutQuoteInput>
export const QuoteItemUncheckedCreateWithoutQuoteInputObjectZodSchema =
  makeSchema()
