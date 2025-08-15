import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DecimalFilterObjectSchema } from './DecimalFilter.schema';
import { EnumQuoteStatusFilterObjectSchema } from './EnumQuoteStatusFilter.schema';
import { QuoteStatusSchema } from '../enums/QuoteStatus.schema';
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

export const QuoteScalarWhereInputObjectSchema: z.ZodType<Prisma.QuoteScalarWhereInput, Prisma.QuoteScalarWhereInput> = z.object({
  AND: z.union([z.lazy(() => QuoteScalarWhereInputObjectSchema), z.lazy(() => QuoteScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => QuoteScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => QuoteScalarWhereInputObjectSchema), z.lazy(() => QuoteScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  email: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  phone: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  company: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  message: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  total: z.union([z.lazy(() => DecimalFilterObjectSchema), z.number()]).optional(),
  status: z.union([z.lazy(() => EnumQuoteStatusFilterObjectSchema), QuoteStatusSchema]).optional(),
  userId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.date()]).optional()
}).strict();
export const QuoteScalarWhereInputObjectZodSchema = z.object({
  AND: z.union([z.lazy(() => QuoteScalarWhereInputObjectSchema), z.lazy(() => QuoteScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => QuoteScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => QuoteScalarWhereInputObjectSchema), z.lazy(() => QuoteScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  email: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  phone: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  company: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  message: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  total: z.union([z.lazy(() => DecimalFilterObjectSchema), z.number()]).optional(),
  status: z.union([z.lazy(() => EnumQuoteStatusFilterObjectSchema), QuoteStatusSchema]).optional(),
  userId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.date()]).optional()
}).strict();
