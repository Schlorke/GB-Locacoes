import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';


export const QuoteItemCreateManyEquipmentInputObjectSchema: z.ZodType<Prisma.QuoteItemCreateManyEquipmentInput, Prisma.QuoteItemCreateManyEquipmentInput> = z.object({
  id: z.string().optional(),
  quoteId: z.string(),
  quantity: z.number().int().optional(),
  days: z.number().int().optional(),
  pricePerDay: z.number(),
  total: z.number(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional()
}).strict();
export const QuoteItemCreateManyEquipmentInputObjectZodSchema = z.object({
  id: z.string().optional(),
  quoteId: z.string(),
  quantity: z.number().int().optional(),
  days: z.number().int().optional(),
  pricePerDay: z.number(),
  total: z.number(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional()
}).strict();
