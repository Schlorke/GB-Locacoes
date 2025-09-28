/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import { z } from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  quoteId: z.string(),
  equipmentId: z.string(),
  quantity: z.number().int().optional(),
  days: z.number().int().optional(),
  pricePerDay: z.number(),
  total: z.number(),
  createdAt: z.coerce.date().optional()
}).strict();
export const QuoteItemUncheckedCreateInputObjectSchema: z.ZodType<Prisma.QuoteItemUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.QuoteItemUncheckedCreateInput>;
export const QuoteItemUncheckedCreateInputObjectZodSchema = makeSchema();
