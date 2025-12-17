import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  equipmentId: SortOrderSchema.optional(),
  uniqueCode: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  hourMeter: SortOrderSchema.optional(),
  odometer: SortOrderSchema.optional(),
  serialNumber: SortOrderSchema.optional(),
  notes: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const EquipmentUnitMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.EquipmentUnitMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.EquipmentUnitMaxOrderByAggregateInput>;
export const EquipmentUnitMaxOrderByAggregateInputObjectZodSchema = makeSchema();
