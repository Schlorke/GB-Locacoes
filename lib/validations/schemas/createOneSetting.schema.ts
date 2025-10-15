/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { SettingSelectObjectSchema as SettingSelectObjectSchema } from './objects/SettingSelect.schema';
import { SettingCreateInputObjectSchema as SettingCreateInputObjectSchema } from './objects/SettingCreateInput.schema';
import { SettingUncheckedCreateInputObjectSchema as SettingUncheckedCreateInputObjectSchema } from './objects/SettingUncheckedCreateInput.schema';

export const SettingCreateOneSchema: z.ZodType<Prisma.SettingCreateArgs> = z.object({ select: SettingSelectObjectSchema.optional(),  data: z.union([SettingCreateInputObjectSchema, SettingUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.SettingCreateArgs>;

export const SettingCreateOneZodSchema = z.object({ select: SettingSelectObjectSchema.optional(),  data: z.union([SettingCreateInputObjectSchema, SettingUncheckedCreateInputObjectSchema]) }).strict();