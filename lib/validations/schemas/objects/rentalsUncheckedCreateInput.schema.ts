/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import { Prisma } from '@prisma/client';
import Decimal from 'decimal.js';
import { rental_itemsUncheckedCreateNestedManyWithoutRentalsInputObjectSchema as rental_itemsUncheckedCreateNestedManyWithoutRentalsInputObjectSchema } from './rental_itemsUncheckedCreateNestedManyWithoutRentalsInput.schema';
import { PaymentUncheckedCreateNestedManyWithoutRentalInputObjectSchema as PaymentUncheckedCreateNestedManyWithoutRentalInputObjectSchema } from './PaymentUncheckedCreateNestedManyWithoutRentalInput.schema';
import { DeliveryUncheckedCreateNestedManyWithoutRentalInputObjectSchema as DeliveryUncheckedCreateNestedManyWithoutRentalInputObjectSchema } from './DeliveryUncheckedCreateNestedManyWithoutRentalInput.schema';
import { ContractUncheckedCreateNestedOneWithoutRentalInputObjectSchema as ContractUncheckedCreateNestedOneWithoutRentalInputObjectSchema } from './ContractUncheckedCreateNestedOneWithoutRentalInput.schema'

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
  userid: z.string(),
  createdat: z.coerce.date().optional().nullable(),
  updatedat: z.coerce.date().optional().nullable(),
  quoteId: z.string().optional().nullable(),
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
  rental_items: z.lazy(() => rental_itemsUncheckedCreateNestedManyWithoutRentalsInputObjectSchema).optional(),
  payments: z.lazy(() => PaymentUncheckedCreateNestedManyWithoutRentalInputObjectSchema).optional(),
  deliveries: z.lazy(() => DeliveryUncheckedCreateNestedManyWithoutRentalInputObjectSchema).optional(),
  contract: z.lazy(() => ContractUncheckedCreateNestedOneWithoutRentalInputObjectSchema).optional()
}).strict();
export const rentalsUncheckedCreateInputObjectSchema: z.ZodType<Prisma.rentalsUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.rentalsUncheckedCreateInput>;
export const rentalsUncheckedCreateInputObjectZodSchema = makeSchema();
