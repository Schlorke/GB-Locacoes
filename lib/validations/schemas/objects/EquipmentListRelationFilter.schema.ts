import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { EquipmentWhereInputObjectSchema } from './EquipmentWhereInput.schema'

export const EquipmentListRelationFilterObjectSchema: z.ZodType<Prisma.EquipmentListRelationFilter, Prisma.EquipmentListRelationFilter> = z.object({
  every: z.lazy(() => EquipmentWhereInputObjectSchema).optional(),
  some: z.lazy(() => EquipmentWhereInputObjectSchema).optional(),
  none: z.lazy(() => EquipmentWhereInputObjectSchema).optional()
}).strict();
export const EquipmentListRelationFilterObjectZodSchema = z.object({
  every: z.lazy(() => EquipmentWhereInputObjectSchema).optional(),
  some: z.lazy(() => EquipmentWhereInputObjectSchema).optional(),
  none: z.lazy(() => EquipmentWhereInputObjectSchema).optional()
}).strict();
