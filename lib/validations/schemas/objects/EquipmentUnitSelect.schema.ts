/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EquipmentArgsObjectSchema as EquipmentArgsObjectSchema } from './EquipmentArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  equipmentId: z.boolean().optional(),
  uniqueCode: z.boolean().optional(),
  status: z.boolean().optional(),
  hourMeter: z.boolean().optional(),
  odometer: z.boolean().optional(),
  serialNumber: z.boolean().optional(),
  notes: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  equipment: z.union([z.boolean(), z.lazy(() => EquipmentArgsObjectSchema)]).optional()
}).strict();
export const EquipmentUnitSelectObjectSchema: z.ZodType<Prisma.EquipmentUnitSelect> = makeSchema() as unknown as z.ZodType<Prisma.EquipmentUnitSelect>;
export const EquipmentUnitSelectObjectZodSchema = makeSchema();
