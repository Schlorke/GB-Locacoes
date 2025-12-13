/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EquipmentUnitStatusSchema } from '../enums/EquipmentUnitStatus.schema';
import { NestedEnumEquipmentUnitStatusWithAggregatesFilterObjectSchema as NestedEnumEquipmentUnitStatusWithAggregatesFilterObjectSchema } from './NestedEnumEquipmentUnitStatusWithAggregatesFilter.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumEquipmentUnitStatusFilterObjectSchema as NestedEnumEquipmentUnitStatusFilterObjectSchema } from './NestedEnumEquipmentUnitStatusFilter.schema'

const makeSchema = () => z.object({
  equals: EquipmentUnitStatusSchema.optional(),
  in: EquipmentUnitStatusSchema.array().optional(),
  notIn: EquipmentUnitStatusSchema.array().optional(),
  not: z.union([EquipmentUnitStatusSchema, z.lazy(() => NestedEnumEquipmentUnitStatusWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumEquipmentUnitStatusFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumEquipmentUnitStatusFilterObjectSchema).optional()
}).strict();
export const EnumEquipmentUnitStatusWithAggregatesFilterObjectSchema: z.ZodType<Prisma.EnumEquipmentUnitStatusWithAggregatesFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumEquipmentUnitStatusWithAggregatesFilter>;
export const EnumEquipmentUnitStatusWithAggregatesFilterObjectZodSchema = makeSchema();
