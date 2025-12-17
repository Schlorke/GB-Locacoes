import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { MaintenanceSelectObjectSchema as MaintenanceSelectObjectSchema } from './objects/MaintenanceSelect.schema';
import { MaintenanceIncludeObjectSchema as MaintenanceIncludeObjectSchema } from './objects/MaintenanceInclude.schema';
import { MaintenanceUpdateInputObjectSchema as MaintenanceUpdateInputObjectSchema } from './objects/MaintenanceUpdateInput.schema';
import { MaintenanceUncheckedUpdateInputObjectSchema as MaintenanceUncheckedUpdateInputObjectSchema } from './objects/MaintenanceUncheckedUpdateInput.schema';
import { MaintenanceWhereUniqueInputObjectSchema as MaintenanceWhereUniqueInputObjectSchema } from './objects/MaintenanceWhereUniqueInput.schema';

export const MaintenanceUpdateOneSchema: z.ZodType<Prisma.MaintenanceUpdateArgs> = z.object({ select: MaintenanceSelectObjectSchema.optional(), include: MaintenanceIncludeObjectSchema.optional(), data: z.union([MaintenanceUpdateInputObjectSchema, MaintenanceUncheckedUpdateInputObjectSchema]), where: MaintenanceWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.MaintenanceUpdateArgs>;

export const MaintenanceUpdateOneZodSchema = z.object({ select: MaintenanceSelectObjectSchema.optional(), include: MaintenanceIncludeObjectSchema.optional(), data: z.union([MaintenanceUpdateInputObjectSchema, MaintenanceUncheckedUpdateInputObjectSchema]), where: MaintenanceWhereUniqueInputObjectSchema }).strict();