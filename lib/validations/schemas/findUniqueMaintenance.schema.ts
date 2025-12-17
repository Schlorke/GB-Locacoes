import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { MaintenanceSelectObjectSchema as MaintenanceSelectObjectSchema } from './objects/MaintenanceSelect.schema';
import { MaintenanceIncludeObjectSchema as MaintenanceIncludeObjectSchema } from './objects/MaintenanceInclude.schema';
import { MaintenanceWhereUniqueInputObjectSchema as MaintenanceWhereUniqueInputObjectSchema } from './objects/MaintenanceWhereUniqueInput.schema';

export const MaintenanceFindUniqueSchema: z.ZodType<Prisma.MaintenanceFindUniqueArgs> = z.object({ select: MaintenanceSelectObjectSchema.optional(), include: MaintenanceIncludeObjectSchema.optional(), where: MaintenanceWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.MaintenanceFindUniqueArgs>;

export const MaintenanceFindUniqueZodSchema = z.object({ select: MaintenanceSelectObjectSchema.optional(), include: MaintenanceIncludeObjectSchema.optional(), where: MaintenanceWhereUniqueInputObjectSchema }).strict();