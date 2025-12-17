/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import { Prisma } from '@prisma/client';
import Decimal from 'decimal.js';
import { QuoteStatusSchema } from '../enums/QuoteStatus.schema';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { DeliveryTypeSchema } from '../enums/DeliveryType.schema';
import { PaymentUncheckedCreateNestedManyWithoutQuoteInputObjectSchema as PaymentUncheckedCreateNestedManyWithoutQuoteInputObjectSchema } from './PaymentUncheckedCreateNestedManyWithoutQuoteInput.schema';
import { QuoteItemUncheckedCreateNestedManyWithoutQuoteInputObjectSchema as QuoteItemUncheckedCreateNestedManyWithoutQuoteInputObjectSchema } from './QuoteItemUncheckedCreateNestedManyWithoutQuoteInput.schema';
import { rentalsUncheckedCreateNestedManyWithoutQuoteInputObjectSchema as rentalsUncheckedCreateNestedManyWithoutQuoteInputObjectSchema } from './rentalsUncheckedCreateNestedManyWithoutQuoteInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  company: z.string().optional().nullable(),
  message: z.string().optional().nullable(),
  total: z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'total' must be a Decimal",
}).optional(),
  status: QuoteStatusSchema.optional(),
  userId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  cep: z.string().optional().nullable(),
  cnpj: z.string().optional().nullable(),
  cpf: z.string().optional().nullable(),
  adminNotes: z.string().optional().nullable(),
  approvedAt: z.coerce.date().optional().nullable(),
  approvedBy: z.string().optional().nullable(),
  convertedToRentalId: z.string().optional().nullable(),
  deliveryAddress: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  deliveryFee: z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'deliveryFee' must be a Decimal",
}).optional().nullable(),
  deliveryType: DeliveryTypeSchema.optional().nullable(),
  deposit: z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'deposit' must be a Decimal",
}).optional().nullable(),
  discount: z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'discount' must be a Decimal",
}).optional().nullable(),
  endDate: z.coerce.date().optional().nullable(),
  finalTotal: z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'finalTotal' must be a Decimal",
}).optional().nullable(),
  internalNotes: z.string().optional().nullable(),
  pickupFee: z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'pickupFee' must be a Decimal",
}).optional().nullable(),
  priority: z.number().int().optional().nullable(),
  rejectedAt: z.coerce.date().optional().nullable(),
  rejectionReason: z.string().optional().nullable(),
  startDate: z.coerce.date().optional().nullable(),
  subtotal: z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'subtotal' must be a Decimal",
}).optional().nullable(),
  taxes: z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'taxes' must be a Decimal",
}).optional().nullable(),
  validUntil: z.coerce.date().optional().nullable(),
  originalTotal: z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'originalTotal' must be a Decimal",
}).optional().nullable(),
  priceAdjustmentReason: z.string().optional().nullable(),
  priceAdjustedAt: z.coerce.date().optional().nullable(),
  priceAdjustedBy: z.string().optional().nullable(),
  lateFee: z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'lateFee' must be a Decimal",
}).optional().nullable(),
  lateFeeApproved: z.boolean().optional().nullable(),
  lateFeeApprovedAt: z.coerce.date().optional().nullable(),
  lateFeeApprovedBy: z.string().optional().nullable(),
  damages: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  misuse: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  payments: z.lazy(() => PaymentUncheckedCreateNestedManyWithoutQuoteInputObjectSchema).optional(),
  items: z.lazy(() => QuoteItemUncheckedCreateNestedManyWithoutQuoteInputObjectSchema).optional(),
  rentals: z.lazy(() => rentalsUncheckedCreateNestedManyWithoutQuoteInputObjectSchema).optional()
}).strict();
export const QuoteUncheckedCreateWithoutRejectedByUserInputObjectSchema: z.ZodType<Prisma.QuoteUncheckedCreateWithoutRejectedByUserInput> = makeSchema() as unknown as z.ZodType<Prisma.QuoteUncheckedCreateWithoutRejectedByUserInput>;
export const QuoteUncheckedCreateWithoutRejectedByUserInputObjectZodSchema = makeSchema();
