import * as z from 'zod';
import { Prisma } from '@prisma/client';
import Decimal from 'decimal.js';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { IntWithAggregatesFilterObjectSchema as IntWithAggregatesFilterObjectSchema } from './IntWithAggregatesFilter.schema';
import { DecimalWithAggregatesFilterObjectSchema as DecimalWithAggregatesFilterObjectSchema } from './DecimalWithAggregatesFilter.schema';
import { DateTimeNullableWithAggregatesFilterObjectSchema as DateTimeNullableWithAggregatesFilterObjectSchema } from './DateTimeNullableWithAggregatesFilter.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const rental_itemsscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => rental_itemsScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => rental_itemsScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => rental_itemsScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => rental_itemsScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => rental_itemsScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  rentalid: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  equipmentid: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  quantity: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number().int()]).optional(),
  priceperday: z.union([z.lazy(() => DecimalWithAggregatesFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'priceperday' must be a Decimal",
})]).optional(),
  totaldays: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number().int()]).optional(),
  totalprice: z.union([z.lazy(() => DecimalWithAggregatesFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Decimal),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'totalprice' must be a Decimal",
})]).optional(),
  createdat: z.union([z.lazy(() => DateTimeNullableWithAggregatesFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  updatedat: z.union([z.lazy(() => DateTimeNullableWithAggregatesFilterObjectSchema), z.coerce.date()]).optional().nullable()
}).strict();
export const rental_itemsScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.rental_itemsScalarWhereWithAggregatesInput> = rental_itemsscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.rental_itemsScalarWhereWithAggregatesInput>;
export const rental_itemsScalarWhereWithAggregatesInputObjectZodSchema = rental_itemsscalarwherewithaggregatesinputSchema;
