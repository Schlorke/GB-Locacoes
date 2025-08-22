import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DecimalFilterObjectSchema } from './DecimalFilter.schema';
import { StringNullableListFilterObjectSchema } from './StringNullableListFilter.schema';
import { BoolFilterObjectSchema } from './BoolFilter.schema';
import { UuidFilterObjectSchema } from './UuidFilter.schema';
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { UuidNullableFilterObjectSchema } from './UuidNullableFilter.schema'

export const EquipmentScalarWhereInputObjectSchema: z.ZodType<Prisma.EquipmentScalarWhereInput, Prisma.EquipmentScalarWhereInput> = z.object({
  AND: z.union([z.lazy(() => EquipmentScalarWhereInputObjectSchema), z.lazy(() => EquipmentScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => EquipmentScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => EquipmentScalarWhereInputObjectSchema), z.lazy(() => EquipmentScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  description: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).nullish(),
  pricePerDay: z.union([z.lazy(() => DecimalFilterObjectSchema), z.number()]).optional(),
  images: z.lazy(() => StringNullableListFilterObjectSchema).optional(),
  available: z.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()]).optional(),
  categoryId: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.date()]).optional(),
  category_id: z.union([z.lazy(() => UuidNullableFilterObjectSchema), z.string()]).nullish()
}).strict();
export const EquipmentScalarWhereInputObjectZodSchema = z.object({
  AND: z.union([z.lazy(() => EquipmentScalarWhereInputObjectSchema), z.lazy(() => EquipmentScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => EquipmentScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => EquipmentScalarWhereInputObjectSchema), z.lazy(() => EquipmentScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  description: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).nullish(),
  pricePerDay: z.union([z.lazy(() => DecimalFilterObjectSchema), z.number()]).optional(),
  images: z.lazy(() => StringNullableListFilterObjectSchema).optional(),
  available: z.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()]).optional(),
  categoryId: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.date()]).optional(),
  category_id: z.union([z.lazy(() => UuidNullableFilterObjectSchema), z.string()]).nullish()
}).strict();
