import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { CategoryArgsObjectSchema } from './CategoryArgs.schema';
import { QuoteItemFindManySchema } from '../findManyQuoteItem.schema';
import { Rental_itemsFindManySchema } from '../findManyrental_items.schema';
import { EquipmentCountOutputTypeArgsObjectSchema } from './EquipmentCountOutputTypeArgs.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  description: z.boolean().optional(),
  pricePerDay: z.boolean().optional(),
  images: z.boolean().optional(),
  available: z.boolean().optional(),
  categoryId: z.boolean().optional(),
  specifications: z.boolean().optional(),
  maxStock: z.boolean().optional(),
  dailyDiscount: z.boolean().optional(),
  weeklyDiscount: z.boolean().optional(),
  biweeklyDiscount: z.boolean().optional(),
  monthlyDiscount: z.boolean().optional(),
  popularPeriod: z.boolean().optional(),
  dailyDirectValue: z.boolean().optional(),
  weeklyDirectValue: z.boolean().optional(),
  biweeklyDirectValue: z.boolean().optional(),
  monthlyDirectValue: z.boolean().optional(),
  dailyUseDirectValue: z.boolean().optional(),
  weeklyUseDirectValue: z.boolean().optional(),
  biweeklyUseDirectValue: z.boolean().optional(),
  monthlyUseDirectValue: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  category: z.union([z.boolean(), z.lazy(() => CategoryArgsObjectSchema)]).optional(),
  quoteItems: z.union([z.boolean(), z.lazy(() => QuoteItemFindManySchema)]).optional(),
  rental_items: z.union([z.boolean(), z.lazy(() => Rental_itemsFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => EquipmentCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const EquipmentSelectObjectSchema: z.ZodType<Prisma.EquipmentSelect> = makeSchema() as unknown as z.ZodType<Prisma.EquipmentSelect>;
export const EquipmentSelectObjectZodSchema = makeSchema();
