/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import { Prisma } from '@prisma/client';
import Decimal from 'decimal.js';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { StringNullableWithAggregatesFilterObjectSchema as StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema';
import { DecimalWithAggregatesFilterObjectSchema as DecimalWithAggregatesFilterObjectSchema } from './DecimalWithAggregatesFilter.schema';
import { EnumQuoteStatusWithAggregatesFilterObjectSchema as EnumQuoteStatusWithAggregatesFilterObjectSchema } from './EnumQuoteStatusWithAggregatesFilter.schema';
import { QuoteStatusSchema } from '../enums/QuoteStatus.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const quotescalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => QuoteScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => QuoteScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => QuoteScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => QuoteScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => QuoteScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  email: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  phone: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  company: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  message: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  total: z.union([z.lazy(() => DecimalWithAggregatesFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: 'Field 'total' must be a Decimal',
})]).optional(),
  status: z.union([z.lazy(() => EnumQuoteStatusWithAggregatesFilterObjectSchema), QuoteStatusSchema]).optional(),
  userId: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const QuoteScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.QuoteScalarWhereWithAggregatesInput> = quotescalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.QuoteScalarWhereWithAggregatesInput>;
export const QuoteScalarWhereWithAggregatesInputObjectZodSchema = quotescalarwherewithaggregatesinputSchema;
