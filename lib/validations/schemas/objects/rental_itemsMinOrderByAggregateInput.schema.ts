import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  rentalid: SortOrderSchema.optional(),
  equipmentid: SortOrderSchema.optional(),
  quantity: SortOrderSchema.optional(),
  priceperday: SortOrderSchema.optional(),
  totaldays: SortOrderSchema.optional(),
  totalprice: SortOrderSchema.optional(),
  createdat: SortOrderSchema.optional(),
  updatedat: SortOrderSchema.optional()
}).strict();
export const rental_itemsMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.rental_itemsMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.rental_itemsMinOrderByAggregateInput>;
export const rental_itemsMinOrderByAggregateInputObjectZodSchema = makeSchema();
