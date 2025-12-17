import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { EquipmentWhereInputObjectSchema as EquipmentWhereInputObjectSchema } from './objects/EquipmentWhereInput.schema';

export const EquipmentDeleteManySchema: z.ZodType<Prisma.EquipmentDeleteManyArgs> = z.object({ where: EquipmentWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.EquipmentDeleteManyArgs>;

export const EquipmentDeleteManyZodSchema = z.object({ where: EquipmentWhereInputObjectSchema.optional() }).strict();