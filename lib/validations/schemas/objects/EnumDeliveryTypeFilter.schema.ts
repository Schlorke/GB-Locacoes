import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { DeliveryTypeSchema } from '../enums/DeliveryType.schema';
import { NestedEnumDeliveryTypeFilterObjectSchema as NestedEnumDeliveryTypeFilterObjectSchema } from './NestedEnumDeliveryTypeFilter.schema'

const makeSchema = () => z.object({
  equals: DeliveryTypeSchema.optional(),
  in: DeliveryTypeSchema.array().optional(),
  notIn: DeliveryTypeSchema.array().optional(),
  not: z.union([DeliveryTypeSchema, z.lazy(() => NestedEnumDeliveryTypeFilterObjectSchema)]).optional()
}).strict();
export const EnumDeliveryTypeFilterObjectSchema: z.ZodType<Prisma.EnumDeliveryTypeFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumDeliveryTypeFilter>;
export const EnumDeliveryTypeFilterObjectZodSchema = makeSchema();
