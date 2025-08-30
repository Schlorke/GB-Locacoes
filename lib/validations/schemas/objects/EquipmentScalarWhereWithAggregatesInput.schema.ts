import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema';
import { DecimalWithAggregatesFilterObjectSchema } from './DecimalWithAggregatesFilter.schema';
import { StringNullableListFilterObjectSchema } from './StringNullableListFilter.schema';
import { BoolWithAggregatesFilterObjectSchema } from './BoolWithAggregatesFilter.schema';
import { UuidWithAggregatesFilterObjectSchema } from './UuidWithAggregatesFilter.schema';
import { JsonNullableWithAggregatesFilterObjectSchema } from './JsonNullableWithAggregatesFilter.schema';
import { IntNullableWithAggregatesFilterObjectSchema } from './IntNullableWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  AND: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional(),
  OR: z.lazy(makeSchema).array().optional(),
  NOT: z.union([z.lazy(makeSchema), z.lazy(makeSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  description: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).nullish(),
  pricePerDay: z.union([z.lazy(() => DecimalWithAggregatesFilterObjectSchema), z.number()]).optional(),
  images: z.lazy(() => StringNullableListFilterObjectSchema).optional(),
  available: z.union([z.lazy(() => BoolWithAggregatesFilterObjectSchema), z.boolean()]).optional(),
  categoryId: z.union([z.lazy(() => UuidWithAggregatesFilterObjectSchema), z.string()]).optional(),
  specifications: z.lazy(() => JsonNullableWithAggregatesFilterObjectSchema).optional(),
  maxStock: z.union([z.lazy(() => IntNullableWithAggregatesFilterObjectSchema), z.number().int()]).nullish(),
  dailyDiscount: z.union([z.lazy(() => IntNullableWithAggregatesFilterObjectSchema), z.number().int()]).nullish(),
  weeklyDiscount: z.union([z.lazy(() => IntNullableWithAggregatesFilterObjectSchema), z.number().int()]).nullish(),
  biweeklyDiscount: z.union([z.lazy(() => IntNullableWithAggregatesFilterObjectSchema), z.number().int()]).nullish(),
  monthlyDiscount: z.union([z.lazy(() => IntNullableWithAggregatesFilterObjectSchema), z.number().int()]).nullish(),
  popularPeriod: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).nullish(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.date()]).optional()
}).strict();
export const EquipmentScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.EquipmentScalarWhereWithAggregatesInput> = makeSchema() as unknown as z.ZodType<Prisma.EquipmentScalarWhereWithAggregatesInput>;
export const EquipmentScalarWhereWithAggregatesInputObjectZodSchema = makeSchema();
