/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import { Prisma } from '@prisma/client';
import Decimal from 'decimal.js';
import { EquipmentCreateimagesInputObjectSchema as EquipmentCreateimagesInputObjectSchema } from './EquipmentCreateimagesInput.schema';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { QuoteItemUncheckedCreateNestedManyWithoutEquipmentInputObjectSchema as QuoteItemUncheckedCreateNestedManyWithoutEquipmentInputObjectSchema } from './QuoteItemUncheckedCreateNestedManyWithoutEquipmentInput.schema';
import { rental_itemsUncheckedCreateNestedManyWithoutEquipmentsInputObjectSchema as rental_itemsUncheckedCreateNestedManyWithoutEquipmentsInputObjectSchema } from './rental_itemsUncheckedCreateNestedManyWithoutEquipmentsInput.schema';
import { CartItemUncheckedCreateNestedManyWithoutEquipmentInputObjectSchema as CartItemUncheckedCreateNestedManyWithoutEquipmentInputObjectSchema } from './CartItemUncheckedCreateNestedManyWithoutEquipmentInput.schema'

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
  message: 'Field 'pricePerDay' must be a Decimal',
}),
  images: z.union([z.lazy(() => EquipmentCreateimagesInputObjectSchema), z.string().array()]),
  available: z.boolean().optional(),
  categoryId: z.string(),
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
  message: 'Field 'dailyDirectValue' must be a Decimal',
}).optional().nullable(),
  weeklyDirectValue: z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: 'Field 'weeklyDirectValue' must be a Decimal',
}).optional().nullable(),
  biweeklyDirectValue: z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: 'Field 'biweeklyDirectValue' must be a Decimal',
}).optional().nullable(),
  monthlyDirectValue: z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: 'Field 'monthlyDirectValue' must be a Decimal',
}).optional().nullable(),
  dailyUseDirectValue: z.boolean().optional(),
  weeklyUseDirectValue: z.boolean().optional(),
  biweeklyUseDirectValue: z.boolean().optional(),
  monthlyUseDirectValue: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  quoteItems: z.lazy(() => QuoteItemUncheckedCreateNestedManyWithoutEquipmentInputObjectSchema),
  rental_items: z.lazy(() => rental_itemsUncheckedCreateNestedManyWithoutEquipmentsInputObjectSchema),
  cartItems: z.lazy(() => CartItemUncheckedCreateNestedManyWithoutEquipmentInputObjectSchema)
}).strict();
export const EquipmentUncheckedCreateInputObjectSchema: z.ZodType<Prisma.EquipmentUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.EquipmentUncheckedCreateInput>;
export const EquipmentUncheckedCreateInputObjectZodSchema = makeSchema();
