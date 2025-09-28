/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SettingSelectObjectSchema as SettingSelectObjectSchema } from './objects/SettingSelect.schema';
import { SettingWhereUniqueInputObjectSchema as SettingWhereUniqueInputObjectSchema } from './objects/SettingWhereUniqueInput.schema';

export const SettingDeleteOneSchema: z.ZodType<Prisma.SettingDeleteArgs> = z.object({ select: SettingSelectObjectSchema.optional(),  where: SettingWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.SettingDeleteArgs>;

export const SettingDeleteOneZodSchema = z.object({ select: SettingSelectObjectSchema.optional(),  where: SettingWhereUniqueInputObjectSchema }).strict();