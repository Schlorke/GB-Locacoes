/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  name: z.literal(true).optional(),
  description: z.literal(true).optional(),
  pricePerDay: z.literal(true).optional(),
  images: z.literal(true).optional(),
  available: z.literal(true).optional(),
  categoryId: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional(),
  biweeklyDiscount: z.literal(true).optional(),
  dailyDiscount: z.literal(true).optional(),
  maxStock: z.literal(true).optional(),
  monthlyDiscount: z.literal(true).optional(),
  popularPeriod: z.literal(true).optional(),
  weeklyDiscount: z.literal(true).optional(),
  specifications: z.literal(true).optional(),
  biweeklyDirectValue: z.literal(true).optional(),
  biweeklyUseDirectValue: z.literal(true).optional(),
  dailyDirectValue: z.literal(true).optional(),
  dailyUseDirectValue: z.literal(true).optional(),
  monthlyDirectValue: z.literal(true).optional(),
  monthlyUseDirectValue: z.literal(true).optional(),
  weeklyDirectValue: z.literal(true).optional(),
  weeklyUseDirectValue: z.literal(true).optional(),
  depreciationRate: z.literal(true).optional(),
  hourMeter: z.literal(true).optional(),
  odometer: z.literal(true).optional(),
  purchaseDate: z.literal(true).optional(),
  purchasePrice: z.literal(true).optional(),
  partsLossHistory: z.literal(true).optional(),
  partsLossCount: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const EquipmentCountAggregateInputObjectSchema: z.ZodType<Prisma.EquipmentCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.EquipmentCountAggregateInputType>;
export const EquipmentCountAggregateInputObjectZodSchema = makeSchema();
