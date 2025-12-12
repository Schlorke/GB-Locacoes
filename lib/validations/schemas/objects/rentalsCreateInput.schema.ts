/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import { Prisma } from '@prisma/client';
import Decimal from 'decimal.js';
import { QuoteCreateNestedOneWithoutRentalsInputObjectSchema as QuoteCreateNestedOneWithoutRentalsInputObjectSchema } from './QuoteCreateNestedOneWithoutRentalsInput.schema';
import { rental_itemsCreateNestedManyWithoutRentalsInputObjectSchema as rental_itemsCreateNestedManyWithoutRentalsInputObjectSchema } from './rental_itemsCreateNestedManyWithoutRentalsInput.schema';
import { UserCreateNestedOneWithoutRentalsInputObjectSchema as UserCreateNestedOneWithoutRentalsInputObjectSchema } from './UserCreateNestedOneWithoutRentalsInput.schema';
import { PaymentCreateNestedManyWithoutRentalInputObjectSchema as PaymentCreateNestedManyWithoutRentalInputObjectSchema } from './PaymentCreateNestedManyWithoutRentalInput.schema';
import { DeliveryCreateNestedManyWithoutRentalInputObjectSchema as DeliveryCreateNestedManyWithoutRentalInputObjectSchema } from './DeliveryCreateNestedManyWithoutRentalInput.schema';
import { ContractCreateNestedOneWithoutRentalInputObjectSchema as ContractCreateNestedOneWithoutRentalInputObjectSchema } from './ContractCreateNestedOneWithoutRentalInput.schema'

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
  lateFee: z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'lateFee' must be a Decimal",
}).optional().nullable(),
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
  checkInAt: z.coerce.date().optional().nullable(),
  checkOutAt: z.coerce.date().optional().nullable(),
  notes: z.string().optional().nullable(),
  quote: z.lazy(() => QuoteCreateNestedOneWithoutRentalsInputObjectSchema).optional(),
  rental_items: z.lazy(() => rental_itemsCreateNestedManyWithoutRentalsInputObjectSchema).optional(),
  users: z.lazy(() => UserCreateNestedOneWithoutRentalsInputObjectSchema),
  payments: z.lazy(() => PaymentCreateNestedManyWithoutRentalInputObjectSchema).optional(),
  deliveries: z.lazy(() => DeliveryCreateNestedManyWithoutRentalInputObjectSchema).optional(),
  contract: z.lazy(() => ContractCreateNestedOneWithoutRentalInputObjectSchema).optional()
}).strict();
export const rentalsCreateInputObjectSchema: z.ZodType<Prisma.rentalsCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.rentalsCreateInput>;
export const rentalsCreateInputObjectZodSchema = makeSchema();
