/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { NotificationTypeSchema } from '../enums/NotificationType.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumNotificationTypeFilterObjectSchema as NestedEnumNotificationTypeFilterObjectSchema } from './NestedEnumNotificationTypeFilter.schema'

const nestedenumnotificationtypewithaggregatesfilterSchema = z.object({
  equals: NotificationTypeSchema.optional(),
  in: NotificationTypeSchema.array().optional(),
  notIn: NotificationTypeSchema.array().optional(),
  not: z.union([NotificationTypeSchema, z.lazy(() => NestedEnumNotificationTypeWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumNotificationTypeFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumNotificationTypeFilterObjectSchema).optional()
}).strict();
export const NestedEnumNotificationTypeWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedEnumNotificationTypeWithAggregatesFilter> = nestedenumnotificationtypewithaggregatesfilterSchema as unknown as z.ZodType<Prisma.NestedEnumNotificationTypeWithAggregatesFilter>;
export const NestedEnumNotificationTypeWithAggregatesFilterObjectZodSchema = nestedenumnotificationtypewithaggregatesfilterSchema;
