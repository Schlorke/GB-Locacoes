/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import { Prisma } from '@prisma/client';
import Decimal from 'decimal.js';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { DecimalFieldUpdateOperationsInputObjectSchema as DecimalFieldUpdateOperationsInputObjectSchema } from './DecimalFieldUpdateOperationsInput.schema';
import { EquipmentUpdateimagesInputObjectSchema as EquipmentUpdateimagesInputObjectSchema } from './EquipmentUpdateimagesInput.schema';
import { BoolFieldUpdateOperationsInputObjectSchema as BoolFieldUpdateOperationsInputObjectSchema } from './BoolFieldUpdateOperationsInput.schema';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { NullableIntFieldUpdateOperationsInputObjectSchema as NullableIntFieldUpdateOperationsInputObjectSchema } from './NullableIntFieldUpdateOperationsInput.schema';
import { NullableDecimalFieldUpdateOperationsInputObjectSchema as NullableDecimalFieldUpdateOperationsInputObjectSchema } from './NullableDecimalFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { CategoryUpdateOneRequiredWithoutEquipmentsNestedInputObjectSchema as CategoryUpdateOneRequiredWithoutEquipmentsNestedInputObjectSchema } from './CategoryUpdateOneRequiredWithoutEquipmentsNestedInput.schema';
import { QuoteItemUpdateManyWithoutEquipmentNestedInputObjectSchema as QuoteItemUpdateManyWithoutEquipmentNestedInputObjectSchema } from './QuoteItemUpdateManyWithoutEquipmentNestedInput.schema';
import { CartItemUpdateManyWithoutEquipmentNestedInputObjectSchema as CartItemUpdateManyWithoutEquipmentNestedInputObjectSchema } from './CartItemUpdateManyWithoutEquipmentNestedInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  description: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  pricePerDay: z.union([z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: 'Field 'pricePerDay' must be a Decimal',
}), z.lazy(() => DecimalFieldUpdateOperationsInputObjectSchema)]).optional(),
  images: z.union([z.lazy(() => EquipmentUpdateimagesInputObjectSchema), z.string().array()]).optional(),
  available: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema)]).optional(),
  specifications: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  maxStock: z.union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  dailyDiscount: z.union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  weeklyDiscount: z.union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  biweeklyDiscount: z.union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  monthlyDiscount: z.union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  popularPeriod: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  dailyDirectValue: z.union([z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: 'Field 'dailyDirectValue' must be a Decimal',
}), z.lazy(() => NullableDecimalFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  weeklyDirectValue: z.union([z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: 'Field 'weeklyDirectValue' must be a Decimal',
}), z.lazy(() => NullableDecimalFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  biweeklyDirectValue: z.union([z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: 'Field 'biweeklyDirectValue' must be a Decimal',
}), z.lazy(() => NullableDecimalFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  monthlyDirectValue: z.union([z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: 'Field 'monthlyDirectValue' must be a Decimal',
}), z.lazy(() => NullableDecimalFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  dailyUseDirectValue: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema)]).optional(),
  weeklyUseDirectValue: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema)]).optional(),
  biweeklyUseDirectValue: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema)]).optional(),
  monthlyUseDirectValue: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  category: z.lazy(() => CategoryUpdateOneRequiredWithoutEquipmentsNestedInputObjectSchema).optional(),
  quoteItems: z.lazy(() => QuoteItemUpdateManyWithoutEquipmentNestedInputObjectSchema).optional(),
  cartItems: z.lazy(() => CartItemUpdateManyWithoutEquipmentNestedInputObjectSchema).optional()
}).strict();
export const EquipmentUpdateWithoutRental_itemsInputObjectSchema: z.ZodType<Prisma.EquipmentUpdateWithoutRental_itemsInput> = makeSchema() as unknown as z.ZodType<Prisma.EquipmentUpdateWithoutRental_itemsInput>;
export const EquipmentUpdateWithoutRental_itemsInputObjectZodSchema = makeSchema();
