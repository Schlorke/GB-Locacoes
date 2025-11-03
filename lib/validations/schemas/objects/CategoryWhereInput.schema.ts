/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UuidFilterObjectSchema as UuidFilterObjectSchema } from './UuidFilter.schema';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { EquipmentListRelationFilterObjectSchema as EquipmentListRelationFilterObjectSchema } from './EquipmentListRelationFilter.schema'

const categorywhereinputSchema = z.object({
  AND: z.union([z.lazy(() => CategoryWhereInputObjectSchema), z.lazy(() => CategoryWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => CategoryWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => CategoryWhereInputObjectSchema), z.lazy(() => CategoryWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  description: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  icon: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  iconColor: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  bgColor: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  fontColor: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  slug: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  equipments: z.lazy(() => EquipmentListRelationFilterObjectSchema).optional()
}).strict();
export const CategoryWhereInputObjectSchema: z.ZodType<Prisma.CategoryWhereInput> = categorywhereinputSchema as unknown as z.ZodType<Prisma.CategoryWhereInput>;
export const CategoryWhereInputObjectZodSchema = categorywhereinputSchema;
