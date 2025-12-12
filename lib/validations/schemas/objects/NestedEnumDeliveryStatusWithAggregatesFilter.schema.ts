/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { DeliveryStatusSchema } from '../enums/DeliveryStatus.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumDeliveryStatusFilterObjectSchema as NestedEnumDeliveryStatusFilterObjectSchema } from './NestedEnumDeliveryStatusFilter.schema'

const nestedenumdeliverystatuswithaggregatesfilterSchema = z.object({
  equals: DeliveryStatusSchema.optional(),
  in: DeliveryStatusSchema.array().optional(),
  notIn: DeliveryStatusSchema.array().optional(),
  not: z.union([DeliveryStatusSchema, z.lazy(() => NestedEnumDeliveryStatusWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumDeliveryStatusFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumDeliveryStatusFilterObjectSchema).optional()
}).strict();
export const NestedEnumDeliveryStatusWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedEnumDeliveryStatusWithAggregatesFilter> = nestedenumdeliverystatuswithaggregatesfilterSchema as unknown as z.ZodType<Prisma.NestedEnumDeliveryStatusWithAggregatesFilter>;
export const NestedEnumDeliveryStatusWithAggregatesFilterObjectZodSchema = nestedenumdeliverystatuswithaggregatesfilterSchema;
