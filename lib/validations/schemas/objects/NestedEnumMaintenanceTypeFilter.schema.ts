import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MaintenanceTypeSchema } from '../enums/MaintenanceType.schema'

const nestedenummaintenancetypefilterSchema = z.object({
  equals: MaintenanceTypeSchema.optional(),
  in: MaintenanceTypeSchema.array().optional(),
  notIn: MaintenanceTypeSchema.array().optional(),
  not: z.union([MaintenanceTypeSchema, z.lazy(() => NestedEnumMaintenanceTypeFilterObjectSchema)]).optional()
}).strict();
export const NestedEnumMaintenanceTypeFilterObjectSchema: z.ZodType<Prisma.NestedEnumMaintenanceTypeFilter> = nestedenummaintenancetypefilterSchema as unknown as z.ZodType<Prisma.NestedEnumMaintenanceTypeFilter>;
export const NestedEnumMaintenanceTypeFilterObjectZodSchema = nestedenummaintenancetypefilterSchema;
