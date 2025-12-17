import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { DeliveryTypeSchema } from '../enums/DeliveryType.schema';
import { NestedEnumDeliveryTypeNullableFilterObjectSchema as NestedEnumDeliveryTypeNullableFilterObjectSchema } from './NestedEnumDeliveryTypeNullableFilter.schema'

const makeSchema = () => z.object({
  equals: DeliveryTypeSchema.optional().nullable(),
  in: DeliveryTypeSchema.array().optional().nullable(),
  notIn: DeliveryTypeSchema.array().optional().nullable(),
  not: z.union([DeliveryTypeSchema, z.lazy(() => NestedEnumDeliveryTypeNullableFilterObjectSchema)]).optional().nullable()
}).strict();
export const EnumDeliveryTypeNullableFilterObjectSchema: z.ZodType<Prisma.EnumDeliveryTypeNullableFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumDeliveryTypeNullableFilter>;
export const EnumDeliveryTypeNullableFilterObjectZodSchema = makeSchema();
