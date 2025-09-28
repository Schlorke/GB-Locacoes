/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { DecimalFilterObjectSchema as DecimalFilterObjectSchema } from './DecimalFilter.schema';
import { DateTimeNullableFilterObjectSchema as DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema'

const rental_itemsscalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => rental_itemsScalarWhereInputObjectSchema), z.lazy(() => rental_itemsScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => rental_itemsScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => rental_itemsScalarWhereInputObjectSchema), z.lazy(() => rental_itemsScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  rentalid: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  equipmentid: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  quantity: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  priceperday: z.union([z.lazy(() => DecimalFilterObjectSchema), z.number()]).optional(),
  totaldays: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  totalprice: z.union([z.lazy(() => DecimalFilterObjectSchema), z.number()]).optional(),
  createdat: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  updatedat: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable()
}).strict();
export const rental_itemsScalarWhereInputObjectSchema: z.ZodType<Prisma.rental_itemsScalarWhereInput> = rental_itemsscalarwhereinputSchema as unknown as z.ZodType<Prisma.rental_itemsScalarWhereInput>;
export const rental_itemsScalarWhereInputObjectZodSchema = rental_itemsscalarwhereinputSchema;
