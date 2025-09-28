/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { EquipmentSelectObjectSchema as EquipmentSelectObjectSchema } from './objects/EquipmentSelect.schema';
import { EquipmentIncludeObjectSchema as EquipmentIncludeObjectSchema } from './objects/EquipmentInclude.schema';
import { EquipmentUpdateInputObjectSchema as EquipmentUpdateInputObjectSchema } from './objects/EquipmentUpdateInput.schema';
import { EquipmentUncheckedUpdateInputObjectSchema as EquipmentUncheckedUpdateInputObjectSchema } from './objects/EquipmentUncheckedUpdateInput.schema';
import { EquipmentWhereUniqueInputObjectSchema as EquipmentWhereUniqueInputObjectSchema } from './objects/EquipmentWhereUniqueInput.schema';

export const EquipmentUpdateOneSchema: z.ZodType<Prisma.EquipmentUpdateArgs> = z.object({ select: EquipmentSelectObjectSchema.optional(), include: EquipmentIncludeObjectSchema.optional(), data: z.union([EquipmentUpdateInputObjectSchema, EquipmentUncheckedUpdateInputObjectSchema]), where: EquipmentWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.EquipmentUpdateArgs>;

export const EquipmentUpdateOneZodSchema = z.object({ select: EquipmentSelectObjectSchema.optional(), include: EquipmentIncludeObjectSchema.optional(), data: z.union([EquipmentUpdateInputObjectSchema, EquipmentUncheckedUpdateInputObjectSchema]), where: EquipmentWhereUniqueInputObjectSchema }).strict();