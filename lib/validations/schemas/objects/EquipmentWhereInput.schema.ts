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
import { DecimalNullableFilterObjectSchema } from './DecimalNullableFilter.schema';
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { CategoryScalarRelationFilterObjectSchema } from './CategoryScalarRelationFilter.schema';
import { CategoryWhereInputObjectSchema } from './CategoryWhereInput.schema';
import { QuoteItemListRelationFilterObjectSchema } from './QuoteItemListRelationFilter.schema';
import { Rental_itemsListRelationFilterObjectSchema } from './Rental_itemsListRelationFilter.schema'

const equipmentwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => EquipmentWhereInputObjectSchema), z.lazy(() => EquipmentWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => EquipmentWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => EquipmentWhereInputObjectSchema), z.lazy(() => EquipmentWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  description: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  pricePerDay: z.union([z.lazy(() => DecimalFilterObjectSchema), z.number()]).optional(),
  images: z.lazy(() => StringNullableListFilterObjectSchema).optional(),
  available: z.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()]).optional(),
  categoryId: z.union([z.lazy(() => UuidFilterObjectSchema), z.string()]).optional(),
  specifications: z.lazy(() => JsonNullableFilterObjectSchema).optional(),
  maxStock: z.union([z.lazy(() => IntNullableFilterObjectSchema), z.number().int()]).optional().nullable(),
  dailyDiscount: z.union([z.lazy(() => IntNullableFilterObjectSchema), z.number().int()]).optional().nullable(),
  weeklyDiscount: z.union([z.lazy(() => IntNullableFilterObjectSchema), z.number().int()]).optional().nullable(),
  biweeklyDiscount: z.union([z.lazy(() => IntNullableFilterObjectSchema), z.number().int()]).optional().nullable(),
  monthlyDiscount: z.union([z.lazy(() => IntNullableFilterObjectSchema), z.number().int()]).optional().nullable(),
  popularPeriod: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  dailyDirectValue: z.union([z.lazy(() => DecimalNullableFilterObjectSchema), z.number()]).optional().nullable(),
  weeklyDirectValue: z.union([z.lazy(() => DecimalNullableFilterObjectSchema), z.number()]).optional().nullable(),
  biweeklyDirectValue: z.union([z.lazy(() => DecimalNullableFilterObjectSchema), z.number()]).optional().nullable(),
  monthlyDirectValue: z.union([z.lazy(() => DecimalNullableFilterObjectSchema), z.number()]).optional().nullable(),
  dailyUseDirectValue: z.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()]).optional(),
  weeklyUseDirectValue: z.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()]).optional(),
  biweeklyUseDirectValue: z.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()]).optional(),
  monthlyUseDirectValue: z.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  category: z.union([z.lazy(() => CategoryScalarRelationFilterObjectSchema), z.lazy(() => CategoryWhereInputObjectSchema)]).optional(),
  quoteItems: z.lazy(() => QuoteItemListRelationFilterObjectSchema).optional(),
  rental_items: z.lazy(() => Rental_itemsListRelationFilterObjectSchema).optional()
}).strict();
export const EquipmentWhereInputObjectSchema: z.ZodType<Prisma.EquipmentWhereInput> = equipmentwhereinputSchema as unknown as z.ZodType<Prisma.EquipmentWhereInput>;
export const EquipmentWhereInputObjectZodSchema = equipmentwhereinputSchema;
