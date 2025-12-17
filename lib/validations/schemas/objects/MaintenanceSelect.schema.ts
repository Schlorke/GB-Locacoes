import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EquipmentArgsObjectSchema as EquipmentArgsObjectSchema } from './EquipmentArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  equipmentId: z.boolean().optional(),
  type: z.boolean().optional(),
  scheduledAt: z.boolean().optional(),
  completedAt: z.boolean().optional(),
  cost: z.boolean().optional(),
  laborCost: z.boolean().optional(),
  partsCost: z.boolean().optional(),
  description: z.boolean().optional(),
  notes: z.boolean().optional(),
  technician: z.boolean().optional(),
  status: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  equipment: z.union([z.boolean(), z.lazy(() => EquipmentArgsObjectSchema)]).optional()
}).strict();
export const MaintenanceSelectObjectSchema: z.ZodType<Prisma.MaintenanceSelect> = makeSchema() as unknown as z.ZodType<Prisma.MaintenanceSelect>;
export const MaintenanceSelectObjectZodSchema = makeSchema();
