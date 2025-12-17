import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MaintenanceTypeSchema } from '../enums/MaintenanceType.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumMaintenanceTypeFilterObjectSchema as NestedEnumMaintenanceTypeFilterObjectSchema } from './NestedEnumMaintenanceTypeFilter.schema'

const nestedenummaintenancetypewithaggregatesfilterSchema = z.object({
  equals: MaintenanceTypeSchema.optional(),
  in: MaintenanceTypeSchema.array().optional(),
  notIn: MaintenanceTypeSchema.array().optional(),
  not: z.union([MaintenanceTypeSchema, z.lazy(() => NestedEnumMaintenanceTypeWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumMaintenanceTypeFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumMaintenanceTypeFilterObjectSchema).optional()
}).strict();
export const NestedEnumMaintenanceTypeWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedEnumMaintenanceTypeWithAggregatesFilter> = nestedenummaintenancetypewithaggregatesfilterSchema as unknown as z.ZodType<Prisma.NestedEnumMaintenanceTypeWithAggregatesFilter>;
export const NestedEnumMaintenanceTypeWithAggregatesFilterObjectZodSchema = nestedenummaintenancetypewithaggregatesfilterSchema;
