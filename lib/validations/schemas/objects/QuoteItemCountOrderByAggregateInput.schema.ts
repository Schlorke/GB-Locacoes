import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: SortOrderSchema.optional(),
  quoteId: SortOrderSchema.optional(),
  equipmentId: SortOrderSchema.optional(),
  quantity: SortOrderSchema.optional(),
  days: SortOrderSchema.optional(),
  pricePerDay: SortOrderSchema.optional(),
  total: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const QuoteItemCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.QuoteItemCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.QuoteItemCountOrderByAggregateInput>;
export const QuoteItemCountOrderByAggregateInputObjectZodSchema = makeSchema();
