import * as z from 'zod';
import { Prisma } from '@prisma/client';
import Decimal from 'decimal.js';
import { EquipmentCreateimagesInputObjectSchema as EquipmentCreateimagesInputObjectSchema } from './EquipmentCreateimagesInput.schema';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { CategoryCreateNestedOneWithoutEquipmentsInputObjectSchema as CategoryCreateNestedOneWithoutEquipmentsInputObjectSchema } from './CategoryCreateNestedOneWithoutEquipmentsInput.schema';
import { QuoteItemCreateNestedManyWithoutEquipmentInputObjectSchema as QuoteItemCreateNestedManyWithoutEquipmentInputObjectSchema } from './QuoteItemCreateNestedManyWithoutEquipmentInput.schema';
import { CartItemCreateNestedManyWithoutEquipmentInputObjectSchema as CartItemCreateNestedManyWithoutEquipmentInputObjectSchema } from './CartItemCreateNestedManyWithoutEquipmentInput.schema'

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
  specifications: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  maxStock: z.number().int().optional().nullable(),
  dailyDiscount: z.number().int().optional().nullable(),
  weeklyDiscount: z.number().int().optional().nullable(),
  biweeklyDiscount: z.number().int().optional().nullable(),
  monthlyDiscount: z.number().int().optional().nullable(),
  popularPeriod: z.string().optional().nullable(),
  dailyDirectValue: z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'dailyDirectValue' must be a Decimal",
}).optional().nullable(),
  weeklyDirectValue: z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'weeklyDirectValue' must be a Decimal",
}).optional().nullable(),
  biweeklyDirectValue: z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'biweeklyDirectValue' must be a Decimal",
}).optional().nullable(),
  monthlyDirectValue: z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'monthlyDirectValue' must be a Decimal",
}).optional().nullable(),
  dailyUseDirectValue: z.boolean().optional(),
  weeklyUseDirectValue: z.boolean().optional(),
  biweeklyUseDirectValue: z.boolean().optional(),
  monthlyUseDirectValue: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  category: z.lazy(() => CategoryCreateNestedOneWithoutEquipmentsInputObjectSchema),
  quoteItems: z.lazy(() => QuoteItemCreateNestedManyWithoutEquipmentInputObjectSchema).optional(),
  cartItems: z.lazy(() => CartItemCreateNestedManyWithoutEquipmentInputObjectSchema).optional()
}).strict();
export const EquipmentCreateWithoutRental_itemsInputObjectSchema: z.ZodType<Prisma.EquipmentCreateWithoutRental_itemsInput> = makeSchema() as unknown as z.ZodType<Prisma.EquipmentCreateWithoutRental_itemsInput>;
export const EquipmentCreateWithoutRental_itemsInputObjectZodSchema = makeSchema();
