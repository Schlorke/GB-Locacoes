/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { SettingWhereInputObjectSchema as SettingWhereInputObjectSchema } from './objects/SettingWhereInput.schema';

export const SettingDeleteManySchema: z.ZodType<Prisma.SettingDeleteManyArgs> = z.object({ where: SettingWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.SettingDeleteManyArgs>;

export const SettingDeleteManyZodSchema = z.object({ where: SettingWhereInputObjectSchema.optional() }).strict();