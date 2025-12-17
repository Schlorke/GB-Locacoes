/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { MaintenanceWhereInputObjectSchema as MaintenanceWhereInputObjectSchema } from './objects/MaintenanceWhereInput.schema';

export const MaintenanceDeleteManySchema: z.ZodType<Prisma.MaintenanceDeleteManyArgs> = z.object({ where: MaintenanceWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.MaintenanceDeleteManyArgs>;

export const MaintenanceDeleteManyZodSchema = z.object({ where: MaintenanceWhereInputObjectSchema.optional() }).strict();