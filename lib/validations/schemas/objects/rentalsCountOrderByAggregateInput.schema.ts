/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  startdate: SortOrderSchema.optional(),
  enddate: SortOrderSchema.optional(),
  total: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  userid: SortOrderSchema.optional(),
  createdat: SortOrderSchema.optional(),
  updatedat: SortOrderSchema.optional(),
  quoteId: SortOrderSchema.optional(),
  lateFee: SortOrderSchema.optional(),
  extensionDays: SortOrderSchema.optional(),
  extensionFee: SortOrderSchema.optional(),
  checkInAt: SortOrderSchema.optional(),
  checkOutAt: SortOrderSchema.optional(),
  notes: SortOrderSchema.optional()
}).strict();
export const rentalsCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.rentalsCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.rentalsCountOrderByAggregateInput>;
export const rentalsCountOrderByAggregateInputObjectZodSchema = makeSchema();
