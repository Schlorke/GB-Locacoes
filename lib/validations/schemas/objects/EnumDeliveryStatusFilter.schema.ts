import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { DeliveryStatusSchema } from '../enums/DeliveryStatus.schema';
import { NestedEnumDeliveryStatusFilterObjectSchema as NestedEnumDeliveryStatusFilterObjectSchema } from './NestedEnumDeliveryStatusFilter.schema'

const makeSchema = () => z.object({
  equals: DeliveryStatusSchema.optional(),
  in: DeliveryStatusSchema.array().optional(),
  notIn: DeliveryStatusSchema.array().optional(),
  not: z.union([DeliveryStatusSchema, z.lazy(() => NestedEnumDeliveryStatusFilterObjectSchema)]).optional()
}).strict();
export const EnumDeliveryStatusFilterObjectSchema: z.ZodType<Prisma.EnumDeliveryStatusFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumDeliveryStatusFilter>;
export const EnumDeliveryStatusFilterObjectZodSchema = makeSchema();
