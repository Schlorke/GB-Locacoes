/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { DeliveryTypeSchema } from '../enums/DeliveryType.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumDeliveryTypeFilterObjectSchema as NestedEnumDeliveryTypeFilterObjectSchema } from './NestedEnumDeliveryTypeFilter.schema'

const nestedenumdeliverytypewithaggregatesfilterSchema = z.object({
  equals: DeliveryTypeSchema.optional(),
  in: DeliveryTypeSchema.array().optional(),
  notIn: DeliveryTypeSchema.array().optional(),
  not: z.union([DeliveryTypeSchema, z.lazy(() => NestedEnumDeliveryTypeWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumDeliveryTypeFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumDeliveryTypeFilterObjectSchema).optional()
}).strict();
export const NestedEnumDeliveryTypeWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedEnumDeliveryTypeWithAggregatesFilter> = nestedenumdeliverytypewithaggregatesfilterSchema as unknown as z.ZodType<Prisma.NestedEnumDeliveryTypeWithAggregatesFilter>;
export const NestedEnumDeliveryTypeWithAggregatesFilterObjectZodSchema = nestedenumdeliverytypewithaggregatesfilterSchema;
