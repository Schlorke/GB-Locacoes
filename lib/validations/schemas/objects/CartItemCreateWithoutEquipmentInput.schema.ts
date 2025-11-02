import * as z from 'zod';
import { Prisma } from '@prisma/client';
import Decimal from 'decimal.js';
import { CartCreateNestedOneWithoutItemsInputObjectSchema as CartCreateNestedOneWithoutItemsInputObjectSchema } from './CartCreateNestedOneWithoutItemsInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string().optional(),
  quantity: z.number().int(),
  days: z.number().int(),
  pricePerDay: z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'pricePerDay' must be a Decimal",
}),
  finalPrice: z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'finalPrice' must be a Decimal",
}).optional().nullable(),
  createdAt: z.coerce.date().optional(),
  cart: z.lazy(() => CartCreateNestedOneWithoutItemsInputObjectSchema)
}).strict();
export const CartItemCreateWithoutEquipmentInputObjectSchema: z.ZodType<Prisma.CartItemCreateWithoutEquipmentInput> = makeSchema() as unknown as z.ZodType<Prisma.CartItemCreateWithoutEquipmentInput>;
export const CartItemCreateWithoutEquipmentInputObjectZodSchema = makeSchema();
