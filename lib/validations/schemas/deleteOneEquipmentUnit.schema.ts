/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { EquipmentUnitSelectObjectSchema as EquipmentUnitSelectObjectSchema } from './objects/EquipmentUnitSelect.schema';
import { EquipmentUnitIncludeObjectSchema as EquipmentUnitIncludeObjectSchema } from './objects/EquipmentUnitInclude.schema';
import { EquipmentUnitWhereUniqueInputObjectSchema as EquipmentUnitWhereUniqueInputObjectSchema } from './objects/EquipmentUnitWhereUniqueInput.schema';

export const EquipmentUnitDeleteOneSchema: z.ZodType<Prisma.EquipmentUnitDeleteArgs> = z.object({ select: EquipmentUnitSelectObjectSchema.optional(), include: EquipmentUnitIncludeObjectSchema.optional(), where: EquipmentUnitWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.EquipmentUnitDeleteArgs>;

export const EquipmentUnitDeleteOneZodSchema = z.object({ select: EquipmentUnitSelectObjectSchema.optional(), include: EquipmentUnitIncludeObjectSchema.optional(), where: EquipmentUnitWhereUniqueInputObjectSchema }).strict();