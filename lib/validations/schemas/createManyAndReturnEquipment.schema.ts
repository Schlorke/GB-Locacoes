import { z } from 'zod'
import { EquipmentSelectObjectSchema } from './objects/EquipmentSelect.schema'
import { EquipmentCreateManyInputObjectSchema } from './objects/EquipmentCreateManyInput.schema'

export const EquipmentCreateManyAndReturnSchema = z
  .object({
    select: EquipmentSelectObjectSchema.optional(),
    data: z.union([
      EquipmentCreateManyInputObjectSchema,
      z.array(EquipmentCreateManyInputObjectSchema),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict()
