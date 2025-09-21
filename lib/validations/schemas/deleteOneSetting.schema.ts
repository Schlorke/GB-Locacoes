import { z } from 'zod';
import { SettingSelectObjectSchema } from './objects/SettingSelect.schema';
import { SettingWhereUniqueInputObjectSchema } from './objects/SettingWhereUniqueInput.schema';

export const SettingDeleteOneSchema = z.object({ select: SettingSelectObjectSchema.optional(),  where: SettingWhereUniqueInputObjectSchema  })