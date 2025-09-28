/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { EquipmentSelectObjectSchema as EquipmentSelectObjectSchema } from './objects/EquipmentSelect.schema';
import { EquipmentIncludeObjectSchema as EquipmentIncludeObjectSchema } from './objects/EquipmentInclude.schema';
import { EquipmentWhereUniqueInputObjectSchema as EquipmentWhereUniqueInputObjectSchema } from './objects/EquipmentWhereUniqueInput.schema';

export const EquipmentDeleteOneSchema: z.ZodType<Prisma.EquipmentDeleteArgs> = z.object({ select: EquipmentSelectObjectSchema.optional(), include: EquipmentIncludeObjectSchema.optional(), where: EquipmentWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.EquipmentDeleteArgs>;

export const EquipmentDeleteOneZodSchema = z.object({ select: EquipmentSelectObjectSchema.optional(), include: EquipmentIncludeObjectSchema.optional(), where: EquipmentWhereUniqueInputObjectSchema }).strict();