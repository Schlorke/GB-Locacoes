import { z } from 'zod'
import { SettingSelectObjectSchema } from './objects/SettingSelect.schema'
import { SettingUpdateInputObjectSchema } from './objects/SettingUpdateInput.schema'
import { SettingUncheckedUpdateInputObjectSchema } from './objects/SettingUncheckedUpdateInput.schema'
import { SettingWhereUniqueInputObjectSchema } from './objects/SettingWhereUniqueInput.schema'

export const SettingUpdateOneSchema = z.object({
  select: SettingSelectObjectSchema.optional(),
  data: z.union([
    SettingUpdateInputObjectSchema,
    SettingUncheckedUpdateInputObjectSchema,
  ]),
  where: SettingWhereUniqueInputObjectSchema,
})
