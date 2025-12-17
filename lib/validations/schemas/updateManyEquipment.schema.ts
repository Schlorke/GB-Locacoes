import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { EquipmentUpdateManyMutationInputObjectSchema as EquipmentUpdateManyMutationInputObjectSchema } from './objects/EquipmentUpdateManyMutationInput.schema';
import { EquipmentWhereInputObjectSchema as EquipmentWhereInputObjectSchema } from './objects/EquipmentWhereInput.schema';

export const EquipmentUpdateManySchema: z.ZodType<Prisma.EquipmentUpdateManyArgs> = z.object({ data: EquipmentUpdateManyMutationInputObjectSchema, where: EquipmentWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.EquipmentUpdateManyArgs>;

export const EquipmentUpdateManyZodSchema = z.object({ data: EquipmentUpdateManyMutationInputObjectSchema, where: EquipmentWhereInputObjectSchema.optional() }).strict();