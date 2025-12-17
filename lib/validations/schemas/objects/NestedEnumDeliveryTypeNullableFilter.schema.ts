import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { DeliveryTypeSchema } from '../enums/DeliveryType.schema'

const nestedenumdeliverytypenullablefilterSchema = z.object({
  equals: DeliveryTypeSchema.optional().nullable(),
  in: DeliveryTypeSchema.array().optional().nullable(),
  notIn: DeliveryTypeSchema.array().optional().nullable(),
  not: z.union([DeliveryTypeSchema, z.lazy(() => NestedEnumDeliveryTypeNullableFilterObjectSchema)]).optional().nullable()
}).strict();
export const NestedEnumDeliveryTypeNullableFilterObjectSchema: z.ZodType<Prisma.NestedEnumDeliveryTypeNullableFilter> = nestedenumdeliverytypenullablefilterSchema as unknown as z.ZodType<Prisma.NestedEnumDeliveryTypeNullableFilter>;
export const NestedEnumDeliveryTypeNullableFilterObjectZodSchema = nestedenumdeliverytypenullablefilterSchema;
