import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MaintenanceStatusSchema } from '../enums/MaintenanceStatus.schema'

const nestedenummaintenancestatusfilterSchema = z.object({
  equals: MaintenanceStatusSchema.optional(),
  in: MaintenanceStatusSchema.array().optional(),
  notIn: MaintenanceStatusSchema.array().optional(),
  not: z.union([MaintenanceStatusSchema, z.lazy(() => NestedEnumMaintenanceStatusFilterObjectSchema)]).optional()
}).strict();
export const NestedEnumMaintenanceStatusFilterObjectSchema: z.ZodType<Prisma.NestedEnumMaintenanceStatusFilter> = nestedenummaintenancestatusfilterSchema as unknown as z.ZodType<Prisma.NestedEnumMaintenanceStatusFilter>;
export const NestedEnumMaintenanceStatusFilterObjectZodSchema = nestedenummaintenancestatusfilterSchema;
