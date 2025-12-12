/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MaintenanceStatusSchema } from '../enums/MaintenanceStatus.schema';
import { NestedEnumMaintenanceStatusFilterObjectSchema as NestedEnumMaintenanceStatusFilterObjectSchema } from './NestedEnumMaintenanceStatusFilter.schema'

const makeSchema = () => z.object({
  equals: MaintenanceStatusSchema.optional(),
  in: MaintenanceStatusSchema.array().optional(),
  notIn: MaintenanceStatusSchema.array().optional(),
  not: z.union([MaintenanceStatusSchema, z.lazy(() => NestedEnumMaintenanceStatusFilterObjectSchema)]).optional()
}).strict();
export const EnumMaintenanceStatusFilterObjectSchema: z.ZodType<Prisma.EnumMaintenanceStatusFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumMaintenanceStatusFilter>;
export const EnumMaintenanceStatusFilterObjectZodSchema = makeSchema();
