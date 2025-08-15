import { z } from 'zod'
import { EquipmentSelectObjectSchema } from './objects/EquipmentSelect.schema'
import { EquipmentIncludeObjectSchema } from './objects/EquipmentInclude.schema'
import { EquipmentUpdateInputObjectSchema } from './objects/EquipmentUpdateInput.schema'
import { EquipmentUncheckedUpdateInputObjectSchema } from './objects/EquipmentUncheckedUpdateInput.schema'
import { EquipmentWhereUniqueInputObjectSchema } from './objects/EquipmentWhereUniqueInput.schema'

export const EquipmentUpdateOneSchema = z.object({
  select: EquipmentSelectObjectSchema.optional(),
  include: EquipmentIncludeObjectSchema.optional(),
  data: z.union([
    EquipmentUpdateInputObjectSchema,
    EquipmentUncheckedUpdateInputObjectSchema,
  ]),
  where: EquipmentWhereUniqueInputObjectSchema,
})
