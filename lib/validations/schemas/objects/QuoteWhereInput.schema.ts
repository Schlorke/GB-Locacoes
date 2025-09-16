import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DecimalFilterObjectSchema } from './DecimalFilter.schema';
import { EnumQuoteStatusFilterObjectSchema } from './EnumQuoteStatusFilter.schema';
import { QuoteStatusSchema } from '../enums/QuoteStatus.schema';
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { QuoteItemListRelationFilterObjectSchema } from './QuoteItemListRelationFilter.schema';
import { UserNullableScalarRelationFilterObjectSchema } from './UserNullableScalarRelationFilter.schema';
import { UserWhereInputObjectSchema } from './UserWhereInput.schema'

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
  total: z.union([z.lazy(() => DecimalFilterObjectSchema), z.number()]).optional(),
  status: z.union([z.lazy(() => EnumQuoteStatusFilterObjectSchema), QuoteStatusSchema]).optional(),
  userId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  items: z.lazy(() => QuoteItemListRelationFilterObjectSchema).optional(),
  user: z.union([z.lazy(() => UserNullableScalarRelationFilterObjectSchema), z.lazy(() => UserWhereInputObjectSchema)]).optional()
}).strict();
export const QuoteWhereInputObjectSchema: z.ZodType<Prisma.QuoteWhereInput> = quotewhereinputSchema as unknown as z.ZodType<Prisma.QuoteWhereInput>;
export const QuoteWhereInputObjectZodSchema = quotewhereinputSchema;
