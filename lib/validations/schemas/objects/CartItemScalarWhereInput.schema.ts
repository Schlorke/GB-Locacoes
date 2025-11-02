/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import { Prisma } from '@prisma/client';
import Decimal from 'decimal.js';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { DecimalFilterObjectSchema as DecimalFilterObjectSchema } from './DecimalFilter.schema';
import { DecimalNullableFilterObjectSchema as DecimalNullableFilterObjectSchema } from './DecimalNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const cartitemscalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => CartItemScalarWhereInputObjectSchema), z.lazy(() => CartItemScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => CartItemScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => CartItemScalarWhereInputObjectSchema), z.lazy(() => CartItemScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  cartId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  equipmentId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  quantity: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  days: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  pricePerDay: z.union([z.lazy(() => DecimalFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'pricePerDay' must be a Decimal",
})]).optional(),
  finalPrice: z.union([z.lazy(() => DecimalNullableFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'finalPrice' must be a Decimal",
})]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const CartItemScalarWhereInputObjectSchema: z.ZodType<Prisma.CartItemScalarWhereInput> = cartitemscalarwhereinputSchema as unknown as z.ZodType<Prisma.CartItemScalarWhereInput>;
export const CartItemScalarWhereInputObjectZodSchema = cartitemscalarwhereinputSchema;
