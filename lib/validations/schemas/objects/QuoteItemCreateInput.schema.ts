/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod'
import type { Prisma } from '@prisma/client'
import { EquipmentCreateNestedOneWithoutQuoteItemsInputObjectSchema as EquipmentCreateNestedOneWithoutQuoteItemsInputObjectSchema } from './EquipmentCreateNestedOneWithoutQuoteItemsInput.schema'
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
      equipment: z.lazy(
        () => EquipmentCreateNestedOneWithoutQuoteItemsInputObjectSchema
      ),
      quote: z.lazy(() => QuoteCreateNestedOneWithoutItemsInputObjectSchema),
    })
    .strict()
export const QuoteItemCreateInputObjectSchema: z.ZodType<Prisma.QuoteItemCreateInput> =
  makeSchema() as unknown as z.ZodType<Prisma.QuoteItemCreateInput>
export const QuoteItemCreateInputObjectZodSchema = makeSchema()
