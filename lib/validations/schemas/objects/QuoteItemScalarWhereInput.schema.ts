import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { IntFilterObjectSchema } from './IntFilter.schema';
import { DecimalFilterObjectSchema } from './DecimalFilter.schema';
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

export const QuoteItemScalarWhereInputObjectSchema: z.ZodType<Prisma.QuoteItemScalarWhereInput, Prisma.QuoteItemScalarWhereInput> = z.object({
  AND: z.union([z.lazy(() => QuoteItemScalarWhereInputObjectSchema), z.lazy(() => QuoteItemScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => QuoteItemScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => QuoteItemScalarWhereInputObjectSchema), z.lazy(() => QuoteItemScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  quoteId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  equipmentId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  quantity: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  days: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  pricePerDay: z.union([z.lazy(() => DecimalFilterObjectSchema), z.number()]).optional(),
  total: z.union([z.lazy(() => DecimalFilterObjectSchema), z.number()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.date()]).optional()
}).strict();
export const QuoteItemScalarWhereInputObjectZodSchema = z.object({
  AND: z.union([z.lazy(() => QuoteItemScalarWhereInputObjectSchema), z.lazy(() => QuoteItemScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => QuoteItemScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => QuoteItemScalarWhereInputObjectSchema), z.lazy(() => QuoteItemScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  quoteId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  equipmentId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  quantity: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  days: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  pricePerDay: z.union([z.lazy(() => DecimalFilterObjectSchema), z.number()]).optional(),
  total: z.union([z.lazy(() => DecimalFilterObjectSchema), z.number()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.date()]).optional()
}).strict();
