import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { MaintenanceSelectObjectSchema as MaintenanceSelectObjectSchema } from './objects/MaintenanceSelect.schema';
import { MaintenanceIncludeObjectSchema as MaintenanceIncludeObjectSchema } from './objects/MaintenanceInclude.schema';
import { MaintenanceCreateInputObjectSchema as MaintenanceCreateInputObjectSchema } from './objects/MaintenanceCreateInput.schema';
import { MaintenanceUncheckedCreateInputObjectSchema as MaintenanceUncheckedCreateInputObjectSchema } from './objects/MaintenanceUncheckedCreateInput.schema';

export const MaintenanceCreateOneSchema: z.ZodType<Prisma.MaintenanceCreateArgs> = z.object({ select: MaintenanceSelectObjectSchema.optional(), include: MaintenanceIncludeObjectSchema.optional(), data: z.union([MaintenanceCreateInputObjectSchema, MaintenanceUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.MaintenanceCreateArgs>;

export const MaintenanceCreateOneZodSchema = z.object({ select: MaintenanceSelectObjectSchema.optional(), include: MaintenanceIncludeObjectSchema.optional(), data: z.union([MaintenanceCreateInputObjectSchema, MaintenanceUncheckedCreateInputObjectSchema]) }).strict();