import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EquipmentUnitStatusSchema } from '../enums/EquipmentUnitStatus.schema';
import { NestedEnumEquipmentUnitStatusFilterObjectSchema as NestedEnumEquipmentUnitStatusFilterObjectSchema } from './NestedEnumEquipmentUnitStatusFilter.schema'

const makeSchema = () => z.object({
  equals: EquipmentUnitStatusSchema.optional(),
  in: EquipmentUnitStatusSchema.array().optional(),
  notIn: EquipmentUnitStatusSchema.array().optional(),
  not: z.union([EquipmentUnitStatusSchema, z.lazy(() => NestedEnumEquipmentUnitStatusFilterObjectSchema)]).optional()
}).strict();
export const EnumEquipmentUnitStatusFilterObjectSchema: z.ZodType<Prisma.EnumEquipmentUnitStatusFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumEquipmentUnitStatusFilter>;
export const EnumEquipmentUnitStatusFilterObjectZodSchema = makeSchema();
