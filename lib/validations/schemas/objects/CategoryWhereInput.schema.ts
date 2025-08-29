import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { UuidFilterObjectSchema } from './UuidFilter.schema';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { EquipmentListRelationFilterObjectSchema } from './EquipmentListRelationFilter.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  AND: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional(),
  OR: z.lazy(makeSchema).array().optional(),
  NOT: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional(),
  id: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  description: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).nullish(),
  icon: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).nullish(),
  iconColor: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  bgColor: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  fontColor: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  slug: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.date()]).optional(),
  equipments: z.lazy(() => EquipmentListRelationFilterObjectSchema).optional()
}).strict();
export const CategoryWhereInputObjectSchema: z.ZodType<Prisma.CategoryWhereInput> = makeSchema() as unknown as z.ZodType<Prisma.CategoryWhereInput>;
export const CategoryWhereInputObjectZodSchema = makeSchema();
