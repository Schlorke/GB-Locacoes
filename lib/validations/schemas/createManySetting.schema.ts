import { z } from 'zod'
import { SettingCreateManyInputObjectSchema } from './objects/SettingCreateManyInput.schema'

export const SettingCreateManySchema = z.object({
  data: z.union([
    SettingCreateManyInputObjectSchema,
    z.array(SettingCreateManyInputObjectSchema),
  ]),
  skipDuplicates: z.boolean().optional(),
})
