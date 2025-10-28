/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import { Prisma } from '@prisma/client';
import Decimal from 'decimal.js';


import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string().optional(),
  equipmentId: z.string(),
  quantity: z.number().int(),
  days: z.number().int(),
  pricePerDay: z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: 'Field 'pricePerDay' must be a Decimal',
}),
  finalPrice: z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: 'Field 'finalPrice' must be a Decimal',
}).optional().nullable(),
  createdAt: z.coerce.date().optional()
}).strict();
export const CartItemUncheckedCreateWithoutCartInputObjectSchema: z.ZodType<Prisma.CartItemUncheckedCreateWithoutCartInput> = makeSchema() as unknown as z.ZodType<Prisma.CartItemUncheckedCreateWithoutCartInput>;
export const CartItemUncheckedCreateWithoutCartInputObjectZodSchema = makeSchema();
