/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { EquipmentUnitUpdateManyMutationInputObjectSchema as EquipmentUnitUpdateManyMutationInputObjectSchema } from './objects/EquipmentUnitUpdateManyMutationInput.schema';
import { EquipmentUnitWhereInputObjectSchema as EquipmentUnitWhereInputObjectSchema } from './objects/EquipmentUnitWhereInput.schema';

export const EquipmentUnitUpdateManySchema: z.ZodType<Prisma.EquipmentUnitUpdateManyArgs> = z.object({ data: EquipmentUnitUpdateManyMutationInputObjectSchema, where: EquipmentUnitWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.EquipmentUnitUpdateManyArgs>;

export const EquipmentUnitUpdateManyZodSchema = z.object({ data: EquipmentUnitUpdateManyMutationInputObjectSchema, where: EquipmentUnitWhereInputObjectSchema.optional() }).strict();