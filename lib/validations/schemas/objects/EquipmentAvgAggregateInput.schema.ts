import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  pricePerDay: z.literal(true).optional(),
  maxStock: z.literal(true).optional(),
  dailyDiscount: z.literal(true).optional(),
  weeklyDiscount: z.literal(true).optional(),
  biweeklyDiscount: z.literal(true).optional(),
  monthlyDiscount: z.literal(true).optional()
}).strict();
export const EquipmentAvgAggregateInputObjectSchema: z.ZodType<Prisma.EquipmentAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.EquipmentAvgAggregateInputType>;
export const EquipmentAvgAggregateInputObjectZodSchema = makeSchema();
