import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema';
import { DecimalWithAggregatesFilterObjectSchema } from './DecimalWithAggregatesFilter.schema';
import { StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema';
import { StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { DateTimeNullableWithAggregatesFilterObjectSchema } from './DateTimeNullableWithAggregatesFilter.schema'

export const rentalsScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.rentalsScalarWhereWithAggregatesInput, Prisma.rentalsScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([z.lazy(() => rentalsScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => rentalsScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => rentalsScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => rentalsScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => rentalsScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  startdate: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.date()]).optional(),
  enddate: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.date()]).optional(),
  total: z.union([z.lazy(() => DecimalWithAggregatesFilterObjectSchema), z.number()]).optional(),
  status: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).nullish(),
  userid: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  createdat: z.union([z.lazy(() => DateTimeNullableWithAggregatesFilterObjectSchema), z.date()]).nullish(),
  updatedat: z.union([z.lazy(() => DateTimeNullableWithAggregatesFilterObjectSchema), z.date()]).nullish()
}).strict();
export const rentalsScalarWhereWithAggregatesInputObjectZodSchema = z.object({
  AND: z.union([z.lazy(() => rentalsScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => rentalsScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => rentalsScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => rentalsScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => rentalsScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  startdate: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.date()]).optional(),
  enddate: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.date()]).optional(),
  total: z.union([z.lazy(() => DecimalWithAggregatesFilterObjectSchema), z.number()]).optional(),
  status: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).nullish(),
  userid: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  createdat: z.union([z.lazy(() => DateTimeNullableWithAggregatesFilterObjectSchema), z.date()]).nullish(),
  updatedat: z.union([z.lazy(() => DateTimeNullableWithAggregatesFilterObjectSchema), z.date()]).nullish()
}).strict();
