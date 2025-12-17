import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { DeliveryCountOrderByAggregateInputObjectSchema as DeliveryCountOrderByAggregateInputObjectSchema } from './DeliveryCountOrderByAggregateInput.schema';
import { DeliveryAvgOrderByAggregateInputObjectSchema as DeliveryAvgOrderByAggregateInputObjectSchema } from './DeliveryAvgOrderByAggregateInput.schema';
import { DeliveryMaxOrderByAggregateInputObjectSchema as DeliveryMaxOrderByAggregateInputObjectSchema } from './DeliveryMaxOrderByAggregateInput.schema';
import { DeliveryMinOrderByAggregateInputObjectSchema as DeliveryMinOrderByAggregateInputObjectSchema } from './DeliveryMinOrderByAggregateInput.schema';
import { DeliverySumOrderByAggregateInputObjectSchema as DeliverySumOrderByAggregateInputObjectSchema } from './DeliverySumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  rentalId: SortOrderSchema.optional(),
  type: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  scheduledAt: SortOrderSchema.optional(),
  completedAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  address: SortOrderSchema.optional(),
  distance: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  vehicleId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  driverId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  driverName: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  photos: SortOrderSchema.optional(),
  checklist: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  notes: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => DeliveryCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => DeliveryAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => DeliveryMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => DeliveryMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => DeliverySumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const DeliveryOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.DeliveryOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.DeliveryOrderByWithAggregationInput>;
export const DeliveryOrderByWithAggregationInputObjectZodSchema = makeSchema();
