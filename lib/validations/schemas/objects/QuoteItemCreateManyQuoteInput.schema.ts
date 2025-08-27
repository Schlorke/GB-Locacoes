import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';


const makeSchema = (): z.ZodObject<any> => z.object({
  id: z.string().optional(),
  equipmentId: z.string(),
  quantity: z.number().int().optional(),
  days: z.number().int().optional(),
  pricePerDay: z.number(),
  total: z.number(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional()
}).strict();
export const QuoteItemCreateManyQuoteInputObjectSchema: z.ZodType<Prisma.QuoteItemCreateManyQuoteInput> = makeSchema() as unknown as z.ZodType<Prisma.QuoteItemCreateManyQuoteInput>;
export const QuoteItemCreateManyQuoteInputObjectZodSchema = makeSchema();
