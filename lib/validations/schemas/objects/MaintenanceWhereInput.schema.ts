/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import { Prisma } from '@prisma/client';
import Decimal from 'decimal.js';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { EnumMaintenanceTypeFilterObjectSchema as EnumMaintenanceTypeFilterObjectSchema } from './EnumMaintenanceTypeFilter.schema';
import { MaintenanceTypeSchema } from '../enums/MaintenanceType.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { DateTimeNullableFilterObjectSchema as DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { DecimalNullableFilterObjectSchema as DecimalNullableFilterObjectSchema } from './DecimalNullableFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { EnumMaintenanceStatusFilterObjectSchema as EnumMaintenanceStatusFilterObjectSchema } from './EnumMaintenanceStatusFilter.schema';
import { MaintenanceStatusSchema } from '../enums/MaintenanceStatus.schema';
import { EquipmentScalarRelationFilterObjectSchema as EquipmentScalarRelationFilterObjectSchema } from './EquipmentScalarRelationFilter.schema';
import { EquipmentWhereInputObjectSchema as EquipmentWhereInputObjectSchema } from './EquipmentWhereInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const maintenancewhereinputSchema = z.object({
  AND: z.union([z.lazy(() => MaintenanceWhereInputObjectSchema), z.lazy(() => MaintenanceWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => MaintenanceWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => MaintenanceWhereInputObjectSchema), z.lazy(() => MaintenanceWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  equipmentId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  type: z.union([z.lazy(() => EnumMaintenanceTypeFilterObjectSchema), MaintenanceTypeSchema]).optional(),
  scheduledAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  completedAt: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  cost: z.union([z.lazy(() => DecimalNullableFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'cost' must be a Decimal",
})]).optional().nullable(),
  laborCost: z.union([z.lazy(() => DecimalNullableFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'laborCost' must be a Decimal",
})]).optional().nullable(),
  partsCost: z.union([z.lazy(() => DecimalNullableFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'partsCost' must be a Decimal",
})]).optional().nullable(),
  description: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  notes: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  technician: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  status: z.union([z.lazy(() => EnumMaintenanceStatusFilterObjectSchema), MaintenanceStatusSchema]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  equipment: z.union([z.lazy(() => EquipmentScalarRelationFilterObjectSchema), z.lazy(() => EquipmentWhereInputObjectSchema)]).optional()
}).strict();
export const MaintenanceWhereInputObjectSchema: z.ZodType<Prisma.MaintenanceWhereInput> = maintenancewhereinputSchema as unknown as z.ZodType<Prisma.MaintenanceWhereInput>;
export const MaintenanceWhereInputObjectZodSchema = maintenancewhereinputSchema;
