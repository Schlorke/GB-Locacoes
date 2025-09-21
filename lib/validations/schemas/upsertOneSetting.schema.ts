import { z } from 'zod';
import { SettingSelectObjectSchema } from './objects/SettingSelect.schema';
import { SettingWhereUniqueInputObjectSchema } from './objects/SettingWhereUniqueInput.schema';
import { SettingCreateInputObjectSchema } from './objects/SettingCreateInput.schema';
import { SettingUncheckedCreateInputObjectSchema } from './objects/SettingUncheckedCreateInput.schema';
import { SettingUpdateInputObjectSchema } from './objects/SettingUpdateInput.schema';
import { SettingUncheckedUpdateInputObjectSchema } from './objects/SettingUncheckedUpdateInput.schema';

export const SettingUpsertSchema = z.object({ select: SettingSelectObjectSchema.optional(),  where: SettingWhereUniqueInputObjectSchema, create: z.union([ SettingCreateInputObjectSchema, SettingUncheckedCreateInputObjectSchema ]), update: z.union([ SettingUpdateInputObjectSchema, SettingUncheckedUpdateInputObjectSchema ])  })