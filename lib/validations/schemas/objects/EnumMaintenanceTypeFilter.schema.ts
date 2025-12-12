/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MaintenanceTypeSchema } from '../enums/MaintenanceType.schema';
import { NestedEnumMaintenanceTypeFilterObjectSchema as NestedEnumMaintenanceTypeFilterObjectSchema } from './NestedEnumMaintenanceTypeFilter.schema'

const makeSchema = () => z.object({
  equals: MaintenanceTypeSchema.optional(),
  in: MaintenanceTypeSchema.array().optional(),
  notIn: MaintenanceTypeSchema.array().optional(),
  not: z.union([MaintenanceTypeSchema, z.lazy(() => NestedEnumMaintenanceTypeFilterObjectSchema)]).optional()
}).strict();
export const EnumMaintenanceTypeFilterObjectSchema: z.ZodType<Prisma.EnumMaintenanceTypeFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumMaintenanceTypeFilter>;
export const EnumMaintenanceTypeFilterObjectZodSchema = makeSchema();
