import * as z from 'zod';
import { Prisma } from '@prisma/client';
import Decimal from 'decimal.js';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { StringNullableWithAggregatesFilterObjectSchema as StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema';
import { DecimalWithAggregatesFilterObjectSchema as DecimalWithAggregatesFilterObjectSchema } from './DecimalWithAggregatesFilter.schema';
import { StringNullableListFilterObjectSchema as StringNullableListFilterObjectSchema } from './StringNullableListFilter.schema';
import { BoolWithAggregatesFilterObjectSchema as BoolWithAggregatesFilterObjectSchema } from './BoolWithAggregatesFilter.schema';
import { UuidWithAggregatesFilterObjectSchema as UuidWithAggregatesFilterObjectSchema } from './UuidWithAggregatesFilter.schema';
import { JsonNullableWithAggregatesFilterObjectSchema as JsonNullableWithAggregatesFilterObjectSchema } from './JsonNullableWithAggregatesFilter.schema';
import { IntNullableWithAggregatesFilterObjectSchema as IntNullableWithAggregatesFilterObjectSchema } from './IntNullableWithAggregatesFilter.schema';
import { DecimalNullableWithAggregatesFilterObjectSchema as DecimalNullableWithAggregatesFilterObjectSchema } from './DecimalNullableWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const equipmentscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => EquipmentScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => EquipmentScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => EquipmentScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => EquipmentScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => EquipmentScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  description: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  pricePerDay: z.union([z.lazy(() => DecimalWithAggregatesFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'pricePerDay' must be a Decimal",
})]).optional(),
  images: z.lazy(() => StringNullableListFilterObjectSchema).optional(),
  available: z.union([z.lazy(() => BoolWithAggregatesFilterObjectSchema), z.boolean()]).optional(),
  categoryId: z.union([z.lazy(() => UuidWithAggregatesFilterObjectSchema), z.string()]).optional(),
  specifications: z.lazy(() => JsonNullableWithAggregatesFilterObjectSchema).optional(),
  maxStock: z.union([z.lazy(() => IntNullableWithAggregatesFilterObjectSchema), z.number().int()]).optional().nullable(),
  dailyDiscount: z.union([z.lazy(() => IntNullableWithAggregatesFilterObjectSchema), z.number().int()]).optional().nullable(),
  weeklyDiscount: z.union([z.lazy(() => IntNullableWithAggregatesFilterObjectSchema), z.number().int()]).optional().nullable(),
  biweeklyDiscount: z.union([z.lazy(() => IntNullableWithAggregatesFilterObjectSchema), z.number().int()]).optional().nullable(),
  monthlyDiscount: z.union([z.lazy(() => IntNullableWithAggregatesFilterObjectSchema), z.number().int()]).optional().nullable(),
  popularPeriod: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  dailyDirectValue: z.union([z.lazy(() => DecimalNullableWithAggregatesFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'dailyDirectValue' must be a Decimal",
})]).optional().nullable(),
  weeklyDirectValue: z.union([z.lazy(() => DecimalNullableWithAggregatesFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'weeklyDirectValue' must be a Decimal",
})]).optional().nullable(),
  biweeklyDirectValue: z.union([z.lazy(() => DecimalNullableWithAggregatesFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'biweeklyDirectValue' must be a Decimal",
})]).optional().nullable(),
  monthlyDirectValue: z.union([z.lazy(() => DecimalNullableWithAggregatesFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'monthlyDirectValue' must be a Decimal",
})]).optional().nullable(),
  dailyUseDirectValue: z.union([z.lazy(() => BoolWithAggregatesFilterObjectSchema), z.boolean()]).optional(),
  weeklyUseDirectValue: z.union([z.lazy(() => BoolWithAggregatesFilterObjectSchema), z.boolean()]).optional(),
  biweeklyUseDirectValue: z.union([z.lazy(() => BoolWithAggregatesFilterObjectSchema), z.boolean()]).optional(),
  monthlyUseDirectValue: z.union([z.lazy(() => BoolWithAggregatesFilterObjectSchema), z.boolean()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const EquipmentScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.EquipmentScalarWhereWithAggregatesInput> = equipmentscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.EquipmentScalarWhereWithAggregatesInput>;
export const EquipmentScalarWhereWithAggregatesInputObjectZodSchema = equipmentscalarwherewithaggregatesinputSchema;
