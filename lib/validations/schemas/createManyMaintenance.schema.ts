/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { MaintenanceCreateManyInputObjectSchema as MaintenanceCreateManyInputObjectSchema } from './objects/MaintenanceCreateManyInput.schema';

export const MaintenanceCreateManySchema: z.ZodType<Prisma.MaintenanceCreateManyArgs> = z.object({ data: z.union([ MaintenanceCreateManyInputObjectSchema, z.array(MaintenanceCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.MaintenanceCreateManyArgs>;

export const MaintenanceCreateManyZodSchema = z.object({ data: z.union([ MaintenanceCreateManyInputObjectSchema, z.array(MaintenanceCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();