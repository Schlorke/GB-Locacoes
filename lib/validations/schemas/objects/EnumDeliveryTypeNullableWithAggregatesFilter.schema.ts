/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { DeliveryTypeSchema } from '../enums/DeliveryType.schema';
import { NestedEnumDeliveryTypeNullableWithAggregatesFilterObjectSchema as NestedEnumDeliveryTypeNullableWithAggregatesFilterObjectSchema } from './NestedEnumDeliveryTypeNullableWithAggregatesFilter.schema';
import { NestedIntNullableFilterObjectSchema as NestedIntNullableFilterObjectSchema } from './NestedIntNullableFilter.schema';
import { NestedEnumDeliveryTypeNullableFilterObjectSchema as NestedEnumDeliveryTypeNullableFilterObjectSchema } from './NestedEnumDeliveryTypeNullableFilter.schema'

const makeSchema = () => z.object({
  equals: DeliveryTypeSchema.optional().nullable(),
  in: DeliveryTypeSchema.array().optional().nullable(),
  notIn: DeliveryTypeSchema.array().optional().nullable(),
  not: z.union([DeliveryTypeSchema, z.lazy(() => NestedEnumDeliveryTypeNullableWithAggregatesFilterObjectSchema)]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumDeliveryTypeNullableFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumDeliveryTypeNullableFilterObjectSchema).optional()
}).strict();
export const EnumDeliveryTypeNullableWithAggregatesFilterObjectSchema: z.ZodType<Prisma.EnumDeliveryTypeNullableWithAggregatesFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumDeliveryTypeNullableWithAggregatesFilter>;
export const EnumDeliveryTypeNullableWithAggregatesFilterObjectZodSchema = makeSchema();
