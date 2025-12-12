/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import { Prisma } from '@prisma/client';
import Decimal from 'decimal.js';
import { PaymentMethodSchema } from '../enums/PaymentMethod.schema';
import { PaymentStatusSchema } from '../enums/PaymentStatus.schema';
import { PaymentTypeSchema } from '../enums/PaymentType.schema';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string().optional(),
  rentalId: z.string().optional().nullable(),
  amount: z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'amount' must be a Decimal",
}),
  method: PaymentMethodSchema,
  status: PaymentStatusSchema.optional(),
  type: PaymentTypeSchema.optional(),
  paidAt: z.coerce.date().optional().nullable(),
  dueDate: z.coerce.date(),
  invoiceNumber: z.string().optional().nullable(),
  transactionId: z.string().optional().nullable(),
  pixCode: z.string().optional().nullable(),
  pixQrCode: z.string().optional().nullable(),
  metadata: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const PaymentUncheckedCreateWithoutQuoteInputObjectSchema: z.ZodType<Prisma.PaymentUncheckedCreateWithoutQuoteInput> = makeSchema() as unknown as z.ZodType<Prisma.PaymentUncheckedCreateWithoutQuoteInput>;
export const PaymentUncheckedCreateWithoutQuoteInputObjectZodSchema = makeSchema();
