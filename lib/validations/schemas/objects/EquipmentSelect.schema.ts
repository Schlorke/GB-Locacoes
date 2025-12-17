import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CartItemFindManySchema as CartItemFindManySchema } from '../findManyCartItem.schema';
import { EquipmentUnitFindManySchema as EquipmentUnitFindManySchema } from '../findManyEquipmentUnit.schema';
import { CategoryArgsObjectSchema as CategoryArgsObjectSchema } from './CategoryArgs.schema';
import { MaintenanceFindManySchema as MaintenanceFindManySchema } from '../findManyMaintenance.schema';
import { QuoteItemFindManySchema as QuoteItemFindManySchema } from '../findManyQuoteItem.schema';
import { rental_itemsFindManySchema as rental_itemsFindManySchema } from '../findManyrental_items.schema';
import { EquipmentCountOutputTypeArgsObjectSchema as EquipmentCountOutputTypeArgsObjectSchema } from './EquipmentCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  description: z.boolean().optional(),
  pricePerDay: z.boolean().optional(),
  images: z.boolean().optional(),
  available: z.boolean().optional(),
  categoryId: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  biweeklyDiscount: z.boolean().optional(),
  dailyDiscount: z.boolean().optional(),
  maxStock: z.boolean().optional(),
  monthlyDiscount: z.boolean().optional(),
  popularPeriod: z.boolean().optional(),
  weeklyDiscount: z.boolean().optional(),
  specifications: z.boolean().optional(),
  biweeklyDirectValue: z.boolean().optional(),
  biweeklyUseDirectValue: z.boolean().optional(),
  dailyDirectValue: z.boolean().optional(),
  dailyUseDirectValue: z.boolean().optional(),
  monthlyDirectValue: z.boolean().optional(),
  monthlyUseDirectValue: z.boolean().optional(),
  weeklyDirectValue: z.boolean().optional(),
  weeklyUseDirectValue: z.boolean().optional(),
  depreciationRate: z.boolean().optional(),
  hourMeter: z.boolean().optional(),
  odometer: z.boolean().optional(),
  purchaseDate: z.boolean().optional(),
  purchasePrice: z.boolean().optional(),
  partsLossHistory: z.boolean().optional(),
  partsLossCount: z.boolean().optional(),
  cartItems: z.union([z.boolean(), z.lazy(() => CartItemFindManySchema)]).optional(),
  units: z.union([z.boolean(), z.lazy(() => EquipmentUnitFindManySchema)]).optional(),
  category: z.union([z.boolean(), z.lazy(() => CategoryArgsObjectSchema)]).optional(),
  maintenances: z.union([z.boolean(), z.lazy(() => MaintenanceFindManySchema)]).optional(),
  quoteItems: z.union([z.boolean(), z.lazy(() => QuoteItemFindManySchema)]).optional(),
  rental_items: z.union([z.boolean(), z.lazy(() => rental_itemsFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => EquipmentCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const EquipmentSelectObjectSchema: z.ZodType<Prisma.EquipmentSelect> = makeSchema() as unknown as z.ZodType<Prisma.EquipmentSelect>;
export const EquipmentSelectObjectZodSchema = makeSchema();
