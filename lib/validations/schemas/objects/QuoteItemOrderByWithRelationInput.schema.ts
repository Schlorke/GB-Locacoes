/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod'
import type { Prisma } from '@prisma/client'
import { SortOrderSchema } from '../enums/SortOrder.schema'
import { EquipmentOrderByWithRelationInputObjectSchema as EquipmentOrderByWithRelationInputObjectSchema } from './EquipmentOrderByWithRelationInput.schema'
import { QuoteOrderByWithRelationInputObjectSchema as QuoteOrderByWithRelationInputObjectSchema } from './QuoteOrderByWithRelationInput.schema'

const makeSchema = () =>
  z
    .object({
      id: SortOrderSchema.optional(),
      quoteId: SortOrderSchema.optional(),
      equipmentId: SortOrderSchema.optional(),
      quantity: SortOrderSchema.optional(),
      days: SortOrderSchema.optional(),
      pricePerDay: SortOrderSchema.optional(),
      total: SortOrderSchema.optional(),
      createdAt: SortOrderSchema.optional(),
      updatedAt: SortOrderSchema.optional(),
      equipment: z
        .lazy(() => EquipmentOrderByWithRelationInputObjectSchema)
        .optional(),
      quote: z.lazy(() => QuoteOrderByWithRelationInputObjectSchema).optional(),
    })
    .strict()
export const QuoteItemOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.QuoteItemOrderByWithRelationInput> =
  makeSchema() as unknown as z.ZodType<Prisma.QuoteItemOrderByWithRelationInput>
export const QuoteItemOrderByWithRelationInputObjectZodSchema = makeSchema()
