/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { MaintenanceUpdateManyMutationInputObjectSchema as MaintenanceUpdateManyMutationInputObjectSchema } from './objects/MaintenanceUpdateManyMutationInput.schema';
import { MaintenanceWhereInputObjectSchema as MaintenanceWhereInputObjectSchema } from './objects/MaintenanceWhereInput.schema';

export const MaintenanceUpdateManySchema: z.ZodType<Prisma.MaintenanceUpdateManyArgs> = z.object({ data: MaintenanceUpdateManyMutationInputObjectSchema, where: MaintenanceWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.MaintenanceUpdateManyArgs>;

export const MaintenanceUpdateManyZodSchema = z.object({ data: MaintenanceUpdateManyMutationInputObjectSchema, where: MaintenanceWhereInputObjectSchema.optional() }).strict();