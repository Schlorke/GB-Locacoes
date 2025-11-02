/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import { Prisma } from '@prisma/client';
import Decimal from 'decimal.js';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DecimalFilterObjectSchema as DecimalFilterObjectSchema } from './DecimalFilter.schema';
import { EnumQuoteStatusFilterObjectSchema as EnumQuoteStatusFilterObjectSchema } from './EnumQuoteStatusFilter.schema';
import { QuoteStatusSchema } from '../enums/QuoteStatus.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { QuoteItemListRelationFilterObjectSchema as QuoteItemListRelationFilterObjectSchema } from './QuoteItemListRelationFilter.schema';
import { UserNullableScalarRelationFilterObjectSchema as UserNullableScalarRelationFilterObjectSchema } from './UserNullableScalarRelationFilter.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const quotewhereinputSchema = z.object({
  AND: z.union([z.lazy(() => QuoteWhereInputObjectSchema), z.lazy(() => QuoteWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => QuoteWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => QuoteWhereInputObjectSchema), z.lazy(() => QuoteWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  email: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  phone: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  company: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  message: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  total: z.union([z.lazy(() => DecimalFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'total' must be a Decimal",
})]).optional(),
  status: z.union([z.lazy(() => EnumQuoteStatusFilterObjectSchema), QuoteStatusSchema]).optional(),
  userId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  items: z.lazy(() => QuoteItemListRelationFilterObjectSchema).optional(),
  user: z.union([z.lazy(() => UserNullableScalarRelationFilterObjectSchema), z.lazy(() => UserWhereInputObjectSchema)]).optional()
}).strict();
export const QuoteWhereInputObjectSchema: z.ZodType<Prisma.QuoteWhereInput> = quotewhereinputSchema as unknown as z.ZodType<Prisma.QuoteWhereInput>;
export const QuoteWhereInputObjectZodSchema = quotewhereinputSchema;
