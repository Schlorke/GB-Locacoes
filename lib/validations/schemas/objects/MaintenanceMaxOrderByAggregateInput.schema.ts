/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
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
export const MaintenanceMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.MaintenanceMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.MaintenanceMaxOrderByAggregateInput>;
export const MaintenanceMaxOrderByAggregateInputObjectZodSchema = makeSchema();
