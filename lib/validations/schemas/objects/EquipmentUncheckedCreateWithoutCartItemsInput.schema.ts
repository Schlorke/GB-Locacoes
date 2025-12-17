import * as z from 'zod';
import { Prisma } from '@prisma/client';
import Decimal from 'decimal.js';
import { EquipmentCreateimagesInputObjectSchema as EquipmentCreateimagesInputObjectSchema } from './EquipmentCreateimagesInput.schema';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { EquipmentUnitUncheckedCreateNestedManyWithoutEquipmentInputObjectSchema as EquipmentUnitUncheckedCreateNestedManyWithoutEquipmentInputObjectSchema } from './EquipmentUnitUncheckedCreateNestedManyWithoutEquipmentInput.schema';
import { MaintenanceUncheckedCreateNestedManyWithoutEquipmentInputObjectSchema as MaintenanceUncheckedCreateNestedManyWithoutEquipmentInputObjectSchema } from './MaintenanceUncheckedCreateNestedManyWithoutEquipmentInput.schema';
import { QuoteItemUncheckedCreateNestedManyWithoutEquipmentInputObjectSchema as QuoteItemUncheckedCreateNestedManyWithoutEquipmentInputObjectSchema } from './QuoteItemUncheckedCreateNestedManyWithoutEquipmentInput.schema';
import { rental_itemsUncheckedCreateNestedManyWithoutEquipmentsInputObjectSchema as rental_itemsUncheckedCreateNestedManyWithoutEquipmentsInputObjectSchema } from './rental_itemsUncheckedCreateNestedManyWithoutEquipmentsInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  pricePerDay: z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'pricePerDay' must be a Decimal",
}),
  images: z.union([z.lazy(() => EquipmentCreateimagesInputObjectSchema), z.string().array()]).optional(),
  available: z.boolean().optional(),
  categoryId: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  biweeklyDiscount: z.number().int().optional().nullable(),
  dailyDiscount: z.number().int().optional().nullable(),
  maxStock: z.number().int().optional().nullable(),
  monthlyDiscount: z.number().int().optional().nullable(),
  popularPeriod: z.string().optional().nullable(),
  weeklyDiscount: z.number().int().optional().nullable(),
  specifications: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  biweeklyDirectValue: z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'biweeklyDirectValue' must be a Decimal",
}).optional().nullable(),
  biweeklyUseDirectValue: z.boolean().optional(),
  dailyDirectValue: z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'dailyDirectValue' must be a Decimal",
}).optional().nullable(),
  dailyUseDirectValue: z.boolean().optional(),
  monthlyDirectValue: z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'monthlyDirectValue' must be a Decimal",
}).optional().nullable(),
  monthlyUseDirectValue: z.boolean().optional(),
  weeklyDirectValue: z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'weeklyDirectValue' must be a Decimal",
}).optional().nullable(),
  weeklyUseDirectValue: z.boolean().optional(),
  depreciationRate: z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'depreciationRate' must be a Decimal",
}).optional().nullable(),
  hourMeter: z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'hourMeter' must be a Decimal",
}).optional().nullable(),
  odometer: z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'odometer' must be a Decimal",
}).optional().nullable(),
  purchaseDate: z.coerce.date().optional().nullable(),
  purchasePrice: z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'purchasePrice' must be a Decimal",
}).optional().nullable(),
  partsLossHistory: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  partsLossCount: z.number().int().optional().nullable(),
  units: z.lazy(() => EquipmentUnitUncheckedCreateNestedManyWithoutEquipmentInputObjectSchema).optional(),
  maintenances: z.lazy(() => MaintenanceUncheckedCreateNestedManyWithoutEquipmentInputObjectSchema).optional(),
  quoteItems: z.lazy(() => QuoteItemUncheckedCreateNestedManyWithoutEquipmentInputObjectSchema).optional(),
  rental_items: z.lazy(() => rental_itemsUncheckedCreateNestedManyWithoutEquipmentsInputObjectSchema).optional()
}).strict();
export const EquipmentUncheckedCreateWithoutCartItemsInputObjectSchema: z.ZodType<Prisma.EquipmentUncheckedCreateWithoutCartItemsInput> = makeSchema() as unknown as z.ZodType<Prisma.EquipmentUncheckedCreateWithoutCartItemsInput>;
export const EquipmentUncheckedCreateWithoutCartItemsInputObjectZodSchema = makeSchema();
