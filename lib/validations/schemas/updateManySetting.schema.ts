import { z } from 'zod'
import { SettingUpdateManyMutationInputObjectSchema } from './objects/SettingUpdateManyMutationInput.schema'
import { SettingWhereInputObjectSchema } from './objects/SettingWhereInput.schema'

export const SettingUpdateManySchema = z.object({
  data: SettingUpdateManyMutationInputObjectSchema,
  where: SettingWhereInputObjectSchema.optional(),
})
