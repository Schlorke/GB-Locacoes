/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  equipmentId: z.literal(true).optional(),
  type: z.literal(true).optional(),
  scheduledAt: z.literal(true).optional(),
  completedAt: z.literal(true).optional(),
  cost: z.literal(true).optional(),
  laborCost: z.literal(true).optional(),
  partsCost: z.literal(true).optional(),
  description: z.literal(true).optional(),
  notes: z.literal(true).optional(),
  technician: z.literal(true).optional(),
  status: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional()
}).strict();
export const MaintenanceMinAggregateInputObjectSchema: z.ZodType<Prisma.MaintenanceMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.MaintenanceMinAggregateInputType>;
export const MaintenanceMinAggregateInputObjectZodSchema = makeSchema();
