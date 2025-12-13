/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { EquipmentUnitWhereInputObjectSchema as EquipmentUnitWhereInputObjectSchema } from './objects/EquipmentUnitWhereInput.schema';

export const EquipmentUnitDeleteManySchema: z.ZodType<Prisma.EquipmentUnitDeleteManyArgs> = z.object({ where: EquipmentUnitWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.EquipmentUnitDeleteManyArgs>;

export const EquipmentUnitDeleteManyZodSchema = z.object({ where: EquipmentUnitWhereInputObjectSchema.optional() }).strict();