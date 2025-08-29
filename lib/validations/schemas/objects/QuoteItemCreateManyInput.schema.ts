import { z } from 'zod'
import type { Prisma } from '@prisma/client'

const makeSchema = (): z.ZodObject<any> =>
  z
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
export const QuoteItemCreateManyInputObjectSchema: z.ZodType<Prisma.QuoteItemCreateManyInput> =
  makeSchema() as unknown as z.ZodType<Prisma.QuoteItemCreateManyInput>
export const QuoteItemCreateManyInputObjectZodSchema = makeSchema()
