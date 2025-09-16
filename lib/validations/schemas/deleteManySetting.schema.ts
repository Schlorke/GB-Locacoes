import { z } from 'zod';
import { SettingWhereInputObjectSchema } from './objects/SettingWhereInput.schema';

export const SettingDeleteManySchema = z.object({ where: SettingWhereInputObjectSchema.optional()  })