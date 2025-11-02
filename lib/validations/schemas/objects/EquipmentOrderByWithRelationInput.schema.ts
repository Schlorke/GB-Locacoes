import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { CategoryOrderByWithRelationInputObjectSchema as CategoryOrderByWithRelationInputObjectSchema } from './CategoryOrderByWithRelationInput.schema';
import { QuoteItemOrderByRelationAggregateInputObjectSchema as QuoteItemOrderByRelationAggregateInputObjectSchema } from './QuoteItemOrderByRelationAggregateInput.schema';
import { rental_itemsOrderByRelationAggregateInputObjectSchema as rental_itemsOrderByRelationAggregateInputObjectSchema } from './rental_itemsOrderByRelationAggregateInput.schema';
import { CartItemOrderByRelationAggregateInputObjectSchema as CartItemOrderByRelationAggregateInputObjectSchema } from './CartItemOrderByRelationAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  description: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  pricePerDay: SortOrderSchema.optional(),
  images: SortOrderSchema.optional(),
  available: SortOrderSchema.optional(),
  categoryId: SortOrderSchema.optional(),
  specifications: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  maxStock: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  dailyDiscount: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  weeklyDiscount: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  biweeklyDiscount: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  monthlyDiscount: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  popularPeriod: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  dailyDirectValue: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  weeklyDirectValue: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  biweeklyDirectValue: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  monthlyDirectValue: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  dailyUseDirectValue: SortOrderSchema.optional(),
  weeklyUseDirectValue: SortOrderSchema.optional(),
  biweeklyUseDirectValue: SortOrderSchema.optional(),
  monthlyUseDirectValue: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  category: z.lazy(() => CategoryOrderByWithRelationInputObjectSchema).optional(),
  quoteItems: z.lazy(() => QuoteItemOrderByRelationAggregateInputObjectSchema).optional(),
  rental_items: z.lazy(() => rental_itemsOrderByRelationAggregateInputObjectSchema).optional(),
  cartItems: z.lazy(() => CartItemOrderByRelationAggregateInputObjectSchema).optional()
}).strict();
export const EquipmentOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.EquipmentOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.EquipmentOrderByWithRelationInput>;
export const EquipmentOrderByWithRelationInputObjectZodSchema = makeSchema();
