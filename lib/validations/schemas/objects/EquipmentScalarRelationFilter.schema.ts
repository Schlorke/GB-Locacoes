import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { EquipmentWhereInputObjectSchema } from './EquipmentWhereInput.schema'

export const EquipmentScalarRelationFilterObjectSchema: z.ZodType<Prisma.EquipmentScalarRelationFilter, Prisma.EquipmentScalarRelationFilter> = z.object({
  is: z.lazy(() => EquipmentWhereInputObjectSchema).optional(),
  isNot: z.lazy(() => EquipmentWhereInputObjectSchema).optional()
}).strict();
export const EquipmentScalarRelationFilterObjectZodSchema = z.object({
  is: z.lazy(() => EquipmentWhereInputObjectSchema).optional(),
  isNot: z.lazy(() => EquipmentWhereInputObjectSchema).optional()
}).strict();
