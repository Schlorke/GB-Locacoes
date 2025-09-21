import { z } from 'zod';
import { SettingSelectObjectSchema } from './objects/SettingSelect.schema';
import { SettingCreateManyInputObjectSchema } from './objects/SettingCreateManyInput.schema';

export const SettingCreateManyAndReturnSchema = z.object({ select: SettingSelectObjectSchema.optional(), data: z.union([ SettingCreateManyInputObjectSchema, z.array(SettingCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict()