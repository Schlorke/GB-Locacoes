import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { IntNullableFilterObjectSchema as IntNullableFilterObjectSchema } from './IntNullableFilter.schema';
import { EnumVehicleTypeFilterObjectSchema as EnumVehicleTypeFilterObjectSchema } from './EnumVehicleTypeFilter.schema';
import { VehicleTypeSchema } from '../enums/VehicleType.schema';
import { EnumVehicleStatusFilterObjectSchema as EnumVehicleStatusFilterObjectSchema } from './EnumVehicleStatusFilter.schema';
import { VehicleStatusSchema } from '../enums/VehicleStatus.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

const vehiclewhereinputSchema = z.object({
  AND: z.union([z.lazy(() => VehicleWhereInputObjectSchema), z.lazy(() => VehicleWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => VehicleWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => VehicleWhereInputObjectSchema), z.lazy(() => VehicleWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  plate: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  brand: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  model: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  year: z.union([z.lazy(() => IntNullableFilterObjectSchema), z.number().int()]).optional().nullable(),
  type: z.union([z.lazy(() => EnumVehicleTypeFilterObjectSchema), VehicleTypeSchema]).optional(),
  status: z.union([z.lazy(() => EnumVehicleStatusFilterObjectSchema), VehicleStatusSchema]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const VehicleWhereInputObjectSchema: z.ZodType<Prisma.VehicleWhereInput> = vehiclewhereinputSchema as unknown as z.ZodType<Prisma.VehicleWhereInput>;
export const VehicleWhereInputObjectZodSchema = vehiclewhereinputSchema;
