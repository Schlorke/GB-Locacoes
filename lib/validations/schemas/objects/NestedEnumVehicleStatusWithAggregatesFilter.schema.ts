/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { VehicleStatusSchema } from '../enums/VehicleStatus.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumVehicleStatusFilterObjectSchema as NestedEnumVehicleStatusFilterObjectSchema } from './NestedEnumVehicleStatusFilter.schema'

const nestedenumvehiclestatuswithaggregatesfilterSchema = z.object({
  equals: VehicleStatusSchema.optional(),
  in: VehicleStatusSchema.array().optional(),
  notIn: VehicleStatusSchema.array().optional(),
  not: z.union([VehicleStatusSchema, z.lazy(() => NestedEnumVehicleStatusWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumVehicleStatusFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumVehicleStatusFilterObjectSchema).optional()
}).strict();
export const NestedEnumVehicleStatusWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedEnumVehicleStatusWithAggregatesFilter> = nestedenumvehiclestatuswithaggregatesfilterSchema as unknown as z.ZodType<Prisma.NestedEnumVehicleStatusWithAggregatesFilter>;
export const NestedEnumVehicleStatusWithAggregatesFilterObjectZodSchema = nestedenumvehiclestatuswithaggregatesfilterSchema;
