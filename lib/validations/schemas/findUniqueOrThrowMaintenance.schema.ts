import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { MaintenanceSelectObjectSchema as MaintenanceSelectObjectSchema } from './objects/MaintenanceSelect.schema';
import { MaintenanceIncludeObjectSchema as MaintenanceIncludeObjectSchema } from './objects/MaintenanceInclude.schema';
import { MaintenanceWhereUniqueInputObjectSchema as MaintenanceWhereUniqueInputObjectSchema } from './objects/MaintenanceWhereUniqueInput.schema';

export const MaintenanceFindUniqueOrThrowSchema: z.ZodType<Prisma.MaintenanceFindUniqueOrThrowArgs> = z.object({ select: MaintenanceSelectObjectSchema.optional(), include: MaintenanceIncludeObjectSchema.optional(), where: MaintenanceWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.MaintenanceFindUniqueOrThrowArgs>;

export const MaintenanceFindUniqueOrThrowZodSchema = z.object({ select: MaintenanceSelectObjectSchema.optional(), include: MaintenanceIncludeObjectSchema.optional(), where: MaintenanceWhereUniqueInputObjectSchema }).strict();