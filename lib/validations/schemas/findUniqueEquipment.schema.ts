import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { EquipmentSelectObjectSchema } from './objects/EquipmentSelect.schema';
import { EquipmentIncludeObjectSchema } from './objects/EquipmentInclude.schema';
import { EquipmentWhereUniqueInputObjectSchema } from './objects/EquipmentWhereUniqueInput.schema';

export const EquipmentFindUniqueSchema: z.ZodType<Prisma.EquipmentFindUniqueArgs> = z.object({ select: EquipmentSelectObjectSchema.optional(), include: EquipmentIncludeObjectSchema.optional(), where: EquipmentWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.EquipmentFindUniqueArgs>;

export const EquipmentFindUniqueZodSchema = z.object({ select: EquipmentSelectObjectSchema.optional(), include: EquipmentIncludeObjectSchema.optional(), where: EquipmentWhereUniqueInputObjectSchema }).strict();