import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { CartItemOrderByRelationAggregateInputObjectSchema as CartItemOrderByRelationAggregateInputObjectSchema } from './CartItemOrderByRelationAggregateInput.schema';
import { EquipmentUnitOrderByRelationAggregateInputObjectSchema as EquipmentUnitOrderByRelationAggregateInputObjectSchema } from './EquipmentUnitOrderByRelationAggregateInput.schema';
import { CategoryOrderByWithRelationInputObjectSchema as CategoryOrderByWithRelationInputObjectSchema } from './CategoryOrderByWithRelationInput.schema';
import { MaintenanceOrderByRelationAggregateInputObjectSchema as MaintenanceOrderByRelationAggregateInputObjectSchema } from './MaintenanceOrderByRelationAggregateInput.schema';
import { QuoteItemOrderByRelationAggregateInputObjectSchema as QuoteItemOrderByRelationAggregateInputObjectSchema } from './QuoteItemOrderByRelationAggregateInput.schema';
import { rental_itemsOrderByRelationAggregateInputObjectSchema as rental_itemsOrderByRelationAggregateInputObjectSchema } from './rental_itemsOrderByRelationAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  description: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  pricePerDay: SortOrderSchema.optional(),
  images: SortOrderSchema.optional(),
  available: SortOrderSchema.optional(),
  categoryId: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  biweeklyDiscount: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  dailyDiscount: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  maxStock: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  monthlyDiscount: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  popularPeriod: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  weeklyDiscount: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  specifications: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  biweeklyDirectValue: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  biweeklyUseDirectValue: SortOrderSchema.optional(),
  dailyDirectValue: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  dailyUseDirectValue: SortOrderSchema.optional(),
  monthlyDirectValue: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  monthlyUseDirectValue: SortOrderSchema.optional(),
  weeklyDirectValue: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  weeklyUseDirectValue: SortOrderSchema.optional(),
  depreciationRate: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  hourMeter: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  odometer: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  purchaseDate: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  purchasePrice: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  partsLossHistory: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  partsLossCount: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  cartItems: z.lazy(() => CartItemOrderByRelationAggregateInputObjectSchema).optional(),
  units: z.lazy(() => EquipmentUnitOrderByRelationAggregateInputObjectSchema).optional(),
  category: z.lazy(() => CategoryOrderByWithRelationInputObjectSchema).optional(),
  maintenances: z.lazy(() => MaintenanceOrderByRelationAggregateInputObjectSchema).optional(),
  quoteItems: z.lazy(() => QuoteItemOrderByRelationAggregateInputObjectSchema).optional(),
  rental_items: z.lazy(() => rental_itemsOrderByRelationAggregateInputObjectSchema).optional()
}).strict();
export const EquipmentOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.EquipmentOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.EquipmentOrderByWithRelationInput>;
export const EquipmentOrderByWithRelationInputObjectZodSchema = makeSchema();
