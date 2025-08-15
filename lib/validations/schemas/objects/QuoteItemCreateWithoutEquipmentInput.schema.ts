import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { QuoteCreateNestedOneWithoutItemsInputObjectSchema } from './QuoteCreateNestedOneWithoutItemsInput.schema'

export const QuoteItemCreateWithoutEquipmentInputObjectSchema: z.ZodType<
  Prisma.QuoteItemCreateWithoutEquipmentInput,
  Prisma.QuoteItemCreateWithoutEquipmentInput
> = z
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
export const QuoteItemCreateWithoutEquipmentInputObjectZodSchema = z
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
