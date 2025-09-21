import { z } from 'zod';
import { SettingSelectObjectSchema } from './objects/SettingSelect.schema';
import { SettingCreateInputObjectSchema } from './objects/SettingCreateInput.schema';
import { SettingUncheckedCreateInputObjectSchema } from './objects/SettingUncheckedCreateInput.schema';

export const SettingCreateOneSchema = z.object({ select: SettingSelectObjectSchema.optional(),  data: z.union([SettingCreateInputObjectSchema, SettingUncheckedCreateInputObjectSchema])  })