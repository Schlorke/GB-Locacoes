import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  cost: SortOrderSchema.optional(),
  laborCost: SortOrderSchema.optional(),
  partsCost: SortOrderSchema.optional()
}).strict();
export const MaintenanceAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.MaintenanceAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.MaintenanceAvgOrderByAggregateInput>;
export const MaintenanceAvgOrderByAggregateInputObjectZodSchema = makeSchema();
