/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod'
import type { Prisma } from '@prisma/client'
import { QuoteCreateNestedOneWithoutItemsInputObjectSchema as QuoteCreateNestedOneWithoutItemsInputObjectSchema } from './QuoteCreateNestedOneWithoutItemsInput.schema'

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
      quote: z.lazy(() => QuoteCreateNestedOneWithoutItemsInputObjectSchema),
    })
    .strict()
export const QuoteItemCreateWithoutEquipmentInputObjectSchema: z.ZodType<Prisma.QuoteItemCreateWithoutEquipmentInput> =
  makeSchema() as unknown as z.ZodType<Prisma.QuoteItemCreateWithoutEquipmentInput>
export const QuoteItemCreateWithoutEquipmentInputObjectZodSchema = makeSchema()
