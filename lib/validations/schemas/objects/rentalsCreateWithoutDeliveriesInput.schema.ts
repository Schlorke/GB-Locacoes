/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import { Prisma } from '@prisma/client';
import Decimal from 'decimal.js';
import { ContractCreateNestedOneWithoutRentalInputObjectSchema as ContractCreateNestedOneWithoutRentalInputObjectSchema } from './ContractCreateNestedOneWithoutRentalInput.schema';
import { PaymentCreateNestedManyWithoutRentalInputObjectSchema as PaymentCreateNestedManyWithoutRentalInputObjectSchema } from './PaymentCreateNestedManyWithoutRentalInput.schema';
import { rental_itemsCreateNestedManyWithoutRentalsInputObjectSchema as rental_itemsCreateNestedManyWithoutRentalsInputObjectSchema } from './rental_itemsCreateNestedManyWithoutRentalsInput.schema';
import { QuoteCreateNestedOneWithoutRentalsInputObjectSchema as QuoteCreateNestedOneWithoutRentalsInputObjectSchema } from './QuoteCreateNestedOneWithoutRentalsInput.schema';
import { UserCreateNestedOneWithoutRentalsInputObjectSchema as UserCreateNestedOneWithoutRentalsInputObjectSchema } from './UserCreateNestedOneWithoutRentalsInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string(),
  startdate: z.coerce.date(),
  enddate: z.coerce.date(),
  total: z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'total' must be a Decimal",
}),
  status: z.string().optional().nullable(),
  createdat: z.coerce.date().optional().nullable(),
  updatedat: z.coerce.date().optional().nullable(),
  checkInAt: z.coerce.date().optional().nullable(),
  checkOutAt: z.coerce.date().optional().nullable(),
  extensionDays: z.number().int().optional().nullable(),
  extensionFee: z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'extensionFee' must be a Decimal",
}).optional().nullable(),
  lateFee: z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'lateFee' must be a Decimal",
}).optional().nullable(),
  notes: z.string().optional().nullable(),
  contract: z.lazy(() => ContractCreateNestedOneWithoutRentalInputObjectSchema).optional(),
  payments: z.lazy(() => PaymentCreateNestedManyWithoutRentalInputObjectSchema).optional(),
  rental_items: z.lazy(() => rental_itemsCreateNestedManyWithoutRentalsInputObjectSchema).optional(),
  quote: z.lazy(() => QuoteCreateNestedOneWithoutRentalsInputObjectSchema).optional(),
  users: z.lazy(() => UserCreateNestedOneWithoutRentalsInputObjectSchema)
}).strict();
export const rentalsCreateWithoutDeliveriesInputObjectSchema: z.ZodType<Prisma.rentalsCreateWithoutDeliveriesInput> = makeSchema() as unknown as z.ZodType<Prisma.rentalsCreateWithoutDeliveriesInput>;
export const rentalsCreateWithoutDeliveriesInputObjectZodSchema = makeSchema();
