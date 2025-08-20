import { z } from 'zod'
import { EquipmentWhereInputObjectSchema } from './objects/EquipmentWhereInput.schema'
import { EquipmentOrderByWithAggregationInputObjectSchema } from './objects/EquipmentOrderByWithAggregationInput.schema'
import { EquipmentScalarWhereWithAggregatesInputObjectSchema } from './objects/EquipmentScalarWhereWithAggregatesInput.schema'
import { EquipmentScalarFieldEnumSchema } from './enums/EquipmentScalarFieldEnum.schema'

export const EquipmentGroupBySchema = z.object({
  where: EquipmentWhereInputObjectSchema.optional(),
  orderBy: z
    .union([
      EquipmentOrderByWithAggregationInputObjectSchema,
      EquipmentOrderByWithAggregationInputObjectSchema.array(),
    ])
    .optional(),
  having: EquipmentScalarWhereWithAggregatesInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  by: z.array(EquipmentScalarFieldEnumSchema),
})
