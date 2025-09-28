/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SettingCreateManyInputObjectSchema as SettingCreateManyInputObjectSchema } from './objects/SettingCreateManyInput.schema';

export const SettingCreateManySchema: z.ZodType<Prisma.SettingCreateManyArgs> = z.object({ data: z.union([ SettingCreateManyInputObjectSchema, z.array(SettingCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.SettingCreateManyArgs>;

export const SettingCreateManyZodSchema = z.object({ data: z.union([ SettingCreateManyInputObjectSchema, z.array(SettingCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();