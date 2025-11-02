/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import { Prisma } from '@prisma/client';
import Decimal from 'decimal.js';


import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string().optional(),
  quoteId: z.string(),
  equipmentId: z.string(),
  quantity: z.number().int().optional(),
  days: z.number().int().optional(),
  pricePerDay: z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'pricePerDay' must be a Decimal",
}),
  total: z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'total' must be a Decimal",
}),
  createdAt: z.coerce.date().optional()
}).strict();
export const QuoteItemUncheckedCreateInputObjectSchema: z.ZodType<Prisma.QuoteItemUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.QuoteItemUncheckedCreateInput>;
export const QuoteItemUncheckedCreateInputObjectZodSchema = makeSchema();
