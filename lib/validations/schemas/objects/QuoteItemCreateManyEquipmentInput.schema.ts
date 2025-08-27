import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'

const makeSchema = (): z.ZodObject<any> =>
  z
    .object({
      id: z.string().optional(),
      quoteId: z.string(),
      quantity: z.number().int().optional(),
      days: z.number().int().optional(),
      pricePerDay: z.number(),
      total: z.number(),
      createdAt: z.date().optional(),
      updatedAt: z.date().optional(),
    })
    .strict()
export const QuoteItemCreateManyEquipmentInputObjectSchema: z.ZodType<Prisma.QuoteItemCreateManyEquipmentInput> =
  makeSchema() as unknown as z.ZodType<Prisma.QuoteItemCreateManyEquipmentInput>
export const QuoteItemCreateManyEquipmentInputObjectZodSchema = makeSchema()
