/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod'
import type { Prisma } from '@prisma/client'
import { EquipmentCreateNestedOneWithoutQuoteItemsInputObjectSchema as EquipmentCreateNestedOneWithoutQuoteItemsInputObjectSchema } from './EquipmentCreateNestedOneWithoutQuoteItemsInput.schema'

const makeSchema = () =>
  z
    .object({
      id: z.string().optional(),
      quantity: z.number().int().optional(),
      days: z.number().int().optional(),
      pricePerDay: z.number(),
      total: z.number(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      equipment: z.lazy(
        () => EquipmentCreateNestedOneWithoutQuoteItemsInputObjectSchema
      ),
    })
    .strict()
export const QuoteItemCreateWithoutQuoteInputObjectSchema: z.ZodType<Prisma.QuoteItemCreateWithoutQuoteInput> =
  makeSchema() as unknown as z.ZodType<Prisma.QuoteItemCreateWithoutQuoteInput>
export const QuoteItemCreateWithoutQuoteInputObjectZodSchema = makeSchema()
