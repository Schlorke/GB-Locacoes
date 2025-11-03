/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import { Prisma } from '@prisma/client';
import Decimal from 'decimal.js';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { DecimalFilterObjectSchema as DecimalFilterObjectSchema } from './DecimalFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DateTimeNullableFilterObjectSchema as DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const rentalsscalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => rentalsScalarWhereInputObjectSchema), z.lazy(() => rentalsScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => rentalsScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => rentalsScalarWhereInputObjectSchema), z.lazy(() => rentalsScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  startdate: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  enddate: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  total: z.union([z.lazy(() => DecimalFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'total' must be a Decimal",
})]).optional(),
  status: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  userid: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  createdat: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  updatedat: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable()
}).strict();
export const rentalsScalarWhereInputObjectSchema: z.ZodType<Prisma.rentalsScalarWhereInput> = rentalsscalarwhereinputSchema as unknown as z.ZodType<Prisma.rentalsScalarWhereInput>;
export const rentalsScalarWhereInputObjectZodSchema = rentalsscalarwhereinputSchema;
