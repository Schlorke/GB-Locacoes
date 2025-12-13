/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { EquipmentUnitSelectObjectSchema as EquipmentUnitSelectObjectSchema } from './objects/EquipmentUnitSelect.schema';
import { EquipmentUnitIncludeObjectSchema as EquipmentUnitIncludeObjectSchema } from './objects/EquipmentUnitInclude.schema';
import { EquipmentUnitWhereUniqueInputObjectSchema as EquipmentUnitWhereUniqueInputObjectSchema } from './objects/EquipmentUnitWhereUniqueInput.schema';

export const EquipmentUnitFindUniqueSchema: z.ZodType<Prisma.EquipmentUnitFindUniqueArgs> = z.object({ select: EquipmentUnitSelectObjectSchema.optional(), include: EquipmentUnitIncludeObjectSchema.optional(), where: EquipmentUnitWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.EquipmentUnitFindUniqueArgs>;

export const EquipmentUnitFindUniqueZodSchema = z.object({ select: EquipmentUnitSelectObjectSchema.optional(), include: EquipmentUnitIncludeObjectSchema.optional(), where: EquipmentUnitWhereUniqueInputObjectSchema }).strict();