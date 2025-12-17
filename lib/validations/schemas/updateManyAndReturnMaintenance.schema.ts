/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { MaintenanceSelectObjectSchema as MaintenanceSelectObjectSchema } from './objects/MaintenanceSelect.schema';
import { MaintenanceUpdateManyMutationInputObjectSchema as MaintenanceUpdateManyMutationInputObjectSchema } from './objects/MaintenanceUpdateManyMutationInput.schema';
import { MaintenanceWhereInputObjectSchema as MaintenanceWhereInputObjectSchema } from './objects/MaintenanceWhereInput.schema';

export const MaintenanceUpdateManyAndReturnSchema: z.ZodType<Prisma.MaintenanceUpdateManyAndReturnArgs> = z.object({ select: MaintenanceSelectObjectSchema.optional(), data: MaintenanceUpdateManyMutationInputObjectSchema, where: MaintenanceWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.MaintenanceUpdateManyAndReturnArgs>;

export const MaintenanceUpdateManyAndReturnZodSchema = z.object({ select: MaintenanceSelectObjectSchema.optional(), data: MaintenanceUpdateManyMutationInputObjectSchema, where: MaintenanceWhereInputObjectSchema.optional() }).strict();