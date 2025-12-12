/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  rentalId: SortOrderSchema.optional(),
  type: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  scheduledAt: SortOrderSchema.optional(),
  completedAt: SortOrderSchema.optional(),
  address: SortOrderSchema.optional(),
  distance: SortOrderSchema.optional(),
  vehicleId: SortOrderSchema.optional(),
  driverId: SortOrderSchema.optional(),
  driverName: SortOrderSchema.optional(),
  photos: SortOrderSchema.optional(),
  checklist: SortOrderSchema.optional(),
  notes: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const DeliveryCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.DeliveryCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.DeliveryCountOrderByAggregateInput>;
export const DeliveryCountOrderByAggregateInputObjectZodSchema = makeSchema();
