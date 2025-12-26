/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { NotificationPrioritySchema } from '../enums/NotificationPriority.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumNotificationPriorityFilterObjectSchema as NestedEnumNotificationPriorityFilterObjectSchema } from './NestedEnumNotificationPriorityFilter.schema'

const nestedenumnotificationprioritywithaggregatesfilterSchema = z.object({
  equals: NotificationPrioritySchema.optional(),
  in: NotificationPrioritySchema.array().optional(),
  notIn: NotificationPrioritySchema.array().optional(),
  not: z.union([NotificationPrioritySchema, z.lazy(() => NestedEnumNotificationPriorityWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumNotificationPriorityFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumNotificationPriorityFilterObjectSchema).optional()
}).strict();
export const NestedEnumNotificationPriorityWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedEnumNotificationPriorityWithAggregatesFilter> = nestedenumnotificationprioritywithaggregatesfilterSchema as unknown as z.ZodType<Prisma.NestedEnumNotificationPriorityWithAggregatesFilter>;
export const NestedEnumNotificationPriorityWithAggregatesFilterObjectZodSchema = nestedenumnotificationprioritywithaggregatesfilterSchema;
