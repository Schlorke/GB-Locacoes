import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { SettingSelectObjectSchema } from './SettingSelect.schema'

export const SettingArgsObjectSchema = z.object({
  select: z.lazy(() => SettingSelectObjectSchema).optional()
}).strict();
export const SettingArgsObjectZodSchema = z.object({
  select: z.lazy(() => SettingSelectObjectSchema).optional()
}).strict();
