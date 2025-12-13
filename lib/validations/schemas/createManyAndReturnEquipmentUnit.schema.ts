/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { EquipmentUnitSelectObjectSchema as EquipmentUnitSelectObjectSchema } from './objects/EquipmentUnitSelect.schema';
import { EquipmentUnitCreateManyInputObjectSchema as EquipmentUnitCreateManyInputObjectSchema } from './objects/EquipmentUnitCreateManyInput.schema';

export const EquipmentUnitCreateManyAndReturnSchema: z.ZodType<Prisma.EquipmentUnitCreateManyAndReturnArgs> = z.object({ select: EquipmentUnitSelectObjectSchema.optional(), data: z.union([ EquipmentUnitCreateManyInputObjectSchema, z.array(EquipmentUnitCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.EquipmentUnitCreateManyAndReturnArgs>;

export const EquipmentUnitCreateManyAndReturnZodSchema = z.object({ select: EquipmentUnitSelectObjectSchema.optional(), data: z.union([ EquipmentUnitCreateManyInputObjectSchema, z.array(EquipmentUnitCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();