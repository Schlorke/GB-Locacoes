/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { EquipmentSelectObjectSchema as EquipmentSelectObjectSchema } from './objects/EquipmentSelect.schema';
import { EquipmentUpdateManyMutationInputObjectSchema as EquipmentUpdateManyMutationInputObjectSchema } from './objects/EquipmentUpdateManyMutationInput.schema';
import { EquipmentWhereInputObjectSchema as EquipmentWhereInputObjectSchema } from './objects/EquipmentWhereInput.schema';

export const EquipmentUpdateManyAndReturnSchema: z.ZodType<Prisma.EquipmentUpdateManyAndReturnArgs> = z.object({ select: EquipmentSelectObjectSchema.optional(), data: EquipmentUpdateManyMutationInputObjectSchema, where: EquipmentWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.EquipmentUpdateManyAndReturnArgs>;

export const EquipmentUpdateManyAndReturnZodSchema = z.object({ select: EquipmentSelectObjectSchema.optional(), data: EquipmentUpdateManyMutationInputObjectSchema, where: EquipmentWhereInputObjectSchema.optional() }).strict();