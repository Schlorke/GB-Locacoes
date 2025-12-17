import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  equipmentId: SortOrderSchema.optional(),
  type: SortOrderSchema.optional(),
  scheduledAt: SortOrderSchema.optional(),
  completedAt: SortOrderSchema.optional(),
  cost: SortOrderSchema.optional(),
  laborCost: SortOrderSchema.optional(),
  partsCost: SortOrderSchema.optional(),
  description: SortOrderSchema.optional(),
  notes: SortOrderSchema.optional(),
  technician: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const MaintenanceMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.MaintenanceMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.MaintenanceMinOrderByAggregateInput>;
export const MaintenanceMinOrderByAggregateInputObjectZodSchema = makeSchema();
