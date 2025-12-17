import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { DeliveryTypeSchema } from '../enums/DeliveryType.schema'

const nestedenumdeliverytypefilterSchema = z.object({
  equals: DeliveryTypeSchema.optional(),
  in: DeliveryTypeSchema.array().optional(),
  notIn: DeliveryTypeSchema.array().optional(),
  not: z.union([DeliveryTypeSchema, z.lazy(() => NestedEnumDeliveryTypeFilterObjectSchema)]).optional()
}).strict();
export const NestedEnumDeliveryTypeFilterObjectSchema: z.ZodType<Prisma.NestedEnumDeliveryTypeFilter> = nestedenumdeliverytypefilterSchema as unknown as z.ZodType<Prisma.NestedEnumDeliveryTypeFilter>;
export const NestedEnumDeliveryTypeFilterObjectZodSchema = nestedenumdeliverytypefilterSchema;
