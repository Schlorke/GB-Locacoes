import * as z from 'zod';
import { Prisma } from '@prisma/client';
import Decimal from 'decimal.js';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DecimalFilterObjectSchema as DecimalFilterObjectSchema } from './DecimalFilter.schema';
import { StringNullableListFilterObjectSchema as StringNullableListFilterObjectSchema } from './StringNullableListFilter.schema';
import { BoolFilterObjectSchema as BoolFilterObjectSchema } from './BoolFilter.schema';
import { UuidFilterObjectSchema as UuidFilterObjectSchema } from './UuidFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { IntNullableFilterObjectSchema as IntNullableFilterObjectSchema } from './IntNullableFilter.schema';
import { JsonNullableFilterObjectSchema as JsonNullableFilterObjectSchema } from './JsonNullableFilter.schema';
import { DecimalNullableFilterObjectSchema as DecimalNullableFilterObjectSchema } from './DecimalNullableFilter.schema';
import { DateTimeNullableFilterObjectSchema as DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { CartItemListRelationFilterObjectSchema as CartItemListRelationFilterObjectSchema } from './CartItemListRelationFilter.schema';
import { EquipmentUnitListRelationFilterObjectSchema as EquipmentUnitListRelationFilterObjectSchema } from './EquipmentUnitListRelationFilter.schema';
import { CategoryScalarRelationFilterObjectSchema as CategoryScalarRelationFilterObjectSchema } from './CategoryScalarRelationFilter.schema';
import { CategoryWhereInputObjectSchema as CategoryWhereInputObjectSchema } from './CategoryWhereInput.schema';
import { MaintenanceListRelationFilterObjectSchema as MaintenanceListRelationFilterObjectSchema } from './MaintenanceListRelationFilter.schema';
import { QuoteItemListRelationFilterObjectSchema as QuoteItemListRelationFilterObjectSchema } from './QuoteItemListRelationFilter.schema';
import { Rental_itemsListRelationFilterObjectSchema as Rental_itemsListRelationFilterObjectSchema } from './Rental_itemsListRelationFilter.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const equipmentwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => EquipmentWhereInputObjectSchema), z.lazy(() => EquipmentWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => EquipmentWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => EquipmentWhereInputObjectSchema), z.lazy(() => EquipmentWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  description: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  pricePerDay: z.union([z.lazy(() => DecimalFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'pricePerDay' must be a Decimal",
})]).optional(),
  images: z.lazy(() => StringNullableListFilterObjectSchema).optional(),
  available: z.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()]).optional(),
  categoryId: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  biweeklyDiscount: z.union([z.lazy(() => IntNullableFilterObjectSchema), z.number().int()]).optional().nullable(),
  dailyDiscount: z.union([z.lazy(() => IntNullableFilterObjectSchema), z.number().int()]).optional().nullable(),
  maxStock: z.union([z.lazy(() => IntNullableFilterObjectSchema), z.number().int()]).optional().nullable(),
  monthlyDiscount: z.union([z.lazy(() => IntNullableFilterObjectSchema), z.number().int()]).optional().nullable(),
  popularPeriod: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  weeklyDiscount: z.union([z.lazy(() => IntNullableFilterObjectSchema), z.number().int()]).optional().nullable(),
  specifications: z.lazy(() => JsonNullableFilterObjectSchema).optional(),
  biweeklyDirectValue: z.union([z.lazy(() => DecimalNullableFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'biweeklyDirectValue' must be a Decimal",
})]).optional().nullable(),
  biweeklyUseDirectValue: z.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()]).optional(),
  dailyDirectValue: z.union([z.lazy(() => DecimalNullableFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'dailyDirectValue' must be a Decimal",
})]).optional().nullable(),
  dailyUseDirectValue: z.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()]).optional(),
  monthlyDirectValue: z.union([z.lazy(() => DecimalNullableFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'monthlyDirectValue' must be a Decimal",
})]).optional().nullable(),
  monthlyUseDirectValue: z.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()]).optional(),
  weeklyDirectValue: z.union([z.lazy(() => DecimalNullableFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'weeklyDirectValue' must be a Decimal",
})]).optional().nullable(),
  weeklyUseDirectValue: z.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()]).optional(),
  depreciationRate: z.union([z.lazy(() => DecimalNullableFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'depreciationRate' must be a Decimal",
})]).optional().nullable(),
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
  purchaseDate: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  purchasePrice: z.union([z.lazy(() => DecimalNullableFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'purchasePrice' must be a Decimal",
})]).optional().nullable(),
  partsLossHistory: z.lazy(() => JsonNullableFilterObjectSchema).optional(),
  partsLossCount: z.union([z.lazy(() => IntNullableFilterObjectSchema), z.number().int()]).optional().nullable(),
  cartItems: z.lazy(() => CartItemListRelationFilterObjectSchema).optional(),
  units: z.lazy(() => EquipmentUnitListRelationFilterObjectSchema).optional(),
  category: z.union([z.lazy(() => CategoryScalarRelationFilterObjectSchema), z.lazy(() => CategoryWhereInputObjectSchema)]).optional(),
  maintenances: z.lazy(() => MaintenanceListRelationFilterObjectSchema).optional(),
  quoteItems: z.lazy(() => QuoteItemListRelationFilterObjectSchema).optional(),
  rental_items: z.lazy(() => Rental_itemsListRelationFilterObjectSchema).optional()
}).strict();
export const EquipmentWhereInputObjectSchema: z.ZodType<Prisma.EquipmentWhereInput> = equipmentwhereinputSchema as unknown as z.ZodType<Prisma.EquipmentWhereInput>;
export const EquipmentWhereInputObjectZodSchema = equipmentwhereinputSchema;
