import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { EquipmentSelectObjectSchema } from './objects/EquipmentSelect.schema';
import { EquipmentIncludeObjectSchema } from './objects/EquipmentInclude.schema';
import { EquipmentWhereUniqueInputObjectSchema } from './objects/EquipmentWhereUniqueInput.schema';

export const EquipmentFindUniqueOrThrowSchema: z.ZodType<Prisma.EquipmentFindUniqueOrThrowArgs> = z.object({ select: EquipmentSelectObjectSchema.optional(), include: EquipmentIncludeObjectSchema.optional(), where: EquipmentWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.EquipmentFindUniqueOrThrowArgs>;

export const EquipmentFindUniqueOrThrowZodSchema = z.object({ select: EquipmentSelectObjectSchema.optional(), include: EquipmentIncludeObjectSchema.optional(), where: EquipmentWhereUniqueInputObjectSchema }).strict();