/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import { Prisma } from '@prisma/client';
import Decimal from 'decimal.js';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { DecimalFieldUpdateOperationsInputObjectSchema as DecimalFieldUpdateOperationsInputObjectSchema } from './DecimalFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema as NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema';
import { NullableIntFieldUpdateOperationsInputObjectSchema as NullableIntFieldUpdateOperationsInputObjectSchema } from './NullableIntFieldUpdateOperationsInput.schema';
import { NullableDecimalFieldUpdateOperationsInputObjectSchema as NullableDecimalFieldUpdateOperationsInputObjectSchema } from './NullableDecimalFieldUpdateOperationsInput.schema';
import { ContractUpdateOneWithoutRentalNestedInputObjectSchema as ContractUpdateOneWithoutRentalNestedInputObjectSchema } from './ContractUpdateOneWithoutRentalNestedInput.schema';
import { DeliveryUpdateManyWithoutRentalNestedInputObjectSchema as DeliveryUpdateManyWithoutRentalNestedInputObjectSchema } from './DeliveryUpdateManyWithoutRentalNestedInput.schema';
import { PaymentUpdateManyWithoutRentalNestedInputObjectSchema as PaymentUpdateManyWithoutRentalNestedInputObjectSchema } from './PaymentUpdateManyWithoutRentalNestedInput.schema';
import { rental_itemsUpdateManyWithoutRentalsNestedInputObjectSchema as rental_itemsUpdateManyWithoutRentalsNestedInputObjectSchema } from './rental_itemsUpdateManyWithoutRentalsNestedInput.schema';
import { UserUpdateOneRequiredWithoutRentalsNestedInputObjectSchema as UserUpdateOneRequiredWithoutRentalsNestedInputObjectSchema } from './UserUpdateOneRequiredWithoutRentalsNestedInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  startdate: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  enddate: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  total: z.union([z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'total' must be a Decimal",
}), z.lazy(() => DecimalFieldUpdateOperationsInputObjectSchema)]).optional(),
  status: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  createdat: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  updatedat: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  checkInAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  checkOutAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  extensionDays: z.union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  extensionFee: z.union([z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'extensionFee' must be a Decimal",
}), z.lazy(() => NullableDecimalFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  lateFee: z.union([z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'lateFee' must be a Decimal",
}), z.lazy(() => NullableDecimalFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  notes: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  contract: z.lazy(() => ContractUpdateOneWithoutRentalNestedInputObjectSchema).optional(),
  deliveries: z.lazy(() => DeliveryUpdateManyWithoutRentalNestedInputObjectSchema).optional(),
  payments: z.lazy(() => PaymentUpdateManyWithoutRentalNestedInputObjectSchema).optional(),
  rental_items: z.lazy(() => rental_itemsUpdateManyWithoutRentalsNestedInputObjectSchema).optional(),
  users: z.lazy(() => UserUpdateOneRequiredWithoutRentalsNestedInputObjectSchema).optional()
}).strict();
export const rentalsUpdateWithoutQuoteInputObjectSchema: z.ZodType<Prisma.rentalsUpdateWithoutQuoteInput> = makeSchema() as unknown as z.ZodType<Prisma.rentalsUpdateWithoutQuoteInput>;
export const rentalsUpdateWithoutQuoteInputObjectZodSchema = makeSchema();
