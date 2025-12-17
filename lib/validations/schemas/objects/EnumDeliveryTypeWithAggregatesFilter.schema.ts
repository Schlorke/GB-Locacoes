import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { DeliveryTypeSchema } from '../enums/DeliveryType.schema';
import { NestedEnumDeliveryTypeWithAggregatesFilterObjectSchema as NestedEnumDeliveryTypeWithAggregatesFilterObjectSchema } from './NestedEnumDeliveryTypeWithAggregatesFilter.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumDeliveryTypeFilterObjectSchema as NestedEnumDeliveryTypeFilterObjectSchema } from './NestedEnumDeliveryTypeFilter.schema'

const makeSchema = () => z.object({
  equals: DeliveryTypeSchema.optional(),
  in: DeliveryTypeSchema.array().optional(),
  notIn: DeliveryTypeSchema.array().optional(),
  not: z.union([DeliveryTypeSchema, z.lazy(() => NestedEnumDeliveryTypeWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumDeliveryTypeFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumDeliveryTypeFilterObjectSchema).optional()
}).strict();
export const EnumDeliveryTypeWithAggregatesFilterObjectSchema: z.ZodType<Prisma.EnumDeliveryTypeWithAggregatesFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumDeliveryTypeWithAggregatesFilter>;
export const EnumDeliveryTypeWithAggregatesFilterObjectZodSchema = makeSchema();
