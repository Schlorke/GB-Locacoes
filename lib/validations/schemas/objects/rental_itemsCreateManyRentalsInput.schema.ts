import * as z from 'zod';
import { Prisma } from '@prisma/client';
import Decimal from 'decimal.js';


import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string(),
  equipmentid: z.string(),
  quantity: z.number().int().optional(),
  priceperday: z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'priceperday' must be a Decimal",
}),
  totaldays: z.number().int(),
  totalprice: z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'totalprice' must be a Decimal",
}),
  createdat: z.coerce.date().optional().nullable(),
  updatedat: z.coerce.date().optional().nullable()
}).strict();
export const rental_itemsCreateManyRentalsInputObjectSchema: z.ZodType<Prisma.rental_itemsCreateManyRentalsInput> = makeSchema() as unknown as z.ZodType<Prisma.rental_itemsCreateManyRentalsInput>;
export const rental_itemsCreateManyRentalsInputObjectZodSchema = makeSchema();
