/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import { Prisma } from '@prisma/client';
import Decimal from 'decimal.js';
import { DeliveryUncheckedCreateNestedManyWithoutRentalInputObjectSchema as DeliveryUncheckedCreateNestedManyWithoutRentalInputObjectSchema } from './DeliveryUncheckedCreateNestedManyWithoutRentalInput.schema';
import { PaymentUncheckedCreateNestedManyWithoutRentalInputObjectSchema as PaymentUncheckedCreateNestedManyWithoutRentalInputObjectSchema } from './PaymentUncheckedCreateNestedManyWithoutRentalInput.schema';
import { rental_itemsUncheckedCreateNestedManyWithoutRentalsInputObjectSchema as rental_itemsUncheckedCreateNestedManyWithoutRentalsInputObjectSchema } from './rental_itemsUncheckedCreateNestedManyWithoutRentalsInput.schema'

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
  quoteId: z.string().optional().nullable(),
  deliveries: z.lazy(() => DeliveryUncheckedCreateNestedManyWithoutRentalInputObjectSchema).optional(),
  payments: z.lazy(() => PaymentUncheckedCreateNestedManyWithoutRentalInputObjectSchema).optional(),
  rental_items: z.lazy(() => rental_itemsUncheckedCreateNestedManyWithoutRentalsInputObjectSchema).optional()
}).strict();
export const rentalsUncheckedCreateWithoutContractInputObjectSchema: z.ZodType<Prisma.rentalsUncheckedCreateWithoutContractInput> = makeSchema() as unknown as z.ZodType<Prisma.rentalsUncheckedCreateWithoutContractInput>;
export const rentalsUncheckedCreateWithoutContractInputObjectZodSchema = makeSchema();
