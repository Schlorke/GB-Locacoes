import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { VehicleTypeSchema } from '../enums/VehicleType.schema';
import { NestedEnumVehicleTypeFilterObjectSchema as NestedEnumVehicleTypeFilterObjectSchema } from './NestedEnumVehicleTypeFilter.schema'

const makeSchema = () => z.object({
  equals: VehicleTypeSchema.optional(),
  in: VehicleTypeSchema.array().optional(),
  notIn: VehicleTypeSchema.array().optional(),
  not: z.union([VehicleTypeSchema, z.lazy(() => NestedEnumVehicleTypeFilterObjectSchema)]).optional()
}).strict();
export const EnumVehicleTypeFilterObjectSchema: z.ZodType<Prisma.EnumVehicleTypeFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumVehicleTypeFilter>;
export const EnumVehicleTypeFilterObjectZodSchema = makeSchema();
