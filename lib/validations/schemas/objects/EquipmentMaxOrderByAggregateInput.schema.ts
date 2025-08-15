import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { SortOrderSchema } from '../enums/SortOrder.schema'

export const EquipmentMaxOrderByAggregateInputObjectSchema: z.ZodType<
  Prisma.EquipmentMaxOrderByAggregateInput,
  Prisma.EquipmentMaxOrderByAggregateInput
> = z
  .object({
    id: SortOrderSchema.optional(),
    name: SortOrderSchema.optional(),
    description: SortOrderSchema.optional(),
    pricePerDay: SortOrderSchema.optional(),
    available: SortOrderSchema.optional(),
    categoryId: SortOrderSchema.optional(),
    createdAt: SortOrderSchema.optional(),
    updatedAt: SortOrderSchema.optional(),
    category_id: SortOrderSchema.optional(),
  })
  .strict()
export const EquipmentMaxOrderByAggregateInputObjectZodSchema = z
  .object({
    id: SortOrderSchema.optional(),
    name: SortOrderSchema.optional(),
    description: SortOrderSchema.optional(),
    pricePerDay: SortOrderSchema.optional(),
    available: SortOrderSchema.optional(),
    categoryId: SortOrderSchema.optional(),
    createdAt: SortOrderSchema.optional(),
    updatedAt: SortOrderSchema.optional(),
    category_id: SortOrderSchema.optional(),
  })
  .strict()
