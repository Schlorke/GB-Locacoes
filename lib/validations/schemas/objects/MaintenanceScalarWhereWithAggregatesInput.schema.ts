import * as z from 'zod';
import { Prisma } from '@prisma/client';
import Decimal from 'decimal.js';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { EnumMaintenanceTypeWithAggregatesFilterObjectSchema as EnumMaintenanceTypeWithAggregatesFilterObjectSchema } from './EnumMaintenanceTypeWithAggregatesFilter.schema';
import { MaintenanceTypeSchema } from '../enums/MaintenanceType.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema';
import { DateTimeNullableWithAggregatesFilterObjectSchema as DateTimeNullableWithAggregatesFilterObjectSchema } from './DateTimeNullableWithAggregatesFilter.schema';
import { DecimalNullableWithAggregatesFilterObjectSchema as DecimalNullableWithAggregatesFilterObjectSchema } from './DecimalNullableWithAggregatesFilter.schema';
import { StringNullableWithAggregatesFilterObjectSchema as StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema';
import { EnumMaintenanceStatusWithAggregatesFilterObjectSchema as EnumMaintenanceStatusWithAggregatesFilterObjectSchema } from './EnumMaintenanceStatusWithAggregatesFilter.schema';
import { MaintenanceStatusSchema } from '../enums/MaintenanceStatus.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const maintenancescalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => MaintenanceScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => MaintenanceScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => MaintenanceScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => MaintenanceScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => MaintenanceScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  equipmentId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  type: z.union([z.lazy(() => EnumMaintenanceTypeWithAggregatesFilterObjectSchema), MaintenanceTypeSchema]).optional(),
  scheduledAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  completedAt: z.union([z.lazy(() => DateTimeNullableWithAggregatesFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  cost: z.union([z.lazy(() => DecimalNullableWithAggregatesFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'cost' must be a Decimal",
})]).optional().nullable(),
  laborCost: z.union([z.lazy(() => DecimalNullableWithAggregatesFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'laborCost' must be a Decimal",
})]).optional().nullable(),
  partsCost: z.union([z.lazy(() => DecimalNullableWithAggregatesFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'partsCost' must be a Decimal",
})]).optional().nullable(),
  description: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  notes: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  technician: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  status: z.union([z.lazy(() => EnumMaintenanceStatusWithAggregatesFilterObjectSchema), MaintenanceStatusSchema]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const MaintenanceScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.MaintenanceScalarWhereWithAggregatesInput> = maintenancescalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.MaintenanceScalarWhereWithAggregatesInput>;
export const MaintenanceScalarWhereWithAggregatesInputObjectZodSchema = maintenancescalarwherewithaggregatesinputSchema;
