/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { EquipmentUnitCreateManyInputObjectSchema as EquipmentUnitCreateManyInputObjectSchema } from './objects/EquipmentUnitCreateManyInput.schema';

export const EquipmentUnitCreateManySchema: z.ZodType<Prisma.EquipmentUnitCreateManyArgs> = z.object({ data: z.union([ EquipmentUnitCreateManyInputObjectSchema, z.array(EquipmentUnitCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.EquipmentUnitCreateManyArgs>;

export const EquipmentUnitCreateManyZodSchema = z.object({ data: z.union([ EquipmentUnitCreateManyInputObjectSchema, z.array(EquipmentUnitCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();