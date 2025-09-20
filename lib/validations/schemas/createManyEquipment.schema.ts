import { z } from 'zod'
import { EquipmentCreateManyInputObjectSchema } from './objects/EquipmentCreateManyInput.schema'

export const EquipmentCreateManySchema = z.object({
  data: z.union([
    EquipmentCreateManyInputObjectSchema,
    z.array(EquipmentCreateManyInputObjectSchema),
  ]),
  skipDuplicates: z.boolean().optional(),
})
