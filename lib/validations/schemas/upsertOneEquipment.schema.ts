import { z } from 'zod'
import { EquipmentSelectObjectSchema } from './objects/EquipmentSelect.schema'
import { EquipmentIncludeObjectSchema } from './objects/EquipmentInclude.schema'
import { EquipmentWhereUniqueInputObjectSchema } from './objects/EquipmentWhereUniqueInput.schema'
import { EquipmentCreateInputObjectSchema } from './objects/EquipmentCreateInput.schema'
import { EquipmentUncheckedCreateInputObjectSchema } from './objects/EquipmentUncheckedCreateInput.schema'
import { EquipmentUpdateInputObjectSchema } from './objects/EquipmentUpdateInput.schema'
import { EquipmentUncheckedUpdateInputObjectSchema } from './objects/EquipmentUncheckedUpdateInput.schema'

export const EquipmentUpsertSchema = z.object({
  select: EquipmentSelectObjectSchema.optional(),
  include: EquipmentIncludeObjectSchema.optional(),
  where: EquipmentWhereUniqueInputObjectSchema,
  create: z.union([
    EquipmentCreateInputObjectSchema,
    EquipmentUncheckedCreateInputObjectSchema,
  ]),
  update: z.union([
    EquipmentUpdateInputObjectSchema,
    EquipmentUncheckedUpdateInputObjectSchema,
  ]),
})
