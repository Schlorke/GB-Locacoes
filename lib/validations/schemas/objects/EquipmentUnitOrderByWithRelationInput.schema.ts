/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { EquipmentOrderByWithRelationInputObjectSchema as EquipmentOrderByWithRelationInputObjectSchema } from './EquipmentOrderByWithRelationInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  equipmentId: SortOrderSchema.optional(),
  uniqueCode: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  hourMeter: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  odometer: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  serialNumber: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  notes: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  equipment: z.lazy(() => EquipmentOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const EquipmentUnitOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.EquipmentUnitOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.EquipmentUnitOrderByWithRelationInput>;
export const EquipmentUnitOrderByWithRelationInputObjectZodSchema = makeSchema();
