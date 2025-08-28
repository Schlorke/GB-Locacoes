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
export const rentalsCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.rentalsCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.rentalsCountOrderByAggregateInput>;
export const rentalsCountOrderByAggregateInputObjectZodSchema = makeSchema();
