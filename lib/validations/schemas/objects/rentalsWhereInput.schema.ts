import * as z from 'zod';
import { Prisma } from '@prisma/client';
import Decimal from 'decimal.js';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { DecimalFilterObjectSchema as DecimalFilterObjectSchema } from './DecimalFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DateTimeNullableFilterObjectSchema as DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { Rental_itemsListRelationFilterObjectSchema as Rental_itemsListRelationFilterObjectSchema } from './Rental_itemsListRelationFilter.schema';
import { UserScalarRelationFilterObjectSchema as UserScalarRelationFilterObjectSchema } from './UserScalarRelationFilter.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const rentalswhereinputSchema = z.object({
  AND: z.union([z.lazy(() => rentalsWhereInputObjectSchema), z.lazy(() => rentalsWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => rentalsWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => rentalsWhereInputObjectSchema), z.lazy(() => rentalsWhereInputObjectSchema).array()]).optional(),
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
  updatedat: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  rental_items: z.lazy(() => Rental_itemsListRelationFilterObjectSchema).optional(),
  users: z.union([z.lazy(() => UserScalarRelationFilterObjectSchema), z.lazy(() => UserWhereInputObjectSchema)]).optional()
}).strict();
export const rentalsWhereInputObjectSchema: z.ZodType<Prisma.rentalsWhereInput> = rentalswhereinputSchema as unknown as z.ZodType<Prisma.rentalsWhereInput>;
export const rentalsWhereInputObjectZodSchema = rentalswhereinputSchema;
