import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { DeliveryStatusSchema } from '../enums/DeliveryStatus.schema'

const nestedenumdeliverystatusfilterSchema = z.object({
  equals: DeliveryStatusSchema.optional(),
  in: DeliveryStatusSchema.array().optional(),
  notIn: DeliveryStatusSchema.array().optional(),
  not: z.union([DeliveryStatusSchema, z.lazy(() => NestedEnumDeliveryStatusFilterObjectSchema)]).optional()
}).strict();
export const NestedEnumDeliveryStatusFilterObjectSchema: z.ZodType<Prisma.NestedEnumDeliveryStatusFilter> = nestedenumdeliverystatusfilterSchema as unknown as z.ZodType<Prisma.NestedEnumDeliveryStatusFilter>;
export const NestedEnumDeliveryStatusFilterObjectZodSchema = nestedenumdeliverystatusfilterSchema;
