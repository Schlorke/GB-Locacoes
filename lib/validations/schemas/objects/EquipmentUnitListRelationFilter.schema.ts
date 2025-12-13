/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EquipmentUnitWhereInputObjectSchema as EquipmentUnitWhereInputObjectSchema } from './EquipmentUnitWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => EquipmentUnitWhereInputObjectSchema).optional(),
  some: z.lazy(() => EquipmentUnitWhereInputObjectSchema).optional(),
  none: z.lazy(() => EquipmentUnitWhereInputObjectSchema).optional()
}).strict();
export const EquipmentUnitListRelationFilterObjectSchema: z.ZodType<Prisma.EquipmentUnitListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.EquipmentUnitListRelationFilter>;
export const EquipmentUnitListRelationFilterObjectZodSchema = makeSchema();
