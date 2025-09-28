/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SettingUpdateManyMutationInputObjectSchema as SettingUpdateManyMutationInputObjectSchema } from './objects/SettingUpdateManyMutationInput.schema';
import { SettingWhereInputObjectSchema as SettingWhereInputObjectSchema } from './objects/SettingWhereInput.schema';

export const SettingUpdateManySchema: z.ZodType<Prisma.SettingUpdateManyArgs> = z.object({ data: SettingUpdateManyMutationInputObjectSchema, where: SettingWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.SettingUpdateManyArgs>;

export const SettingUpdateManyZodSchema = z.object({ data: SettingUpdateManyMutationInputObjectSchema, where: SettingWhereInputObjectSchema.optional() }).strict();