/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { VehicleTypeSchema } from '../enums/VehicleType.schema';
import { NestedEnumVehicleTypeWithAggregatesFilterObjectSchema as NestedEnumVehicleTypeWithAggregatesFilterObjectSchema } from './NestedEnumVehicleTypeWithAggregatesFilter.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumVehicleTypeFilterObjectSchema as NestedEnumVehicleTypeFilterObjectSchema } from './NestedEnumVehicleTypeFilter.schema'

const makeSchema = () => z.object({
  equals: VehicleTypeSchema.optional(),
  in: VehicleTypeSchema.array().optional(),
  notIn: VehicleTypeSchema.array().optional(),
  not: z.union([VehicleTypeSchema, z.lazy(() => NestedEnumVehicleTypeWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumVehicleTypeFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumVehicleTypeFilterObjectSchema).optional()
}).strict();
export const EnumVehicleTypeWithAggregatesFilterObjectSchema: z.ZodType<Prisma.EnumVehicleTypeWithAggregatesFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumVehicleTypeWithAggregatesFilter>;
export const EnumVehicleTypeWithAggregatesFilterObjectZodSchema = makeSchema();
