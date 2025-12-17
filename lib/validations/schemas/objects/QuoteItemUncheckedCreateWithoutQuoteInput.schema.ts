import * as z from 'zod';
import { Prisma } from '@prisma/client';
import Decimal from 'decimal.js';


import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string().optional(),
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
  startDate: z.coerce.date().optional().nullable(),
  endDate: z.coerce.date().optional().nullable(),
  includeWeekends: z.boolean().optional(),
  appliedDiscount: z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'appliedDiscount' must be a Decimal",
}).optional().nullable(),
  appliedPeriod: z.string().optional().nullable(),
  useDirectValue: z.boolean().optional(),
  directValue: z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'directValue' must be a Decimal",
}).optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const QuoteItemUncheckedCreateWithoutQuoteInputObjectSchema: z.ZodType<Prisma.QuoteItemUncheckedCreateWithoutQuoteInput> = makeSchema() as unknown as z.ZodType<Prisma.QuoteItemUncheckedCreateWithoutQuoteInput>;
export const QuoteItemUncheckedCreateWithoutQuoteInputObjectZodSchema = makeSchema();
