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
  distance: SortOrderSchema.optional(),
  vehicleId: SortOrderSchema.optional(),
  driverId: SortOrderSchema.optional(),
  driverName: SortOrderSchema.optional(),
  notes: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const DeliveryMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.DeliveryMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.DeliveryMinOrderByAggregateInput>;
export const DeliveryMinOrderByAggregateInputObjectZodSchema = makeSchema();
