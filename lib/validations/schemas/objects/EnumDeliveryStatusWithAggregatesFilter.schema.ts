import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { DeliveryStatusSchema } from '../enums/DeliveryStatus.schema';
import { NestedEnumDeliveryStatusWithAggregatesFilterObjectSchema as NestedEnumDeliveryStatusWithAggregatesFilterObjectSchema } from './NestedEnumDeliveryStatusWithAggregatesFilter.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumDeliveryStatusFilterObjectSchema as NestedEnumDeliveryStatusFilterObjectSchema } from './NestedEnumDeliveryStatusFilter.schema'

const makeSchema = () => z.object({
  equals: DeliveryStatusSchema.optional(),
  in: DeliveryStatusSchema.array().optional(),
  notIn: DeliveryStatusSchema.array().optional(),
  not: z.union([DeliveryStatusSchema, z.lazy(() => NestedEnumDeliveryStatusWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumDeliveryStatusFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumDeliveryStatusFilterObjectSchema).optional()
}).strict();
export const EnumDeliveryStatusWithAggregatesFilterObjectSchema: z.ZodType<Prisma.EnumDeliveryStatusWithAggregatesFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumDeliveryStatusWithAggregatesFilter>;
export const EnumDeliveryStatusWithAggregatesFilterObjectZodSchema = makeSchema();
