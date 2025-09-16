import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  quoteId: z.string(),
  quantity: z.number().int().optional(),
  days: z.number().int().optional(),
  pricePerDay: z.number(),
  total: z.number(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const QuoteItemUncheckedCreateWithoutEquipmentInputObjectSchema: z.ZodType<Prisma.QuoteItemUncheckedCreateWithoutEquipmentInput> = makeSchema() as unknown as z.ZodType<Prisma.QuoteItemUncheckedCreateWithoutEquipmentInput>;
export const QuoteItemUncheckedCreateWithoutEquipmentInputObjectZodSchema = makeSchema();
