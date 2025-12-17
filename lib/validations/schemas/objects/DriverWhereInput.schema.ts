import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { EnumDriverStatusFilterObjectSchema as EnumDriverStatusFilterObjectSchema } from './EnumDriverStatusFilter.schema';
import { DriverStatusSchema } from '../enums/DriverStatus.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

const driverwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => DriverWhereInputObjectSchema), z.lazy(() => DriverWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => DriverWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => DriverWhereInputObjectSchema), z.lazy(() => DriverWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  phone: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  cnh: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  cnhCategory: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  status: z.union([z.lazy(() => EnumDriverStatusFilterObjectSchema), DriverStatusSchema]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const DriverWhereInputObjectSchema: z.ZodType<Prisma.DriverWhereInput> = driverwhereinputSchema as unknown as z.ZodType<Prisma.DriverWhereInput>;
export const DriverWhereInputObjectZodSchema = driverwhereinputSchema;
