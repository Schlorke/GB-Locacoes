import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { EquipmentUnitSelectObjectSchema as EquipmentUnitSelectObjectSchema } from './objects/EquipmentUnitSelect.schema';
import { EquipmentUnitUpdateManyMutationInputObjectSchema as EquipmentUnitUpdateManyMutationInputObjectSchema } from './objects/EquipmentUnitUpdateManyMutationInput.schema';
import { EquipmentUnitWhereInputObjectSchema as EquipmentUnitWhereInputObjectSchema } from './objects/EquipmentUnitWhereInput.schema';

export const EquipmentUnitUpdateManyAndReturnSchema: z.ZodType<Prisma.EquipmentUnitUpdateManyAndReturnArgs> = z.object({ select: EquipmentUnitSelectObjectSchema.optional(), data: EquipmentUnitUpdateManyMutationInputObjectSchema, where: EquipmentUnitWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.EquipmentUnitUpdateManyAndReturnArgs>;

export const EquipmentUnitUpdateManyAndReturnZodSchema = z.object({ select: EquipmentUnitSelectObjectSchema.optional(), data: EquipmentUnitUpdateManyMutationInputObjectSchema, where: EquipmentUnitWhereInputObjectSchema.optional() }).strict();