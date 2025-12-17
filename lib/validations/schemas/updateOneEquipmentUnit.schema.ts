import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { EquipmentUnitSelectObjectSchema as EquipmentUnitSelectObjectSchema } from './objects/EquipmentUnitSelect.schema';
import { EquipmentUnitIncludeObjectSchema as EquipmentUnitIncludeObjectSchema } from './objects/EquipmentUnitInclude.schema';
import { EquipmentUnitUpdateInputObjectSchema as EquipmentUnitUpdateInputObjectSchema } from './objects/EquipmentUnitUpdateInput.schema';
import { EquipmentUnitUncheckedUpdateInputObjectSchema as EquipmentUnitUncheckedUpdateInputObjectSchema } from './objects/EquipmentUnitUncheckedUpdateInput.schema';
import { EquipmentUnitWhereUniqueInputObjectSchema as EquipmentUnitWhereUniqueInputObjectSchema } from './objects/EquipmentUnitWhereUniqueInput.schema';

export const EquipmentUnitUpdateOneSchema: z.ZodType<Prisma.EquipmentUnitUpdateArgs> = z.object({ select: EquipmentUnitSelectObjectSchema.optional(), include: EquipmentUnitIncludeObjectSchema.optional(), data: z.union([EquipmentUnitUpdateInputObjectSchema, EquipmentUnitUncheckedUpdateInputObjectSchema]), where: EquipmentUnitWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.EquipmentUnitUpdateArgs>;

export const EquipmentUnitUpdateOneZodSchema = z.object({ select: EquipmentUnitSelectObjectSchema.optional(), include: EquipmentUnitIncludeObjectSchema.optional(), data: z.union([EquipmentUnitUpdateInputObjectSchema, EquipmentUnitUncheckedUpdateInputObjectSchema]), where: EquipmentUnitWhereUniqueInputObjectSchema }).strict();