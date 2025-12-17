/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { MaintenanceSelectObjectSchema as MaintenanceSelectObjectSchema } from './objects/MaintenanceSelect.schema';
import { MaintenanceCreateManyInputObjectSchema as MaintenanceCreateManyInputObjectSchema } from './objects/MaintenanceCreateManyInput.schema';

export const MaintenanceCreateManyAndReturnSchema: z.ZodType<Prisma.MaintenanceCreateManyAndReturnArgs> = z.object({ select: MaintenanceSelectObjectSchema.optional(), data: z.union([ MaintenanceCreateManyInputObjectSchema, z.array(MaintenanceCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.MaintenanceCreateManyAndReturnArgs>;

export const MaintenanceCreateManyAndReturnZodSchema = z.object({ select: MaintenanceSelectObjectSchema.optional(), data: z.union([ MaintenanceCreateManyInputObjectSchema, z.array(MaintenanceCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();