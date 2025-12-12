/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { VehicleTypeSchema } from '../enums/VehicleType.schema'

const nestedenumvehicletypefilterSchema = z.object({
  equals: VehicleTypeSchema.optional(),
  in: VehicleTypeSchema.array().optional(),
  notIn: VehicleTypeSchema.array().optional(),
  not: z.union([VehicleTypeSchema, z.lazy(() => NestedEnumVehicleTypeFilterObjectSchema)]).optional()
}).strict();
export const NestedEnumVehicleTypeFilterObjectSchema: z.ZodType<Prisma.NestedEnumVehicleTypeFilter> = nestedenumvehicletypefilterSchema as unknown as z.ZodType<Prisma.NestedEnumVehicleTypeFilter>;
export const NestedEnumVehicleTypeFilterObjectZodSchema = nestedenumvehicletypefilterSchema;
