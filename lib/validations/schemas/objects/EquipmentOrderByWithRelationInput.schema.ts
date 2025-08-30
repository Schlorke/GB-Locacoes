import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { CategoryOrderByWithRelationInputObjectSchema } from './CategoryOrderByWithRelationInput.schema';
import { QuoteItemOrderByRelationAggregateInputObjectSchema } from './QuoteItemOrderByRelationAggregateInput.schema';
import { rental_itemsOrderByRelationAggregateInputObjectSchema } from './rental_itemsOrderByRelationAggregateInput.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  description: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  pricePerDay: SortOrderSchema.optional(),
  images: SortOrderSchema.optional(),
  available: SortOrderSchema.optional(),
  categoryId: SortOrderSchema.optional(),
  maxStock: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  dailyDiscount: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  weeklyDiscount: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  biweeklyDiscount: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  monthlyDiscount: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  popularPeriod: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  category_id: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  category: z.lazy(() => CategoryOrderByWithRelationInputObjectSchema).optional(),
  quoteItems: z.lazy(() => QuoteItemOrderByRelationAggregateInputObjectSchema).optional(),
  rental_items: z.lazy(() => rental_itemsOrderByRelationAggregateInputObjectSchema).optional()
}).strict();
export const EquipmentOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.EquipmentOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.EquipmentOrderByWithRelationInput>;
export const EquipmentOrderByWithRelationInputObjectZodSchema = makeSchema();
