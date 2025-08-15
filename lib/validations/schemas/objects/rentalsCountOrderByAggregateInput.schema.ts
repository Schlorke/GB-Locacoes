import { z } from 'zod';
import type { Prisma } from '../../../../node_modules/.prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

export const rentalsCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.rentalsCountOrderByAggregateInput, Prisma.rentalsCountOrderByAggregateInput> = z.object({
  id: SortOrderSchema.optional(),
  startdate: SortOrderSchema.optional(),
  enddate: SortOrderSchema.optional(),
  total: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  userid: SortOrderSchema.optional(),
  createdat: SortOrderSchema.optional(),
  updatedat: SortOrderSchema.optional()
}).strict();
export const rentalsCountOrderByAggregateInputObjectZodSchema = z.object({
  id: SortOrderSchema.optional(),
  startdate: SortOrderSchema.optional(),
  enddate: SortOrderSchema.optional(),
  total: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  userid: SortOrderSchema.optional(),
  createdat: SortOrderSchema.optional(),
  updatedat: SortOrderSchema.optional()
}).strict();
