import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DecimalFilterObjectSchema } from './DecimalFilter.schema';
import { StringNullableListFilterObjectSchema } from './StringNullableListFilter.schema';
import { BoolFilterObjectSchema } from './BoolFilter.schema';
import { UuidFilterObjectSchema } from './UuidFilter.schema';
import { JsonNullableFilterObjectSchema } from './JsonNullableFilter.schema';
import { IntNullableFilterObjectSchema } from './IntNullableFilter.schema';
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  AND: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional(),
  OR: z.lazy(makeSchema).array().optional(),
  NOT: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  description: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).nullish(),
  pricePerDay: z.union([z.lazy(() => DecimalFilterObjectSchema), z.number()]).optional(),
  images: z.lazy(() => StringNullableListFilterObjectSchema).optional(),
  available: z.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()]).optional(),
  categoryId: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
  specifications: z.lazy(() => JsonNullableFilterObjectSchema).optional(),
  maxStock: z.union([z.lazy(() => IntNullableFilterObjectSchema), z.number().int()]).nullish(),
  dailyDiscount: z.union([z.lazy(() => IntNullableFilterObjectSchema), z.number().int()]).nullish(),
  weeklyDiscount: z.union([z.lazy(() => IntNullableFilterObjectSchema), z.number().int()]).nullish(),
  biweeklyDiscount: z.union([z.lazy(() => IntNullableFilterObjectSchema), z.number().int()]).nullish(),
  monthlyDiscount: z.union([z.lazy(() => IntNullableFilterObjectSchema), z.number().int()]).nullish(),
  popularPeriod: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).nullish(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.date()]).optional()
}).strict();
export const EquipmentScalarWhereInputObjectSchema: z.ZodType<Prisma.EquipmentScalarWhereInput> = makeSchema() as unknown as z.ZodType<Prisma.EquipmentScalarWhereInput>;
export const EquipmentScalarWhereInputObjectZodSchema = makeSchema();
