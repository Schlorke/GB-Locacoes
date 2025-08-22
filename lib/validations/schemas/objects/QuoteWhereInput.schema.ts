import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DecimalFilterObjectSchema } from './DecimalFilter.schema';
import { EnumQuoteStatusFilterObjectSchema } from './EnumQuoteStatusFilter.schema';
import { QuoteStatusSchema } from '../enums/QuoteStatus.schema';
import { QuoteItemListRelationFilterObjectSchema } from './QuoteItemListRelationFilter.schema';
import { UserNullableScalarRelationFilterObjectSchema } from './UserNullableScalarRelationFilter.schema';
import { UserWhereInputObjectSchema } from './UserWhereInput.schema'

export const QuoteWhereInputObjectSchema: z.ZodType<Prisma.QuoteWhereInput, Prisma.QuoteWhereInput> = z.object({
  AND: z.union([z.lazy(() => QuoteWhereInputObjectSchema), z.lazy(() => QuoteWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => QuoteWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => QuoteWhereInputObjectSchema), z.lazy(() => QuoteWhereInputObjectSchema).array()]).optional(),
  name: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  email: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  phone: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  company: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).nullish(),
  message: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).nullish(),
  total: z.union([z.lazy(() => DecimalFilterObjectSchema), z.number()]).optional(),
  status: z.union([z.lazy(() => EnumQuoteStatusFilterObjectSchema), QuoteStatusSchema]).optional(),
  userId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).nullish(),
  items: z.lazy(() => QuoteItemListRelationFilterObjectSchema).optional(),
  user: z.union([z.lazy(() => UserNullableScalarRelationFilterObjectSchema), z.lazy(() => UserWhereInputObjectSchema)]).nullish()
}).strict();
export const QuoteWhereInputObjectZodSchema = z.object({
  AND: z.union([z.lazy(() => QuoteWhereInputObjectSchema), z.lazy(() => QuoteWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => QuoteWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => QuoteWhereInputObjectSchema), z.lazy(() => QuoteWhereInputObjectSchema).array()]).optional(),
  name: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  email: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  phone: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  company: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).nullish(),
  message: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).nullish(),
  total: z.union([z.lazy(() => DecimalFilterObjectSchema), z.number()]).optional(),
  status: z.union([z.lazy(() => EnumQuoteStatusFilterObjectSchema), QuoteStatusSchema]).optional(),
  userId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).nullish(),
  items: z.lazy(() => QuoteItemListRelationFilterObjectSchema).optional(),
  user: z.union([z.lazy(() => UserNullableScalarRelationFilterObjectSchema), z.lazy(() => UserWhereInputObjectSchema)]).nullish()
}).strict();
