import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MaintenanceStatusSchema } from '../enums/MaintenanceStatus.schema';
import { NestedEnumMaintenanceStatusWithAggregatesFilterObjectSchema as NestedEnumMaintenanceStatusWithAggregatesFilterObjectSchema } from './NestedEnumMaintenanceStatusWithAggregatesFilter.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumMaintenanceStatusFilterObjectSchema as NestedEnumMaintenanceStatusFilterObjectSchema } from './NestedEnumMaintenanceStatusFilter.schema'

const makeSchema = () => z.object({
  equals: MaintenanceStatusSchema.optional(),
  in: MaintenanceStatusSchema.array().optional(),
  notIn: MaintenanceStatusSchema.array().optional(),
  not: z.union([MaintenanceStatusSchema, z.lazy(() => NestedEnumMaintenanceStatusWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumMaintenanceStatusFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumMaintenanceStatusFilterObjectSchema).optional()
}).strict();
export const EnumMaintenanceStatusWithAggregatesFilterObjectSchema: z.ZodType<Prisma.EnumMaintenanceStatusWithAggregatesFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumMaintenanceStatusWithAggregatesFilter>;
export const EnumMaintenanceStatusWithAggregatesFilterObjectZodSchema = makeSchema();
