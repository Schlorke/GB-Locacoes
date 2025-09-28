/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { EquipmentWhereInputObjectSchema as EquipmentWhereInputObjectSchema } from './EquipmentWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => EquipmentWhereInputObjectSchema).optional(),
  some: z.lazy(() => EquipmentWhereInputObjectSchema).optional(),
  none: z.lazy(() => EquipmentWhereInputObjectSchema).optional()
}).strict();
export const EquipmentListRelationFilterObjectSchema: z.ZodType<Prisma.EquipmentListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.EquipmentListRelationFilter>;
export const EquipmentListRelationFilterObjectZodSchema = makeSchema();
