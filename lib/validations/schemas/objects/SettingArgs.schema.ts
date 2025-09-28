/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SettingSelectObjectSchema as SettingSelectObjectSchema } from './SettingSelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => SettingSelectObjectSchema).optional()
}).strict();
export const SettingArgsObjectSchema = makeSchema();
export const SettingArgsObjectZodSchema = makeSchema();
