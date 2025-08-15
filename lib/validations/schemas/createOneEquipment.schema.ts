import { z } from 'zod'
import { EquipmentSelectObjectSchema } from './objects/EquipmentSelect.schema'
import { EquipmentIncludeObjectSchema } from './objects/EquipmentInclude.schema'
import { EquipmentCreateInputObjectSchema } from './objects/EquipmentCreateInput.schema'
import { EquipmentUncheckedCreateInputObjectSchema } from './objects/EquipmentUncheckedCreateInput.schema'

export const EquipmentCreateOneSchema = z.object({
  select: EquipmentSelectObjectSchema.optional(),
  include: EquipmentIncludeObjectSchema.optional(),
  data: z.union([
    EquipmentCreateInputObjectSchema,
    EquipmentUncheckedCreateInputObjectSchema,
  ]),
})
