import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { SettingSelectObjectSchema } from './objects/SettingSelect.schema';
import { SettingWhereUniqueInputObjectSchema } from './objects/SettingWhereUniqueInput.schema';

export const SettingFindUniqueOrThrowSchema: z.ZodType<Prisma.SettingFindUniqueOrThrowArgs> = z.object({ select: SettingSelectObjectSchema.optional(),  where: SettingWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.SettingFindUniqueOrThrowArgs>;

export const SettingFindUniqueOrThrowZodSchema = z.object({ select: SettingSelectObjectSchema.optional(),  where: SettingWhereUniqueInputObjectSchema }).strict();