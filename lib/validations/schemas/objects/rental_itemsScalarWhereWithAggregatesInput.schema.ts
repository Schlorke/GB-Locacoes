import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { IntWithAggregatesFilterObjectSchema } from './IntWithAggregatesFilter.schema';
import { DecimalWithAggregatesFilterObjectSchema } from './DecimalWithAggregatesFilter.schema';
import { DateTimeNullableWithAggregatesFilterObjectSchema } from './DateTimeNullableWithAggregatesFilter.schema'

const rental_itemsscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => rental_itemsScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => rental_itemsScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => rental_itemsScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => rental_itemsScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => rental_itemsScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  rentalid: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  equipmentid: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  quantity: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number().int()]).optional(),
  priceperday: z.union([z.lazy(() => DecimalWithAggregatesFilterObjectSchema), z.number()]).optional(),
  totaldays: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number().int()]).optional(),
  totalprice: z.union([z.lazy(() => DecimalWithAggregatesFilterObjectSchema), z.number()]).optional(),
  createdat: z.union([z.lazy(() => DateTimeNullableWithAggregatesFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  updatedat: z.union([z.lazy(() => DateTimeNullableWithAggregatesFilterObjectSchema), z.coerce.date()]).optional().nullable()
}).strict();
export const rental_itemsScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.rental_itemsScalarWhereWithAggregatesInput> = rental_itemsscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.rental_itemsScalarWhereWithAggregatesInput>;
export const rental_itemsScalarWhereWithAggregatesInputObjectZodSchema = rental_itemsscalarwherewithaggregatesinputSchema;
