import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.literal(true).optional(),
  name: z.literal(true).optional(),
  description: z.literal(true).optional(),
  pricePerDay: z.literal(true).optional(),
  images: z.literal(true).optional(),
  available: z.literal(true).optional(),
  categoryId: z.literal(true).optional(),
  maxStock: z.literal(true).optional(),
  dailyDiscount: z.literal(true).optional(),
  weeklyDiscount: z.literal(true).optional(),
  biweeklyDiscount: z.literal(true).optional(),
  monthlyDiscount: z.literal(true).optional(),
  popularPeriod: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional(),
  category_id: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const EquipmentCountAggregateInputObjectSchema: z.ZodType<Prisma.EquipmentCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.EquipmentCountAggregateInputType>;
export const EquipmentCountAggregateInputObjectZodSchema = makeSchema();
