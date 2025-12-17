import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MaintenanceStatusSchema } from '../enums/MaintenanceStatus.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumMaintenanceStatusFilterObjectSchema as NestedEnumMaintenanceStatusFilterObjectSchema } from './NestedEnumMaintenanceStatusFilter.schema'

const nestedenummaintenancestatuswithaggregatesfilterSchema = z.object({
  equals: MaintenanceStatusSchema.optional(),
  in: MaintenanceStatusSchema.array().optional(),
  notIn: MaintenanceStatusSchema.array().optional(),
  not: z.union([MaintenanceStatusSchema, z.lazy(() => NestedEnumMaintenanceStatusWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumMaintenanceStatusFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumMaintenanceStatusFilterObjectSchema).optional()
}).strict();
export const NestedEnumMaintenanceStatusWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedEnumMaintenanceStatusWithAggregatesFilter> = nestedenummaintenancestatuswithaggregatesfilterSchema as unknown as z.ZodType<Prisma.NestedEnumMaintenanceStatusWithAggregatesFilter>;
export const NestedEnumMaintenanceStatusWithAggregatesFilterObjectZodSchema = nestedenummaintenancestatuswithaggregatesfilterSchema;
