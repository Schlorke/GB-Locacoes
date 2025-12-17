import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  cost: SortOrderSchema.optional(),
  laborCost: SortOrderSchema.optional(),
  partsCost: SortOrderSchema.optional()
}).strict();
export const MaintenanceSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.MaintenanceSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.MaintenanceSumOrderByAggregateInput>;
export const MaintenanceSumOrderByAggregateInputObjectZodSchema = makeSchema();
