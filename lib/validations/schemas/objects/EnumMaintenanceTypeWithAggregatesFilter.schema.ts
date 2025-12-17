import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MaintenanceTypeSchema } from '../enums/MaintenanceType.schema';
import { NestedEnumMaintenanceTypeWithAggregatesFilterObjectSchema as NestedEnumMaintenanceTypeWithAggregatesFilterObjectSchema } from './NestedEnumMaintenanceTypeWithAggregatesFilter.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumMaintenanceTypeFilterObjectSchema as NestedEnumMaintenanceTypeFilterObjectSchema } from './NestedEnumMaintenanceTypeFilter.schema'

const makeSchema = () => z.object({
  equals: MaintenanceTypeSchema.optional(),
  in: MaintenanceTypeSchema.array().optional(),
  notIn: MaintenanceTypeSchema.array().optional(),
  not: z.union([MaintenanceTypeSchema, z.lazy(() => NestedEnumMaintenanceTypeWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumMaintenanceTypeFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumMaintenanceTypeFilterObjectSchema).optional()
}).strict();
export const EnumMaintenanceTypeWithAggregatesFilterObjectSchema: z.ZodType<Prisma.EnumMaintenanceTypeWithAggregatesFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumMaintenanceTypeWithAggregatesFilter>;
export const EnumMaintenanceTypeWithAggregatesFilterObjectZodSchema = makeSchema();
