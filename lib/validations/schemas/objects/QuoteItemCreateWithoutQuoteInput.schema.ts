import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { EquipmentCreateNestedOneWithoutQuoteItemsInputObjectSchema } from './EquipmentCreateNestedOneWithoutQuoteItemsInput.schema'

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
      equipment: z.lazy(
        () => EquipmentCreateNestedOneWithoutQuoteItemsInputObjectSchema
      ),
    })
    .strict()
export const QuoteItemCreateWithoutQuoteInputObjectSchema: z.ZodType<Prisma.QuoteItemCreateWithoutQuoteInput> =
  makeSchema() as unknown as z.ZodType<Prisma.QuoteItemCreateWithoutQuoteInput>
export const QuoteItemCreateWithoutQuoteInputObjectZodSchema = makeSchema()
