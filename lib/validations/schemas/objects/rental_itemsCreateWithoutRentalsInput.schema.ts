/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import { Prisma } from '@prisma/client';
import Decimal from 'decimal.js';
import { EquipmentCreateNestedOneWithoutRental_itemsInputObjectSchema as EquipmentCreateNestedOneWithoutRental_itemsInputObjectSchema } from './EquipmentCreateNestedOneWithoutRental_itemsInput.schema'

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
  equipments: z.lazy(() => EquipmentCreateNestedOneWithoutRental_itemsInputObjectSchema)
}).strict();
export const rental_itemsCreateWithoutRentalsInputObjectSchema: z.ZodType<Prisma.rental_itemsCreateWithoutRentalsInput> = makeSchema() as unknown as z.ZodType<Prisma.rental_itemsCreateWithoutRentalsInput>;
export const rental_itemsCreateWithoutRentalsInputObjectZodSchema = makeSchema();
