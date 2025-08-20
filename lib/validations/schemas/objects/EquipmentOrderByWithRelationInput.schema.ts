import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { SortOrderSchema } from '../enums/SortOrder.schema'
import { SortOrderInputObjectSchema } from './SortOrderInput.schema'
import { CategoryOrderByWithRelationInputObjectSchema } from './CategoryOrderByWithRelationInput.schema'
import { QuoteItemOrderByRelationAggregateInputObjectSchema } from './QuoteItemOrderByRelationAggregateInput.schema'
import { rental_itemsOrderByRelationAggregateInputObjectSchema } from './rental_itemsOrderByRelationAggregateInput.schema'

export const EquipmentOrderByWithRelationInputObjectSchema: z.ZodType<
  Prisma.EquipmentOrderByWithRelationInput,
  Prisma.EquipmentOrderByWithRelationInput
> = z
  .object({
    id: SortOrderSchema.optional(),
    name: SortOrderSchema.optional(),
    description: z
      .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
      .optional(),
    pricePerDay: SortOrderSchema.optional(),
    images: SortOrderSchema.optional(),
    available: SortOrderSchema.optional(),
    categoryId: SortOrderSchema.optional(),
    createdAt: SortOrderSchema.optional(),
    updatedAt: SortOrderSchema.optional(),
    category_id: z
      .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
      .optional(),
    category: z
      .lazy(() => CategoryOrderByWithRelationInputObjectSchema)
      .optional(),
    quoteItems: z
      .lazy(() => QuoteItemOrderByRelationAggregateInputObjectSchema)
      .optional(),
    rental_items: z
      .lazy(() => rental_itemsOrderByRelationAggregateInputObjectSchema)
      .optional(),
  })
  .strict()
export const EquipmentOrderByWithRelationInputObjectZodSchema = z
  .object({
    id: SortOrderSchema.optional(),
    name: SortOrderSchema.optional(),
    description: z
      .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
      .optional(),
    pricePerDay: SortOrderSchema.optional(),
    images: SortOrderSchema.optional(),
    available: SortOrderSchema.optional(),
    categoryId: SortOrderSchema.optional(),
    createdAt: SortOrderSchema.optional(),
    updatedAt: SortOrderSchema.optional(),
    category_id: z
      .union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)])
      .optional(),
    category: z
      .lazy(() => CategoryOrderByWithRelationInputObjectSchema)
      .optional(),
    quoteItems: z
      .lazy(() => QuoteItemOrderByRelationAggregateInputObjectSchema)
      .optional(),
    rental_items: z
      .lazy(() => rental_itemsOrderByRelationAggregateInputObjectSchema)
      .optional(),
  })
  .strict()
