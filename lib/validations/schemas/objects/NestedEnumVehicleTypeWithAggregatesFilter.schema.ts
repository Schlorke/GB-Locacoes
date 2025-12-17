import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { VehicleTypeSchema } from '../enums/VehicleType.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumVehicleTypeFilterObjectSchema as NestedEnumVehicleTypeFilterObjectSchema } from './NestedEnumVehicleTypeFilter.schema'

const nestedenumvehicletypewithaggregatesfilterSchema = z.object({
  equals: VehicleTypeSchema.optional(),
  in: VehicleTypeSchema.array().optional(),
  notIn: VehicleTypeSchema.array().optional(),
  not: z.union([VehicleTypeSchema, z.lazy(() => NestedEnumVehicleTypeWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumVehicleTypeFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumVehicleTypeFilterObjectSchema).optional()
}).strict();
export const NestedEnumVehicleTypeWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedEnumVehicleTypeWithAggregatesFilter> = nestedenumvehicletypewithaggregatesfilterSchema as unknown as z.ZodType<Prisma.NestedEnumVehicleTypeWithAggregatesFilter>;
export const NestedEnumVehicleTypeWithAggregatesFilterObjectZodSchema = nestedenumvehicletypewithaggregatesfilterSchema;
