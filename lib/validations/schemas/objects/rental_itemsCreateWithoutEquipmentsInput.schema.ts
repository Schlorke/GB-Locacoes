/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import { Prisma } from '@prisma/client';
import Decimal from 'decimal.js';
import { rentalsCreateNestedOneWithoutRental_itemsInputObjectSchema as rentalsCreateNestedOneWithoutRental_itemsInputObjectSchema } from './rentalsCreateNestedOneWithoutRental_itemsInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string(),
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
  updatedat: z.coerce.date().optional().nullable(),
  rentals: z.lazy(() => rentalsCreateNestedOneWithoutRental_itemsInputObjectSchema)
}).strict();
export const rental_itemsCreateWithoutEquipmentsInputObjectSchema: z.ZodType<Prisma.rental_itemsCreateWithoutEquipmentsInput> = makeSchema() as unknown as z.ZodType<Prisma.rental_itemsCreateWithoutEquipmentsInput>;
export const rental_itemsCreateWithoutEquipmentsInputObjectZodSchema = makeSchema();
