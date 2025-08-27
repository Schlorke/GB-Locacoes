import { z } from 'zod'
import type { Prisma } from '../../../../node_modules/.prisma/client'
import { SortOrderSchema } from '../enums/SortOrder.schema'
import { SortOrderInputObjectSchema } from './SortOrderInput.schema'
import { EquipmentCountOrderByAggregateInputObjectSchema } from './EquipmentCountOrderByAggregateInput.schema'
import { EquipmentAvgOrderByAggregateInputObjectSchema } from './EquipmentAvgOrderByAggregateInput.schema'
import { EquipmentMaxOrderByAggregateInputObjectSchema } from './EquipmentMaxOrderByAggregateInput.schema'
import { EquipmentMinOrderByAggregateInputObjectSchema } from './EquipmentMinOrderByAggregateInput.schema'
import { EquipmentSumOrderByAggregateInputObjectSchema } from './EquipmentSumOrderByAggregateInput.schema'

const makeSchema = (): z.ZodObject<any> =>
  z
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
      _count: z
        .lazy(() => EquipmentCountOrderByAggregateInputObjectSchema)
        .optional(),
      _avg: z
        .lazy(() => EquipmentAvgOrderByAggregateInputObjectSchema)
        .optional(),
      _max: z
        .lazy(() => EquipmentMaxOrderByAggregateInputObjectSchema)
        .optional(),
      _min: z
        .lazy(() => EquipmentMinOrderByAggregateInputObjectSchema)
        .optional(),
      _sum: z
        .lazy(() => EquipmentSumOrderByAggregateInputObjectSchema)
        .optional(),
    })
    .strict()
export const EquipmentOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.EquipmentOrderByWithAggregationInput> =
  makeSchema() as unknown as z.ZodType<Prisma.EquipmentOrderByWithAggregationInput>
export const EquipmentOrderByWithAggregationInputObjectZodSchema = makeSchema()
