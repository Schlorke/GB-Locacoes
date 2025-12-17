/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { StringNullableWithAggregatesFilterObjectSchema as StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema';
import { EnumDriverStatusWithAggregatesFilterObjectSchema as EnumDriverStatusWithAggregatesFilterObjectSchema } from './EnumDriverStatusWithAggregatesFilter.schema';
import { DriverStatusSchema } from '../enums/DriverStatus.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

const driverscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => DriverScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => DriverScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => DriverScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => DriverScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => DriverScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  phone: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  cnh: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  cnhCategory: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  status: z.union([z.lazy(() => EnumDriverStatusWithAggregatesFilterObjectSchema), DriverStatusSchema]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const DriverScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.DriverScalarWhereWithAggregatesInput> = driverscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.DriverScalarWhereWithAggregatesInput>;
export const DriverScalarWhereWithAggregatesInputObjectZodSchema = driverscalarwherewithaggregatesinputSchema;
