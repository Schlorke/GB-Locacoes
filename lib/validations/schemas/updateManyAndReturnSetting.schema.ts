import { z } from 'zod'
import { SettingSelectObjectSchema } from './objects/SettingSelect.schema'
import { SettingUpdateManyMutationInputObjectSchema } from './objects/SettingUpdateManyMutationInput.schema'
import { SettingWhereInputObjectSchema } from './objects/SettingWhereInput.schema'

export const SettingUpdateManyAndReturnSchema = z
  .object({
    select: SettingSelectObjectSchema.optional(),
    data: SettingUpdateManyMutationInputObjectSchema,
    where: SettingWhereInputObjectSchema.optional(),
  })
  .strict()
