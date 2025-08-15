import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';


export const EquipmentMaxAggregateInputObjectSchema: z.ZodType<Prisma.EquipmentMaxAggregateInputType, Prisma.EquipmentMaxAggregateInputType> = z.object({
  id: z.literal(true).optional(),
  name: z.literal(true).optional(),
  description: z.literal(true).optional(),
  pricePerDay: z.literal(true).optional(),
  available: z.literal(true).optional(),
  categoryId: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional(),
  category_id: z.literal(true).optional()
}).strict();
export const EquipmentMaxAggregateInputObjectZodSchema = z.object({
  id: z.literal(true).optional(),
  name: z.literal(true).optional(),
  description: z.literal(true).optional(),
  pricePerDay: z.literal(true).optional(),
  available: z.literal(true).optional(),
  categoryId: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional(),
  category_id: z.literal(true).optional()
}).strict();
