import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { VehicleStatusSchema } from '../enums/VehicleStatus.schema';
import { NestedEnumVehicleStatusFilterObjectSchema as NestedEnumVehicleStatusFilterObjectSchema } from './NestedEnumVehicleStatusFilter.schema'

const makeSchema = () => z.object({
  equals: VehicleStatusSchema.optional(),
  in: VehicleStatusSchema.array().optional(),
  notIn: VehicleStatusSchema.array().optional(),
  not: z.union([VehicleStatusSchema, z.lazy(() => NestedEnumVehicleStatusFilterObjectSchema)]).optional()
}).strict();
export const EnumVehicleStatusFilterObjectSchema: z.ZodType<Prisma.EnumVehicleStatusFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumVehicleStatusFilter>;
export const EnumVehicleStatusFilterObjectZodSchema = makeSchema();
