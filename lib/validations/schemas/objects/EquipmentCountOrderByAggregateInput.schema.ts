import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { SortOrderSchema } from '../enums/SortOrder.schema'

export const EquipmentCountOrderByAggregateInputObjectSchema: z.ZodType<
  Prisma.EquipmentCountOrderByAggregateInput,
  Prisma.EquipmentCountOrderByAggregateInput
> = z
  .object({
    id: SortOrderSchema.optional(),
    name: SortOrderSchema.optional(),
    description: SortOrderSchema.optional(),
    pricePerDay: SortOrderSchema.optional(),
    images: SortOrderSchema.optional(),
    available: SortOrderSchema.optional(),
    categoryId: SortOrderSchema.optional(),
    createdAt: SortOrderSchema.optional(),
    updatedAt: SortOrderSchema.optional(),
    category_id: SortOrderSchema.optional(),
  })
  .strict()
export const EquipmentCountOrderByAggregateInputObjectZodSchema = z
  .object({
    id: SortOrderSchema.optional(),
    name: SortOrderSchema.optional(),
    description: SortOrderSchema.optional(),
    pricePerDay: SortOrderSchema.optional(),
    images: SortOrderSchema.optional(),
    available: SortOrderSchema.optional(),
    categoryId: SortOrderSchema.optional(),
    createdAt: SortOrderSchema.optional(),
    updatedAt: SortOrderSchema.optional(),
    category_id: SortOrderSchema.optional(),
  })
  .strict()
