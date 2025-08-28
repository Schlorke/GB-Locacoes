import { z } from 'zod'
import type { Prisma } from '@prisma/client'
import { QuoteCreateNestedOneWithoutItemsInputObjectSchema } from './QuoteCreateNestedOneWithoutItemsInput.schema'

const makeSchema = (): z.ZodObject<any> =>
  z
    .object({
      id: z.string().optional(),
      quantity: z.number().int().optional(),
      days: z.number().int().optional(),
      pricePerDay: z.number(),
      total: z.number(),
      createdAt: z.date().optional(),
      updatedAt: z.date().optional(),
      quote: z.lazy(() => QuoteCreateNestedOneWithoutItemsInputObjectSchema),
    })
    .strict()
export const QuoteItemCreateWithoutEquipmentInputObjectSchema: z.ZodType<Prisma.QuoteItemCreateWithoutEquipmentInput> =
  makeSchema() as unknown as z.ZodType<Prisma.QuoteItemCreateWithoutEquipmentInput>
export const QuoteItemCreateWithoutEquipmentInputObjectZodSchema = makeSchema()
