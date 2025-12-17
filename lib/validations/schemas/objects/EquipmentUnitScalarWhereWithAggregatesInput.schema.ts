import * as z from 'zod';
import { Prisma } from '@prisma/client';
import Decimal from 'decimal.js';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { EnumEquipmentUnitStatusWithAggregatesFilterObjectSchema as EnumEquipmentUnitStatusWithAggregatesFilterObjectSchema } from './EnumEquipmentUnitStatusWithAggregatesFilter.schema';
import { EquipmentUnitStatusSchema } from '../enums/EquipmentUnitStatus.schema';
import { DecimalNullableWithAggregatesFilterObjectSchema as DecimalNullableWithAggregatesFilterObjectSchema } from './DecimalNullableWithAggregatesFilter.schema';
import { StringNullableWithAggregatesFilterObjectSchema as StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const equipmentunitscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => EquipmentUnitScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => EquipmentUnitScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => EquipmentUnitScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => EquipmentUnitScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => EquipmentUnitScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  equipmentId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  uniqueCode: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  status: z.union([z.lazy(() => EnumEquipmentUnitStatusWithAggregatesFilterObjectSchema), EquipmentUnitStatusSchema]).optional(),
  hourMeter: z.union([z.lazy(() => DecimalNullableWithAggregatesFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'hourMeter' must be a Decimal",
})]).optional().nullable(),
  odometer: z.union([z.lazy(() => DecimalNullableWithAggregatesFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'odometer' must be a Decimal",
})]).optional().nullable(),
  serialNumber: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  notes: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const EquipmentUnitScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.EquipmentUnitScalarWhereWithAggregatesInput> = equipmentunitscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.EquipmentUnitScalarWhereWithAggregatesInput>;
export const EquipmentUnitScalarWhereWithAggregatesInputObjectZodSchema = equipmentunitscalarwherewithaggregatesinputSchema;
