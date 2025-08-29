import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = (): z.ZodObject<any> => z.object({
  id: SortOrderSchema.optional(),
  startdate: SortOrderSchema.optional(),
  enddate: SortOrderSchema.optional(),
  total: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  userid: SortOrderSchema.optional(),
  createdat: SortOrderSchema.optional(),
  updatedat: SortOrderSchema.optional()
}).strict();
export const rentalsMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.rentalsMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.rentalsMaxOrderByAggregateInput>;
export const rentalsMaxOrderByAggregateInputObjectZodSchema = makeSchema();
