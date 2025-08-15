import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';


export const SettingWhereUniqueInputObjectSchema: z.ZodType<Prisma.SettingWhereUniqueInput, Prisma.SettingWhereUniqueInput> = z.object({
  id: z.string()
}).strict();
export const SettingWhereUniqueInputObjectZodSchema = z.object({
  id: z.string()
}).strict();
