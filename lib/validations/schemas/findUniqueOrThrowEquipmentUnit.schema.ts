import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { EquipmentUnitSelectObjectSchema as EquipmentUnitSelectObjectSchema } from './objects/EquipmentUnitSelect.schema';
import { EquipmentUnitIncludeObjectSchema as EquipmentUnitIncludeObjectSchema } from './objects/EquipmentUnitInclude.schema';
import { EquipmentUnitWhereUniqueInputObjectSchema as EquipmentUnitWhereUniqueInputObjectSchema } from './objects/EquipmentUnitWhereUniqueInput.schema';

export const EquipmentUnitFindUniqueOrThrowSchema: z.ZodType<Prisma.EquipmentUnitFindUniqueOrThrowArgs> = z.object({ select: EquipmentUnitSelectObjectSchema.optional(), include: EquipmentUnitIncludeObjectSchema.optional(), where: EquipmentUnitWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.EquipmentUnitFindUniqueOrThrowArgs>;

export const EquipmentUnitFindUniqueOrThrowZodSchema = z.object({ select: EquipmentUnitSelectObjectSchema.optional(), include: EquipmentUnitIncludeObjectSchema.optional(), where: EquipmentUnitWhereUniqueInputObjectSchema }).strict();