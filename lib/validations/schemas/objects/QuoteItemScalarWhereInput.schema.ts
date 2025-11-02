import * as z from 'zod';
import { Prisma } from '@prisma/client';
import Decimal from 'decimal.js';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { DecimalFilterObjectSchema as DecimalFilterObjectSchema } from './DecimalFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const quoteitemscalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => QuoteItemScalarWhereInputObjectSchema), z.lazy(() => QuoteItemScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => QuoteItemScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => QuoteItemScalarWhereInputObjectSchema), z.lazy(() => QuoteItemScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  quoteId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
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
  total: z.union([z.lazy(() => DecimalFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'total' must be a Decimal",
})]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const QuoteItemScalarWhereInputObjectSchema: z.ZodType<Prisma.QuoteItemScalarWhereInput> = quoteitemscalarwhereinputSchema as unknown as z.ZodType<Prisma.QuoteItemScalarWhereInput>;
export const QuoteItemScalarWhereInputObjectZodSchema = quoteitemscalarwhereinputSchema;
