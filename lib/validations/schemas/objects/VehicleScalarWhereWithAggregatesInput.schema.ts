/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { StringNullableWithAggregatesFilterObjectSchema as StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema';
import { IntNullableWithAggregatesFilterObjectSchema as IntNullableWithAggregatesFilterObjectSchema } from './IntNullableWithAggregatesFilter.schema';
import { EnumVehicleTypeWithAggregatesFilterObjectSchema as EnumVehicleTypeWithAggregatesFilterObjectSchema } from './EnumVehicleTypeWithAggregatesFilter.schema';
import { VehicleTypeSchema } from '../enums/VehicleType.schema';
import { EnumVehicleStatusWithAggregatesFilterObjectSchema as EnumVehicleStatusWithAggregatesFilterObjectSchema } from './EnumVehicleStatusWithAggregatesFilter.schema';
import { VehicleStatusSchema } from '../enums/VehicleStatus.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

const vehiclescalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => VehicleScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => VehicleScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => VehicleScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => VehicleScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => VehicleScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  plate: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  brand: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  model: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  year: z.union([z.lazy(() => IntNullableWithAggregatesFilterObjectSchema), z.number().int()]).optional().nullable(),
  type: z.union([z.lazy(() => EnumVehicleTypeWithAggregatesFilterObjectSchema), VehicleTypeSchema]).optional(),
  status: z.union([z.lazy(() => EnumVehicleStatusWithAggregatesFilterObjectSchema), VehicleStatusSchema]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const VehicleScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.VehicleScalarWhereWithAggregatesInput> = vehiclescalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.VehicleScalarWhereWithAggregatesInput>;
export const VehicleScalarWhereWithAggregatesInputObjectZodSchema = vehiclescalarwherewithaggregatesinputSchema;
