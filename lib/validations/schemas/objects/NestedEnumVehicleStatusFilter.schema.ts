import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { VehicleStatusSchema } from '../enums/VehicleStatus.schema'

const nestedenumvehiclestatusfilterSchema = z.object({
  equals: VehicleStatusSchema.optional(),
  in: VehicleStatusSchema.array().optional(),
  notIn: VehicleStatusSchema.array().optional(),
  not: z.union([VehicleStatusSchema, z.lazy(() => NestedEnumVehicleStatusFilterObjectSchema)]).optional()
}).strict();
export const NestedEnumVehicleStatusFilterObjectSchema: z.ZodType<Prisma.NestedEnumVehicleStatusFilter> = nestedenumvehiclestatusfilterSchema as unknown as z.ZodType<Prisma.NestedEnumVehicleStatusFilter>;
export const NestedEnumVehicleStatusFilterObjectZodSchema = nestedenumvehiclestatusfilterSchema;
