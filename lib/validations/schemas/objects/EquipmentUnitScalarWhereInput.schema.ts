import * as z from 'zod';
import { Prisma } from '@prisma/client';
import Decimal from 'decimal.js';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { EnumEquipmentUnitStatusFilterObjectSchema as EnumEquipmentUnitStatusFilterObjectSchema } from './EnumEquipmentUnitStatusFilter.schema';
import { EquipmentUnitStatusSchema } from '../enums/EquipmentUnitStatus.schema';
import { DecimalNullableFilterObjectSchema as DecimalNullableFilterObjectSchema } from './DecimalNullableFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const equipmentunitscalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => EquipmentUnitScalarWhereInputObjectSchema), z.lazy(() => EquipmentUnitScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => EquipmentUnitScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => EquipmentUnitScalarWhereInputObjectSchema), z.lazy(() => EquipmentUnitScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  equipmentId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  uniqueCode: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  status: z.union([z.lazy(() => EnumEquipmentUnitStatusFilterObjectSchema), EquipmentUnitStatusSchema]).optional(),
  hourMeter: z.union([z.lazy(() => DecimalNullableFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'hourMeter' must be a Decimal",
})]).optional().nullable(),
  odometer: z.union([z.lazy(() => DecimalNullableFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'odometer' must be a Decimal",
})]).optional().nullable(),
  serialNumber: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  notes: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const EquipmentUnitScalarWhereInputObjectSchema: z.ZodType<Prisma.EquipmentUnitScalarWhereInput> = equipmentunitscalarwhereinputSchema as unknown as z.ZodType<Prisma.EquipmentUnitScalarWhereInput>;
export const EquipmentUnitScalarWhereInputObjectZodSchema = equipmentunitscalarwhereinputSchema;
