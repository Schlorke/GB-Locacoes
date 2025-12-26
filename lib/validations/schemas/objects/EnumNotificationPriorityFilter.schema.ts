/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { NotificationPrioritySchema } from '../enums/NotificationPriority.schema';
import { NestedEnumNotificationPriorityFilterObjectSchema as NestedEnumNotificationPriorityFilterObjectSchema } from './NestedEnumNotificationPriorityFilter.schema'

const makeSchema = () => z.object({
  equals: NotificationPrioritySchema.optional(),
  in: NotificationPrioritySchema.array().optional(),
  notIn: NotificationPrioritySchema.array().optional(),
  not: z.union([NotificationPrioritySchema, z.lazy(() => NestedEnumNotificationPriorityFilterObjectSchema)]).optional()
}).strict();
export const EnumNotificationPriorityFilterObjectSchema: z.ZodType<Prisma.EnumNotificationPriorityFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumNotificationPriorityFilter>;
export const EnumNotificationPriorityFilterObjectZodSchema = makeSchema();
