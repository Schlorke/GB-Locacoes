import * as z from 'zod';
import { Prisma } from '@prisma/client';
import Decimal from 'decimal.js';
import { QuoteStatusSchema } from '../enums/QuoteStatus.schema';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { DeliveryTypeSchema } from '../enums/DeliveryType.schema';
import { PaymentCreateNestedManyWithoutQuoteInputObjectSchema as PaymentCreateNestedManyWithoutQuoteInputObjectSchema } from './PaymentCreateNestedManyWithoutQuoteInput.schema';
import { QuoteItemCreateNestedManyWithoutQuoteInputObjectSchema as QuoteItemCreateNestedManyWithoutQuoteInputObjectSchema } from './QuoteItemCreateNestedManyWithoutQuoteInput.schema';
import { UserCreateNestedOneWithoutApprovedQuotesInputObjectSchema as UserCreateNestedOneWithoutApprovedQuotesInputObjectSchema } from './UserCreateNestedOneWithoutApprovedQuotesInput.schema';
import { UserCreateNestedOneWithoutRejectedQuotesInputObjectSchema as UserCreateNestedOneWithoutRejectedQuotesInputObjectSchema } from './UserCreateNestedOneWithoutRejectedQuotesInput.schema';
import { UserCreateNestedOneWithoutQuotesInputObjectSchema as UserCreateNestedOneWithoutQuotesInputObjectSchema } from './UserCreateNestedOneWithoutQuotesInput.schema';
import { rentalsCreateNestedManyWithoutQuoteInputObjectSchema as rentalsCreateNestedManyWithoutQuoteInputObjectSchema } from './rentalsCreateNestedManyWithoutQuoteInput.schema'

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
  createdAt: z.coerce.date().optional(),
  cep: z.string().optional().nullable(),
  cnpj: z.string().optional().nullable(),
  cpf: z.string().optional().nullable(),
  adminNotes: z.string().optional().nullable(),
  approvedAt: z.coerce.date().optional().nullable(),
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
  payments: z.lazy(() => PaymentCreateNestedManyWithoutQuoteInputObjectSchema).optional(),
  items: z.lazy(() => QuoteItemCreateNestedManyWithoutQuoteInputObjectSchema).optional(),
  approvedByUser: z.lazy(() => UserCreateNestedOneWithoutApprovedQuotesInputObjectSchema).optional(),
  rejectedByUser: z.lazy(() => UserCreateNestedOneWithoutRejectedQuotesInputObjectSchema).optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutQuotesInputObjectSchema).optional(),
  rentals: z.lazy(() => rentalsCreateNestedManyWithoutQuoteInputObjectSchema).optional()
}).strict();
export const QuoteCreateInputObjectSchema: z.ZodType<Prisma.QuoteCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.QuoteCreateInput>;
export const QuoteCreateInputObjectZodSchema = makeSchema();
