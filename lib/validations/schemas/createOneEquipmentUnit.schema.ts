/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { EquipmentUnitSelectObjectSchema as EquipmentUnitSelectObjectSchema } from './objects/EquipmentUnitSelect.schema';
import { EquipmentUnitIncludeObjectSchema as EquipmentUnitIncludeObjectSchema } from './objects/EquipmentUnitInclude.schema';
import { EquipmentUnitCreateInputObjectSchema as EquipmentUnitCreateInputObjectSchema } from './objects/EquipmentUnitCreateInput.schema';
import { EquipmentUnitUncheckedCreateInputObjectSchema as EquipmentUnitUncheckedCreateInputObjectSchema } from './objects/EquipmentUnitUncheckedCreateInput.schema';

export const EquipmentUnitCreateOneSchema: z.ZodType<Prisma.EquipmentUnitCreateArgs> = z.object({ select: EquipmentUnitSelectObjectSchema.optional(), include: EquipmentUnitIncludeObjectSchema.optional(), data: z.union([EquipmentUnitCreateInputObjectSchema, EquipmentUnitUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.EquipmentUnitCreateArgs>;

export const EquipmentUnitCreateOneZodSchema = z.object({ select: EquipmentUnitSelectObjectSchema.optional(), include: EquipmentUnitIncludeObjectSchema.optional(), data: z.union([EquipmentUnitCreateInputObjectSchema, EquipmentUnitUncheckedCreateInputObjectSchema]) }).strict();